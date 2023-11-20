import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import { DeviceType, ModNearbyFacilityPersonnelList, ModNearbyOfficialsList, ModNearbyResidentsList } from '@/types/types';
import useDeviceType from '@/hooks/useDeviceType';
import ResidentsMobileItem from './ResidentsMobileItem';

type Props = {
  nearbyFacilityPersonnelList:ModNearbyFacilityPersonnelList[]
  nearbyOfficialsList:ModNearbyOfficialsList[]
  nearbyResidentsList:ModNearbyResidentsList[]
}

//TODO 모바일 인근주민 하위페이지
const MobileResidents = (props:Props) => {
  const deviceType = useDeviceType();

  return (
    <>
      <Container>
        <TitleWrapper>
          <Title deviceType={deviceType}>보호자</Title>
          <Count deviceType={deviceType}>({props?.nearbyResidentsList?.length}명)</Count>
        </TitleWrapper>
        <ResidentsItemContainer deviceType={deviceType}>
          {props.nearbyResidentsList?.map((item, index, array) => {
            return(
              <ResidentsMobileItem key={index} phone={item?.care_tel} name={item.care_name} tag={item.care_rel} hasDivider={index !== array.length - 1} />
            )
        })}
        </ResidentsItemContainer>
      </Container>

      <Container>
        <TitleWrapper>
          <Title deviceType={deviceType}>소방등록정보</Title>
          <Count deviceType={deviceType}>({props.nearbyOfficialsList?.length}명)</Count>
        </TitleWrapper>
        <ResidentsItemContainer deviceType={deviceType}>
        {props.nearbyOfficialsList?.map((item, index, array) => {
          return(
            <ResidentsMobileItem key={index} phone={item.tlphon_no} name={item.partcpnt} tag={item.partcpnt_cd_nm} storeName={item.obj_nm} hasDivider={index !== array.length - 1}  />
          )
        })}
        </ResidentsItemContainer>
      </Container>

      <Container>
        <TitleWrapper>
          <Title deviceType={deviceType}>인근 주민</Title>
          <Count deviceType={deviceType}>(시설관계자, {props.nearbyFacilityPersonnelList?.length}명)</Count>
        </TitleWrapper>
        <ResidentsItemContainer deviceType={deviceType}>

        {props.nearbyFacilityPersonnelList?.map((item, index, array) => {
          return(
            <ResidentsMobileItem phone={item.tlphon_no} name={item.partcpnt} tag={item.partcpnt_cd_nm} storeName={item.obj_nm} hasDivider={index !== array.length - 1}/>
          )
        })}
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
