import { ComponentButton } from '@/components';
import {
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
import { DayOfWeek, ScheduleModel } from '@/models';
import { useScheduleStore } from '@/hooks';
import { ScheduleCreate } from '.';
import esES from 'date-fns/locale/es';
import { format } from 'date-fns';

interface tableProps {
  roomId: number;
}

export const ScheduleTable = (props: tableProps) => {
  const { roomId } = props;

  const { schedules = [], getSchedules, deleteSchedule } = useScheduleStore();
  const [itemEdit, setItemEdit] = useState<ScheduleModel | null>(null);
  const [openDialog, setopenDialog] = useState(false);

  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setopenDialog(value);
  }, []);

  useEffect(() => {
    getSchedules(roomId);
  }, []);

  const days = Object.keys(DayOfWeek) as Array<keyof typeof DayOfWeek>;

  // Función para agrupar horarios por horas y días
  const groupSchedulesByHourRange = () => {
    const groupedSchedules: { hourRange: string; schedules: ScheduleModel[] }[] = [];

    schedules.forEach((schedule: ScheduleModel) => {
      const startHour = format(new Date(schedule.start), 'HH:mm', { locale: esES });
      const endHour = format(new Date(schedule.end), 'HH:mm', { locale: esES });
      const hourRange = `${startHour} - ${endHour}`;

      // Buscar si ya existe el rango horario en groupedSchedules
      const existingIndex = groupedSchedules.findIndex(item => item.hourRange === hourRange);

      if (existingIndex !== -1) {
        // Si ya existe, agregar el schedule al array de schedules
        groupedSchedules[existingIndex].schedules.push(schedule);
      } else {
        // Si no existe, crear un nuevo objeto con el hourRange y el primer schedule
        groupedSchedules.push({
          hourRange,
          schedules: [schedule],
        });
      }
    });

    return groupedSchedules;
  };

  const groupedSchedules = groupSchedulesByHourRange();
  // console.log(groupedSchedules)
  return (
    <>
      <Stack direction="row" justifyContent="end">
        <ComponentButton text="Agregar Nuevo Horario" onClick={() => handleDialog(true)} />
      </Stack>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Hora</TableCell>
              {days.map((day) => (
                <TableCell key={day} sx={{ fontWeight: 'bold' }}>
                  {day}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: 'bold' }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedSchedules.map((range) => (
              <TableRow key={range.hourRange}>
                <TableCell>{range.hourRange}</TableCell>
                {days.map((day, i) => (
                  <TableCell key={i} sx={{ fontWeight: 'bold' }}>
                    {
                      range.schedules.filter((v) => v.days.find((value) => value === DayOfWeek[day])).map((_, index) => (
                        <ComponentButton
                          key={`${i}-${index}`}
                          text=" "
                          onClick={() => { }}
                        />
                      ))
                    }
                  </TableCell>
                ))}

                <TableCell align="right">
                  <Stack alignItems="center" direction="row" spacing={2}>
                    <IconButton
                      onClick={() => {
                        // Implementar lógica de edición aquí
                      }}
                    >
                      <EditOutlined color="info" />
                    </IconButton>
                    <IconButton onClick={() => { }}>
                      <DeleteOutline color="error" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openDialog && (
        <ScheduleCreate
          roomId={roomId}
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      )}
    </>
  );
};
