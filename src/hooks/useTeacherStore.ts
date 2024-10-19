import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setTeachers,
  setAddTeacher,
  setUpdateTeacher,
  setDeleteTeacher,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useTeacherStore = () => {
  const { teachers } = useSelector((state: any) => state.teachers);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getTeachers = async () => {
    try {
      const { data } = await coffeApi.get('/teacher');
      console.log(data);
      dispatch(setTeachers({ teachers: data.teachers }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createTeacher = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/teacher/', body);
      console.log(data);
      dispatch(setAddTeacher({ teacher: data }));
      showSuccess('Docente creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateTeacher = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/teacher/${id}`, body);
      console.log(data);
      dispatch(setUpdateTeacher({ teacher: data }));
      showSuccess('Docente editado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteTeacher = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/teacher/${id}`);
        dispatch(setDeleteTeacher({ id }));
        showSuccess('Docente eliminado correctamente');
      } else {
        showError('Cancelado', 'El Docente esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    teachers,
    //* Métodos
    getTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,
  };
};
