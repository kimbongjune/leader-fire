import Filter from '@/components/common/Filter/Filter';
import Layout from '@/components/common/Layout/Layout';
import AddressTab from '@/components/common/Menu/AddressTab';
import Menu from '@/components/common/Menu/Menu';
import ChatFilterItem from '@/features/Chat/ChatFilterItem';
import ChatRoomList from '@/features/Chat/ChatRoomList';
import ChatTargetList from '@/features/Chat/ChatTargetList';
import { Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import TabletPage from './tablet';
import useDeviceType from '@/hooks/useDeviceType';
import { RootState } from '../../../app/store';
import { shallowEqual, useSelector } from 'react-redux';
import { selectDisasterById } from '@/features/slice/test';
import axios from '@/components/common/api/axios';
import { useEffect } from 'react';


//TODO 모바일 채팅 페이지
const ChatPage = () => {
  const router = useRouter();
  const deviceType = useDeviceType();

  const id = router.query.id as string

  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);

  const selectedDisaster = useSelector((state: RootState) => selectDisasterById(state, id), shallowEqual);

  useEffect(() =>{
    const sendClickStream = async () =>{
      if(userInfo){
        const clickStreamResponse = await axios.post("/api/menu_log/enter",{
          menuId : "3140",
          userId : userInfo.userId
        })
        console.log(clickStreamResponse.data)
      }
    }
    sendClickStream()
  }, [userInfo])

  if (!deviceType) return null;

  if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') return <TabletPage deviceType={deviceType} />;

  return (
    <Layout>
      <Flex direction="column" height="100%">
        <Menu title={selectedDisaster?.eventName} timestamp={selectedDisaster?.created!!} status={selectedDisaster?.status} contentAlign="space-between" onClickBackButton={() => router.back()} hasCloseButtonWithoutString={false} />
        <AddressTab address={selectedDisaster?.lawAddr} />
        <Children>
        <iframe src={`https://view2.gnfire.go.kr:8887/chat/${selectedDisaster?.dsrSeq}/0/0?gubun=4`} width="100%" height="100%"></iframe>
        </Children>
      </Flex>
    </Layout>
  );
};

export default ChatPage;

const Children = styled.div`
  padding: 16px;
  flex: 1;
  height: 100%;
  z-index: 2;
  background: #f8f9fa;
  overflow-y: auto;
`;

const FilterWrapper = styled.div`
  .filter-container {
    width: 100%;
    gap: 8px;
  }

  display: flex;
  width: 100%;
  gap: 4px;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid var(--02, #e9ecef);
  background: #dee2e6;
`;
