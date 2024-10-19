import { ComponentInput } from '@/components';
import { useForm } from '@/hooks';
import { FormPriceModel, FormPriceValidations, InscriptionModel } from '@/models';
import { Box, Button, Grid, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';

interface createProps {
  item: InscriptionModel | null;
  dataInscription: any;
  submitForm: (data: Object) => void;
  changeStep: (step: number) => void;
}
const formFields: FormPriceModel = {
  inscription: 0,
  month: 0,
};

const formValidations: FormPriceValidations = {
  inscription: [(value) => value > 0, 'Debe agregar un monto a la inscripción'],
  month: [(value) => value > 0, 'Debe agregar un monto para la mensualidad'],
};

export const StepSummary = (props: createProps) => {
  const { dataInscription, item, submitForm, changeStep } = props;
  const { inscription, month, isFormValid, onInputChange, inscriptionValid, monthValid } = useForm(
    item ?? formFields,
    formValidations
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    submitForm({
      inscription: parseInt(inscription),
      month: parseInt(month),
    });
    // onResetForm();
  };

  return (
    <div>
      <Typography>{`Estudiante : ${dataInscription.student.name} ${dataInscription.student.lastName}`}</Typography>
      {dataInscription.student.tutors.map((tutor: any) => {
        return <Typography key={tutor.id}>{`Tutor : ${tutor.name} ${tutor.lastName}`}</Typography>
      })}
      <form onSubmit={sendSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Inscripción Acordada"
              name="inscription"
              value={inscription}
              onChange={onInputChange}
              error={!!inscriptionValid && formSubmitted}
              helperText={formSubmitted ? inscriptionValid : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Mensualidad Acordada"
              name="month"
              value={month}
              onChange={onInputChange}
              error={!!monthValid && formSubmitted}
              helperText={formSubmitted ? monthValid : ''}
            />
          </Grid>
        </Grid>
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
            {'Terminar'}
          </Button>
          <Button onClick={() => changeStep(-1)} sx={{ mt: 1, mr: 1 }}>
            Atrás
          </Button>
        </Box>
      </form>
    </div>
  );
};
