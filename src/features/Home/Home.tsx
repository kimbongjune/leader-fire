import styled from '@emotion/styled';
import DispatchItem from './DispatchItem';
import DispatchList from './DispatchList';
import { DeviceType } from '@/types/types';

interface Props {
  deviceType?: DeviceType;
}

const Home = (props: Props) => {
  const { deviceType } = props;
  return <DispatchList deviceType={deviceType} />;
};

export default Home;
