import {
  ComponentInput,
  ComponentSelect,
  ModalSelectComponent,
} from '@/components';
import { useForm, useStaffStore } from '@/hooks';
import { FormStaffModel, FormStaffValidations, StaffModel } from '@/models';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { RoleTable } from '../role';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: StaffModel | null;
}

const formFields: FormStaffModel = {
  name: '',
  lastName: '',
  email: '',
  role: null,
};

const formValidations: FormStaffValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  lastName: [(value) => value.length >= 1, 'Debe ingresar el apellido'],
  email: [(value) => value.length >= 1, 'Debe ingresar el correo'],
  role: [(value) => value != null, 'Debe ingresar el correo'],
};

export const StaffCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {
    name,
    lastName,
    email,
    role,
    onInputChange,
    isFormValid,
    onValueChange,
    onResetForm,
    nameValid,
    lastNameValid,
    emailValid,
    roleValid,
  } = useForm(item ?? formFields, formValidations);
  const { createStaff, updateStaff } = useStaffStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createStaff({
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        roleId: role.id,
      });
    } else {
      await updateStaff(item.id, {
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        roleId: role.id,
      });
    }
    handleClose();
    onResetForm();
  };
  const [modalRole, setModalRole] = useState(false);
  const handleModalRole = useCallback((value: boolean) => {
    setModalRole(value);
  }, []);

  return (
    <>
      {modalRole && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title="Roles:"
          opendrawer={modalRole}
          handleDrawer={handleModalRole}
        >
          <RoleTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (role == null || role.id != v.id) {
                onValueChange('role', v);
                handleModalRole(false);
              }
            }}
            items={role == null ? [] : [role.id]}
          />
        </ModalSelectComponent>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {item == null ? 'Nuevo Staff' : `${item.name}`}
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
                  label="Correo"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  error={!!emailValid && formSubmitted}
                  helperText={formSubmitted ? emailValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={role != null ? 'Rol' : ''}
                  title={role != null ? role.name : 'Rol'}
                  onPressed={() => handleModalRole(true)}
                  error={!!roleValid && formSubmitted}
                  helperText={formSubmitted ? roleValid : ''}
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
