import {
  ComponentInput,
  ComponentSelect,
  ModalSelectComponent,
} from '@/components';
import { useForm, useInscriptionStore } from '@/hooks';
import {
  FormInscriptionModel,
  FormInscriptionValidations,
  InscriptionModel,
} from '@/models';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { StudentTable } from '../student';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: InscriptionModel | null;
}

const formFields: FormInscriptionModel = {
  amountDelivered: 0,
  student: null,
};

const formValidations: FormInscriptionValidations = {
  amountDelivered: [(value) => value != 0, 'Debe ingresar el monto recibido'],
  student: [(value) => value != null, 'Debe ingresar el estudiante'],
};

export const InscriptionCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {
    amountDelivered,
    student,
    onInputChange,
    isFormValid,
    onValueChange,
    onResetForm,
    amountDeliveredValid,
    studentValid,
  } = useForm(item ?? formFields, formValidations);
  const { createInscription, updateInscription } = useInscriptionStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createInscription({
        amountDelivered: parseFloat(amountDelivered.trim()),
        studentId: student.id,
      });
    } else {
      await updateInscription(item.id, {
        amountDelivered: parseFloat(amountDelivered.trim()),
        studentId: student.id,
      });
    }
    handleClose();
    onResetForm();
  };
  const [modalStudent, setModalStudent] = useState(false);
  const handleModalStudent = useCallback((value: boolean) => {
    setModalStudent(value);
  }, []);


  return (
    <>
      {modalStudent && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title="Estudiantes:"
          opendrawer={modalStudent}
          handleDrawer={handleModalStudent}
        >
          <StudentTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (student == null || student.id != v.id) {
                onValueChange('student', v);
                handleModalStudent(false);
              }
            }}
            items={student == null ? [] : [student.id]}
          />
        </ModalSelectComponent>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {item == null ? 'Nueva Inscripción' : `${item.student.name}`}
        </DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Monto recibido"
                  name="amountDelivered"
                  value={amountDelivered}
                  onChange={onInputChange}
                  error={!!amountDeliveredValid && formSubmitted}
                  helperText={formSubmitted ? amountDeliveredValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={student != null ? 'Estudiante' : ''}
                  title={student != null ? student.name : 'Estudiante'}
                  onPressed={() => handleModalStudent(true)}
                  error={!!studentValid && formSubmitted}
                  helperText={formSubmitted ? studentValid : ''}
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
