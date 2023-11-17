import React from 'react';
import theme from '@/theme/colors';
import styled from '@emotion/styled';
import { Stack } from '@chakra-ui/react';
import Image from 'next/image';

const Loading = () => {
  return (
    <Container>
      <Stack spacing="24px" align="center">
        <Image width={255} height={40} src="/images/logo/logo-black.png" alt="경상남도소방본부" />
        <Stack spacing="2px">
          <Title>지휘관·대원</Title>
          <MainTitle>
            <strong>정보지원</strong> 전용앱
          </MainTitle>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${theme.colors.gray1};
  padding-top: 220px;
`;

const Title = styled.span`
  display: block;
  color: ${theme.colors.gray6};
  font-family: 'Pretendard SemiBold';
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
  text-align: center;
`;

const MainTitle = styled.span`
  display: block;
  color: #343a40;
  font-family: 'Pretendard Bold';
  font-size: 32px;
  font-style: normal;
  font-weight: normal;
  line-height: 48px;
  letter-spacing: -0.64px;
  text-align: center;
  > strong {
    color: ${theme.colors.orange};
  }
`;
