import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DispatchItemType } from '../../types/types';

interface DisasterState {
  disasterInformation: DispatchItemType[]
  subDisasterInformation: DispatchItemType
  isWaterMarkerActive: boolean;
  isExtinguisherMarkerActive: boolean;
  isTargetMarkerActive: boolean;
  isDangerMarkerActive: boolean;
  isRescuePositionActive :boolean;
  isVehicleActive : boolean;
  isVideoActive : boolean;
}

const initialState: DisasterState = {
  disasterInformation: [],
  subDisasterInformation: {
    jurisWardId: '',
    dsrKndCd: '',
    dsrClsCd: '',
    dsrSeq: '',
    status: 'progress',
    reportCount: 0,
    eventName: '',
    type: 'fires',
    lawAddr: '',
    roadAddr: '',
    procCd: '',
    gisX: '',
    gisY: '',
    dFstRegSeq: '',
    callTell: '',
    description: '',
    created: ''
  },
  isWaterMarkerActive: false,
  isExtinguisherMarkerActive: false,
  isTargetMarkerActive: false,
  isDangerMarkerActive: false,
  isRescuePositionActive:false,
  isVehicleActive:false,
  isVideoActive:false
};

export const disasterSlice = createSlice({
  name: 'disaster',
  initialState,
  reducers: {
    setDisasterInformation: (state, action: PayloadAction<DispatchItemType[]>) => {
      state.disasterInformation = action.payload;
    },
    setIsWaterMarkerActive: (state, action: PayloadAction<boolean>) => {
      state.isWaterMarkerActive = action.payload;
    },
    setIsExtinguisherMarkerActive: (state, action: PayloadAction<boolean>) => {
      state.isExtinguisherMarkerActive = action.payload;
    },
    setIsTargetMarkerActive: (state, action: PayloadAction<boolean>) => {
      state.isTargetMarkerActive = action.payload;
    },
    setIsDangerMarkerActive: (state, action: PayloadAction<boolean>) => {
      state.isDangerMarkerActive = action.payload;
    },
    setSubDisasterInformation: (state, action: PayloadAction<DispatchItemType>) => {
      state.subDisasterInformation = action.payload;
    },
    setIsRescuePositionActive: (state, action: PayloadAction<boolean>) => {
      state.isRescuePositionActive = action.payload;
    },
    setIsVehicleActive: (state, action: PayloadAction<boolean>) => {
      state.isVehicleActive = action.payload;
    },
    setIsVideoActive: (state, action: PayloadAction<boolean>) => {
      state.isVideoActive = action.payload;
    }
  },
});

export const { 
  setDisasterInformation,
  setIsDangerMarkerActive,
  setIsExtinguisherMarkerActive,
  setIsTargetMarkerActive,
  setIsWaterMarkerActive,
  setSubDisasterInformation,
  setIsRescuePositionActive,
  setIsVehicleActive,
  setIsVideoActive
} = disasterSlice.actions;
export default disasterSlice.reducer;