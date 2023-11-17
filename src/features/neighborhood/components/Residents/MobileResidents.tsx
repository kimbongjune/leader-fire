import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import { DeviceType } from '@/types/types';
import useDeviceType from '@/hooks/useDeviceType';
import ResidentsMobileItem from './ResidentsMobileItem';

const MobileResidents = () => {
  const deviceType = useDeviceType();

  return (
    <>
      <Container>
        <TitleWrapper>
          <Title deviceType={deviceType}>인근 대상물</Title>
          <Count deviceType={deviceType}>(2건)</Count>
        </TitleWrapper>
        <ResidentsItemContainer deviceType={deviceType}>
          <ResidentsMobileItem phone="010-0000-0000" name="홍길동" tag="아들" />
          <ResidentsMobileItem phone="010-0000-0000" name="홍길동" tag="딸" />
          <ResidentsMobileItem phone="010-0000-0000" name="홍길동" tag="사위" />
        </ResidentsItemContainer>
      </Container>

      <Container>
        <TitleWrapper>
          <Title deviceType={deviceType}>인근 주민</Title>
          <Count deviceType={deviceType}>(시설관계자, 3명)</Count>
        </TitleWrapper>
        <ResidentsItemContainer deviceType={deviceType}>
          <ResidentsMobileItem phone="010-0000-0000" name="홍길동" tag="접유자" storeName="좋은 이웃마트 장유점 (종합식자재할인마트)" hasDivider />
          <ResidentsMobileItem phone="010-0000-0000" name="홍길동" tag="접유자" storeName="좋은 이웃마트 장유점 (종합식자재할인마트)" hasDivider />
          <ResidentsMobileItem phone="010-0000-0000" name="홍길동" tag="접유자" storeName="좋은 이웃마트 장유점 (종합식자재할인마트)" />
        </ResidentsItemContainer>
      </Container>
    </>
  );
};

export default MobileResidents;

const Container = styled.div`
  width: 100%;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid ${theme.colors.gray2};
  background-color: ${theme.colors.gray1};
  :first-of-type {
    margin-top: 16px;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 0;
  margin-bottom: 12px;
`;

const Title = styled.div<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
`;

const Count = styled.div<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
`;

const ResidentsItemContainer = styled.div<{ deviceType: DeviceType }>`
  display: flex;
  flex-direction: column;
`;
