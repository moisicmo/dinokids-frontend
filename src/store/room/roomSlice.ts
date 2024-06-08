import { RoomModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    rooms: [] as RoomModel[],
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload.rooms;
    },
    setAddRoom: (state, action) => {
      state.rooms = [...state.rooms, action.payload.room];
    },
    setUpdateRoom: (state, action) => {
      state.rooms = [
        ...state.rooms.map((e) => {
          if (e.id === action.payload.room.id) {
            return {
              ...action.payload.room,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteRoom: (state, action) => {
      state.rooms = [
        ...state.rooms.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setRooms,
  setAddRoom,
  setUpdateRoom,
  setDeleteRoom,
} = roomSlice.actions;
