import styled from '@emotion/styled';
import DispatchItem from './DispatchItem';
import DispatchList from './DispatchList';
import { DeviceType } from '@/types/types';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

interface Props {
  deviceType?: DeviceType;
}

const Home = (props: Props) => {
  const { deviceType } = props;
  const testData = useSelector((state: RootState) => state.disaster.disasterInformation);
  return <DispatchList deviceType={deviceType} dispatchLists={testData} />;
};

export default Home;
