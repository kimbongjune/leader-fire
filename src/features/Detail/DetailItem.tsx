import theme from '@/theme/colors';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  button?: ReactNode;
}

const DetailItem = (props: Props) => {
  return (
    <Stack spacing="8px" flex={1}>
      <Flex justify="space-between" align="center">
        <Title className="title">{props.title}</Title>
        {props.button}
      </Flex>
      {props.children}
    </Stack>
  );
};

export default DetailItem;

const Title = styled.div`
  color: ${theme.colors.gray6};
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;
