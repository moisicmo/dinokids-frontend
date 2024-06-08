import { ComponentInput, ComponentSelect, ModalSelectComponent } from '@/components';
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
import { FormEvent, useCallback, useState } from 'react';
import { CategoryTable } from '../category';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: SubjectModel | null;
}

const formFields: FormSubjectModel = {
  name: '',
  code: '',
  category: null,
};

const formValidations: FormSubjectValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  code: [(value) => value.length >= 1, 'Debe ingresar el código'],
  category: [(value) => value != null, 'Debe ingresar la categoria'],
};

export const SubjectCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const { createSubject, updateSubject } = useSubjectStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    name,
    code,
    category,
    onInputChange,
    isFormValid,
    onValueChange,
    onResetForm,
    nameValid,
    codeValid,
    categoryValid,
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createSubject({
        name: name.trim(),
        code: code.trim(),
        categoryId: category.id
      });
    } else {
      await updateSubject(item.id, {
        name: name.trim(),
        code: code.trim(),
        categoryId: category.id
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
        <CategoryTable
          stateSelect={true}
          limitInit={5}
          itemSelect={(v) => {
            if (category == null || category.id != v.id) {
              onValueChange('category', v);
              handleModalCategory(false);
            }
          }}
          items={category == null ? [] : [category.id]}
        />
      </ModalSelectComponent>
    )}
      <Dialog open={open} onClose={handleClose} style={{ zIndex: 9998 }}>
        <DialogTitle>
          {item == null ? 'Nueva Materia' : `${item.name}`}
        </DialogTitle>
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
                  label="Código"
                  name="code"
                  value={code}
                  onChange={onInputChange}
                  error={!!codeValid && formSubmitted}
                  helperText={formSubmitted ? codeValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={category != null ? 'Especialidad' : ''}
                  title={category != null ? category.name : 'Especialidad'}
                  onPressed={() => handleModalCategory(true)}
                  error={!!categoryValid && formSubmitted}
                  helperText={formSubmitted ? categoryValid : ''}
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
