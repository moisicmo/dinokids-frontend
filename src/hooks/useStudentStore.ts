import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setStudents,
  setAddStudent,
  setUpdateStudent,
  setDeleteStudent,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useStudentStore = () => {
  const { students } = useSelector((state: any) => state.students);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getStudents = async () => {
    try {
      const { data } = await coffeApi.get('/student');
      console.log(data);
      dispatch(setStudents({ students: data.students }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createStudent = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/student/', body);
      console.log(data);
      dispatch(setAddStudent({ student: data }));
      showSuccess('Estudiante creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateStudent = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/student/${id}`, body);
      console.log(data);
      dispatch(setUpdateStudent({ student: data }));
      showSuccess('Estudiante editado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteStudent = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/student/${id}`);
        dispatch(setDeleteStudent({ id }));
        showSuccess('Estudiante eliminado correctamente');
      } else {
        showError('Cancelado', 'El Estudiante esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    students,
    //* Métodos
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  };
};