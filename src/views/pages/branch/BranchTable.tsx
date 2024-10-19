import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useBranchOfficeStore } from "@/hooks";
import { BranchModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
  handleEdit?: (branchOffice: BranchModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (branchOffice: BranchModel) => void;
  items?: any[];
}


export const BranchTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { branchOffices = [], getBranchOffices, deleteBranchOffice } = useBranchOfficeStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [warehouseList, setWarehouseList] = useState<BranchModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getBranchOffices()
  }, []);

  useEffect(() => {
    const filtered = branchOffices.filter((e: BranchModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : branchOffices,
      page,
      rowsPerPage
    );
    setWarehouseList(newList)
  }, [branchOffices, page, rowsPerPage, query])

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Sucursal"
        search={setQuery}
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouseList.map((branchOffice: BranchModel) => {
              const isSelected = items.includes(branchOffice.id);
              return (
                <TableRow key={branchOffice.id} >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(branchOffice)}
                      />
                    </TableCell>
                  }
                  <TableCell>{branchOffice.name}</TableCell>
                  <TableCell>{branchOffice.address}</TableCell>
                  <TableCell>{branchOffice.phone}</TableCell>
                  {
                    !stateSelect && <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton onClick={() => handleEdit!(branchOffice)} >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteBranchOffice(branchOffice.id)} >
                          <DeleteOutline color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  }
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={branchOffices.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}
