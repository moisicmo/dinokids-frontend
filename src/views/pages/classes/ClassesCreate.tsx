import { ComponentDate, ComponentInput, ComponentSelect, ModalSelectComponent } from '@/components';
import { useClasseStore, useForm } from '@/hooks';
import { FormClasseModel, FormClasseValidations, ClasseModel } from '@/models';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { RoomTable } from '../room';
import { TeacherTable } from '../teacher';
import { ModuleTable } from '../module';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: ClasseModel | null;
}

const formFields: FormClasseModel = {
  name: '',
  start: null,
  end: null,
  room: null,
  teacher: null,
  module: null,
};

const formValidations: FormClasseValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  start: [(value) => value != null, 'Debe ingresar la fecha de inicio'],
  end: [(value) => value != null, 'Debe ingresar la fecha fin'],
  room: [(value) => value != null, 'Debe ingresar la materia'],
  teacher: [(value) => value != null, 'Debe ingresar la materia'],
  module: [(value) => value != null, 'Debe ingresar la materia'],
  inscription: [(value) => value != 0, 'Debe ingresar el nombre'],
  month: [(value) => value != 0, 'Debe ingresar el nombre'],
};

export const ClassesCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const { createClasse, updateClasse } = useClasseStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    name,
    start,
    end,
    room,
    teacher,
    module,
    inscription,
    month,
    onInputChange,
    isFormValid,
    onValueChange,
    onResetForm,
    nameValid,
    startValid,
    endValid,
    roomValid,
    teacherValid,
    moduleValid,
    inscriptionValid,
    monthValid,
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createClasse({
        name: name.trim(),
        start: start,
        end: end,
        roomId: room.id,
        teacherId: teacher.id,
        moduleId: module.id,
        inscription: parseInt(inscription),
        month: parseInt(month),
      });
    } else {
      await updateClasse(item.id, {
        name: name.trim(),
        start: start,
        end: end,
        roomId: room.id,
        teacherId: teacher.id,
        moduleId: module.id,
        inscription: parseInt(inscription),
        month: parseInt(month),
      });
    }
    handleClose();
    onResetForm();
  };
  //modal room
  const [modalRoom, setModalRoom] = useState(false);
  const handleModalRoom = useCallback((value: boolean) => {
    setModalRoom(value);
  }, []);
  //modal teacher
  const [modalTeacher, setModalTeacher] = useState(false);
  const handleModalTeacher = useCallback((value: boolean) => {
    setModalTeacher(value);
  }, []);
  //modal module
  const [modalModule, setModalModule] = useState(false);
  const handleModalModule = useCallback((value: boolean) => {
    setModalModule(value);
  }, []);
  return (
    <>
      {/* modal room */}
      {modalRoom && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title="Aulas:"
          opendrawer={modalRoom}
          handleDrawer={handleModalRoom}
        >
          <RoomTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (room == null || room.id != v.id) {
                onValueChange('room', v);
                handleModalRoom(false);
              }
            }}
            items={room == null ? [] : [room.id]}
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
      {/* modal module */}
      {modalModule && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title="Modulos:"
          opendrawer={modalModule}
          handleDrawer={handleModalModule}
        >
          <ModuleTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (module == null || module.id != v.id) {
                onValueChange('module', v);
                handleModalModule(false);
              }
            }}
            items={module == null ? [] : [module.id]}
          />
        </ModalSelectComponent>
      )}
      <Dialog open={open} onClose={handleClose} style={{ zIndex: 9998 }}>
        <DialogTitle>{item == null ? 'Nueva Clase' : `${item.name}`}</DialogTitle>
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
                <ComponentDate
                  date={start}
                  title="Inicio"
                  onChange={(event) => onValueChange('start', event)}
                  error={!!startValid && formSubmitted}
                  helperText={formSubmitted ? startValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentDate
                  date={end}
                  title="Fin"
                  onChange={(event) => onValueChange('end', event)}
                  error={!!endValid && formSubmitted}
                  helperText={formSubmitted ? endValid : ''}
                />
              </Grid>

              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={room != null ? 'Aula' : ''}
                  title={room != null ? room.name : 'Aula'}
                  onPressed={() => handleModalRoom(true)}
                  error={!!roomValid && formSubmitted}
                  helperText={formSubmitted ? roomValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={teacher != null ? 'Profesor' : ''}
                  title={teacher != null ? teacher.name : 'Profesor'}
                  onPressed={() => handleModalTeacher(true)}
                  error={!!teacherValid && formSubmitted}
                  helperText={formSubmitted ? teacherValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={module != null ? 'Modulo' : ''}
                  title={module != null ? module.name : 'module'}
                  onPressed={() => handleModalModule(true)}
                  error={!!moduleValid && formSubmitted}
                  helperText={formSubmitted ? moduleValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Precio Inscripción"
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
                  label="Precio Mensualidad"
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
