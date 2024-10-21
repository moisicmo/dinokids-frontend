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
  TextField,
  Box,
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

const formFields: FormMonthlyFeeModelInscription = {
  inscriptionId:null,
  amount: 0,
  payMethod:'CASH',
  transactionNumber:'',
  buyerName:'',
  buyerNIT:'',
};

const formValidations: FormMonthlyFeeValidationsInscription = {
  inscriptions: [(value) => value != null, 'Debe ingresar el Id de inscripcion'],
  amount: [(value) => value != null, 'Debe ingresar el monto'],
  payMethod: [(value) => value.length >= 1, 'Debe ingresar el methodo de pafo'],
  buyerName: [(value) => value.length >= 1, 'Debe ingresar el nombre a facturar'],
  buyerNIT: [(value) => value.length >= 1, 'Debe ingresar el NIT del cliente'],


};

export const MonthlyFeeCreateInscription = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {
    inscriptions,
    amount,
    buyerName,
    buyerNIT,
    transactionNumber,
    onInputChange,
    isFormValid,
    onValueChange,
    onResetForm,
    inscriptionsValid,
    amountValid,
    buyerNameValid,
    buyerNITValid,
    transactionNumberValid,
  } = useForm(item ?? formFields, formValidations);
  const { createMonthlyFeeInscription, updateMonthlyFee } = useMonthlyFeeStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [valueradio, setValueradio] = useState('CASH');

  const handleChange:any = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueradio((event.target as HTMLInputElement).value);
  };

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // console.log("//////// SEND SUBMIT INSCRIPTIONS MONTHLY")
    // console.log({ inscriptionsId: inscriptions.id,
    //   amount: parseInt(amount),
    //   payMethod: valueradio,
    //   transactionNumber: valueradio =='CASH'? transactionCashNumber : transactionNumber.trim(),})
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createMonthlyFeeInscription({
        inscriptionsId: inscriptions.id,
        amount: parseInt(amount),
        payMethod: valueradio,
        transactionNumber: valueradio =='CASH'? transactionCashNumber : transactionNumber.trim(),
        buyerNIT: buyerNIT.trim(),
        buyerName: buyerName.trim(),
      });
    } else {
      await updateMonthlyFee(item.id, {
        inscriptionsId: inscriptions.id,
        amount: amount.trim(),
        payMethod: valueradio,
        transactionNumber: valueradio =='CASH'? transactionCashNumber : transactionNumber.trim(),
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
          title="Inscripciones:"
          opendrawer={modalInscriptions}
          handleDrawer={handleModalInscriptions}
        >
          <InscriptionTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(inscription: InscriptionModel) => {
              if (inscriptions == null || inscriptions.id != inscription.id) {
                onValueChange('inscriptions', inscription);
                handleModalInscriptions(false);
              }
            }}
            items={inscriptions == null ? [] : [inscriptions.id]}
          />
        </ModalSelectComponent>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {item == null ? 'Pago Inscripción' : `${item.id}`}
        </DialogTitle>
        <Grid container spacing={2}>
        <Grid item xs={12}  sx={{ padding: '5px', margin:'10px' }}>
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
          
            <Box sx={{padding:'10px'}}>
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
                label="inscripción"
                defaultValue={`${inscriptions.price.inscription}`}
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
                  label="Monto"
                  name="amount"
                  value={amount}
                  onChange={onInputChange}
                  error={!!amountValid && formSubmitted}
                  helperText={formSubmitted ? amountValid : ''}
                />
              </Grid>
              {valueradio !== 'CASH'&&  <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
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
        </>)   }
        </Grid>
        
      </Dialog>
    </>
  );
};
