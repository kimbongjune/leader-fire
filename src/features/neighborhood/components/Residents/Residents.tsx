import React from 'react';
import useDeviceType from '@/hooks/useDeviceType';
import TabletResidents from './TabletResidents';
import MobileResidents from './MobileResidents';

const Residents = () => {
  const deviceType = useDeviceType();

  if (deviceType !== 'mobile') return <TabletResidents />;
  return <MobileResidents />;
};

export default Residents;
