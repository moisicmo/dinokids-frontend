import { ComponentButton, ComponentSearch, ComponentTablePagination } from "@/components";
import { useTutorStore } from '@/hooks';
import { TutorModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { TutorCreate } from ".";

interface tableProps {
  handleEdit?: (season: TutorModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (season: TutorModel) => void;
  items?: any[];
}


export const TutorTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { tutors = [], getTutors, deleteTutor } = useTutorStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [customerList, setCustomerList] = useState<TutorModel[]>([]);
  const [query, setQuery] = useState<string>('');


  useEffect(() => {
    getTutors()
  }, []);

  useEffect(() => {
    const filtered = tutors.filter((e: TutorModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : tutors,
      page,
      rowsPerPage
    );
    setCustomerList(newList)
  }, [tutors, page, rowsPerPage, query])

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const [itemEdit, setItemEdit] = useState<TutorModel | null>(null);
  const [openDialog, setopenDialog] = useState(false);
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <ComponentSearch
          title="Buscar Tutores"
          search={setQuery}
        />
        {stateSelect && <ComponentButton
          text="Crear Tutor"
          onClick={() => handleDialog(true)}
        />}
      </Stack>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Carnet</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Apellido</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Correo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList.map((tutor: TutorModel) => {
              const isSelected = items.includes(tutor.id);
              return (
                <TableRow key={tutor.id} >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(tutor)}
                      />
                    </TableCell>
                  }
                  <TableCell>{tutor.dni}</TableCell>
                  <TableCell>{tutor.name}</TableCell>
                  <TableCell>{tutor.lastName}</TableCell>
                  <TableCell>{tutor.email}</TableCell>
                  <TableCell>{tutor.phone}</TableCell>
                  <TableCell>{tutor.address}</TableCell>
                  {
                    !stateSelect && <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton onClick={() => handleEdit!(tutor)} >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteTutor(tutor.id)} >
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
        total={tutors.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
      {
        openDialog &&
        <TutorCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      }
    </>
  );
}
