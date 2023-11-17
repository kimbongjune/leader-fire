import { DeviceType } from '@/types/types';
import { useMediaQuery } from '@chakra-ui/react';

const useDeviceType = () : DeviceType => {
  const [isMobile] = useMediaQuery('(max-width: 799px)');
  const [isTabletVertical] = useMediaQuery('(min-width: 800px) and (max-width: 1189px)');
  const [isTabletHorizontal] = useMediaQuery('(min-width: 1190px)');
  if (isMobile) return 'mobile';
  if (isTabletVertical) return 'tabletVertical';
  if (isTabletHorizontal) return 'tabletHorizontal';
  return null;
};

export default useDeviceType;
