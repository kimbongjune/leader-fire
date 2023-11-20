import React from 'react';
import useDeviceType from '@/hooks/useDeviceType';
import TabletResidents from './TabletResidents';
import MobileResidents from './MobileResidents';
import { ModNearbyFacilityPersonnelList, ModNearbyOfficialsList, ModNearbyResidentsList } from '@/types/types';

type Props = {
  nearbyFacilityPersonnelList:ModNearbyFacilityPersonnelList[]
  nearbyOfficialsList:ModNearbyOfficialsList[]
  nearbyResidentsList:ModNearbyResidentsList[]
}

const Residents = (props:Props) => {
  const deviceType = useDeviceType();

  if (deviceType !== 'mobile') return <TabletResidents {...props}/>;
  return <MobileResidents {...props}/>;
};

export default Residents;
