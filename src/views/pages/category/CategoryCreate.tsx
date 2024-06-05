import { ComponentInput } from '@/components';
import { useCategoryStore, useForm } from '@/hooks';
import {
  TypeProjectModel,
  FormCategoryModel,
  FormCategoryValidations,
} from '@/models';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { FormEvent, useState } from 'react';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: TypeProjectModel | null;
}

const formFields: FormCategoryModel = {
  name: '',
};

const formValidations: FormCategoryValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
};

export const CategoryCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const { createCategory, updateCategory } = useCategoryStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { name, onInputChange, isFormValid, onResetForm, nameValid } = useForm(
    item ?? formFields,
    formValidations
  );

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createCategory({
        name: name.trim(),
      });
    } else {
      await updateCategory(item.id, {
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
          {item == null ? 'Nueva Categoria' : `${item.name}`}
        </DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <ComponentInput
              type="text"
              label="Nombre"
              name="name"
              value={name}
              onChange={onInputChange}
              error={!!nameValid && formSubmitted}
              helperText={formSubmitted ? nameValid : ''}
            />
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
