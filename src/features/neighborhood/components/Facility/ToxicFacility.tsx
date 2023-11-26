import React, { useEffect, useState } from 'react';
import { Flex, Grid, Stack, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import TabletFacilityItem from './TabletFacilityItem';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import ArrowUp from '../../../../../public/images/icons/arrow-drop-up.svg';
import ArrowDown from '../../../../../public/images/icons/arrow-drop-down.svg';
import { PhoneBox } from './TargetFacility';
import { ToxicFacilityData } from './FacilityData';
import { useRouter } from 'next/router';
import usePaging from './hooks/usePaging';
import { DeviceType, ModToxicFacilityList } from '@/types/types';
import MobileFacilityItem from './MobileFacilityItem';
import { css } from '@emotion/react';

interface Props {
  deviceType?: DeviceType;
  toxicFacilityList:ModToxicFacilityList[]
}

const BuildingInfo = ({ title, text }: { title: string; text: string }) => {
  return (
    <Flex gap="4px">
      <InfoTitle>{title}</InfoTitle>
      <InfoText>{text}</InfoText>
    </Flex>
  );
};

//TODO 인근 유독물시설 리스트
const ToxicFacility = (props: Props) => {
  const { query } = useRouter();
  const queryId = query.build_sn;

  const dataLength = props?.toxicFacilityList?.length;
  const [isOpen, setIsOpen] = useState(true);
  const { visibleIndex, handleNext, handlePrev, setVisibleIndex } = usePaging({ dataLength: dataLength });
  const { deviceType } = props;

  useEffect(() => {
    const index = props?.toxicFacilityList?.findIndex(item => item.bild_sn === queryId);

    if (index !== -1) {
      const newIndex = Math.floor(index / 2) * 2;
      setVisibleIndex(newIndex);
    }
  }, [queryId, props?.toxicFacilityList]);

  const handleClickUpButton = () => {
    setIsOpen(false);
  };

  const handleClickDownButton = () => {
    setIsOpen(true);
  };

  return (
    <Container deviceType={deviceType}>
      <TitleWrapper deviceType={deviceType}>
        <Flex align="center" gap="4px">
          <Title deviceType={deviceType}>{'인근 유독물시설 등'}</Title>
          {deviceType !== 'mobile' && <Count>({dataLength}건)</Count>}
          {deviceType === 'mobile' && <Count deviceType={deviceType}>{dataLength}건</Count>}
        </Flex>
        {deviceType !== 'mobile' && (
          <Flex>
            <IconWrapper width="24px" height="24px" color={!isOpen ? theme.colors.gray2 : '#495057'} onClick={handleClickUpButton}>
              <ArrowUp />
            </IconWrapper>
            <IconWrapper width="24px" height="24px" color={!isOpen ? '#495057' : theme.colors.gray2} onClick={handleClickDownButton}>
              <ArrowDown />
            </IconWrapper>
          </Flex>
        )}
        {deviceType === 'mobile' && (
          <>
            {isOpen && (
              <IconWrapper width="20px" height="20px" color={!isOpen ? theme.colors.gray2 : '#495057'} onClick={handleClickUpButton}>
                <ArrowUp />
              </IconWrapper>
            )}
            {!isOpen && (
              <IconWrapper width="20px" height="20px" color={!isOpen ? '#495057' : theme.colors.gray2} onClick={handleClickDownButton}>
                <ArrowDown />
              </IconWrapper>
            )}
          </>
        )}
      </TitleWrapper>
      {isOpen && (
        <Grid templateColumns={'repeat(2, 1fr)'} columnGap={deviceType === 'mobile' ? '4px' : '8px'} rowGap={deviceType === 'mobile' ? '4px' : '8px'} marginTop={deviceType ? '4px' : '8px'}>
          {props?.toxicFacilityList?.map((item, index) => {
            const isSelected = queryId === item.bild_sn;
            if (deviceType === 'mobile')
              return (
                <MobileFacilityItem
                  isSelected={isSelected}
                  key={index}
                  title={'인근 유독물시설 등'}
                  phoneName={"연락처"}
                  phoneNumber={item.txsb_safer_tel1 || item.txsb_safer_tel2 || item.rprsntv_tel1 || item.rprsntv_tel2}
                  distance={item.dist}
                  name={item.buld_nm}
                  storeName={item.entrps_nm}
                  storeAddress={item.bunji_adress}
                  build_sn={item.bild_sn}
                  gis_x_4326={item.gis_x_4326}
                  gis_y_4326={item.gis_y_4326}
                  containerBottom={
                    <VStack gap="8px" pt="8px">
                      {item.txsb_safer_tel1 && <PhoneBox key={item.txsb_safer_tel1} title={"안전관리자1"} number={item.txsb_safer_tel1} deviceType={deviceType} />}
                      {item.txsb_safer_tel2 && <PhoneBox key={item.txsb_safer_tel2} title={"안전관리자2"} number={item.txsb_safer_tel2} deviceType={deviceType} />}
                      {item.rprsntv_tel1 &&<PhoneBox key={item.rprsntv_tel1} title={"대표자1"} number={item.rprsntv_tel1} deviceType={deviceType} />}
                      {item.rprsntv_tel2 &&<PhoneBox key={item.rprsntv_tel2} title={"대표자2"} number={item.rprsntv_tel2} deviceType={deviceType} />}
                    </VStack>
                  }
                  buildingInfo={
                    <VStack spacing="4px" margin="4px 0 0 0">
                      <BuildingInfoWrapper deviceType={deviceType}>
                        <Stack spacing="4px">
                          <InfoTitle>보유보호장비</InfoTitle>
                          <InfoText>{item.hold_ffgq || "N"}</InfoText>
                        </Stack>
                        <Stack spacing="4px">
                          <InfoTitle>보유중화재</InfoTitle>
                          <InfoText>{item.hold_cout || "N"}</InfoText>
                        </Stack>
                      </BuildingInfoWrapper>
                    </VStack>
                  }
                />
              );
            return (
              <Flex w="100%" key={index}>
                <TabletFacilityItem
                  hasModal={false}
                  isSelected={isSelected}
                  title={'인근 유독물시설 등'}
                  phoneName={"연락처"}
                  phoneNumber={item.txsb_safer_tel1 || item.txsb_safer_tel2 || item.rprsntv_tel1 || item.rprsntv_tel2}
                  distance={item.dist}
                  name={item.buld_nm}
                  storeName={item.entrps_nm}
                  storeAddress={item.bunji_adress}
                  build_sn={item.bild_sn}
                  gis_x_4326={item.gis_x_4326}
                  gis_y_4326={item.gis_y_4326}
                  buildingInfo={
                    <Stack spacing="8px">
                      <BuildingInfo title={'보유보호장비'} text={item.hold_ffgq || "N"} />
                      <BuildingInfo title={'보유중화재'} text={item.hold_cout || "N"} />
                    </Stack>
                  }
                  containerBottom={
                    <VStack gap="8px">
                      {item.txsb_safer_tel1 && <PhoneBox key={item.txsb_safer_tel1} title={"안전관리자1"} number={item.txsb_safer_tel1} deviceType={deviceType} />}
                      {item.txsb_safer_tel2 && <PhoneBox key={item.txsb_safer_tel2} title={"안전관리자2"} number={item.txsb_safer_tel2} deviceType={deviceType} />}
                      {item.rprsntv_tel1 &&<PhoneBox key={item.rprsntv_tel1} title={"대표자1"} number={item.rprsntv_tel1} deviceType={deviceType} />}
                      {item.rprsntv_tel2 &&<PhoneBox key={item.rprsntv_tel2} title={"대표자2"} number={item.rprsntv_tel2} deviceType={deviceType} />}
                    </VStack>
                  }
                />
              </Flex>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};
export default ToxicFacility;

const Container = styled.div<{ deviceType?: DeviceType }>`
  width: 100%;

  ${({ deviceType }) => {
    if (deviceType === 'mobile') {
      return `
        padding: 8px;
        border-radius: 8px;
        outline: 1px solid var(--02, #E9ECEF);
        background: var(--01, #F8F9FA);
      `;
    }
  }}
`;

const TitleWrapper = styled.div<{ deviceType?: DeviceType }>`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;

  ${({ deviceType }) => {
    if (deviceType === 'mobile') {
      return `
        justify-content: space-between;
        padding: 4px 8px;
        margin-bottom: 0;
      `;
    }
  }}
`;

const Title = styled.div<{ deviceType?: DeviceType }>`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.32px;
  font-style: normal;

  ${({ deviceType }) => {
    if (deviceType === 'mobile') {
      return `
        color: var(--08, #495057);
        font-family: Pretendard SemiBold;
        font-size: 14px;
        line-height: 20px; /* 142.857% */
        letter-spacing: -0.28px;
      `;
    }
  }}
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  overflow: hidden;
  width: 100%;
`;

const Count = styled.div<{ deviceType?: DeviceType }>`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.28px;

  ${({ deviceType }) => {
    if (deviceType === 'mobile') {
      return `
        color: var(--06, #909AA4);
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px; /* 142.857% */
        letter-spacing: -0.28px;
      `;
    }
  }}
`;

const InfoTitle = styled.div<{ deviceType?: DeviceType }>`
  color: ${theme.colors.gray8};
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const InfoText = styled.div<{ deviceType?: DeviceType }>`
  color: ${theme.colors.gray6};
  font-family: Pretendard Medium;
  font-size: 12px;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;
  white-space: nowrap;
`;

const BuildingInfoWrapper = styled.div<{ deviceType?: DeviceType }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
  ${({ deviceType }) =>
    deviceType === 'tabletHorizontal' &&
    css`
      flex-direction: row;
    `}
`;
