import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setSchedules,
  setAddSchedule,
  setUpdateSchedule,
  setDeleteSchedule,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useScheduleStore = () => {
  const { schedules } = useSelector((state: any) => state.schedules);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getSchedules = async (roomId:number) => {
    try {
      const { data } = await coffeApi.get(`/schedule/${roomId}`);
      console.log(data);
      dispatch(setSchedules({ schedules: data.schedules }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createSchedule = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/schedule/', body);
      console.log(data);
      dispatch(setAddSchedule({ schedule: data }));
      showSuccess('Horario creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateSchedule = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/schedule/${id}`, body);
      console.log(data);
      dispatch(setUpdateSchedule({ schedule: data }));
      showSuccess('Horario editado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteSchedule = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/schedule/${id}`);
        dispatch(setDeleteSchedule({ id }));
        showSuccess('Horario eliminado correctamente');
      } else {
        showError('Cancelado', 'La aula esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    schedules,
    //* Métodos
    getSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
};
