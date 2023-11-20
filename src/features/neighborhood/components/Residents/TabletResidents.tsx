import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType, ModNearbyFacilityPersonnelList, ModNearbyOfficialsList, ModNearbyResidentsList } from '@/types/types';
import ResidentsItem from './ResidentsItem';

const Tag = (props: any) => {
  return <TagWrapper>{props.children}</TagWrapper>;
};

const Name = (props: any) => {
  return <NameWrapper>{props.children}</NameWrapper>;
};

type Props = {
  nearbyFacilityPersonnelList:ModNearbyFacilityPersonnelList[]
  nearbyOfficialsList:ModNearbyOfficialsList[]
  nearbyResidentsList:ModNearbyResidentsList[]
}

//TODO 태블릿 인근주민 하위페이지
const TabletResidents = (props:Props) => {
  const deviceType = useDeviceType();

  return (
    <>
      <ResidentsContainer>
        <TitleWrapper>
          <Title deviceType={deviceType}>보호자</Title>
          <Count deviceType={deviceType}>{props.nearbyResidentsList?.length}명</Count>
        </TitleWrapper>
        <ResidentsItemContainer deviceType={deviceType}>
        {props.nearbyResidentsList?.map((item, index) => {
          return(
            <ResidentsItem call={item?.care_tel} key={index} contentTop={<Tag>{item.care_rel}</Tag>} contentBottom={<Name>{item.care_name}</Name>} />
          )
        })}
        </ResidentsItemContainer>
      </ResidentsContainer>

      {/* <ResidentsContainer>
        <TitleWrapper>
          <Title deviceType={deviceType}>U119등록자</Title>
          <Count deviceType={deviceType}>4명</Count>
        </TitleWrapper>
        <ResidentsItemContainer deviceType={deviceType}>
          <ResidentsItem contentTop={<Age>여, 56세</Age>} contentBottom={<Name>홍길동</Name>} />
          <ResidentsItem contentTop={<Age>여, 56세</Age>} contentBottom={<Name>홍길동</Name>} />
          <ResidentsItem contentTop={<Age>여, 56세</Age>} contentBottom={<Name>홍길동</Name>} />
          <ResidentsItem contentTop={<Age>여, 56세</Age>} contentBottom={<Name>홍길동</Name>} />
        </ResidentsItemContainer>
      </ResidentsContainer> */}

      <ResidentsContainer>
        <TitleWrapper>
          <Title deviceType={deviceType}>소방등록정보</Title>
          <Count deviceType={deviceType}>{props.nearbyOfficialsList?.length}명</Count>
        </TitleWrapper>
        <ResidentsItemContainer deviceType={deviceType}>
        {props.nearbyOfficialsList?.map((item, index) => {
          return(
            <ResidentsItem key={index} call={item.tlphon_no}
              contentTop={<Flex gap="4px" alignItems="center"><Tag>{item.partcpnt_cd_nm}</Tag>{item.partcpnt}</Flex>}contentBottom={<Name>{item.obj_nm}</Name>}
              address={item.bunji_adress || item.doro_adress} />
          )
        })}
        </ResidentsItemContainer>
      </ResidentsContainer>

      <ResidentsContainer>
        <TitleWrapper>
          <Title deviceType={deviceType}>인근 주민</Title>
          <Count deviceType={deviceType}>시설관계자, {props.nearbyFacilityPersonnelList?.length}명</Count>
        </TitleWrapper>
        <ResidentsItemContainer deviceType={deviceType}>
        {props.nearbyFacilityPersonnelList?.map((item, index) => {
          return(
            <ResidentsItem key={index} call={item.tlphon_no}
              contentTop={<Flex gap="4px" alignItems="center"><Tag>{item.partcpnt_cd_nm}</Tag>{item.partcpnt}</Flex>}contentBottom={<Name>{item.obj_nm}</Name>}
              address={item.bunji_adress || item.doro_adress} />
          )
        })}
        </ResidentsItemContainer>
      </ResidentsContainer>
    </>
  );
};

export default TabletResidents;

const ResidentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ResidentsItemContainer = styled.div<{ deviceType: DeviceType }>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  ${props =>
    props.deviceType === 'tabletHorizontal' &&
    css`
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    `}

  ${props =>
    props.deviceType === 'mobile' &&
    css`
      display: block;
    `}
`;

const AgeWrapper = styled.div`
  color: ${theme.colors.gray5};
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const DistanceWrapper = styled.div`
  color: ${theme.colors.gray5};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;

const TagWrapper = styled.div`
  padding: 2px 4px;
  border-radius: 4px;
  width: fit-content;
  color: ${theme.colors.white};
  background-color: ${theme.colors.gray3};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled.div<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.28px;

  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      font-family: 'Pretendard Bold';
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.32px;
    `}
`;

const Count = styled.div<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      color: ${theme.colors.gray3};
      font-family: 'Pretendard Bold';
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.32px;
    `}
`;

const NameWrapper = styled.div`
  color: ${theme.colors.gray10};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.36px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
