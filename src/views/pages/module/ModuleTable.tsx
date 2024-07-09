import { ComponentSearch, ComponentTablePagination } from '@/components';
import { applyPagination } from '@/utils/applyPagination';
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
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { ModuleModel } from '@/models';
import { useModuleStore } from '@/hooks';

interface tableProps {
  handleEdit?: (subject: ModuleModel) => void;
  limitInit?: number;
  itemSelect?: (subject: ModuleModel) => void;
  items?: any[];
  stateSelect?: boolean;
}

export const ModuleTable = (props: tableProps) => {
  const { handleEdit, itemSelect, limitInit = 10, items = [], stateSelect } = props;

  const { modules = [], getModules, deleteModule } = useModuleStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [stageList, setCategoryList] = useState<ModuleModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getModules();
  }, []);

  useEffect(() => {
    const filtered = modules.filter((e: ModuleModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(query != '' ? filtered : modules, page, rowsPerPage);
    setCategoryList(newList);
  }, [modules, page, rowsPerPage, query]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <ComponentSearch title="Buscar Módulo" search={setQuery} />
      </Stack>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Materia</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {stageList.map((module: ModuleModel) => {
              const isSelected = items.includes(module.id);
              return (
                <TableRow key={module.id}>
                  {stateSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} onChange={() => itemSelect!(module)} />
                    </TableCell>
                  )}
                  <TableCell>{module.name}</TableCell>
                  <TableCell>{module.subject.name}</TableCell>

                  {!stateSelect && (
                    <TableCell align="right">
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <IconButton onClick={() => handleEdit!(module)}>
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteModule(module.id)}>
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
        total={modules.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </>
  );
};
