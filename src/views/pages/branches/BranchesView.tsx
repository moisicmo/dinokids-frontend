import { ComponentButton } from '@/components';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Add, SpaceDashboard} from '@mui/icons-material';
import { SucursalModel } from '@/models';
import { BranchesCreate, BranchesTable } from '.';

export const BranchesView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<SucursalModel | null>(null);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setopenDialog(value);
  }, []);
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6"><SpaceDashboard />SUCURSALES</Typography>
        
        <ComponentButton
          text="Nueva Sucursal"
          onClick={() => handleDialog(true)}
          startIcon={
            <SvgIcon fontSize="small">
              <Add />
            </SvgIcon>
          }
        />
      </Stack>
      <BranchesTable
        handleEdit={(v:any) => {
          setItemEdit(v);
          handleDialog(true);
        }}
      />
      {openDialog && (
        <BranchesCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit == null ? null : { ...itemEdit }}
        />
      )}
    </>
  );
};
