// src/features/slice/myInfoSlice.ts
import { UserDto, UserInformation } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface MyInfoState {
  userInfo:UserDto;
  mobilizationTotalCount: number;
  mobilizationAcceptCount: number;
  mobilizationDenyCount: number;
  userLocationX:number;
  userLocationY:number;
  gpsStatusSatelliteCount:number;
  gpsStatusDbHzAverage:number;
  logedIn:boolean;
  sendLocationFlag:boolean
}

const initialUserInfo: UserDto = {
  sub : '',
  userId: '',
  userPw : '',
  userName: '',
  classCd: '',
  wardId: '',
  wardName: '',
  deviceTel: '',
  fcmToken: '',
  iat : 0
};

// Define the initial state using that type
const initialState: MyInfoState = {
  userInfo : initialUserInfo,
  mobilizationTotalCount: 0,
  mobilizationAcceptCount: 0,
  mobilizationDenyCount: 0,
  userLocationX:0.0,
  userLocationY:0.0,
  gpsStatusSatelliteCount:0,
  gpsStatusDbHzAverage:0.0,
  logedIn:false,
  sendLocationFlag:false
};

export const myInfoSlice = createSlice({
  name: 'myInfo',
  initialState,
  reducers: {
    saveUserInformation: (state, action: PayloadAction<UserDto>) => {
      state.userInfo = action.payload;
    },
    saveMobilizationTotalCount: (state, action: PayloadAction<number>) => {
      state.mobilizationTotalCount = action.payload;
    },
    saveMobilizationAcceptCount: (state, action: PayloadAction<number>) => {
      state.mobilizationAcceptCount = action.payload;
    },
    saveMobilizationDenyCount: (state, action: PayloadAction<number>) => {
      state.mobilizationDenyCount = action.payload;
    },
    saveUserLocationX: (state, action: PayloadAction<number>) => {
      state.userLocationX = action.payload;
    },
    saveUserLocationY: (state, action: PayloadAction<number>) => {
      state.userLocationY = action.payload;
    },
    saveGpsStatusSatelliteCount: (state, action: PayloadAction<number>) => {
      state.gpsStatusSatelliteCount = action.payload;
    },
    saveGpsStatusDbHzAverage: (state, action: PayloadAction<number>) => {
      state.gpsStatusDbHzAverage = action.payload;
    },
    saveLogedInStatus: (state, action: PayloadAction<boolean>) => {
      state.logedIn = action.payload;
    },
    saveSendLocationFlag: (state, action: PayloadAction<boolean>) => {
      state.sendLocationFlag = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { 
  saveUserInformation,
  saveMobilizationTotalCount, 
  saveMobilizationAcceptCount, 
  saveMobilizationDenyCount,
  saveUserLocationX,
  saveUserLocationY,
  saveGpsStatusSatelliteCount,
  saveGpsStatusDbHzAverage,
  saveLogedInStatus,
  saveSendLocationFlag
} = myInfoSlice.actions;

export default myInfoSlice.reducer;