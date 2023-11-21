import React, { useEffect, useState } from 'react';
import { Flex, Grid, Stack, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import TabletFacilityItem from './TabletFacilityItem';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import ArrowUp from '../../../../../public/images/icons/arrow-drop-up.svg';
import ArrowDown from '../../../../../public/images/icons/arrow-drop-down.svg';
import FacilityModal from './FacilityModal';
import { PhoneBox } from './TargetFacility';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType, ModHazardousSubstancList } from '@/types/types';
import { css } from '@emotion/react';
import usePaging from './hooks/usePaging';
import { DangerFacilityData } from './FacilityData';
import { useRouter } from 'next/router';
import MobileFacilityItem from './MobileFacilityItem';

interface Props {
  deviceType?: DeviceType;
  hazardousSubstancList:ModHazardousSubstancList[]
}

const BuildingInfo = ({ title, number, serialNumber }: { title: string; number: string; serialNumber: string }) => {
  const deviceType = useDeviceType();

  return (
    <BuildingInfoWrapper deviceType={deviceType}>
      {deviceType === 'tabletVertical' && <InfoTitle>{title}</InfoTitle>}
      <Flex gap="0 23px" width="100%" justifyContent={deviceType === 'tabletHorizontal' ? 'space-between' : 'flex-start'}>
        {deviceType === 'tabletHorizontal' && <InfoTitle>{title}</InfoTitle>}
        <Flex gap="4px">
          <InfoSubTitle>구분번호</InfoSubTitle>
          <InfoSubText>{number}</InfoSubText>
        </Flex>
        <Flex gap="4px">
          <InfoSubTitle>제조소일련번호</InfoSubTitle>
          <InfoSubText>{serialNumber}</InfoSubText>
        </Flex>
      </Flex>
    </BuildingInfoWrapper>
  );
};

const BuildingBox = ({ number, floor }: { number: string; floor: string }) => {
  return (
    <VStack minW="48px" padding="8px 6px" gap="0">
      <Building>{number}</Building>
      <Building>{floor}층</Building>
    </VStack>
  );
};

//TODO 인근 위험물제조소 리스트
const DangerFacility = (props: Props) => {
  const { query } = useRouter();
  const queryId = query.build_sn;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataLength = props?.hazardousSubstancList?.length;
  const [isOpen, setIsOpen] = useState(true);
  const { visibleIndex, handleNext, handlePrev, setVisibleIndex } = usePaging({ dataLength: dataLength });
  const { deviceType } = props;

  useEffect(() => {
    const index = props?.hazardousSubstancList?.findIndex(item => item.bild_sn === queryId);

    if (index !== -1) {
      const newIndex = Math.floor(index / 2) * 2;
      setVisibleIndex(newIndex);
    }
  }, [queryId, props?.hazardousSubstancList]);

  const handleClickUpButton = () => {
    setIsOpen(false);
  };

  const handleClickDownButton = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Container deviceType={deviceType}>
        <TitleWrapper deviceType={deviceType}>
          <Flex align="center" gap="4px">
            <Title deviceType={deviceType}>{'인근 위험물제조소 등'}</Title>
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
            {props.hazardousSubstancList?.map((item, index) => {
              const isSelected = queryId === item.bild_sn;
              if (deviceType === 'mobile')
                return (
                  <MobileFacilityItem
                    isSelected={isSelected}
                    key={item.bild_sn}
                    title={"인근 위험물제조소 등"}
                    phoneName={"방재실"}
                    build_sn={item.bild_sn}
                    distance={item.dist.toString()}
                    name={item.mnfctretc_detail_se_cd_nm}
                    storeName={item.obj_nm}
                    storeAddress={item.itlpc_bunji_adress || item.itlpc_doro_adress}
                    buildingFloor={item.floor_sn}
                    buildingNumber={item.bild_sn}
                    containerBottom={
                      <VStack gap="8px" pt="8px">
                        {item.dytm_tlphon && <PhoneBox key={item.dytm_tlphon} title={"주간전화"} number={item.dytm_tlphon} deviceType={deviceType} />}
                        {item.night_tlphon &&<PhoneBox key={item.night_tlphon} title={"야간전화"} number={item.night_tlphon} deviceType={deviceType} />}
                      </VStack>
                    }
                    buildingInfo={
                      <VStack spacing="4px" margin="4px 0 0 0">
                        <BuildingInfoWrapper deviceType={deviceType}>
                          <InfoTitle>{item.mnfctretc_detail_se_cd_nm}</InfoTitle>
                          <Stack spacing="2px">
                            <InfoSubTitle>구분번호</InfoSubTitle>
                            <InfoSubText>{item.mnfctretc_se_no}</InfoSubText>
                          </Stack>
                          <Stack spacing="2px">
                            <InfoSubTitle>제조소일련번호</InfoSubTitle>
                            <InfoSubText>{item.mnfctretc_sn}</InfoSubText>
                          </Stack>
                        </BuildingInfoWrapper>
                      </VStack>
                    }
                  />
                );
              return (
                <Flex w="100%" key={item.bild_sn}>
                  <TabletFacilityItem
                    isSelected={isSelected}
                    title={"인근 위험물제조소 등"}
                    phoneName={"방재실"}
                    build_sn={item.bild_sn}
                    distance={item.dist.toString()}
                    name={item.mnfctretc_detail_se_cd_nm}
                    storeName={item.obj_nm}
                    storeAddress={item.itlpc_bunji_adress || item.itlpc_doro_adress}
                    containerBottom={
                      <Flex gap="8px" w="100%">
                        <BuildingBox number={`${item.bulddong_sn}동`} floor={item.floor_sn} />
                        <VStack flex={1} gap="8px">
                          {item.dytm_tlphon && <PhoneBox key={item.dytm_tlphon} title={"주간전화"} number={item.dytm_tlphon} deviceType={deviceType} />}
                          {item.night_tlphon &&<PhoneBox key={item.night_tlphon} title={"야간전화"} number={item.night_tlphon} deviceType={deviceType} />}
                        </VStack>
                      </Flex>
                    }
                    buildingInfo={<BuildingInfo title={item.mnfctretc_detail_se_cd_nm} number={item.mnfctretc_se_no} serialNumber={item.mnfctretc_sn} />}
                  />
                </Flex>
              );
            })}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default DangerFacility;

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
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  white-space: nowrap;
`;

const InfoSubTitle = styled.div<{ deviceType?: DeviceType }>`
  color: ${theme.colors.gray6};
  font-family: 'Pretendard Medium';
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const InfoSubText = styled.div<{ deviceType?: DeviceType }>`
  color: ${theme.colors.gray8};
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const BuildingInfoWrapper = styled.div<{ deviceType: DeviceType }>`
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

const Building = styled.div<{ deviceType?: DeviceType }>`
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  color: ${theme.colors.gray7};
  white-space: nowrap;
  text-align: center;
  :last-of-type {
    border-top: 1px solid ${theme.colors.gray9};
    margin-top: 12px;
    padding-top: 12px;
  }
`;
