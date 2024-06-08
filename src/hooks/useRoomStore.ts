import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setRooms,
  setAddRoom,
  setUpdateRoom,
  setDeleteRoom,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useRoomStore = () => {
  const { rooms } = useSelector((state: any) => state.rooms);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getRooms = async () => {
    try {
      const { data } = await coffeApi.get('/room');
      console.log(data);
      dispatch(setRooms({ categories: data.categories }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createRoom = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/room/', body);
      console.log(data);
      dispatch(setAddRoom({ category: data }));
      showSuccess('Aula creada correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateRoom = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/room/${id}`, body);
      console.log(data);
      dispatch(setUpdateRoom({ category: data }));
      showSuccess('Aula editada correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteRoom = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/room/${id}`);
        dispatch(setDeleteRoom({ id }));
        showSuccess('Aula eliminado correctamente');
      } else {
        showError('Cancelado', 'La aula esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    rooms,
    //* Métodos
    getRooms,
    createRoom,
    updateRoom,
    deleteRoom,
  };
};
