import { ComponentSearch, ComponentTablePagination } from '@/components';
import { useStudentStore } from '@/hooks';
import { StudentModel } from '@/models';
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
  handleEdit?: (season: StudentModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (season: StudentModel) => void;
  items?: any[];
}

export const StudentTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

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
    const newList = applyPagination(
      query != '' ? filtered : students,
      page,
      rowsPerPage
    );
    setCustomerList(newList);
  }, [students, page, rowsPerPage, query]);

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch title="Buscar Estudiante" search={setQuery} />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
              {!stateSelect && (
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList.map((student: StudentModel) => {
              const isSelected = items.includes(student.id);
              return (
                <TableRow key={student.id}>
                  {stateSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(student)}
                      />
                    </TableCell>
                  )}
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
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
    </Stack>
  );
};
