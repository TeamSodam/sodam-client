import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import { KakaoMarker } from 'types/map';

export interface MarkerInfo {
  marker: KakaoMarker;
  isClicked: boolean;
  name: string[];
}
export interface MapState {
  currentMarkerList: MarkerInfo[];
}

const initialState: MapState = {
  currentMarkerList: [],
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    addCurrentMarker: (state, action: PayloadAction<MarkerInfo>) => {
      const target = state.currentMarkerList.find((marker) =>
        marker.name.every((name) => action.payload.name.includes(name)),
      );

      if (target) {
        target.marker = action.payload.marker;
        target.isClicked = action.payload.isClicked;
      } else {
        state.currentMarkerList.push(action.payload);
      }
    },
    setMarkerCilckState: (state, action: PayloadAction<MarkerInfo>) => {
      const targetMarker = state.currentMarkerList.find((marker) =>
        marker.name.every((name) => action.payload.name.includes(name)),
      );
      if (targetMarker) targetMarker.isClicked = action.payload.isClicked;
    },
    initMap: (state) => {
      state.currentMarkerList = [];
    },
  },
});

export const { addCurrentMarker, setMarkerCilckState, initMap } = mapSlice.actions;

export const selectCurrentMarkerList = (state: RootState) => state.reducer.map.currentMarkerList;

export default mapSlice.reducer;
