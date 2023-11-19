import styled from '@emotion/styled';
import DispatchItem from './DispatchItem';
import DispatchList from './DispatchList';
import { DeviceType, DispatchItemType } from '@/types/types';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

interface Props {
  deviceType?: DeviceType;
  testDate : DispatchItemType[]
}

const Home = (props: Props) => {
  const { deviceType } = props;
  return <DispatchList deviceType={deviceType} dispatchLists={props?.testDate} />;
};

export default Home;
