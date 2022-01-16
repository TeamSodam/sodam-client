import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import { KakaoMap, KakaoMarker } from 'types/map';

export interface MarkerInfo {
  marker: KakaoMarker;
  isClicked: boolean;
  name: string;
}
export interface MapState {
  map: KakaoMap;
  currentMarkerList: MarkerInfo[];
}

const initialState: MapState = {
  map: null,
  currentMarkerList: [],
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<KakaoMap>) => {
      state.map = action.payload;
    },
    addCurrentMarker: (state, action: PayloadAction<MarkerInfo>) => {
      const target = state.currentMarkerList.find((marker) => marker.name === action.payload.name);
      if (target) {
        target.marker = action.payload.marker;
        target.isClicked = action.payload.isClicked;
      } else {
        state.currentMarkerList.push(action.payload);
      }
    },
    setMarkerCilckState: (state, action: PayloadAction<MarkerInfo>) => {
      const targetMarker = state.currentMarkerList.find(
        (marker) => marker.name === action.payload.name,
      );
      if (targetMarker) targetMarker.isClicked = action.payload.isClicked;
    },
    initMap: (state) => {
      state.map = null;
      state.currentMarkerList = [];
    },
  },
});

export const { setMap, addCurrentMarker, setMarkerCilckState, initMap } = mapSlice.actions;

export const selectMap = (state: RootState) => state.reducer.map.map;
export const selectCurrentMarkerList = (state: RootState) => state.reducer.map.currentMarkerList;

export default mapSlice.reducer;
