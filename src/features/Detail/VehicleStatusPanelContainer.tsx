import { useState } from 'react';
import VehicleStatusPanel from './VehicleStatusPanel';

const VehicleStatusPanelContainer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 차량 인증
  const [isOut, setIsOut] = useState(false); // 출동 여부
  const [hasArrivedToSite, setHasArrivedToSite] = useState(false); // 도착 여부
  const [hasDepartedOnSite, setHasDepartedOnSite] = useState(false); // 현장 출발 여부
  const [hasArrivedToHospital, setHasArrivedToHospital] = useState(false); // 병원 도착 여부
  const [isRescueFinished, setIsRescueFinished] = useState(false); // 구조 완료 여부
  const [isAvailable, setIsAvailable] = useState(false); // 출동가능 여부
  const [isUnAvailable, setIsUnavailable] = useState(false); // 출동불가능 여부
  const [isIn, setIsIn] = useState(false); // 귀소 완료 여부

  const changeStatus = (value: string) => {
    if (value === 'isAuthenticated') setIsAuthenticated(prev => !prev);
    if (value === 'isOut') setIsOut(prev => {if (!prev) return !prev; return prev;});
    if (value === 'hasArrivedToSite') setHasArrivedToSite(prev => !prev);
    if (value === 'hasDepartedOnSite') setHasDepartedOnSite(prev => !prev);
    if (value === 'hasArrivedToHospital') setHasArrivedToHospital(prev => !prev);
    if (value === 'isRescueFinished') setIsRescueFinished(prev => !prev);
    if (value === 'isAvailable') setIsAvailable(prev => !prev);
    if (value === 'isUnAvailable') setIsUnavailable(prev => !prev);
    if (value === 'isIn') setIsIn(prev => {if (!prev) return !prev; return prev;});
  };

  return (
    <VehicleStatusPanel
      isAuthenticated={isAuthenticated}
      isOut={isOut}
      hasArrivedToSite={hasArrivedToSite}
      hasDepartedOnSite={hasDepartedOnSite}
      hasArrivedToHospital={hasArrivedToHospital}
      isRescueFinished={isRescueFinished}
      isAvailable={isAvailable}
      isUnAvailable={isUnAvailable}
      isIn={isIn}
      changeStatus={changeStatus}
    />
  );
};

export default VehicleStatusPanelContainer;
