import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setAddSpecialty,
  setUpdateSpecialty,
  setDeleteSpecialty,
  setSpecialties,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useSpecialtyStore = () => {
  const { specialties } = useSelector((state: any) => state.specialties);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getSpecialties = async (branchId:number) => {
    try {
      const { data } = await coffeApi.get(`/specialty/branch/${branchId}`);
      console.log(data);
      dispatch(setSpecialties({ specialties: data.specialties }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createSpecialty = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/specialty/', body);
      console.log(data);
      dispatch(setAddSpecialty({ specialty: data }));
      showSuccess('Especialidad creada correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateSpecialty = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/specialty/${id}`, body);
      console.log(data);
      dispatch(setUpdateSpecialty({ specialty: data }));
      showSuccess('Especialidad editada correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteSpecialty = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/specialty/${id}`);
        dispatch(setDeleteSpecialty({ id }));
        showSuccess('Especialidad eliminado correctamente');
      } else {
        showError('Cancelado', 'El módulo esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    specialties,
    //* Métodos
    getSpecialties,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty,
  };
};
