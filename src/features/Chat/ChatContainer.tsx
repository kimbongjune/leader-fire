import { DeviceType } from '@/types/types';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import ConnectionList from './ConnectionList';
import ChatRoomList from './ChatRoomList';
import theme from '@/theme/colors';
import ChatRoom from './ChatRoom';
import { ChatTargetType } from './ChatTarget';
import { useState } from 'react';

interface Props {
  deviceType?: DeviceType;
  chatList: ChatTargetType[];
}

const ChatContainer = (props: Props) => {
  const { deviceType } = props;
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setCurrentChatId(id);
  };

  return (
    <Wrapper deviceType={deviceType}>
      <Flex direction={deviceType === 'tabletVertical' ? 'column' : 'row'} flex={deviceType === 'tabletVertical' ? 3.2 : 1} overflowY="auto">
        <Box p="24px 16px" flex={deviceType === 'tabletVertical' ? 1 : 1} borderRight={`1px solid ${theme.colors.gray2}`} background={theme.colors.white}>
          <ConnectionList />
        </Box>
        <Box p="24px 16px" flex={deviceType === 'tabletVertical' ? 1 : 2} borderRight={`1px solid ${theme.colors.gray2}`} borderTop={`1px solid ${theme.colors.gray2}`} background={theme.colors.white}>
          <ChatRoomList chatList={props.chatList?.map(chat => ({ ...chat, onClick: handleClick, isActive: currentChatId === chat.id, hasTail: deviceType === 'tabletHorizontal' && currentChatId === chat.id }))} />
        </Box>
      </Flex>
      <Box flex={deviceType === 'tabletVertical' ? 5 : 1} background={theme.colors.white}>
        {currentChatId && <ChatRoom id={currentChatId} />}
      </Box>
    </Wrapper>
  );
};

export default ChatContainer;

ChatContainer.defaultProps = {
  chatList: [
    {
      id: '1',
      isGroup: true,
      messageType: 'string',
      time: '13:05',
      name: '홍길동, 김길남, 신고자, 김호주',
      numberOfMembers: 4,
      comment: '왜 아직 도착안하나요?',
      isActive: false,
    },
    {
      id: '2',
      isGroup: true,
      messageType: 'string',
      time: '13:05',
      name: '홍길동, 김길남, 신고자, 김호주',
      numberOfMembers: 4,
      comment: '왜 아직 도착안하나요?',
      isActive: false,
    },
    {
      id: '3',
      isGroup: true,
      messageType: 'string',
      time: '13:05',
      name: '홍길동, 김길남, 신고자, 김호주',
      numberOfMembers: 4,
      comment: '왜 아직 도착안하나요?',
      isActive: false,
    },
    {
      id: '4',
      isGroup: true,
      messageType: 'string',
      time: '13:05',
      name: '홍길동, 김길남, 신고자, 김호주',
      numberOfMembers: 4,
      comment: '왜 아직 도착안하나요?',
      isActive: false,
    },
    {
      id: '5',
      isGroup: true,
      messageType: 'string',
      time: '13:05',
      name: '홍길동, 김길남, 신고자, 김호주',
      numberOfMembers: 4,
      comment: '왜 아직 도착안하나요?',
      isActive: false,
    },
  ],
};

const Wrapper = styled.div<{ deviceType?: DeviceType }>`
  display: flex;
  height: 100%;
  ${({ deviceType }) => {
    if (deviceType === 'tabletHorizontal') {
      return `

      `;
    }
  }}
`;
