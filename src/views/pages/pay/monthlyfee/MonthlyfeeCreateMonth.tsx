import {
  ComponentInput,
  ComponentSelect,
  ModalSelectComponent,
} from '@/components';
import { useForm, useMonthlyFeeStore } from '@/hooks';
import { MonthlyFeeModel, FormMonthlyFeeModel, FormMonthlyFeeValidations, InscriptionModel } from '@/models';
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

const formFields: FormMonthlyFeeModel = {
  inscriptionId:null,
  studentId:null,
  amountPaid: 0,
  commitmentDate:null,
  payMethod:'CASH',
  transactionNumber:'',
  isInscription:false,
};

const formValidations: FormMonthlyFeeValidations = {
  inscriptions: [(value) => value != null, 'Debe ingresar el Id de inscripcion'],
  //studentId: [(value) => value != null, 'Debe ingresar el id del studiante'],
  commitmentDate: [(value) => value != null, 'Debe ingresar la proxima fecha de pago'],
  amountPaid: [(value) => value != null, 'Debe ingresar el monto'],
  payMethod: [(value) => value.length >= 1, 'Debe ingresar el methodo de pago'],
  transactionNumber: [(value) => value.length >= 1, 'Debe ingresarel nuemro transaccion'],
};

export const MonthlyFeeCreateMonth = (props: createProps) => {
  const { open, handleClose, item } = props;

  console.log("item createmonth:", item)
  const {
    inscriptions,
    studentId,
    commitmentDate,
    amountPaid,
    payMethod,
    transactionNumber,
    onInputChange,
    isFormValid,
    onValueChange,
    onResetForm,
    inscriptionsValid,
    amountPaidValid,
    payMethodValid,
    transactionNumberValid,
    studentIdValid,
    commitmentDateValid,
  } = useForm(item ?? formFields, formValidations);
  const { createMonthlyFee, updateMonthlyFee } = useMonthlyFeeStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createMonthlyFee({
        inscriptionId: inscriptions.id,
        studentId:inscriptions.student.id,
        amountPaid: parseInt(amountPaid),
        commitmentDate: commitmentDate,
        isInscription:false,
        payMethod: payMethod.trim(),
        transactionNumber: transactionNumber.trim(),
        startDate: '2024-07-15 15:14:19.83',
        endDate: '2024-07-15 15:14:19.83',
      });
    } else {
      await updateMonthlyFee(item.id, {
        inscriptionId: inscriptions.id,
        studentId:inscriptions.student.id,
        amountPaid: parseInt(amountPaid),
        commitmentDate: commitmentDate,
        isInscription:false,
        payMethod: 'CASH',
        transactionNumber: transactionNumber.trim(),
        startDate: Date.now(),
        endDate: Date.now(),
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
          {item == null ? 'Pago Mensualidad' : `${item.id}`}
        </DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="number"
                  label="amountPaid"
                  name="amountPaid"
                  value={amountPaid}
                  onChange={onInputChange}
                  error={!!amountPaidValid && formSubmitted}
                  helperText={formSubmitted ? amountPaidValid : ''}
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
                <ComponentInput
                  type="text"
                  label="fecha compromiso"
                  name="commitmentDate"
                  value={commitmentDate}
                  onChange={onInputChange}
                  error={!!commitmentDateValid && formSubmitted}
                  helperText={formSubmitted ? commitmentDateValid : ''}
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
