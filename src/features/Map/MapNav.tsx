import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import Button from '@/components/common/Button/Button';
import Image from 'next/image';

const MapNav = () => {
  return (
    <Container>
      <Flex gap="12px">
        <Image width={36} height={36} src="/images/icons/naverMap.png" alt="네이버지도앱" />
        <Image width={36} height={36} src="/images/icons/Tmap.png" alt="티맵" />
        <Image width={36} height={36} src="/images/icons/kakaoMap.png" alt="카카오지도앱" />
        <Image width={36} height={36} src="/images/icons/map.png" alt="지도앱" />
      </Flex>
      <ButtonWrapper>
        <Button backgroundColor={theme.colors.gray6} height="36px" padding="8px 16px" borderRadius="4px">
          <ButtonText>주소복사</ButtonText>
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default MapNav;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  background-color: ${theme.colors.white};
  backdrop-filter: blur(8px);
`;

const ButtonWrapper = styled.div`
  max-width: 107px;
`;

const ButtonText = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
`;
