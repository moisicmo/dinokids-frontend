import {
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
} from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { StudentTable } from '../student';
import { BranchTable } from '../branch';
import { SubjectTable } from '../subject';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: InscriptionModel | null;
}

const formFields: FormInscriptionModel = {
  student: null,
  branch: null,
  subject: null,
};

const formValidations: FormInscriptionValidations = {
  student: [(value) => value != null, 'Debe ingresar el estudiante'],
  branch: [(value) => value != null, 'Debe ingresar la sucursal'],
  subject: [(value) => value != null, 'Debe ingresar la materia'],
};

export const InscriptionCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {
    student,
    branch,
    subject,
    isFormValid,
    onValueChange,
    onResetForm,
    studentValid,
    branchValid,
    subjectValid,
  } = useForm(item ?? formFields, formValidations);
  const { createInscription, updateInscription } = useInscriptionStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createInscription({
        studentId: student.id,
        branchId: branch.id,
        subjectId: subject.id,
      });
    } else {
      await updateInscription(item.id, {
        studentId: student.id,
        branchId: branch.id,
        subjectId: subject.id,
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
  const [modalBranch, setModalBranch] = useState(false);
  const handleModalBranch = useCallback((value: boolean) => {
    setModalBranch(value);
  }, []);

  //modal subject
  const [modalSubject, setModalSubject] = useState(false);
  const handleModalSubject = useCallback((value: boolean) => {
    setModalSubject(value);
  }, []);


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
      {modalBranch && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title="Sucursales:"
          opendrawer={modalBranch}
          handleDrawer={handleModalBranch}
        >
          <BranchTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (branch == null || branch.id != v.id) {
                onValueChange('branch', v);
                handleModalBranch(false);
              }
            }}
            items={branch == null ? [] : [branch.id]}
          />
        </ModalSelectComponent>
      )}
      {/* modal subject */}
      {modalSubject && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title="Materias:"
          opendrawer={modalSubject}
          handleDrawer={handleModalSubject}
        >
          <SubjectTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (subject == null || subject.id != v.id) {
                onValueChange('subject', v);
                handleModalSubject(false);
              }
            }}
            items={subject == null ? [] : [subject.id]}
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
                <ComponentSelect
                  label={student != null ? 'Estudiante' : ''}
                  title={student != null ? student.name : 'Estudiante'}
                  onPressed={() => handleModalStudent(true)}
                  error={!!studentValid && formSubmitted}
                  helperText={formSubmitted ? studentValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={branch != null ? 'Sucursal' : ''}
                  title={branch != null ? branch.name : 'Sucursal'}
                  onPressed={() => handleModalBranch(true)}
                  error={!!branchValid && formSubmitted}
                  helperText={formSubmitted ? branchValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={subject != null ? 'Materia' : ''}
                  title={subject != null ? subject.name : 'Materia'}
                  onPressed={() => handleModalSubject(true)}
                  error={!!subjectValid && formSubmitted}
                  helperText={formSubmitted ? subjectValid : ''}
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
