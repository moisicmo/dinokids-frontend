import { ComponentInput } from '@/components';
import { useForm, useStudentStore } from '@/hooks';
import {
  FormStudentModel,
  FormStudentValidations,
  StudentModel,
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
  item: StudentModel | null;
}

const formFields: FormStudentModel = {
  code: '',
  dni:'',
  name: '',
  lastName: '',
  email: '',
};

const formValidations: FormStudentValidations = {
  dni: [(value) => value.length >= 1, 'Debe número de carnet'],
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  lastName: [(value) => value.length >= 1, 'Debe ingresar el apellido'],
  email: [(value) => value.length >= 1, 'Debe ingresar el correo'],
};

export const StudentCreate = (props: createProps) => {
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
  const { createStudent, updateStudent } = useStudentStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createStudent({
        dni: dni.trim(),
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      });
    } else {
      await updateStudent(item.id, {
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
          {item == null ? 'Nuevo Estudiante' : `${item.name}`}
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
