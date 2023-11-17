import React from 'react';
import styled from '@emotion/styled';
import { Box, Flex } from '@chakra-ui/react';
import theme from '@/theme/colors';
import Image from 'next/image';
import { DeviceType } from '@/types/types';

interface Props {
  deviceType: DeviceType;
}

const LoginFooter = (props: Props) => {
  const { deviceType } = props;
  return (
    <Container deviceType={deviceType}>
      <Box w="fit-content" mb={deviceType === 'mobile' ? '0' : '32px'}>
        <Link href="">오픈소스 라이선스 안내</Link>
      </Box>
      {deviceType !== 'mobile' && <Image width={204} height={32} src="/images/logo/logo-black.png" alt="경상남도 소방본부" />}
    </Container>
  );
};

LoginFooter.defaultProps = {};
export default LoginFooter;

const Container = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 343px;
  padding: 24px 0;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical') {
      return `
        align-items: center;
        padding: 0 0 48px;
      `;
    }

    if (deviceType === 'tabletHorizontal') {
      return `
        align-items: center;
        padding: 0 0 48px;`;
    }
  }}
`;

const Link = styled.a<any>`
  display: block;
  color: ${theme.colors.blue};
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
  text-decoration-line: underline;
`;
