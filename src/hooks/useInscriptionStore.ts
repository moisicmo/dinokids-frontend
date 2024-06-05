import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setInscriptions,
  setAddInscription,
  setUpdateInscription,
  setDeleteInscription,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';
import printJS from 'print-js';

export const useInscriptionStore = () => {
  const { inscriptions } = useSelector((state: any) => state.inscriptions);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getInscriptions = async () => {
    try {
      const { data } = await coffeApi.get('/inscription');
      console.log(data);
      dispatch(setInscriptions({ inscriptions: data.inscriptions }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createInscription = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/inscription/', body);
      console.log(data);
      dispatch(setAddInscription({ inscription: data }));
      // PDF
      const byteCharacters = atob(data.document.pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const pdfURL = window.URL.createObjectURL(blob);
      printJS(pdfURL);
      showSuccess('Inscripción creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateInscription = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/inscription/${id}`, body);
      console.log(data);
      dispatch(setUpdateInscription({ inscription: data }));
      showSuccess('Inscripción editado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteInscription = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/inscription/${id}`);
        dispatch(setDeleteInscription({ id }));
        showSuccess('inscripción eliminado correctamente');
      } else {
        showError('Cancelado', 'La inscripción esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    inscriptions,
    //* Métodos
    getInscriptions,
    createInscription,
    updateInscription,
    deleteInscription,
  };
};
