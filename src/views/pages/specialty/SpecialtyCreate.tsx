import { ComponentInput } from '@/components';
import { useForm, useSpecialtyStore } from '@/hooks';
import {
  SpecialtyModel,
  FormSpecialtyModel,
  FormSpecialtyValidations,
} from '@/models';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { FormEvent, useState } from 'react';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: SpecialtyModel | null;
}

const formFields: FormSpecialtyModel = {
  name: '',
};

const formValidations: FormSpecialtyValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
};

export const SpecialtyCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const { createSpecialty, updateSpecialty } = useSpecialtyStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    name,
    onInputChange,
    isFormValid,
    onResetForm,
    nameValid,
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createSpecialty({
        name: name.trim(),
      });
    } else {
      await updateSpecialty(item.id, {
        name: name.trim(),
      });
    }
    handleClose();
    onResetForm();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} style={{ zIndex: 9998 }}>
        <DialogTitle>
          {item == null ? 'Nueva Especialidad' : `${item.name}`}
        </DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Nombre"
                  name="name"
                  value={name}
                  onChange={onInputChange}
                  error={!!nameValid && formSubmitted}
                  helperText={formSubmitted ? nameValid : ''}
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
