import { ComponentSearch, ComponentTablePagination } from '@/components';
import { usePermissionStore } from '@/hooks';
import { PermissionModel } from '@/models';
import { applyPagination } from '@/utils/applyPagination';
import {
  Checkbox,
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
  stateSelect?: boolean;
  itemSelect?: (permission: PermissionModel) => void;
  items?: any[];
  limitInit?: number;
}

export const PermissionTable = (props: tableProps) => {
  const { stateSelect = false, itemSelect, items = [], limitInit = 10 } = props;

  const { permissions = [], getPermissions } = usePermissionStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [permisionList, setTypeUserList] = useState<PermissionModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    const filteredPermisions = permissions.filter((e: PermissionModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const defaultPermisionsList = applyPagination(
      query != '' ? filteredPermisions : permissions,
      page,
      rowsPerPage
    );
    setTypeUserList(defaultPermisionsList);
  }, [permissions, page, rowsPerPage, query]);

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch title="Buscar Permiso" search={setQuery} />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permisionList.map((permission: PermissionModel) => {
              const isSelected = items.includes(permission.id);
              return (
                <TableRow key={permission.id}>
                  {stateSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(permission)}
                      />
                    </TableCell>
                  )}
                  <TableCell>{permission.name}</TableCell>
                  <TableCell>{permission.module}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={permissions.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
};
