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
import { useSelector } from 'react-redux';

//TODO 모바일 채팅 페이지
const ChatPage = () => {
  const router = useRouter();
  const deviceType = useDeviceType();

  const data = useSelector((state: RootState) => state.disaster.subDisasterInformation);

  if (!deviceType) return null;

  if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') return <TabletPage deviceType={deviceType} />;

  return (
    <Layout>
      <Flex direction="column" height="100%">
        <Menu title={data?.eventName} timestamp={data?.created} contentAlign="space-between" onClickBackButton={() => router.back()} hasCloseButtonWithoutString={false} />
        <AddressTab address={data?.lawAddr} />
        <Children>
          <Stack spacing="16px">
            <FilterWrapper>
              <Filter queryKey="filter" filterNames={['채팅 대상', '채팅 목록']} filterItem={ChatFilterItem} />
            </FilterWrapper>
            {router.query.filter === '채팅 대상' && <ChatTargetList />}
            {router.query.filter === '채팅 목록' && <ChatRoomList />}
          </Stack>
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
