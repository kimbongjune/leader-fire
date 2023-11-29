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

  console.log(props.nearbyFacilityPersonnelList?.length && props.nearbyResidentsList?.length && props.nearbyOfficialsList?.length)

  if(!props.nearbyOfficialsList?.length && !props.nearbyFacilityPersonnelList?.length && !props.nearbyResidentsList?.length){
    return null
  }

  if (deviceType !== 'mobile') return <TabletResidents {...props}/>;
  return <MobileResidents {...props}/>;
};

export default Residents;
