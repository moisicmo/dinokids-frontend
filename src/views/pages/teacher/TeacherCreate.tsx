import { ComponentInput } from '@/components';
import { useForm, useTeacherStore } from '@/hooks';
import {
  FormTeacherModel,
  FormTeacherValidations,
  TeacherModel,
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
  item: TeacherModel | null;
}

const formFields: FormTeacherModel = {
  dni: '',
  name: '',
  lastName: '',
  email: '',
};

const formValidations: FormTeacherValidations = {
  dni: [(value) => value.length >= 1, 'Debe ingresar el carnet'],
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  lastName: [(value) => value.length >= 1, 'Debe ingresar el apellido'],
  email: [(value) => value.length >= 1, 'Debe ingresar el correo'],
};

export const TeacherCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {
    dni,
    name,
    lastName,
    email,
    onInputChange,
    isFormValid,
    onResetForm,
    dniValid,
    nameValid,
    lastNameValid,
    emailValid,
  } = useForm(item ?? formFields, formValidations);
  const { createTeacher, updateTeacher } = useTeacherStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createTeacher({
        dni: dni.trim(),
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      });
    } else {
      await updateTeacher(item.id, {
        dni: dni.trim(),
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      });
    }
    handleClose();
    onResetForm();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {item == null ? 'Nuevo Docente' : `${item.name}`}
        </DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
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
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Apellido"
                  name="lastName"
                  value={lastName}
                  onChange={onInputChange}
                  error={!!lastNameValid && formSubmitted}
                  helperText={formSubmitted ? lastNameValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Número de carnet"
                  name="dni"
                  value={dni}
                  onChange={onInputChange}
                  error={!!dniValid && formSubmitted}
                  helperText={formSubmitted ? dniValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Correo"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  error={!!emailValid && formSubmitted}
                  helperText={formSubmitted ? emailValid : ''}
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
