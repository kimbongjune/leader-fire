import React from 'react';
import { useRouter } from 'next/router';
import TargetFacility from './TargetFacility';
import DangerFacility from './DangerFacility';
import ToxicFacility from './ToxicFacility';
import Facility from './Facility';
import { DeviceType } from '@/types/types';
import { Box } from '@chakra-ui/react';

interface Props {
  deviceType: DeviceType;
}

const TabletFacility = (props: Props) => {
  const { deviceType } = props;
  return (
    <>
      {/* 인근 대상물 */}
      <TargetFacility deviceType={deviceType} />
      {/* 인근 위험물제조소 */}
      <DangerFacility deviceType={deviceType} />
      {/* 인근 유독물시설 */}
      <ToxicFacility deviceType={deviceType} />
      {/* 인근 업소 */}
      <Facility deviceType={deviceType}/>
    </>
  );
};

export default TabletFacility;
