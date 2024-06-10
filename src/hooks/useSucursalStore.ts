import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setSucursals,
  setAddSucursal,
  setUpdateSucursal,
  setDeleteSucursal,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useSucursalStore = () => {
  const { sucursals } = useSelector((state: any) => state.sucursals);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getSucursal = async () => {
    try {
      const { data } = await coffeApi.get('/branch');
      console.log(data);
      dispatch(setSucursals({ sucursals: data.sucursals }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createSucursal = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/branch/', body);
      console.log(data);
      dispatch(setAddSucursal({ student: data }));
      showSuccess('sucursal creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateSucursal = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/branch/${id}`, body);
      console.log(data);
      dispatch(setUpdateSucursal({ student: data }));
      showSuccess('sucursal editado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteSucursal = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/branch/${id}`);
        dispatch(setDeleteSucursal({ id }));
        showSuccess('sucursal eliminado correctamente');
      } else {
        showError('Cancelado', 'El sucursal esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    sucursals,
    //* Métodos
    getSucursal,
    createSucursal,
    updateSucursal,
    deleteSucursal,
  };
};