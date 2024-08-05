import { ComponentDate, ComponentInput, ComponentSelect, ComponentSelectPicker, ModalSelectComponent } from '@/components';
import { useForm, useStudentStore } from '@/hooks';
import {
  EducationLevel,
  FormStudentModel,
  FormStudentValidations,
  Gender,
  StudentModel,
  TutorModel,
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
import { TutorTable } from '../tutor';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: StudentModel | null;
}

const formFields: FormStudentModel = {
  code: '',
  dni: '',
  name: '',
  lastName: '',
  email: '',
  birthdate: null,
  gender: null,
  school: '',
  grade: 0,
  educationLevel: null,
  tutors: [],
};

const formValidations: FormStudentValidations = {
  dni: [(value) => value.length >= 1, 'Debe número de carnet'],
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  lastName: [(value) => value.length >= 1, 'Debe ingresar el apellido'],
  email: [(value) => value.length >= 1, 'Debe ingresar el correo'],
  birthdate: [(value) => value != null, 'Debe agregar la fecha de nacimiento'],
  gender: [(value) => value != null, 'Debe agregar el genero'],
  school: [(value) => value != null, 'Debe agregar el nombre del colegio'],
  grade: [(value) => value != null, 'Debe agregar el grado'],
  educationLevel: [(value) => value != null, 'Debe agregar el nivel de educación'],
  tutors: [(value: TutorModel[]) => value.length >= 1, 'Debe ingresar un tutor'],
};

export const StudentCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {
    dni,
    name,
    lastName,
    email,
    birthdate,
    gender,
    school,
    grade,
    educationLevel,
    tutors,
    onInputChange,
    isFormValid,
    onValueChange,
    onResetForm,
    dniValid,
    nameValid,
    lastNameValid,
    emailValid,
    birthdateValid,
    genderValid,
    schoolValid,
    gradeValid,
    educationLevelValid,
    tutorsValid,
  } = useForm(item ?? formFields, formValidations);
  const { createStudent, updateStudent } = useStudentStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createStudent({
        dni: dni.trim(),
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        birthdate: birthdate,
        gender:gender,
        school:school.trim(),
        grade:parseInt(grade),
        educationLevel: educationLevel,
        tutors: tutors.map((e: TutorModel) => e.id),
      });
    } else {
      await updateStudent(item.id, {
        dni: dni.trim(),
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        birthdate: birthdate,
        gender:gender,
        school:school.trim(),
        grade:parseInt(grade),
        educationLevel: educationLevel,
        tutors: tutors.map((e: TutorModel) => e.id),
      });
    }
    handleClose();
    onResetForm();
  };
  // 
  const [modal, setModal] = useState(false);
  const handleModal = useCallback((value: boolean) => {
    setModal(value);
  }, []);

  // Obtener el key correspondiente gender
  const genderKey = gender
    ? Object.keys(Gender).find((key) => Gender[key as keyof typeof Gender] === gender)
    : '';
  const genderOptions = Object.entries(Gender).map(([key]) => ({
    id: key,
    name: key,
  }));

  // Obtener el key correspondiente education level
  const educationLevelKey = educationLevel
    ? Object.keys(EducationLevel).find((key) => EducationLevel[key as keyof typeof EducationLevel] === educationLevel)
    : '';
  const educationLevelOptions = Object.entries(EducationLevel).map(([key]) => ({
    id: key,
    name: key,
  }));
  return (
    <>
      {
        modal &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={true}
          title='tutores:'
          opendrawer={modal}
          handleDrawer={handleModal}
        >
          <TutorTable
            stateSelect={true}
            itemSelect={(v) => {
              if (tutors.map((e: TutorModel) => e.id).includes(v.id)) {
                onValueChange('tutors', [...tutors.filter((e: TutorModel) => e.id != v.id)])
              } else {
                onValueChange('tutors', [...tutors, v])
              }
            }}
            items={tutors.map((e: TutorModel) => (e.id))}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} style={{ zIndex: 9998 }}>
        <DialogTitle>
          {item == null ? 'Nuevo Estudiante' : `${item.name}`}
        </DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={tutors != null ? '' : 'Tutores'}
                  title={'Tutores'}
                  onPressed={() => handleModal(true)}
                  error={!!tutorsValid && formSubmitted}
                  helperText={formSubmitted ? tutorsValid : ''}
                  items={tutors.map((e: TutorModel) => ({ id: e.id, name: e.name }))}
                />
              </Grid>
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
                  label="Apellido"
                  name="lastName"
                  value={lastName}
                  onChange={onInputChange}
                  error={!!lastNameValid && formSubmitted}
                  helperText={formSubmitted ? lastNameValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentDate
                  onlyDate
                  date={birthdateValid}
                  title="Fecha de nacimiento"
                  onChange={(event) => onValueChange('birthdate', event)}
                  error={!!birthdateValid && formSubmitted}
                  helperText={formSubmitted ? birthdateValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Número de carnet"
                  name="dni"
                  value={dni}
                  onChange={onInputChange}
                  error={!!dniValid && formSubmitted}
                  helperText={formSubmitted ? dniValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Correo"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  error={!!emailValid && formSubmitted}
                  helperText={formSubmitted ? emailValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelectPicker
                  label={'Género'}
                  value={genderKey}
                  handleSelect={(value: keyof typeof Gender) =>
                    onValueChange('gender', Gender[value])
                  }
                  options={genderOptions}
                  error={!!genderValid && formSubmitted}
                  helperText={formSubmitted ? genderValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={5} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Colegio"
                  name="school"
                  value={school}
                  onChange={onInputChange}
                  error={!!schoolValid && formSubmitted}
                  helperText={formSubmitted ? schoolValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={2} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Grado"
                  name="grade"
                  value={grade}
                  onChange={onInputChange}
                  error={!!gradeValid && formSubmitted}
                  helperText={formSubmitted ? gradeValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={5} sx={{ padding: '5px' }}>
                <ComponentSelectPicker
                  label={'Nível de educación'}
                  value={educationLevelKey}
                  handleSelect={(value: keyof typeof EducationLevel) =>
                    onValueChange('educationLevel', EducationLevel[value])
                  }
                  options={educationLevelOptions}
                  error={!!educationLevelValid && formSubmitted}
                  helperText={formSubmitted ? educationLevelValid : ''}
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
