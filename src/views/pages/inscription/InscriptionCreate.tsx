import { ComponentInput, ComponentSelect, ModalSelectComponent } from '@/components';
import { useForm, useInscriptionStore } from '@/hooks';
import {
  FormInscriptionModel,
  FormInscriptionValidations,
  InscriptionModel,
  RoomModel,
} from '@/models';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { StudentTable } from '../student';
import { BranchTable } from '../branch';
import { SpecialtyTable } from '../specialty';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: InscriptionModel | null;
}

const formFields: FormInscriptionModel = {
  student: null,
  branch: null,
  rooms: [],
  inscription: 0,
  month: 0,
};

const formValidations: FormInscriptionValidations = {
  student: [(value) => value != null, 'Debe ingresar el estudiante'],
  branch: [(value) => value != null, 'Debe ingresar la sucursal'],
  rooms: [(value) => value.length > 0, 'Debe ingresar almenos un aula'],
  inscription: [(value) => value > 0, 'Debe agregar un monto a la inscripción'],
  month: [(value) => value > 0, 'Debe agregar un monto para la mensualidad'],
};

export const InscriptionCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {
    student,
    branch,
    rooms,
    inscription,
    month,
    isFormValid,
    onInputChange,
    onValueChange,
    onResetForm,
    studentValid,
    branchValid,
    roomsValid,
    inscriptionValid,
    monthValid,
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
        rooms: rooms.map((e: RoomModel) => e.id),
        inscription: parseInt(inscription),
        month: parseInt(month),
      });
    } else {
      await updateInscription(item.id, {
        studentId: student.id,
        rooms: rooms.map((e: RoomModel) => e.id),
        inscription: parseInt(inscription),
        month: parseInt(month),
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

  //modal specialty
  const [modalSpecialty, setModalSpecialty] = useState(false);
  const handleModalSpecialty = useCallback((value: boolean) => {
    setModalSpecialty(value);
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
      {/* modal specialty */}
      {modalSpecialty && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={true}
          title="Especialidades:"
          opendrawer={modalSpecialty}
          handleDrawer={handleModalSpecialty}
        >
          <SpecialtyTable
            itemSelect={(v) => {
              console.log(v)
              if (rooms.map((e: RoomModel) => e.id).includes(v.id)) {
                onValueChange('rooms', [
                  ...rooms.filter((e: RoomModel) => e.id != v.id),
                ]);
              } else {
                onValueChange('rooms', [...rooms, v]);
              }
            }}
            items={rooms.map((e: RoomModel) => e.id)}
            branchId={branch.id}
            isRoomSelect
          />
        </ModalSelectComponent>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{item == null ? 'Nueva Inscripción' : `${item.student.name}`}</DialogTitle>
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
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={branch != null ? 'Sucursal' : ''}
                  title={branch != null ? branch.name : 'Sucursal'}
                  onPressed={() => handleModalBranch(true)}
                  error={!!branchValid && formSubmitted}
                  helperText={formSubmitted ? branchValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                {branch != null && (
                  <ComponentSelect
                    label={rooms != null ? '' : 'Aulas - Especialidades'}
                    title={'Aulas - Especialidades'}
                    onPressed={() => handleModalSpecialty(true)}
                    error={!!roomsValid && formSubmitted}
                    helperText={formSubmitted ? roomsValid : ''}
                    items={rooms.map((e: RoomModel) => ({ id: e.id, name: `${e.name} - ${e.specialty.name}` }))}
                    onRemove={(v) =>
                      onValueChange('specialties', [
                        ...rooms.filter((e: RoomModel) => e.id != v),
                      ])
                    }
                  />
                )}
              </Grid>
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
