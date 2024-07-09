import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setClasses,
  setAddClasse,
  setUpdateClasse,
  setDeleteClasse,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useClasseStore = () => {
  const { classes } = useSelector((state: any) => state.classes);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getClasses = async () => {
    try {
      const { data } = await coffeApi.get('/classe');
      console.log(data);
      dispatch(setClasses({ classes: data.classes }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createClasse = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/classe/', body);
      console.log(data);
      dispatch(setAddClasse({ classe: data }));
      showSuccess('Clase creada correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateClasse = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/classe/${id}`, body);
      console.log(data);
      dispatch(setUpdateClasse({ classe: data }));
      showSuccess('Clase editada correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteClasse = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/classe/${id}`);
        dispatch(setDeleteClasse({ id }));
        showSuccess('Clase eliminado correctamente');
      } else {
        showError('Cancelado', 'La clase esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    classes,
    //* Métodos
    getClasses,
    createClasse,
    updateClasse,
    deleteClasse,
  };
};
