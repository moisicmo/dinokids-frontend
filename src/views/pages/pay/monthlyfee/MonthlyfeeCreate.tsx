import {
  ComponentSelect,
  ModalSelectComponent,
} from '@/components';
import { useForm, useMonthlyFeeStore } from '@/hooks';
import {
  FormMonthlyFeeModel,
  FormMonthlyFeeValidations,
  MonthlyFeeModel,
} from '@/models';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { StudentTable } from '../../student';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: MonthlyFeeModel | null;
}

const formFields: FormMonthlyFeeModel = {
  student: null,
  price: null,
};

const formValidations: FormMonthlyFeeValidations = {
  student: [(value) => value != null, 'Debe ingresar el estudiante'],
  price: [(value) => value != null, 'Debe ingresar pricio de la clase asignada'],
};

export const MonthlyFeeCreate = (props: createProps) => {
  const { open, handleClose, item } = props;

  const {
    student,
    price,
    isFormValid,
    onValueChange,
    onResetForm,
    studentValid,
    priceValid,
  } = useForm(item ?? formFields, formValidations);

  const { createMonthlyFee, updateMonthlyFee } = useMonthlyFeeStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createMonthlyFee({
        studentId: student.id,
        priceId: price.id,
      });
    } else {
      await updateMonthlyFee(item.id, {
        studentId: student.id,
        priceId: price.id,
      });
    }
    handleClose();
    onResetForm();
  };

  //modal student
  const [modalStudent, setModalStudent] = useState(false);
  const handleModalStudent = useCallback((value: boolean) => {
    setModalStudent(value);
  }, []);

  //modal branch


  //modal subject



  return (
    <>
      {/* modal student */}
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
      {/* modal branch */}
      
      {/* modal subject */}
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {item == null ? 'Nueva Inscripción' : `${item.student.name}`}
        </DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
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
