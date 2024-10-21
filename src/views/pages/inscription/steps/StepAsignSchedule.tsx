import React, { useState } from 'react';
import { InscriptionRequired, RoomModel } from '@/models';
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
  dataInscription: InscriptionRequired;
  submitForm: (data: InscriptionRequired) => void;
  changeStep: (step: number) => void;
}

export const StepAsignSchedule = (props: createProps) => {
  const { dataInscription, submitForm, changeStep } = props;

  // Usar useState para manejar las habitaciones (rooms)
  const [rooms, setRooms] = useState<RoomModel[]>(dataInscription.rooms);
  const [roomIdSelect, setRoomIdSelect] = useState<number | null>(null);

  const handleSelectEvent = (data: SlotInfo, roomId: number) => {

    var newData: any = { ...data };
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === roomId) {
          // Copiar el objeto room para evitar modificarlo directamente
          const updatedRoom = { ...room };
          
          // Inicializar eventSelects si no existe
          if (!updatedRoom.eventSelects) {
            updatedRoom.eventSelects = [];
          }

          // Verificar si el evento ya está seleccionado
          if (updatedRoom.eventSelects.map((e: any) => e.id).includes(newData.id)) {
            // Deseleccionar el evento si ya existe
            updatedRoom.eventSelects = updatedRoom.eventSelects.filter((e: any) => e.id !== newData.id);
          } else {
            // Agregar el nuevo evento
            updatedRoom.eventSelects = [...updatedRoom.eventSelects, data];
          }

          return updatedRoom; // Retornar la habitación actualizada
        }
        return room; // Retornar las otras habitaciones sin modificar
      })
    );
  };

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
            {rooms.map((room) => (
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
                {roomIdSelect === room.id && (
                  <TableRow>
                    <TableCell colSpan={7} style={{ padding: 0 }}>
                      <CalendarComponent
                        onSelect={(data) => handleSelectEvent(data, room.id)} 
                        eventSelects={room.eventSelects}
                        room={room}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => submitForm({ ...dataInscription, rooms })}
          sx={{ mt: 1, mr: 1 }}
        >
          {'Continuar'}
        </Button>
        <Button onClick={() => changeStep(-1)} sx={{ mt: 1, mr: 1 }}>
          Atrás
        </Button>
      </Box>
    </>
  );
};
