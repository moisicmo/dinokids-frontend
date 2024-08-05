import { ComponentButton, ComponentSearch, ComponentTablePagination } from '@/components';
import { applyPagination } from '@/utils/applyPagination';
import {
  Checkbox,
  Collapse,
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
import {
  DeleteOutline,
  EditOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from '@mui/icons-material';
import { RoomModel, SpecialtyModel } from '@/models';
import { useSpecialtyStore } from '@/hooks';
import { SpecialtyCreate } from '.';
import React from 'react';

interface tableProps {
  handleEdit?: (specialty: SpecialtyModel) => void;
  limitInit?: number;
  itemSelect?: (model: RoomModel | SpecialtyModel) => void;
  items?: any[];
  branchId: number;
  isRoomSelect: boolean;
}

export const SpecialtyTable = (props: tableProps) => {
  const {
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
    branchId,
    isRoomSelect,
  } = props;

  const { specialties = [], getSpecialties, deleteSpecialty } = useSpecialtyStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [stageList, setSpecialtyList] = useState<SpecialtyModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getSpecialties(branchId);
  }, []);

  useEffect(() => {
    const filtered = specialties.filter((e: SpecialtyModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(query != '' ? filtered : specialties, page, rowsPerPage);
    setSpecialtyList(newList);
  }, [specialties, page, rowsPerPage, query]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const [itemEdit, setItemEdit] = useState<SpecialtyModel | null>(null);
  const [openDialog, setopenDialog] = useState(false);
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setopenDialog(value);
  }, []);
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <ComponentSearch title="Buscar Especialidades" search={setQuery} />
        {!isRoomSelect && (
          <ComponentButton text="Crear Especialidad" onClick={() => handleDialog(true)} />
        )}
      </Stack>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
            {isRoomSelect ? (<TableCell sx={{ fontWeight: 'bold' }}>Aulas</TableCell>):(<TableCell/>)}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              {!isRoomSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {stageList.map((specialty: SpecialtyModel) => {
              const isSelected = items.includes(specialty.id);
              return (
                <React.Fragment key={specialty.id}>
                  <TableRow>
                    {isRoomSelect ? (
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() =>
                            setOpenIndex(openIndex == specialty.id ? null : specialty.id)
                          }
                        >
                          {openIndex == specialty.id ? (
                            <KeyboardArrowUpOutlined />
                          ) : (
                            <KeyboardArrowDownOutlined />
                          )}
                        </IconButton>
                      </TableCell>
                    ) : (
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} onChange={() => itemSelect!(specialty)} />
                      </TableCell>
                    )}
                    <TableCell>{specialty.name}</TableCell>

                    {!isRoomSelect && (
                      <TableCell align="right">
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <IconButton onClick={() => handleEdit!(specialty)}>
                            <EditOutlined color="info" />
                          </IconButton>
                          <IconButton onClick={() => deleteSpecialty(specialty.id)}>
                            <DeleteOutline color="error" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                  {isRoomSelect && (
                    <TableRow
                      style={{ backgroundColor: openIndex == specialty.id ? '#f2f2f2' : '#fff' }}
                    >
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                        <Collapse in={openIndex == specialty.id} timeout="auto" unmountOnExit>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell />
                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Profesor</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Capacidad de niños</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Rango de edad</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {specialty.rooms && specialty.rooms.map((room: RoomModel) => {
                                const isRoomSelected = items.includes(room.id);
                                return (
                                  <TableRow key={room.id}>
                                    <TableCell padding="checkbox">
                                      <Checkbox
                                        checked={isRoomSelected}
                                        onChange={() => itemSelect!(room)}
                                      />
                                    </TableCell>
                                    <TableCell>{room.name}</TableCell>
                                    <TableCell>{room.teacher.name}</TableCell>
                                    <TableCell>{room.capacity}</TableCell>
                                    <TableCell>
                                      {room.rangeYears[0] === room.rangeYears[1]
                                        ? `${room.rangeYears[0]} años`
                                        : `${room.rangeYears[0]}-${room.rangeYears[1]} años`}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={specialties.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
      {openDialog && (
        <SpecialtyCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      )}
    </>
  );
};
