import { ComponentSearch, ComponentTablePagination } from '@/components';
import { useSucursalStore } from '@/hooks';
import { SucursalModel } from '@/models';
import { applyPagination } from '@/utils/applyPagination';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import {
  Checkbox,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface tableProps {
  handleEdit?: (season: SucursalModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (season: SucursalModel) => void;
  items?: any[];
}

export const BranchesTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { sucursals = [], getSucursal, deleteSucursal } = useSucursalStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [customerList, setCustomerList] = useState<SucursalModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getSucursal();
  }, []);

  useEffect(() => {
    const filtered = sucursals.filter((e: SucursalModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : sucursals,
      page,
      rowsPerPage
    );
    setCustomerList(newList);
  }, [sucursals, page, rowsPerPage, query]);

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch title="Buscar Sucursal" search={setQuery} />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Codigo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ciudad</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Direccion</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>phone</TableCell>
              {!stateSelect && (
                <TableCell sx={{ fontWeight: 'bold' }}>Codigo</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList.map((suc: SucursalModel) => {
              const isSelected = items.includes(suc.id);
              return (
                <TableRow key={suc.id}>
                  {stateSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(suc)}
                      />
                    </TableCell>
                  )}
                  <TableCell>{suc.name}</TableCell>
                  <TableCell>{suc.code}</TableCell>
                  <TableCell>{suc.city}</TableCell>
                  <TableCell>{suc.address}</TableCell>
                  {!stateSelect && (
                    <TableCell align="right">
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <IconButton onClick={() => handleEdit!(suc)}>
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteSucursal(suc.id)}>
                          <DeleteOutline color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={sucursals.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
};
