import { ComponentButton } from '@/components';
import {
  Stack
} from '@mui/material';
import { useCallback, useState } from 'react';
import { RoomModel, ScheduleModel } from '@/models';
import { ScheduleCreate } from '.';
import { CalendarComponent } from '../inscription/calendar';

interface tableProps {
  room: RoomModel;
}

export const ScheduleTable = (props: tableProps) => {
  const { room } = props;
  const [itemEdit, setItemEdit] = useState<ScheduleModel | null>(null);
  const [openDialog, setopenDialog] = useState(false);

  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setopenDialog(value);
  }, []);

  return (
    <>
      <Stack direction="row" justifyContent="end">
        <ComponentButton text="Agregar Nuevo Horario" onClick={() => handleDialog(true)} />
      </Stack>
      <CalendarComponent
        onSelect={(_) => { }}
        eventSelects={[]}
        room={room}
      />
      {openDialog && (
        <ScheduleCreate
          roomId={room.id}
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      )}
    </>
  );
};
