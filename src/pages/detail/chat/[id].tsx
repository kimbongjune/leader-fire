import AddressTab from '@/components/common/Menu/AddressTab';
import Menu from '@/components/common/Menu/Menu';
import ChatRoom from '@/features/Chat/ChatRoom';
import Message, { MessageType } from '@/features/Chat/Message';
import theme from '@/theme/colors';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Div100vh from 'react-div-100vh';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';

interface Props {
  messages: MessageType[];
}

const ChatRoomPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <Div100vh>
      <Flex direction="column" height="100%" position="relative">
        <Box position="sticky" top="0" zIndex={10}>
          <MenuWrapper>
            <Menu title="채팅" closeButtonText="닫기" onClickBackButton={() => router.back()} onCloseButton={() => router.back()} />
          </MenuWrapper>
          <AddressTabWrapper>
            <AddressTab address="경남 진주시 진주대로 345-13, 203호" />
          </AddressTabWrapper>
        </Box>
        <Children>
          <ChatRoom id={id} />
        </Children>
      </Flex>
    </Div100vh>
  );
};

export default ChatRoomPage;

ChatRoomPage.defaultProps = {
  messages: [
    {
      name: '홍길동',
      type: 'string',
      children: '안녕하세요.',
      time: '13:01',
    },
    {
      name: '홍길동',
      type: 'string',
      children: '메시지를 보냅니다. 이 메시지는 신고내용이 아닙니다. 별도 URL을 통해 접속하여 메시지를 발송하는 내용입니다.',
      time: '13:02',
    },
    {
      name: '홍길동',
      type: 'string',
      children: '메시지를 보냅니다. 이 메시지는 신고내용이 아닙니다. 별도 URL을 통해 접속하여 메시지를 발송하는 내용입니다.',
      time: '13:03',
    },
    {
      name: '소방의용대',
      type: 'image',
      imageUrl: '/images/fires sample.png',
      time: '13:05',
    },
    {
      name: '시스템',
      type: 'string',
      children: '[시스템] 영상공유 중입니다',
      time: '13:07',
      isSystem: true,
    },
    {
      name: '나',
      type: 'string',
      children: '안녕하세요',
      time: '14:00',
      isYours: true,
    },
  ],
};

const SubMenu = styled.div`
  position: sticky;
  // height: 100px;
  z-index: 10;
  top: 16px;
  // flex: 1;
`;

const Children = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  z-index: 2;
  background: #f8f9fa;
  padding-bottom: 91px;
  // margin-bottom: 102px;
`;

const MenuWrapper = styled.div`
  .menu-container {
    background: ${theme.colors.white};

    color: var(--09, #343a40);
    font-family: Pretendard Bold;
    font-size: 20px;
    line-height: 24px; /* 120% */
    letter-spacing: -0.4px;
  }

  .button {
    color: var(--06, #909aa4);
    font-family: Pretendard Bold;
    font-size: 16px;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
  }
`;

const AddressTabWrapper = styled.div`
  .address-tab-container {
    background: ${theme.colors.white};
    border-top: 1px solid ${theme.colors.gray2};
  }

  .map-icon {
    color: ${theme.colors.gray7};
  }

  .address {
    color: var(--08, #495057);
    font-family: Pretendard SemiBold;
    font-size: 18px;
    line-height: 24px; /* 133.333% */
    letter-spacing: -0.36px;
  }

  .copy-icon {
    color: ${theme.colors.gray};
  }
`;
