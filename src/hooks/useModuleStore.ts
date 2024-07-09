import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setAddModule,
  setUpdateModule,
  setDeleteModule,
  setModules,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useModuleStore = () => {
  const { modules } = useSelector((state: any) => state.modules);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getModules = async () => {
    try {
      const { data } = await coffeApi.get('/module');
      console.log(data);
      dispatch(setModules({ modules: data.modules }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createModule = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/module/', body);
      console.log(data);
      dispatch(setAddModule({ module: data }));
      showSuccess('Módulo creada correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateModule = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/module/${id}`, body);
      console.log(data);
      dispatch(setUpdateModule({ module: data }));
      showSuccess('Módulo editada correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteModule = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/module/${id}`);
        dispatch(setDeleteModule({ id }));
        showSuccess('Módulo eliminado correctamente');
      } else {
        showError('Cancelado', 'El módulo esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    modules,
    //* Métodos
    getModules,
    createModule,
    updateModule,
    deleteModule,
  };
};
