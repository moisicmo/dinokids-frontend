import { ComponentButton, ComponentSearch, ComponentTablePagination } from '@/components';
import { useStudentStore } from '@/hooks';
import { EducationLevel, Gender, StudentModel } from '@/models';
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
import { useCallback, useEffect, useState } from 'react';
import { StudentCreate } from '.';
import esES from 'date-fns/locale/es';
import { format } from "date-fns";

interface tableProps {
  handleEdit?: (season: StudentModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (season: StudentModel) => void;
  items?: any[];
}

export const StudentTable = (props: tableProps) => {
  const { stateSelect = false, handleEdit, itemSelect, limitInit = 10, items = [] } = props;

  const { students = [], getStudents, deleteStudent } = useStudentStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [customerList, setCustomerList] = useState<StudentModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter((e: StudentModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(query != '' ? filtered : students, page, rowsPerPage);
    setCustomerList(newList);
  }, [students, page, rowsPerPage, query]);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const [itemEdit, setItemEdit] = useState<StudentModel | null>(null);
  const [openDialog, setopenDialog] = useState(false);
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setopenDialog(value);
  }, []);


  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <ComponentSearch title="Buscar Estudiante" search={setQuery} />
        {stateSelect && (
          <ComponentButton text="Crear Estudiante" onClick={() => handleDialog(true)} />
        )}
      </Stack>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Cód. estudiante</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tutor</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Correo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Fecha de nacimiento</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Género</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Colégio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Grado</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList.map((student: StudentModel) => {
              const isSelected = items.includes(student.id);
              // Obtener el key correspondiente gender
              const genderKey = student.gender
                ? Object.keys(Gender).find((key) => Gender[key as keyof typeof Gender] === student.gender)
                : '';
              // Obtener el key correspondiente education level
              const educationLevelKey = student.educationLevel
                ? Object.keys(EducationLevel).find((key) => EducationLevel[key as keyof typeof EducationLevel] === student.educationLevel)
                : '';
              return (
                <TableRow key={student.id}>
                  {stateSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} onChange={() => itemSelect!(student)} />
                    </TableCell>
                  )}
                  <TableCell>{student.code}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <ul>
                      {student.tutors.map((item) => (
                        <li key={item.dni}>{item.name}</li>
                      ))}
                    </ul>
                  </TableCell>

                  <TableCell>{student.email}</TableCell>

                  <TableCell>{`${format(new Date(student.birthdate), 'dd-MMMM-yyyy', { locale: esES })}`}</TableCell>
                  <TableCell>{`${genderKey}`}</TableCell>
                  <TableCell>{student.school}</TableCell>
                  <TableCell>{`${student.grade}° ${educationLevelKey}`}</TableCell>
                  {!stateSelect && (
                    <TableCell align="right">
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <IconButton onClick={() => handleEdit!(student)}>
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteStudent(student.id)}>
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
        total={students.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
      {openDialog && (
        <StudentCreate open={openDialog} handleClose={() => handleDialog(false)} item={itemEdit} />
      )}
    </>
  );
};
