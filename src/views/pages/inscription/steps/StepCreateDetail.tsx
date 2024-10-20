import { ComponentSelect, ModalSelectComponent } from '@/components';
import { useForm } from '@/hooks';
import { FormInscriptionModel, FormInscriptionValidations, InscriptionModel, InscriptionRequired, RoomModel } from '@/models';
import { Box, Button, Grid } from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { StudentTable } from '../../student';
import { BranchTable } from '../../branch';
import { SpecialtyTable } from '../../specialty';

interface createProps {
  item: InscriptionModel | null;
  submitForm: (data: InscriptionRequired) => void;
}

const formFields: FormInscriptionModel = {
  student: null,
  branch: null,
  rooms: [],
};

const formValidations: FormInscriptionValidations = {
  student: [(value) => value != null, 'Debe ingresar el estudiante'],
  branch: [(value) => value != null, 'Debe ingresar la sucursal'],
  rooms: [(value) => value.length > 0, 'Debe ingresar almenos un aula'],
};

export const StepCreateDetail = (props: createProps) => {
  const { item, submitForm } = props;
  const {
    student,
    branch,
    rooms,
    isFormValid,
    onValueChange,
    studentValid,
    branchValid,
    roomsValid,
  } = useForm(item ?? formFields, formValidations);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    submitForm({ student, branch, rooms, inscription: 0, month: 0 });
    // onResetForm();
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
            itemSelect={(room) => {
              if (rooms.map((e: RoomModel) => e.id).includes(room.id)) {
                onValueChange('rooms', [
                  ...rooms.filter((e: RoomModel) => e.id != room.id),
                ]);
              } else {
                onValueChange('rooms', [...rooms, { ...room, eventSelects: [] }]);
              }
            }}
            items={rooms.map((e: RoomModel) => e.id)}
            branchId={branch.id}
            isRoomSelect
          />
        </ModalSelectComponent>
      )}
      <form onSubmit={sendSubmit}>
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
        </Grid>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 1, mr: 1 }}
          >
            {'Continuar'}
          </Button>
        </Box>
      </form>
    </>
  )
}
