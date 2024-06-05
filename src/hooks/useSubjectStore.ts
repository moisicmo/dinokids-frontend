import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setAddSubject,
  setUpdateSubject,
  setDeleteSubject,
  setSubjects,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useSubjectStore = () => {
  const { subjects } = useSelector((state: any) => state.subjects);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getSubjects = async () => {
    try {
      const { data } = await coffeApi.get('/subject');
      console.log(data);
      dispatch(setSubjects({ subjects: data.subjects }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createSubject = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/subject/', body);
      console.log(data);
      dispatch(setAddSubject({ subject: data }));
      showSuccess('Materia creada correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateSubject = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/subject/${id}`, body);
      console.log(data);
      dispatch(setUpdateSubject({ subject: data }));
      showSuccess('Materia editada correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteSubject = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/subject/${id}`);
        dispatch(setDeleteSubject({ id }));
        showSuccess('Materia eliminado correctamente');
      } else {
        showError('Cancelado', 'La Materia esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    subjects,
    //* Métodos
    getSubjects,
    createSubject,
    updateSubject,
    deleteSubject,
  };
};
