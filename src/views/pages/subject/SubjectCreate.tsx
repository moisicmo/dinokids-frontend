import { ComponentInput } from '@/components';
import { useForm, useSubjectStore } from '@/hooks';
import {
  SubjectModel,
  FormSubjectModel,
  FormSubjectValidations,
} from '@/models';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { FormEvent, useState } from 'react';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: SubjectModel | null;
}

const formFields: FormSubjectModel = {
  name: '',
  code: '',
  semester: 0,
};

const formValidations: FormSubjectValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  code: [(value) => value.length >= 1, 'Debe ingresar el código'],
  semester: [(value) => value != 0, 'Debe ingresar el nombre'],
};

export const SubjectCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const { createSubject, updateSubject } = useSubjectStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    name,
    code,
    semester,
    onInputChange,
    isFormValid,
    onResetForm,
    nameValid,
    codeValid,
    semesterValid,
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createSubject({
        name: name.trim(),
        code: code.trim(),
        semester: parseInt(semester.trim()),
      });
    } else {
      await updateSubject(item.id, {
        name: name.trim(),
        code: code.trim(),
        semester: parseInt(semester.trim()),
      });
    }
    handleClose();
    onResetForm();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} style={{ zIndex: 9998 }}>
        <DialogTitle>
          {item == null ? 'Nueva Materia' : `${item.name}`}
        </DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={9} sx={{ padding: '5px' }}>
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
              <Grid item xs={12} sm={3} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Semestre"
                  name="semester"
                  value={semester}
                  onChange={onInputChange}
                  error={!!semesterValid && formSubmitted}
                  helperText={formSubmitted ? semesterValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Código"
                  name="code"
                  value={code}
                  onChange={onInputChange}
                  error={!!codeValid && formSubmitted}
                  helperText={formSubmitted ? codeValid : ''}
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
