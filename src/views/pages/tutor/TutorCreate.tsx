import { ComponentInput } from '@/components';
import { useForm, useTutorStore } from '@/hooks';
import {
  FormTutorModel,
  FormTutorValidations,
  TutorModel,
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
  item: TutorModel | null;
}

const formFields: FormTutorModel = {
  dni: '',
  name: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
};

const formValidations: FormTutorValidations = {
  dni: [(value) => value.length >= 1, 'Debe ingresar el carnet'],
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  lastName: [(value) => value.length >= 1, 'Debe ingresar el apellido'],
  email: [(value) => value.length >= 1, 'Debe ingresar el correo'],
  phone: [(value) => value.length >= 1, 'Debe ingresar el teléfono de contacto'],
  address: [(value) => value.length >= 1, 'Debe ingresar la dirección'],
};

export const TutorCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {
    dni,
    name,
    lastName,
    email,
    phone,
    address,
    onInputChange,
    isFormValid,
    onResetForm,
    dniValid,
    nameValid,
    lastNameValid,
    emailValid,
    phoneValid,
    addressValid,
  } = useForm(item ?? formFields, formValidations);
  const { createTutor, updateTutor } = useTutorStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createTutor({
        dni: dni.trim(),
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
      });
    } else {
      await updateTutor(item.id, {
        dni: dni.trim(),
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
      });
    }
    handleClose();
    onResetForm();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} style={{ zIndex: 9998 }}>
        <DialogTitle>
          {item == null ? 'Nuevo Tutor' : `${item.name}`}
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
                  label="Carnet"
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
                  label="Teléfono"
                  name="phone"
                  value={phone}
                  onChange={onInputChange}
                  error={!!phoneValid && formSubmitted}
                  helperText={formSubmitted ? phoneValid : ''}
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
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Dirección"
                  name="address"
                  value={address}
                  onChange={onInputChange}
                  error={!!addressValid && formSubmitted}
                  helperText={formSubmitted ? addressValid : ''}
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
