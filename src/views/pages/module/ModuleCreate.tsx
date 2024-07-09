import { ComponentInput, ComponentSelect, ModalSelectComponent } from '@/components';
import { useForm, useModuleStore } from '@/hooks';
import {
  ModuleModel,
  FormModuleModel,
  FormModuleValidations,
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
import { SubjectTable } from '../subject';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: ModuleModel | null;
}

const formFields: FormModuleModel = {
  name: '',
  subject: null,
};

const formValidations: FormModuleValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  subject: [(value) => value != null, 'Debe ingresar la materia'],
};

export const ModuleCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const { createModule, updateModule } = useModuleStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    name,
    subject,
    onInputChange,
    isFormValid,
    onValueChange,
    onResetForm,
    nameValid,
    subjectValid,
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createModule({
        name: name.trim(),
        subjectId: subject.id
      });
    } else {
      await updateModule(item.id, {
        name: name.trim(),
        subjectId: subject.id
      });
    }
    handleClose();
    onResetForm();
  };
  //modal category
  const [modalCategory, setModalCategory] = useState(false);
  const handleModalCategory = useCallback((value: boolean) => {
    setModalCategory(value);
  }, []);
  return (
    <>
    {/* modal category */}
    {modalCategory && (
      <ModalSelectComponent
        stateSelect={true}
        stateMultiple={false}
        title="Especialidades:"
        opendrawer={modalCategory}
        handleDrawer={handleModalCategory}
      >
        <SubjectTable
          stateSelect={true}
          limitInit={5}
          itemSelect={(v) => {
            if (subject == null || subject.id != v.id) {
              onValueChange('subject', v);
              handleModalCategory(false);
            }
          }}
          items={subject == null ? [] : [subject.id]}
        />
      </ModalSelectComponent>
    )}
      <Dialog open={open} onClose={handleClose} style={{ zIndex: 9998 }}>
        <DialogTitle>
          {item == null ? 'Nuevo Módulo' : `${item.name}`}
        </DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
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
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={subject != null ? 'Materia' : ''}
                  title={subject != null ? subject.name : 'Materia'}
                  onPressed={() => handleModalCategory(true)}
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
