import React, { useEffect, useState } from 'react';
import { Box, Flex, Grid, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import TabletFacilityItem from './TabletFacilityItem';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import ArrowUp from '../../../../../public/images/icons/arrow-drop-up.svg';
import ArrowDown from '../../../../../public/images/icons/arrow-drop-down.svg';
import Call from '../../../../../public/images/icons/call.svg';
import { TargetFacilityData } from './FacilityData';
import { useRouter } from 'next/router';
import usePaging from './hooks/usePaging';
import { DeviceType, ModFightingPropertyList } from '@/types/types';
import MobileFacilityItem from './MobileFacilityItem';

interface Props {
  deviceType?: DeviceType;
  fightingPropertyList:ModFightingPropertyList[]
}

export const PhoneBox = ({ title, number, deviceType }: { title: string; number: string; deviceType?: DeviceType }) => {
  return (
    <PhoneItem deviceType={deviceType} onClick={() => window.location.href = `tel:${number}`}>
      <PhoneItemTitle deviceType={deviceType}>{title}</PhoneItemTitle>
      {deviceType !== 'mobile' && (
        <>
          <IconWrapper width="16px" height="16px" color={theme.colors.gray7}>
            <Call />
          </IconWrapper>
          <PhoneItemNumber deviceType={deviceType}>{number}</PhoneItemNumber>
        </>
      )}
      {deviceType === 'mobile' && (
        <Flex align="center" gap="2px">
          <IconWrapper width="14px" height="14px" color={theme.colors.gray7}>
            <Call />
          </IconWrapper>
          <PhoneItemNumber deviceType={deviceType}>{number}</PhoneItemNumber>
        </Flex>
      )}
    </PhoneItem>
  );
};

//TODO 인근 대상물 페이지
const TargetFacility = (props: Props) => {
  const { query } = useRouter();
  const queryId = query.build_sn;
  const dataLength = props?.fightingPropertyList?.length;
  const [isOpen, setIsOpen] = useState(true);
  const { visibleIndex, handleNext, handlePrev, setVisibleIndex } = usePaging({ dataLength: dataLength });
  const { deviceType } = props;

  useEffect(() => {
    const index = props?.fightingPropertyList?.findIndex(item => item.bild_sn === queryId);

    if (index !== -1) {
      const newIndex = Math.floor(index / 2) * 2;
      setVisibleIndex(newIndex);
    }
  }, [queryId, props?.fightingPropertyList]);

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
          <Title deviceType={deviceType}>인근대상물</Title>
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
        <Grid templateColumns={'repeat(2, 1fr)'} columnGap={deviceType === 'mobile' ? "4px" : "8px"} rowGap={deviceType === 'mobile' ? "4px" : "8px"} marginTop={deviceType ? '4px' : '8px'}>
          {props?.fightingPropertyList?.map((item, index) => {
            const isSelected = queryId === item.bild_sn;
            if (deviceType === 'mobile')
              return (

                <MobileFacilityItem
                  isSelected={isSelected}
                  key={index}
                  build_sn={item.bild_sn}
                  title={"인근대상물"}
                  phoneName={"방재실"}
                  phoneNumber={item.dsprvn_tlphon}
                  distance={item.dist}
                  name={item.main_prpos_cd_nm}
                  storeName={item.obj_nm}
                  storeAddress={item.bunji_adress || item.doro_adress}
                  containerBottom={
                    <VStack gap="8px" pt="8px">
                      {item.dytm_tlphon && <PhoneBox key={item.dytm_tlphon} title={"주간전화"} number={item.dytm_tlphon} deviceType={deviceType} />}
                      {item.night_tlphon &&<PhoneBox key={item.night_tlphon} title={"야간전화"} number={item.night_tlphon} deviceType={deviceType} />}
                    </VStack>
                  }
                />
              );
              return (
                <TabletFacilityItem
                isSelected={isSelected}
                key={index}
                build_sn={item.bild_sn}
                title={"인근대상물"}
                phoneName={"방재실"}
                phoneNumber={item.dsprvn_tlphon}
                distance={item.dist}
                name={item.main_prpos_cd_nm}
                storeName={item.obj_nm}
                storeAddress={item.bunji_adress || item.doro_adress}
                containerBottom={
                  <VStack gap="8px" pt="8px">
                    {item.dytm_tlphon && <PhoneBox key={item.dytm_tlphon} title={"주간전화"} number={item.dytm_tlphon} deviceType={deviceType} />}
                    {item.night_tlphon &&<PhoneBox key={item.night_tlphon} title={"야간전화"} number={item.night_tlphon} deviceType={deviceType} />}
                  </VStack>
                }
                />
              );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default TargetFacility;

const Container = styled.div<{ deviceType?: DeviceType }>`
  margin-top: 16px;
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

  ${({ deviceType }) => {
    if (deviceType === 'mobile') {
      return `
        justify-content: space-between;
        padding: 4px 8px;
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

const PhoneItem = styled.div<{ deviceType?: DeviceType }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 7px;
  border-radius: 4px;
  box-sizing: border-box;
  outline: 1px solid ${theme.colors.gray2};
  background-color: ${theme.colors.gray1};

  ${({ deviceType }) => {
    if (deviceType === 'mobile') {
      return `
        flex-direction: column;
        align-items: flex-start;
      `;
    }
  }}
`;

const PhoneItemTitle = styled.div<{ deviceType?: DeviceType }>`
  color: ${theme.colors.gray6};
  font-family: 'Pretendard Medium';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  ::after {
    content: '|';
    margin: 0 8px;
    color: ${theme.colors.gray2};
  }

  ${({ deviceType }) => {
    if (deviceType === 'mobile') {
      return `
        ::after {
          display: none;
        }
      `;
    }
  }}
`;

const PhoneItemNumber = styled.div<{ deviceType?: DeviceType }>`
  color: ${theme.colors.gray8};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  margin-left: 4px;

  ${({ deviceType }) => {
    if (deviceType === 'mobile') {
      return `
      overflow: hidden;
      color: var(--09, #343A40);
      text-overflow: ellipsis;
      font-size: 12px;
      line-height: 16px; /* 133.333% */
      letter-spacing: -0.24px;
      margin-left: 0;
      white-space: nowrap;
      `;
    }
  }}
`;
