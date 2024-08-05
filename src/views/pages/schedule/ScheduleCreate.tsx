import { ComponentDate, ComponentSelectPicker } from '@/components';
import { useForm, useScheduleStore } from '@/hooks';
import { DayOfWeek, FormScheduleModel, FormScheduleValidations, ScheduleModel } from '@/models';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { FormEvent, useState } from 'react';

interface createProps {
  roomId: number;
  open: boolean;
  handleClose: () => void;
  item: ScheduleModel | null;
}

const formFields: FormScheduleModel = {
  day: null,
  start: null,
  end: null,
};

const formValidations: FormScheduleValidations = {
  day: [(value) => value != null, 'Debe ingresar el día'],
  start: [(value) => value != null, 'Debe ingresar la hora de inicio'],
  end: [(value) => value != null, 'Debe ingresar la hora fin'],
};

export const ScheduleCreate = (props: createProps) => {
  const { roomId, open, handleClose, item } = props;
  const { createSchedule, updateSchedule } = useScheduleStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    day,
    start,
    end,
    isFormValid,
    onValueChange,
    onResetForm,
    dayValid,
    startValid,
    endValid,
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createSchedule({
        day: day,
        start: start,
        end: end,
        roomId: roomId,
      });
    } else {
      await updateSchedule(item.id, {
        day: day,
        start: start,
        end: end,
        roomId: roomId,
      });
    }
    handleClose();
    onResetForm();
  };
  // Obtener el key correspondiente al valor actual de day
  const dayKey = day
    ? Object.keys(DayOfWeek).find((key) => DayOfWeek[key as keyof typeof DayOfWeek] === day)
    : '';
  const dayOptions = Object.entries(DayOfWeek).map(([key]) => ({
    id: key,
    name: key,
  }));

  return (
    <>
      <Dialog open={open} onClose={handleClose} style={{ zIndex: 9998 }}>
        <DialogTitle>{item == null ? 'Nuevo Horario' : `${item.day}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentSelectPicker
                  label={'Día'}
                  value={dayKey}
                  handleSelect={(value: keyof typeof DayOfWeek) =>
                    onValueChange('day', DayOfWeek[value])
                  }
                  options={dayOptions}
                  error={!!dayValid && formSubmitted}
                  helperText={formSubmitted ? dayValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentDate
                  onlyDate={false}
                  date={start}
                  title="Inicio"
                  onChange={(event) => onValueChange('start', event)}
                  error={!!startValid && formSubmitted}
                  helperText={formSubmitted ? startValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentDate
                  onlyDate={false}
                  date={end}
                  title="Fin"
                  onChange={(event) => onValueChange('end', event)}
                  error={!!endValid && formSubmitted}
                  helperText={formSubmitted ? endValid : ''}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                onResetForm();
                handleClose();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">{item == null ? 'CREAR' : 'EDITAR'}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
