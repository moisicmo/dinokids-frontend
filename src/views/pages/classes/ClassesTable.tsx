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
import { ClasseModel } from '@/models';
import { useClasseStore } from '@/hooks';

interface tableProps {
  handleEdit?: (subject: ClasseModel) => void;
  limitInit?: number;
  itemSelect?: (subject: ClasseModel) => void;
  items?: any[];
  stateSelect?: boolean;
}

export const ClassesTable = (props: tableProps) => {
  const { handleEdit, itemSelect, limitInit = 10, items = [], stateSelect } = props;

  const { classes = [], getClasses, deleteClasse } = useClasseStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [stageList, setCategoryList] = useState<ClasseModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    const filtered = classes.filter((e: ClasseModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(query != '' ? filtered : classes, page, rowsPerPage);
    setCategoryList(newList);
  }, [classes, page, rowsPerPage, query]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <ComponentSearch title="Buscar Clases" search={setQuery} />
      </Stack>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Incio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Fin</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Aula</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Módulo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Materia</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Profesor</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {stageList.map((classe: ClasseModel) => {
              const isSelected = items.includes(classe.id);
              return (
                <TableRow key={classe.id}>
                  {stateSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} onChange={() => itemSelect!(classe)} />
                    </TableCell>
                  )}
                  <TableCell>{classe.name}</TableCell>
                  <TableCell>{`${classe.start}`}</TableCell>
                  <TableCell>{`${classe.end}`}</TableCell>
                  <TableCell>{classe.room.name}</TableCell>
                  <TableCell>{classe.module.name}</TableCell>
                  <TableCell>{classe.module.subject.name}</TableCell>
                  <TableCell>{classe.teacher.name}</TableCell>

                  {!stateSelect && (
                    <TableCell align="right">
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <IconButton onClick={() => handleEdit!(classe)}>
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteClasse(classe.id)}>
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
        total={classes.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </>
  );
};
