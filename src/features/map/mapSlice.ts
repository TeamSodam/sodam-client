import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import { KakaoMap } from 'types/map';

export interface MapState {
  map: KakaoMap;
}

const initialState: MapState = {
  map: null,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<KakaoMap>) => {
      state.map = action.payload;
    },
  },
});

export const { setMap } = mapSlice.actions;

export const selectMap = (state: RootState) => state.map.map;

export default mapSlice.reducer;
