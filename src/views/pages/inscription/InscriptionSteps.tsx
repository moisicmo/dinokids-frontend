import { InscriptionModel, InscriptionRequired } from '@/models';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { StepCreateDetail, StepSummary } from '.';
import { useInscriptionStore } from '@/hooks';
import { StepAsignSchedule } from './steps/StepAsignSchedule';
// import { SlotInfo } from 'react-big-calendar';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: InscriptionModel | null;
}

const steps = ['Creación de la inscripción', 'Asignación del estudiante', 'Resumen'];

export const InscriptionCreate = (props: createProps) => {
  const { open, handleClose, item } = props;

  const [activeStep, setActiveStep] = useState(0);
  const [dataInscription, setDataInscription] = useState<InscriptionRequired | null>();
  const { createInscription, updateInscription } = useInscriptionStore();

  const changeStep = (step: number) => {
    setActiveStep((prevActiveStep) => prevActiveStep + step);
  };

  const renderContent = (index: number) => {
    switch (index) {
      case 0:
        return (
          <StepCreateDetail
            item={props.item}
            submitForm={(data: InscriptionRequired) => {
              console.log(data);
              setDataInscription(data);
              changeStep(1);
            }}
          />
        );
      case 1:
        return (
          <StepAsignSchedule
            item={props.item}
            dataInscription={dataInscription!}
            submitForm={(data: InscriptionRequired) => {
              console.log(data);
              setDataInscription(data);
              changeStep(1);
            }}
            changeStep={(step)=>changeStep(step)}
            // eventSelects={eventSelects}
            // onSelect={handleSelectEvent}
          />
        );
      case 2:
        return (
          <StepSummary
            item={props.item}
            dataInscription={dataInscription!}
            submitForm={(data: InscriptionRequired) => {
              setDataInscription(data);
              submitInscription(data);
            }}
            changeStep={(step)=>changeStep(step)}
          />
        );
      default:
        return <Typography>Este es el paso predeterminado</Typography>;
    }
  };

  const submitInscription = async (data:InscriptionRequired) => {
    if (item == null) {
      await createInscription({ ...data });
      handleClose();
    } else {
      await updateInscription(item.id, { ...data });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
      <DialogTitle>{item == null ? 'Nueva Inscripción' : `${item.student.name}`}</DialogTitle>
      <DialogContent >
        <Stepper activeStep={activeStep} orientation="vertical" >
          {steps.map((step, index) => (
            <Step key={`step ${index}`}>
              <StepLabel>{step}</StepLabel>
              <StepContent >
                {renderContent(index)}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </DialogContent>
    </Dialog>
  );
};
