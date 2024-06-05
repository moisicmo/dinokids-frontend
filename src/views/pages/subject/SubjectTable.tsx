import {
  ComponentButton,
  ComponentSearch,
  ComponentTablePagination,
} from '@/components';
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
import { useCallback, useEffect, useState } from 'react';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { SubjectModel } from '@/models';
import { useSubjectStore } from '@/hooks';
import { SubjectCreate } from '.';

interface tableProps {
  limitInit?: number;
  itemSelect?: (customer: SubjectModel) => void;
  items?: any[];
  stateSelect?: boolean;
}

export const SubjectTable = (props: tableProps) => {
  const { itemSelect, limitInit = 10, items = [], stateSelect } = props;

  const { subjects = [], getSubjects, deleteSubject } = useSubjectStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [stageList, setCategoryList] = useState<SubjectModel[]>([]);
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<SubjectModel | null>(null);
  const [query, setQuery] = useState<string>('');
  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setopenDialog(value);
  }, []);

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    const filtered = subjects.filter((e: SubjectModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : subjects,
      page,
      rowsPerPage
    );
    setCategoryList(newList);
  }, [subjects, page, rowsPerPage, query]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <ComponentSearch title="Buscar Materia" search={setQuery} />
        <ComponentButton
          text="Crear Materia"
          onClick={() => handleDialog(true)}
        />
      </Stack>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Código</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Semestre</TableCell>
              {!stateSelect && (
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {stageList.map((stage: SubjectModel) => {
              const isSelected = items.includes(stage.id);
              return (
                <TableRow key={stage.id}>
                  {stateSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(stage)}
                      />
                    </TableCell>
                  )}
                  <TableCell>{stage.name}</TableCell>
                  <TableCell>{stage.code}</TableCell>
                  <TableCell>{stage.semester}</TableCell>

                  {!stateSelect && (
                    <TableCell align="right">
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <IconButton
                          onClick={() => {
                            setItemEdit(stage);
                            handleDialog(true);
                          }}
                        >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteSubject(stage.id)}>
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
        total={subjects.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
      {openDialog && (
        <SubjectCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      )}
    </>
  );
};
