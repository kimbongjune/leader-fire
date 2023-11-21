import React from 'react';
import { useRouter } from 'next/router';
import useDeviceType from '@/hooks/useDeviceType';
import MobileFacility from './MobileFacilityItem';
import TabletFacility from './TabletFacility';
import { ModFightingPropertyList, ModHazardousSubstancList, ModToxicFacilityList, ModnearbyBusinessesList } from '@/types/types';

interface Props {
  fightingPropertyList:ModFightingPropertyList[]
  hazardousSubstancList:ModHazardousSubstancList[]
  toxicFacilityList:ModToxicFacilityList[]
  nearbyBusinessesList:ModnearbyBusinessesList[]
}

const Facility = (props:Props) => {
  const deviceType = useDeviceType();

  return <TabletFacility deviceType={deviceType} 
  fightingPropertyList={props?.fightingPropertyList}
  hazardousSubstancList={props?.hazardousSubstancList}
  toxicFacilityList={props?.toxicFacilityList}
  nearbyBusinessesList={props?.nearbyBusinessesList}
  />;
};

export default Facility;
