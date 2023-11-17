import React from 'react';
import { useRouter } from 'next/router';
import useDeviceType from '@/hooks/useDeviceType';
import MobileFacility from './MobileFacilityItem';
import TabletFacility from './TabletFacility';

const Facility = () => {
  const deviceType = useDeviceType();
  const { query } = useRouter();
  const queryId = Number(query.id);

  return <TabletFacility deviceType={deviceType}/>;
};

export default Facility;
