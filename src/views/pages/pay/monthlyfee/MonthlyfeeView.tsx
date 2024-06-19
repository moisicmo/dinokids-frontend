import { ComponentButton } from '@/components';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Add } from '@mui/icons-material';
import { MonthlyFeeModel } from '@/models';
import { MonthlyFeeCreate } from '.';
import { MonthlyFeeTable } from '.';

export const MonthlyFeeView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<MonthlyFeeModel | null>(null);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setopenDialog(value);
  }, []);
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Pagos</Typography>
        <ComponentButton
          text="Nueva Cuota Mensual"
          onClick={() => handleDialog(true)}
          startIcon={
            <SvgIcon fontSize="small">
              <Add />
            </SvgIcon>
          }
        />
      </Stack>
       <MonthlyFeeTable
        handleEdit={(v) => {
          setItemEdit(v);
          handleDialog(true);
        }}
      /> 
      {openDialog && (
        <MonthlyFeeCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit == null ? null : { ...itemEdit }}
        />
      )}
    </>
  );
};
