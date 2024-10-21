import { ComponentButton } from '@/components';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Add } from '@mui/icons-material';
import { MonthlyFeeModel } from '@/models';
import { MonthlyFeeCreateInscription } from './MonthlyfeeCreateInscription';
import { MonthlyFeeCreateMonth } from './MonthlyfeeCreateMonth';
import { MonthlyFeeTable } from '.';

export const MonthlyFeeView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [selectpay, setselectpay] = useState('');
  const [itemEdit, setItemEdit] = useState<MonthlyFeeModel | null>(null);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: { state: boolean, pay: string }) => {
    if (!value) setItemEdit(null);
    setopenDialog(value.state);
    setselectpay(value.pay)
  }, []);
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Pagos</Typography>
        <div>
          <ComponentButton
            text="Pago Inscripcion"
            onClick={() => handleDialog({ state: true, pay: 'inscription' })}
            startIcon={
              <SvgIcon fontSize="small">
                <Add />
              </SvgIcon>
            }
          />
          <ComponentButton
            text="Pago mensualidad"
            onClick={() => handleDialog({ state: true, pay: 'month' })}
            startIcon={
              <SvgIcon fontSize="small">
                <Add />
              </SvgIcon>
            }
          />
        </div>
      </Stack>

      <MonthlyFeeTable
        handleEdit={(v) => {
          setItemEdit(v);
          handleDialog({ state: true, pay: '' });
        }}
      />
      {openDialog && selectpay == 'inscription' ? (
        <MonthlyFeeCreateInscription
          open={openDialog}
          handleClose={() => handleDialog({ state: false, pay: '' })}
          item={itemEdit == null ? null : { ...itemEdit }}
        />
      ) : <MonthlyFeeCreateMonth
        open={openDialog}
        handleClose={() => handleDialog({ state: false, pay: '' })}
        item={itemEdit == null ? null : { ...itemEdit }}
      />}
    </>
  );
};
