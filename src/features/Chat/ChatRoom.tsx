import { Box, Flex, Stack } from '@chakra-ui/react';
import DisplayTodayDate from './DisplayTodayDate';
import Message, { MessageType } from './Message';
import TypingTab from './TypingTab';
import theme from '@/theme/colors';

interface Props {
  id: string;
  messages: MessageType[];
}

const ChatRoom = (props: Props) => {
  return (
    <Box h="100%" position="relative" background={theme.colors.gray1}>
      <Flex direction="column" justify="space-between" h="100%" minH="100%" overflowY="auto">
        <Stack spacing="16px" flex={1} p="14px 16px" mb="91px">
          {props.messages.map((message, index) => {
            return <Message key={index} {...message}></Message>;
          })}
          <DisplayTodayDate />
        </Stack>
      </Flex>
      <TypingTab />
    </Box>
  );
};

export default ChatRoom;

ChatRoom.defaultProps = {
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
