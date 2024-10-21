import {
  ComponentInput,
  ComponentSelect,
  ModalSelectComponent,
  ComponentDate,
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
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { InscriptionTable } from '../../inscription';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import QrCodeIcon from '@mui/icons-material/QrCode';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { customAlphabet } from 'nanoid'


const nanoid = customAlphabet('1234567890', 10)
const transactionCashNumber = nanoid(5)

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: MonthlyFeeModel | null;
}

const formFields: FormMonthlyFeeModel = {
  inscriptionId: null,
  studentId: null,
  amountPaid: 0,
  commitmentDate: null,
  payMethod: 'CASH',
  transactionNumber: '',
  isInscription: false,
  buyerName: '',
  buyerNIT: '',
};

const formValidations: FormMonthlyFeeValidations = {
  inscriptions: [(value) => value != null, 'Debe ingresar el Id de inscripcion'],
  //studentId: [(value) => value != null, 'Debe ingresar el id del studiante'],
  commitmentDate: [(value) => value != null, 'Debe ingresar la proxima fecha de pago'],
  amountPaid: [(value) => value != null, 'Debe ingresar el monto'],
  payMethod: [(value) => value.length >= 1, 'Debe ingresar el methodo de pago'],
  buyerName: [(value) => value.length >= 1, 'Debe ingresar el nombre a facturar'],
  buyerNIT: [(value) => value.length >= 1, 'Debe ingresar el NIT del cliente'],
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
    buyerName,
    buyerNIT,
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
    buyerNameValid,
    buyerNITValid,
  } = useForm(item ?? formFields, formValidations);
  const { createMonthlyFee, updateMonthlyFee } = useMonthlyFeeStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [valueradio, setValueradio] = useState('CASH');

  const handleChange: any = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueradio((event.target as HTMLInputElement).value);
  };

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {

    console.log(" // // // SEND SUBMIT CREATE MONTHLYFEE ");
    console.log({
      inscriptionId: inscriptions.id,
      studentId: inscriptions.student.id,
      amountPaid: parseInt(amountPaid),
      commitmentDate: commitmentDate,
      isInscription: false,
      payMethod: payMethod.trim(),
      transactionNumber: valueradio == 'CASH' ? transactionCashNumber : transactionNumber.trim(),
      startDate: '2024-07-15 15:14:19.83',
      endDate: '2024-07-15 15:14:19.83',
      buyerNIT: buyerNIT.trim(),
      buyerName: buyerName.trim(),
    })
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;
    if (item == null) {
      await createMonthlyFee({
        inscriptionId: inscriptions.id,
        studentId: inscriptions.student.id,
        amountPaid: parseInt(amountPaid),
        commitmentDate: commitmentDate,
        isInscription: false,
        payMethod: payMethod.trim(),
        transactionNumber: valueradio == 'CASH' ? transactionCashNumber : transactionNumber.trim(),
        startDate: '2024-07-15 15:14:19.83',
        endDate: '2024-07-15 15:14:19.83',
        buyerNIT: buyerNIT.trim(),
        buyerName: buyerName.trim(),
      });
    } else {
      await updateMonthlyFee(item.id, {
        inscriptionId: inscriptions.id,
        studentId: inscriptions.student.id,
        amountPaid: parseInt(amountPaid),
        commitmentDate: commitmentDate,
        isInscription: false,
        payMethod: 'CASH',
        transactionNumber: valueradio == 'CASH' ? transactionCashNumber : transactionNumber.trim(),
        startDate: Date.now(),
        endDate: Date.now(),
        buyerNIT: buyerNIT.trim(),
        buyerName: buyerName.trim(),
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} sx={{ padding: '5px', margin: '10px' }}>
            <ComponentSelect
              label={inscriptions != null ? 'Inscripcion' : ''}
              title={inscriptions != null ? `${inscriptions.student.name} ${inscriptions.student.lastName}` : 'Inscripcion'}
              onPressed={() => handleModalInscriptions(true)}
              error={!!inscriptionsValid && formSubmitted}
              helperText={formSubmitted ? inscriptionsValid : ''}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {inscriptions && (<>
            <Grid item xs={4}>

              <Box sx={{ padding: '10px' }}>
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="id"
                  defaultValue={inscriptions.id}
                  variant="standard"
                />
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="DNI"
                  defaultValue={inscriptions.student.dni}
                  variant="standard"
                />
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="nombres"
                  defaultValue={`${inscriptions.student.name} ${inscriptions.student.lastName}`}
                  variant="standard"
                />
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="Cuota Mensual"
                  defaultValue={`${inscriptions.price.month}`}
                  variant="standard"
                />
              </Box>


            </Grid>
            <Grid item xs={8}>
              <form onSubmit={sendSubmit}>
                <DialogContent sx={{ display: 'flex' }}>
                  <Grid container>
                    <Grid item xs={12} sx={{ padding: '5px' }}>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Forumulario</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          value={valueradio}
                          onChange={handleChange}
                          name="payMethod"

                        >
                          <FormControlLabel value="CASH" control={<Radio />} label={<AttachMoneyIcon />} />
                          <FormControlLabel value="QR" control={<Radio />} label={<QrCodeIcon />} />
                          <FormControlLabel value="BANK" control={<Radio />} label={<AccountBalanceIcon />} />
                        </RadioGroup>
                      </FormControl>
                      {/* <ComponentInput
                  type="text"
                  label="payMethod"
                  name="payMethod"
                  value={payMethod}
                  onChange={onInputChange}
                  error={!!payMethodValid && formSubmitted}
                  helperText={formSubmitted ? payMethodValid : ''}
                /> */}
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                      <ComponentInput
                        type="text"
                        label="Recibe de:"
                        name="buyerName"
                        value={buyerName}
                        onChange={onInputChange}
                        error={!!buyerNameValid && formSubmitted}
                        helperText={formSubmitted ? buyerNameValid : ''}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                      <ComponentInput
                        type="text"
                        label="NIT"
                        name="buyerNIT"
                        value={buyerNIT}
                        onChange={onInputChange}
                        error={!!buyerNITValid && formSubmitted}
                        helperText={formSubmitted ? buyerNITValid : ''}
                      />
                    </Grid>
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

                    {valueradio !== 'CASH' && <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                      <ComponentInput
                        type="text"
                        label="# transaccion"
                        name="transactionNumber"
                        value={transactionNumber}
                        onChange={onInputChange}
                        error={!!transactionNumberValid && formSubmitted}
                        helperText={formSubmitted ? transactionNumberValid : ''}
                      />
                    </Grid>}
                    <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>

                      <ComponentDate
                        onlyDate
                        date={commitmentDate}
                        title="commitmentDate"
                        onChange={(event) => onValueChange('commitmentDate', event)}
                        error={!!commitmentDateValid && formSubmitted}
                        helperText={formSubmitted ? commitmentDateValid : ''}
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

            </Grid>
          </>)}
        </Grid>

      </Dialog>
    </>
  );
};
