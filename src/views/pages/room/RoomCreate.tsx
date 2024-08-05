import {
  ComponentInput,
  ComponentSelect,
  ModalSelectComponent,
  RangeComponent,
} from '@/components';
import { useForm, useRoomStore } from '@/hooks';
import { FormRoomModel, FormRoomValidations, RoomModel } from '@/models';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { BranchTable } from '../branch';
import { TeacherTable } from '../teacher';
import { SpecialtyTable } from '../specialty';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: RoomModel | null;
}

const formFields: FormRoomModel = {
  name: '',
  capacity: 0,
  rangeYears: [5, 5],
  branch: null,
  teacher: null,
  specialty: null
};

const formValidations: FormRoomValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  capacity: [(value) => value != 0, 'Debe ingresar la capacidad'],
  branch: [(value) => value != null, 'Debe ingresar la sucursal'],
  teacher: [(value) => value != null, 'Debe ingresar al docente'],
  specialty: [(value) => value != null, 'Debe ingresar la especialidad'],
};

export const RoomCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const { createRoom, updateRoom } = useRoomStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    name,
    capacity,
    rangeYears,
    branch,
    teacher,
    specialty,
    onInputChange,
    isFormValid,
    onValueChange,
    onResetForm,
    nameValid,
    capacityValid,
    rangeYearsValid,
    branchValid,
    teacherValid,
    specialtyValid,
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createRoom({
        name: name.trim(),
        capacity: parseInt(capacity),
        rangeYears: rangeYears,
        branchId: branch.id,
        teacherId: teacher.id,
        specialtyId: specialty.id,
      });
    } else {
      await updateRoom(item.id, {
        name: name.trim(),
        capacity: parseInt(capacity),
        rangeYears: rangeYears,
        branchId: branch.id,
        teacherId: teacher.id,
        specialtyId: specialty.id,
      });
    }
    handleClose();
    onResetForm();
  };
  //modal branch
  const [modalBranch, setModalBranch] = useState(false);
  const handleModalBranch = useCallback((value: boolean) => {
    setModalBranch(value);
  }, []);

  // modal teacher
  const [modalTeacher, setModalTeacher] = useState(false);
  const handleModalTeacher = useCallback((value: boolean) => {
    setModalTeacher(value);
  }, []);

  // modal specialty
  const [modalSpecialty, setModalSpecialty] = useState(false);
  const handleModalSpecialty = useCallback((value: boolean) => {
    setModalSpecialty(value);
  }, []);

  return (
    <>
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

      {/* modal teacher */}
      {modalTeacher && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title="Profesores:"
          opendrawer={modalTeacher}
          handleDrawer={handleModalTeacher}
        >
          <TeacherTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (teacher == null || teacher.id != v.id) {
                onValueChange('teacher', v);
                handleModalTeacher(false);
              }
            }}
            items={teacher == null ? [] : [teacher.id]}
          />
        </ModalSelectComponent>
      )}

      {/* modal specialty */}
      {modalSpecialty && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title="Especialidades:"
          opendrawer={modalSpecialty}
          handleDrawer={handleModalSpecialty}
        >
          <SpecialtyTable
            limitInit={5}
            itemSelect={(v) => {
              if (specialty == null || specialty.id != v.id) {
                onValueChange('specialty', v);
                handleModalSpecialty(false);
              }
            }}
            items={specialty == null ? [] : [specialty.id]}
            branchId={branch.id}
            isRoomSelect ={false}
          />
        </ModalSelectComponent>
      )}
      <Dialog open={open} onClose={handleClose} style={{ zIndex: 9998 }}>
        <DialogTitle>{item == null ? 'Nueva Aula' : `${item.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Nombre"
                  name="name"
                  value={name}
                  onChange={onInputChange}
                  error={!!nameValid && formSubmitted}
                  helperText={formSubmitted ? nameValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Capacidad"
                  name="capacity"
                  value={capacity}
                  onChange={onInputChange}
                  error={!!capacityValid && formSubmitted}
                  helperText={formSubmitted ? capacityValid : ''}
                />
              </Grid>

              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={teacher != null ? 'Profesor' : ''}
                  title={teacher != null ? teacher.name : 'Profesor'}
                  onPressed={() => handleModalTeacher(true)}
                  error={!!teacherValid && formSubmitted}
                  helperText={formSubmitted ? teacherValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={branch != null ? 'Sucursal' : ''}
                  title={branch != null ? branch.name : 'Sucursal'}
                  onPressed={() => handleModalBranch(true)}
                  error={!!branchValid && formSubmitted}
                  helperText={formSubmitted ? branchValid : ''}
                />
              </Grid>
              {branch && <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={specialty != null ? 'Especialidad' : ''}
                  title={specialty != null ? specialty.name : 'Especialidad'}
                  onPressed={() => handleModalSpecialty(true)}
                  error={!!specialtyValid && formSubmitted}
                  helperText={formSubmitted ? specialtyValid : ''}
                />
              </Grid>}
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <RangeComponent
                  label="Rango de edad"
                  value={rangeYears}
                  handleSelect={(v) => onValueChange('rangeYears', v)}
                  error={!!rangeYearsValid && formSubmitted}
                  helperText={formSubmitted ? rangeYearsValid : ''}
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
