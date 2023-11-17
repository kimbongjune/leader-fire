import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DisasterState {
  disasterNumber: string;
  disasterCoordinateX:number;
  disasterCoordinateY:number;
  disasterAcceptFlag:boolean;
  disasterInfoReadFlag:boolean;
  disasterModalReadFlag:boolean;
  disasterAddress:string;
  disasterWaterMarkerShowFlag:boolean;
  disasterVehicleMarkerShowFlag:boolean;
}

const initialState: DisasterState = {
  disasterNumber: '',
  disasterCoordinateX: 0.0,
  disasterCoordinateY: 0.0,
  disasterAcceptFlag:false,
  disasterInfoReadFlag:false,
  disasterModalReadFlag: false,
  disasterAddress:"",
  disasterWaterMarkerShowFlag:false,
  disasterVehicleMarkerShowFlag:false
};

export const disasterSlice = createSlice({
  name: 'disaster',
  initialState,
  reducers: {
    setDisasterNumber: (state, action: PayloadAction<string>) => {
      state.disasterNumber = action.payload;
    },
    setDisasterCoordinateX: (state, action: PayloadAction<number>) => {
      state.disasterCoordinateX = action.payload;
    },
    setDisasterCoordinateY: (state, action: PayloadAction<number>) => {
      state.disasterCoordinateY = action.payload;
    },
    setDisasterAccptFlag: (state, action: PayloadAction<boolean>) => {
      state.disasterAcceptFlag = action.payload;
    },
    setDisasterInfoReadFlag: (state, action: PayloadAction<boolean>) => {
      state.disasterInfoReadFlag = action.payload;
    },
    setDisasterModalReadFlag: (state, action: PayloadAction<boolean>) => {
      state.disasterModalReadFlag = action.payload;
    },
    setDisasterAddress: (state, action: PayloadAction<string>) => {
      state.disasterAddress = action.payload;
    },
    setDisasterWaterMakrerShowFlag: (state, action: PayloadAction<boolean>) => {
      state.disasterWaterMarkerShowFlag = action.payload;
    },
    setDisasterVehicleMarkerShowFlag: (state, action: PayloadAction<boolean>) => {
      state.disasterVehicleMarkerShowFlag = action.payload;
    }
  },
});

export const { 
  setDisasterNumber,
  setDisasterCoordinateX, 
  setDisasterCoordinateY, 
  setDisasterAccptFlag, 
  setDisasterInfoReadFlag, 
  setDisasterModalReadFlag, 
  setDisasterAddress ,
  setDisasterWaterMakrerShowFlag,
  setDisasterVehicleMarkerShowFlag
} = disasterSlice.actions;
export default disasterSlice.reducer;