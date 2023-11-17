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
import { DeviceType } from '@/types/types';
import { css } from '@emotion/react';
import usePaging from './hooks/usePaging';
import { DangerFacilityData } from './FacilityData';
import { useRouter } from 'next/router';
import MobileFacilityItem from './MobileFacilityItem';

interface Props {
  title: string;
  count: number;
  data: {
    id: number;
    phoneName: string;
    distance: string;
    name: string;
    storeName: string;
    storeAddress: string;
    categoryNumber: number;
    buildingInfoTitle: string;
    buildingNumber: string;
    serialNumber: string;
    buildingFloor: number;
    phones: { phoneTitle: string; phoneNumber: string }[];
  }[];
  deviceType?: DeviceType;
}

const BuildingInfo = ({ title, number, serialNumber }: { title: string; number: number; serialNumber: string }) => {
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

const BuildingBox = ({ number, floor }: { number: string; floor: number }) => {
  return (
    <VStack minW="48px" padding="8px 6px" gap="0">
      <Building>{number}</Building>
      <Building>{floor}층</Building>
    </VStack>
  );
};

const DangerFacility = (props: Props) => {
  const { query } = useRouter();
  const queryId = Number(query.id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataLength = props.data.length;
  const [isOpen, setIsOpen] = useState(true);
  const { visibleIndex, handleNext, handlePrev, setVisibleIndex } = usePaging({ dataLength: dataLength });
  const { deviceType } = props;

  useEffect(() => {
    const index = props.data.findIndex(item => item.id === queryId);

    if (index !== -1) {
      const newIndex = Math.floor(index / 2) * 2;
      setVisibleIndex(newIndex);
    }
  }, [queryId, props.data]);

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
            <Title deviceType={deviceType}>{props.title}</Title>
            {deviceType !== 'mobile' && <Count>({props.count}건)</Count>}
            {deviceType === 'mobile' && <Count deviceType={deviceType}>{props.count}건</Count>}
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
            {props.data?.map((item, index) => {
              const isSelected = queryId === item.id;
              if (deviceType === 'mobile')
                return (
                  <MobileFacilityItem
                    isSelected={isSelected}
                    key={`${props.title} - ${index}`}
                    title={props.title}
                    phoneName={item.phoneName}
                    distance={item.distance}
                    name={item.name}
                    storeName={item.storeName}
                    storeAddress={item.storeAddress}
                    buildingFloor={item.buildingFloor}
                    buildingNumber={item.buildingNumber}
                    containerBottom={
                      <VStack gap="8px" pt="8px">
                        {item.phones?.map((phone, index) => {
                          return <PhoneBox key={index} title={phone.phoneTitle} number={phone.phoneNumber} deviceType={deviceType} />;
                        })}
                      </VStack>
                    }
                    buildingInfo={
                      <VStack spacing="4px" margin="4px 0 0 0">
                        <BuildingInfoWrapper deviceType={deviceType}>
                          <InfoTitle>{item.buildingInfoTitle}</InfoTitle>
                          <Stack spacing="2px">
                            <InfoSubTitle>구분번호</InfoSubTitle>
                            <InfoSubText>{item.categoryNumber}</InfoSubText>
                          </Stack>
                          <Stack spacing="2px">
                            <InfoSubTitle>제조소일련번호</InfoSubTitle>
                            <InfoSubText>{item.serialNumber}</InfoSubText>
                          </Stack>
                        </BuildingInfoWrapper>
                      </VStack>
                    }
                  />
                );
              return (
                <Flex w="100%">
                  <TabletFacilityItem
                    isSelected={isSelected}
                    key={`${props.title} - ${index}`}
                    title={props.title}
                    phoneName={item.phoneName}
                    distance={item.distance}
                    name={item.name}
                    storeName={item.storeName}
                    storeAddress={item.storeAddress}
                    containerBottom={
                      <Flex gap="8px" w="100%">
                        <BuildingBox number="103동" floor={7} />
                        <VStack flex={1} gap="8px">
                          {item.phones?.map((phone, index) => {
                            return <PhoneBox key={index} title={phone.phoneTitle} number={phone.phoneNumber} />;
                          })}
                        </VStack>
                      </Flex>
                    }
                    buildingInfo={<BuildingInfo title={item.buildingInfoTitle} number={item.categoryNumber} serialNumber={item.serialNumber} />}
                  />
                </Flex>
              );
            })}
          </Grid>
        )}
      </Container>
      {isModalOpen && <FacilityModal setIsModalOpen={setIsModalOpen} isDangerCategory={true} />}
    </>
  );
};

DangerFacility.defaultProps = {
  title: '인근 위험물제조소 등',
  count: 1,
  data: DangerFacilityData,
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
