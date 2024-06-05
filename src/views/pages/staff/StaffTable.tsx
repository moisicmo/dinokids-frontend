import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useStaffStore } from '@/hooks';
import { StaffModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
  handleEdit?: (season: StaffModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (season: StaffModel) => void;
  items?: any[];
}

export const StaffTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { staffs = [], getStaffs, deleteStaff } = useStaffStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [customerList, setCustomerList] = useState<StaffModel[]>([]);
  const [query, setQuery] = useState<string>('');


  useEffect(() => {
    getStaffs()
  }, []);

  useEffect(() => {
    const filtered = staffs.filter((e: StaffModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : staffs,
      page,
      rowsPerPage
    );
    setCustomerList(newList)
  }, [staffs, page, rowsPerPage, query])


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Docente"
        search={setQuery}
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre y Apellido</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Correo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList.map((staff: StaffModel) => {
              const isSelected = items.includes(staff.id);
              return (
                <TableRow key={staff.id} >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(staff)}
                      />
                    </TableCell>
                  }
                  <TableCell>{`${staff.name} ${staff.lastName}`}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.name }</TableCell>
                  {
                    !stateSelect && <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton onClick={() => handleEdit!(staff)} >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteStaff(staff.id)} >
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
        total={staffs.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}
