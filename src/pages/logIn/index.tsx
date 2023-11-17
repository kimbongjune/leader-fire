import React, { useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import Input from '@/components/common/Input/input';
import { Flex, Stack } from '@chakra-ui/react';
import Switch from 'react-switch';
import Button from '@/components/common/Button/Button';
import Image from 'next/image';
import LoginFooter from '@/features/Login/LoginFooter';
import useDeviceType from '@/hooks/useDeviceType';

const LoginPage = () => {
  const [checked, setChecked] = useState(false);
  const deviceType = useDeviceType();

  if (!deviceType) return null;

  return (
    <Flex minH="100vh" background={theme.colors.gray1}>
      <Container deviceType={deviceType}>
        <LoginBody>
          {deviceType === 'mobile' && <Image width={204} height={32} src="/images/logo/logo-black.png" alt="경상남도 소방본부" />}
          <Stack spacing="4px" align="center" mt={deviceType === 'mobile' ? '36px' : '0'} mb="32px">
            <Title>지휘관·대원</Title>
            <HighlightedTitle>
              <span>정보지원</span> 전용앱
            </HighlightedTitle>
          </Stack>
          <form style={{ width: '100%' }}>
            <Flex direction="column" gap="16px">
              <div>
                <FormTitle>아이디</FormTitle>
                <Input fontSize="16px" lineHeight="20px" fontWeight={600} letterSpacing="-0.32px" color={theme.colors.gray5} placeholder={deviceType === 'mobile' ? '영문/숫자만 허용' : '긴급구조표준 로그인 ID'} />
              </div>
              <div>
                <FormTitle>비밀번호</FormTitle>
                <Input fontSize="16px" lineHeight="20px" fontWeight={600} letterSpacing="-0.32px" color={theme.colors.gray5} placeholder={deviceType === 'mobile' ? '특수기호 1개 이상 포함' : '긴급구조표준 로그인 PW'} />
              </div>
            </Flex>
            <Flex gap="8px" marginTop="16px" marginBottom="24px">
              <Switch id="autoLogin" onChange={e => setChecked(e)} checked={checked} onColor={theme.colors.blue} offColor={theme.colors.gray4} width={34} height={18} handleDiameter={12} uncheckedIcon={false} checkedIcon={false} />
              <AutoLogin htmlFor="autoLogin">자동 로그인</AutoLogin>
              <FailLogin>비밀번호가 올바르지 않습니다</FailLogin>
            </Flex>
            <Button height="52px" padding="16px 10px" backgroundColor={theme.colors.orange}>
              <LogInText>로그인</LogInText>
            </Button>
          </form>
          <Flex gap="4px" marginTop="12px" justifyContent="center" alignItems="center">
            <InfoText>VPN에 동시에 로그인합니다</InfoText>
          </Flex>
        </LoginBody>
        <LoginFooter deviceType={deviceType} />
      </Container>
    </Flex>
  );
};

export default LoginPage;

const Container = styled.div<any>`
  padding: 0 16px;
  background: ${theme.colors.gray1};
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 64px;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical') {
      return `
      gap: 226px;
      margin-top: 370px;
      `;
    }

    if (deviceType === 'tabletHorizontal') {
      return `
        gap: 92px;
        margin-top: 176px;
      `;
    }
  }}
`;

const LoginBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 343px;
  width: 100%;
`;

const Title = styled.div`
  color: ${theme.colors.gray8};
  font-family: 'Pretendard SemiBold';
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
  width: fit-content;
  text-align: center;
`;

const HighlightedTitle = styled.div`
  color: #343a40;
  font-family: Pretendard Bold;
  font-size: 28px;
  line-height: 32px;
  letter-spacing: -0.56px;

  span {
    color: ${theme.colors.orange};
    font-family: Pretendard Bold;
    font-size: 28px;
    line-height: 32px; /* 114.286% */
    letter-spacing: -0.56px;
  }
`;

const FormTitle = styled.div`
  font-size: 16px;
  font-family: 'Pretendard Bold';
  line-height: 24px;
  letter-spacing: -0.32px;
  color: ${theme.colors.gray6};
  margin-bottom: 8px;
`;

const AutoLogin = styled.label`
  color: ${theme.colors.gray6};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;

const FailLogin = styled.div`
  color: ${theme.colors.red};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  margin-left: auto;
`;

const InfoText = styled.div`
  color: ${theme.colors.gray6};
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const LogInText = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.36px;
`;
