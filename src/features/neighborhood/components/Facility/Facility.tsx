import React, { useEffect, useState } from 'react';
import { Flex, Grid, Stack, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import TabletFacilityItem from './TabletFacilityItem';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import ArrowUp from '../../../../../public/images/icons/arrow-drop-up.svg';
import ArrowDown from '../../../../../public/images/icons/arrow-drop-down.svg';
import { useRouter } from 'next/router';
import usePaging from './hooks/usePaging';
import { FacilityTabletData } from './FacilityData';
import { DeviceType } from '@/types/types';
import MobileFacilityItem from './MobileFacilityItem';

interface Props {
  title: string;
  count: number;
  datas: {
    id: number;
    phoneName: string;
    distance: string;
    name: string;
    storeName: string;
    storeAddress: string;
    buildingNumber: string;
    buildingFloor: number;
    danger: string;
  }[];
  deviceType?: DeviceType;
}

const BuildingInfo = ({ title, text }: { title: string; text: string }) => {
  return (
    <BuildingBox>
      <InfoTitle>{title}</InfoTitle>
      <InfoText>{text}</InfoText>
    </BuildingBox>
  );
};

const BuildNumber = ({ number, floor }: { number: string; floor: number }) => {
  return (
    <Flex>
      <Building>{number}</Building>
      <Building>{floor}</Building>
    </Flex>
  );
};

const Facility = (props: Props) => {
  const { query } = useRouter();
  const queryId = Number(query.id);
  const dataLength = props.datas.length;
  const [isOpen, setIsOpen] = useState(true);
  const { visibleIndex, handleNext, handlePrev, setVisibleIndex } = usePaging({ dataLength: dataLength });
  const { deviceType } = props;

  useEffect(() => {
    const index = props.datas.findIndex(item => item.id === queryId);

    if (index !== -1) {
      const newIndex = Math.floor(index / 2) * 2;
      setVisibleIndex(newIndex);
    }
  }, [queryId, props.datas]);

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
          {isOpen &&
            props.datas?.map((item, index) => {
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
                    buildingInfo={
                      <VStack spacing="4px" margin="4px 0 0 0">
                        <BuildingInfoWrapper deviceType={deviceType}>
                          <InfoTitle>위험물 저장 및 처리시설</InfoTitle>
                          <InfoText>부용도</InfoText>
                        </BuildingInfoWrapper>
                      </VStack>
                    }
                  />
                );
              return (
                <Flex w="100%">
                  <TabletFacilityItem
                    hasModal={false}
                    isSelected={isSelected}
                    key={`${props.title} - ${index}`}
                    title={props.title}
                    phoneName={item.phoneName}
                    distance={item.distance}
                    name={item.name}
                    storeName={item.storeName}
                    storeAddress={item.storeAddress}
                    containerBottom={<BuildingInfo title="위험물 저장 및 처리시설" text={item.danger} />}
                    buildingAddress={<BuildNumber number={item.buildingNumber} floor={item.buildingFloor} />}
                  />
                </Flex>
              );
            })}
        </Grid>
      )}
    </Container>
  );
};

Facility.defaultProps = {
  title: '인근 업소',
  count: 3,
  datas: FacilityTabletData,
};
export default Facility;

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

const BuildingBox = styled.div<{ deviceType?: DeviceType }>`
  border-radius: 4px;
  padding: 8px;
  background-color: ${theme.colors.gray2};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoTitle = styled.div<{ deviceType?: DeviceType }>`
  flex: 1;
  overflow: hidden;
  color: ${theme.colors.gray8};
  font-family: Pretendard SemiBold;
  font-size: 12px;
  white-space: nowrap;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;
  text-align: center;
`;

const InfoText = styled.div<{ deviceType?: DeviceType }>`
  flex: 1;
  overflow: hidden;
  color: ${theme.colors.gray7};
  font-family: Pretendard Medium;
  font-size: 12px;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;
  text-align: center;
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
    border-left: 1px solid ${theme.colors.gray9};
    margin-left: 8px;
    padding-left: 8px;
  }
`;

const BuildingInfoWrapper = styled.div<{ deviceType: DeviceType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 4px;
  ${({ deviceType }) =>
    deviceType === 'tabletHorizontal' &&
    `
      flex-direction: row;
    `}
`;
