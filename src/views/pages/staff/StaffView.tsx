import { ComponentButton } from '@/components';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Add } from '@mui/icons-material';
import { StaffModel } from '@/models';
import { StaffCreate, StaffTable } from '.';

export const StaffView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<StaffModel | null>(null);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setopenDialog(value);
  }, []);
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Administradores</Typography>
        <ComponentButton
          text="Nuevo administrador"
          onClick={() => handleDialog(true)}
          startIcon={
            <SvgIcon fontSize="small">
              <Add />
            </SvgIcon>
          }
        />
      </Stack>
      <StaffTable
        handleEdit={(v) => {
          setItemEdit(v);
          handleDialog(true);
        }}
      />
      {openDialog && (
        <StaffCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit == null ? null : { ...itemEdit }}
        />
      )}
    </>
  );
};
