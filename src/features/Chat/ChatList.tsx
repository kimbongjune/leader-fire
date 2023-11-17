import { Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import ChatListItem from './ChatListItem';
import theme from '@/theme/colors';

interface Props {
  title: string;
  children: ReactNode;
}

const ChatList = (props: Props) => {
  return (
    <Stack spacing="8px">
      <Title>{props.title}</Title>
      {props.children}
    </Stack>
  );
};

export default ChatList;

const Title = styled.div`
  color: ${theme.colors.gray7};
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;
