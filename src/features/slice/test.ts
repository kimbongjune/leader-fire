import { createSelector } from 'reselect';
import { RootState } from '../../app/store';
import { disasterSlice } from '../../features/slice/disasterSlice';

const selectDisasterState = (state: RootState) => state.disaster;

export const selectDisasterInformation = createSelector(
    [selectDisasterState],
    (disasterState) => disasterState.disasterInformation
  );

export const selectDisasterById = createSelector(
    (state: RootState) => state.disaster.disasterInformation,
    (state: RootState, id: string) => id,
    (disasterInformation, id) => disasterInformation.find(item => item.dsrSeq === id)
  );