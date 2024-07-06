import {
  ComponentInput,
  ComponentSelect,
  ModalSelectComponent,
} from '@/components';
import { useForm, useMonthlyFeeStore } from '@/hooks';
import { MonthlyFeeModel, FormMonthlyFeeModelInscription, FormMonthlyFeeValidationsInscription, InscriptionModel } from '@/models';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { InscriptionTable } from '../../inscription';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: MonthlyFeeModel | null;
}

const formFields: FormMonthlyFeeModelInscription = {
  inscriptionId:null,
  amount: 0,
  payMethod:'',
  transactionNumber:'',
};

const formValidations: FormMonthlyFeeValidationsInscription = {
  inscriptions: [(value) => value != null, 'Debe ingresar el Id de inscripcion'],
  amount: [(value) => value != null, 'Debe ingresar el monto'],
  payMethod: [(value) => value.length >= 1, 'Debe ingresar el methodo de pafo'],
  transactionNumber: [(value) => value.length >= 1, 'Debe ingresarel nuemro transaccion'],
};

export const MonthlyFeeCreateInscription = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {
    inscriptions,
    amount,
    payMethod,
    transactionNumber,
    onInputChange,
    isFormValid,
    onValueChange,
    onResetForm,
    inscriptionsValid,
    amountValid,
    payMethodValid,
    transactionNumberValid,
  } = useForm(item ?? formFields, formValidations);
  const { createMonthlyFeeInscription, updateMonthlyFee } = useMonthlyFeeStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createMonthlyFeeInscription({
        inscriptionsId: inscriptions.id,
        amount: parseInt(amount),
        payMethod: payMethod.trim(),
        transactionNumber: transactionNumber.trim(),
      });
    } else {
      await updateMonthlyFee(item.id, {
        inscriptionsId: inscriptions.id,
        amount: amount.trim(),
        payMethod: payMethod.trim(),
        transactionNumber: transactionNumber.trim(),
      });
    }
    handleClose();
    onResetForm();
  };

  const [modalInscriptions, setModalInscriptions] = useState(false);
  const handleModalInscriptions = useCallback((value: boolean) => {
    setModalInscriptions(value);
  }, []);

  return (
    <>
      {modalInscriptions && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title="Inscriptions:"
          opendrawer={modalInscriptions}
          handleDrawer={handleModalInscriptions}
        >
          <InscriptionTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v: InscriptionModel) => {
              if (inscriptions == null || inscriptions.id != v.id) {
                onValueChange('inscriptions', v);
                handleModalInscriptions(false);
              }
            }}
            items={inscriptions == null ? [] : [inscriptions.id]}
          />
        </ModalSelectComponent>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {item == null ? 'Nuevo MonthlyFee' : `${item.id}`}
        </DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="number"
                  label="amount"
                  name="amount"
                  value={amount}
                  onChange={onInputChange}
                  error={!!amountValid && formSubmitted}
                  helperText={formSubmitted ? amountValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="payMethod"
                  name="payMethod"
                  value={payMethod}
                  onChange={onInputChange}
                  error={!!payMethodValid && formSubmitted}
                  helperText={formSubmitted ? payMethodValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="# transaccion"
                  name="transactionNumber"
                  value={transactionNumber}
                  onChange={onInputChange}
                  error={!!transactionNumberValid && formSubmitted}
                  helperText={formSubmitted ? transactionNumberValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={inscriptions != null ? 'Inscripcion' : ''}
                  title={inscriptions != null ? inscriptions.id : 'Inscripcion'}
                  onPressed={() => handleModalInscriptions(true)}
                  error={!!inscriptionsValid && formSubmitted}
                  helperText={formSubmitted ? inscriptionsValid : ''}
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
