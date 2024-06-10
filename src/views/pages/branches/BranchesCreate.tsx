import { ComponentInput } from '@/components';
import { useForm, useSucursalStore } from '@/hooks';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { FormEvent, useState } from 'react';
import { FormSucursalModel, FormSucursalValidations, SucursalModel } from '@/models/sucursal';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: SucursalModel | null;
}

const formFields: FormSucursalModel = {
  name: '',
  code: '',
  city: '',
  address: '',
  phoneNumber: '',
  status: true,
  isPrimary: false,
};

const formValidations: FormSucursalValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre de la sucursal'],
  code: [(value) => value.length >= 1, 'Debe ingresar el codigo de la sucursal'],
  city: [(value) => value.length >= 1, 'Debe ingresar la ciudad de la sucursal'],
  address: [(value) => value.length >= 1, 'Debe ingresar la direccion de la sucursal'],
  phoneNumber: [(value) => value.length >= 1, 'Debe ingresar el telefono o celular de la sucursal'],
};

export const BranchesCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {
    name,
    code,
    city,
    address,
    phoneNumber,
    onInputChange,
    isFormValid,
    onResetForm,
    nameValid,
    codeValid,
    cityValid,
    addressValid,
    phoneNumberValid,
  } = useForm(item ?? formFields, formValidations);
  const { createSucursal, updateSucursal } = useSucursalStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createSucursal({
        name: code.trim(),
        code: code.trim(),
        city: city.trim(),
        address: address.trim(),
        phoneNumber: phoneNumber.trim(),
      });
    } else {
      await updateSucursal(item.id, {
        name: code.trim(),
        code: code.trim(),
        city: city.trim(),
        address: address.trim(),
        phoneNumber: phoneNumber.trim(),
      });
    }
    handleClose();
    onResetForm();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {item == null ? 'Nueva Sucursal' : `${item.city}`}
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
                  label="Codigo Sucursal"
                  name="code"
                  value={code}
                  onChange={onInputChange}
                  error={!!codeValid && formSubmitted}
                  helperText={formSubmitted ? codeValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Ciudad"
                  name="city"
                  value={city}
                  onChange={onInputChange}
                  error={!!cityValid && formSubmitted}
                  helperText={formSubmitted ? cityValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Direccion"
                  name="address"
                  value={address}
                  onChange={onInputChange}
                  error={!!addressValid && formSubmitted}
                  helperText={formSubmitted ? addressValid : ''}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="telefono"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onInputChange}
                  error={!!phoneNumberValid && formSubmitted}
                  helperText={formSubmitted ? phoneNumberValid : ''}
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
