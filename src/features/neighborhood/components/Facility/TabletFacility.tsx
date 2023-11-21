import React from 'react';
import { useRouter } from 'next/router';
import TargetFacility from './TargetFacility';
import DangerFacility from './DangerFacility';
import ToxicFacility from './ToxicFacility';
import Facility from './Facility';
import { DeviceType, ModFightingPropertyList, ModHazardousSubstancList, ModToxicFacilityList, ModnearbyBusinessesList } from '@/types/types';
import { Box } from '@chakra-ui/react';

interface Props {
  deviceType: DeviceType;
  fightingPropertyList:ModFightingPropertyList[]
  hazardousSubstancList:ModHazardousSubstancList[]
  toxicFacilityList:ModToxicFacilityList[]
  nearbyBusinessesList:ModnearbyBusinessesList[]
}
//TODO 인근시설 하위페이지
const TabletFacility = (props: Props) => {
  const { deviceType } = props;
  return (
    <>
      {/* 인근 대상물 */}
      <TargetFacility deviceType={deviceType} fightingPropertyList={props?.fightingPropertyList} />
      {/* 인근 위험물제조소 */}
      <DangerFacility deviceType={deviceType} hazardousSubstancList={props?.hazardousSubstancList}/>
      {/* 인근 유독물시설 */}
      <ToxicFacility deviceType={deviceType} toxicFacilityList={props?.toxicFacilityList} />
      {/* 인근 업소 */}
      <Facility deviceType={deviceType} nearbyBusinessesList={props?.nearbyBusinessesList} />
    </>
  );
};

export default TabletFacility;
