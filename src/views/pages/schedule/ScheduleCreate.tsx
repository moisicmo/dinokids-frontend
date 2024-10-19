import { ComponentDate, ComponentSelectPicker } from '@/components';
import { useForm, useScheduleStore } from '@/hooks';
import { DayOfWeek, FormScheduleModel, FormScheduleValidations, ScheduleModel } from '@/models';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';

interface createProps {
  roomId: number;
  open: boolean;
  handleClose: () => void;
  item: ScheduleModel | null;
}

const formFields: FormScheduleModel = {
  days: [],
  start: null,
  end: null,
};

const formValidations: FormScheduleValidations = {
  days: [(value) => value.length > 0, 'Debe ingresar el día'],
  start: [(value) => value != null, 'Debe ingresar la hora de inicio'],
  end: [(value) => value != null, 'Debe ingresar la hora fin'],
};

export const ScheduleCreate = (props: createProps) => {
  const { roomId, open, handleClose, item } = props;
  const { createSchedule, updateSchedule } = useScheduleStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const {
    days,
    start,
    end,
    isFormValid,
    onValueChange,
    onResetForm,
    daysValid,
    startValid,
    endValid,
  } = useForm(item ?? formFields, formValidations);
  
  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createSchedule({
        days: days,
        start: start,
        end: end,
        roomId: roomId,
      });
    } else {
      await updateSchedule(item.id, {
        days: days,
        start: start,
        end: end,
        roomId: roomId,
      });
    }
    handleClose();
    onResetForm();
  };
  
  const [daysAvailable, setDaysAvailable] = useState<Object[]>([]);
  useEffect(() => {
    const daysOptions = Object.entries(DayOfWeek).map((value) => ({
      id: value[1],
      name: value[0],
    }));
    setDaysAvailable(daysOptions);
  }, []);


  return (
    <>
      <Dialog open={open} onClose={handleClose} style={{ zIndex: 9998 }}>
        <DialogTitle>{item == null ? 'Nuevo Horario' : `${item.days[0]}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentSelectPicker
                  isMultiple
                  label={'Día'}
                  value={days}
                  handleSelect={(value: String) => onValueChange('days', value)}
                  options={daysAvailable}
                  error={!!daysValid && formSubmitted}
                  helperText={formSubmitted ? daysValid : ''}
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
