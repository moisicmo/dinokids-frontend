import { ComponentInput } from '@/components';
import { useForm } from '@/hooks';
import { FormPriceModel, FormPriceValidations, InscriptionModel, InscriptionRequired, RoomModel } from '@/models';
import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import esES from 'date-fns/locale/es';
import { format } from "date-fns";

interface createProps {
  item: InscriptionModel | null;
  dataInscription: InscriptionRequired;
  submitForm: (data: InscriptionRequired) => void;
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
      ...dataInscription,
      inscription: parseInt(inscription),
      month: parseInt(month),
    });
    // onResetForm();
  };
  const calculateAge = (birthdate: Date) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Si no ha cumplido años aún este año, restamos uno
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div>
      <Typography>{`Estudiante : ${dataInscription.student!.name} ${dataInscription.student!.lastName}`}</Typography>
      <Typography>{`Edad: ${calculateAge(dataInscription.student!.birthdate)} años`}</Typography>
      <Typography>{`Tutor(es):`}</Typography>
      {dataInscription.student!.tutors.map((tutor: any) => {
        return <li key={tutor.id}>{`${tutor.name} ${tutor.lastName}`}</li>
      })}

      <Typography>{`Aluas:`}</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Especialidad</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Profesor</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Horario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataInscription.rooms.map((room: RoomModel) => (
              <TableRow key={room.id}>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.specialty.name}</TableCell>
                <TableCell>{room.teacher.name}</TableCell>
                <TableCell>
                  <ul>
                    {room.eventSelects.map((item: any) => (
                      <li key={item.id}>{`${item.day} ${format(new Date(item.start), 'HH:mm', { locale: esES })} - ${format(new Date(item.end), 'HH:mm', { locale: esES })}`}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
