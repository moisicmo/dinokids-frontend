import { ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useForm, useRoleStore } from "@/hooks";
import { FormRoleModel, FormRoleValidations, PermissionModel, RoleModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FormEvent, useCallback, useState } from "react";
import { PermissionTable } from "../permission";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: RoleModel | null;
}

const formFields: FormRoleModel = {
  name: '',
  permissions: [],
}

const formValidations: FormRoleValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  permissions: [(value: PermissionModel[]) => value.length >= 1, 'Debe ingresar un permiso'],
}


export const RoleCreate = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const {
    name, permissions,
    onInputChange, isFormValid, onValueChange, onResetForm,
    nameValid, permissionsValid } = useForm(item ?? formFields, formValidations);
  const { createRole: postCreateRole, updateRole: putUpdateRole } = useRoleStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const handleModal = useCallback((value: boolean) => {
    setModal(value);
  }, []);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await postCreateRole(
        {
          name: name.trim(),
          permissions: permissions.map((e: PermissionModel) => e.id)
        });
    } else {
      await putUpdateRole(item.id,
        {
          name: name.trim(),
          permissions: permissions.map((e: PermissionModel) => e.id)
        });
    }
    handleClose();
    onResetForm();
  }

  return (
    <>
      {
        modal &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={true}
          title='Permisos:'
          opendrawer={modal}
          handleDrawer={handleModal}
        >
          <PermissionTable
            stateSelect={true}
            itemSelect={(v) => {
              if (permissions.map((e: PermissionModel) => e.id).includes(v.id)) {
                onValueChange('permissions', [...permissions.filter((e: PermissionModel) => e.id != v.id)])
              } else {
                onValueChange('permissions', [...permissions, v])
              }
            }}
            items={permissions.map((e: PermissionModel) => (e.id))}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Rol' : `${item.name}`}</DialogTitle>
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
                  label={permissions != null ? '' : 'Permisos'}
                  title={'Permisos'}
                  onPressed={() => handleModal(true)}
                  error={!!permissionsValid && formSubmitted}
                  helperText={formSubmitted ? permissionsValid : ''}
                  items={permissions.map((e: PermissionModel) => ({ id: e.id, name: e.name }))}
                  onRemove={(v) => onValueChange('permisionIds', [...permissions.filter((e: PermissionModel) => e.id != v)])}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              onResetForm();
              handleClose()
            }}>Cancelar</Button>
            <Button type="submit">
              {item == null ? 'CREAR' : 'EDITAR'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
