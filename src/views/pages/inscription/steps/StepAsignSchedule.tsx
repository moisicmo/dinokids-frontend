import React, { useEffect, useState } from 'react';
import { useScheduleStore } from '@/hooks';
import { RoomModel } from '@/models';
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material';
import { CalendarComponent } from '../calendar';
import { SlotInfo } from 'react-big-calendar';

interface createProps {
  item: Object | null;
  dataInscription: any;
  submitForm: (data: Object) => void;
  changeStep: (step: number) => void;
  onSelect: (data: SlotInfo) => void;
  eventSelects: SlotInfo[];
}

export const StepAsignSchedule = (props: createProps) => {
  const { dataInscription, submitForm, changeStep, onSelect, eventSelects } = props;

  const [roomIdSelect, setRoomIdSelect] = useState<number | null>(null);
  const { getSchedules } = useScheduleStore();

  useEffect(() => {
    if (roomIdSelect != null) {
      getSchedules(roomIdSelect);
    }
  }, [roomIdSelect]);

  const handleExpandRow = (roomId: number) => {
    // Si el ID actual es el mismo que el seleccionado, cerrarlo (setear a null)
    if (roomIdSelect === roomId) {
      setRoomIdSelect(null);
    } else {
      // De lo contrario, seleccionar el nuevo ID
      setRoomIdSelect(roomId);
    }
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell />
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Especialidad</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Profesor</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Capacidad de niños</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Rango de edad</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Sucursal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataInscription.rooms.map((room: RoomModel) => {
              return (
                <React.Fragment key={room.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleExpandRow(room.id)} // Usa la función para manejar la expansión
                      >
                        {roomIdSelect === room.id ? (
                          <KeyboardArrowUpOutlined />
                        ) : (
                          <KeyboardArrowDownOutlined />
                        )}
                      </IconButton>
                    </TableCell>

                    <TableCell>{room.name}</TableCell>
                    <TableCell>{room.specialty.name}</TableCell>
                    <TableCell>{room.teacher.name}</TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell>
                      {room.rangeYears[0] === room.rangeYears[1]
                        ? `${room.rangeYears[0]} años`
                        : `${room.rangeYears[0]}-${room.rangeYears[1]} años`}
                    </TableCell>
                    <TableCell>{room.branch.name}</TableCell>
                  </TableRow>
                  {roomIdSelect === room.id && ( // Solo mostrar el calendario si el ID coincide
                    <TableRow>
                      <TableCell colSpan={7} style={{ padding: 0 }}>
                        <CalendarComponent onSelect={onSelect} eventSelects={eventSelects} room={room} />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => {submitForm({eventSelects})}} sx={{ mt: 1, mr: 1 }}>
          {'Continuar'}
        </Button>
        <Button onClick={() => changeStep(-1)} sx={{ mt: 1, mr: 1 }}>
          Atrás
        </Button>
      </Box>
    </>
  );
};
