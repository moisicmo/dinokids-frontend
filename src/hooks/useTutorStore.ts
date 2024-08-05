import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setTutors,
  setAddTutor,
  setUpdateTutor,
  setDeleteTutor,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useTutorStore = () => {
  const { tutors } = useSelector((state: any) => state.tutors);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getTutors = async () => {
    try {
      const { data } = await coffeApi.get('/tutor');
      console.log(data);
      dispatch(setTutors({ tutors: data.tutors }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createTutor = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/tutor/', body);
      console.log(data);
      dispatch(setAddTutor({ tutor: data }));
      showSuccess('Tutor creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateTutor = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/tutor/${id}`, body);
      console.log(data);
      dispatch(setUpdateTutor({ tutor: data }));
      showSuccess('Tutor editado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteTutor = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/tutor/${id}`);
        dispatch(setDeleteTutor({ id }));
        showSuccess('tutor eliminado correctamente');
      } else {
        showError('Cancelado', 'El Tutor esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    tutors,
    //* Métodos
    getTutors,
    createTutor,
    updateTutor,
    deleteTutor,
  };
};
