import { ComponentInput, ComponentSelect, ModalSelectComponent } from '@/components';
import { useForm, useRoomStore } from '@/hooks';
import {
  CategoryModel,
  FormCategoryModel,
  FormCategoryValidations,
} from '@/models';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { BranchTable } from '../branch';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: CategoryModel | null;
}

const formFields: FormCategoryModel = {
  name: '',
};

const formValidations: FormCategoryValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
};

export const RoomCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const { createRoom, updateRoom } = useRoomStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { name, branch, onInputChange, isFormValid, onValueChange, onResetForm, nameValid, branchValid } = useForm(
    item ?? formFields,
    formValidations
  );

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createRoom({
        name: name.trim(),
        branchId: branch.id,
      });
    } else {
      await updateRoom(item.id, {
        name: name.trim(),
        branchId: branch.id,
      });
    }
    handleClose();
    onResetForm();
  };
  //modal branch
  const [modalBranch, setModalBranch] = useState(false);
  const handleModalBranch = useCallback((value: boolean) => {
    setModalBranch(value);
  }, []);
  return (
    <>
      {/* modal branch */}
      {modalBranch && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title="Sucursales:"
          opendrawer={modalBranch}
          handleDrawer={handleModalBranch}
        >
          <BranchTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (branch == null || branch.id != v.id) {
                onValueChange('branch', v);
                handleModalBranch(false);
              }
            }}
            items={branch == null ? [] : [branch.id]}
          />
        </ModalSelectComponent>
      )}
      <Dialog open={open} onClose={handleClose} style={{ zIndex: 9998 }}>
        <DialogTitle>
          {item == null ? 'Nueva Aula' : `${item.name}`}
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
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>

                <ComponentSelect
                  label={branch != null ? 'Sucursal' : ''}
                  title={branch != null ? branch.name : 'Sucursal'}
                  onPressed={() => handleModalBranch(true)}
                  error={!!branchValid && formSubmitted}
                  helperText={formSubmitted ? branchValid : ''}
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
