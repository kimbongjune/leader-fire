import React, { ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import { Flex, Stack } from '@chakra-ui/react';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import Calling from '../../../../../public/images/icons/phone_in_talk.svg';
import Map from '../../../../../public/images/icons/mapOutline.svg';
import ArrowRight from '../../../../../public/images/icons/arrow-right.svg';
import Call from '../../../../../public/images/icons/call.svg';
import MapModal from '../MapModal';
import FacilityModal from './FacilityModal';
import { DeviceType } from '@/types/types';

interface Props {
  phoneName?: string;
  distance?: string;
  name?: string;
  storeName?: string;
  storeAddress?: string;
  buildingFloor?: number;
  buildingNumber?: string;
  buildingInfo?: ReactNode;
  containerBottom?: ReactNode;
  buildingAddress?: ReactNode;
  onClick?: any;
  title: string;
  isSelected?: boolean;
  hasModal?: boolean;
  deviceType?: DeviceType;
}

const MobileFacilityItem = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDangerFacilities, setIsDangerFacilities] = useState(false);

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const onClickItem = (title: string) => {
    setIsModalOpen(true);
    if (title.includes('위험물제조소')) {
      setIsDangerFacilities(true);
    } else {
      setIsDangerFacilities(false);
    }
  };

  const onClickMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMapModalOpen(true);
  };

  return (
    <>
      <Container>
        <ContainerSelected isSelected={props.isSelected} />
        <Stack spacing="0">
          <Flex gap="8px" pb="8px" borderBottom="1px solid #E9ECEF">
            <PhoneWrapper>
              <PhoneIconWrapper onClick={() => console.log('방제실 전화번호 클릭')}>
                <IconWrapper width="24px" height="24px" color={theme.colors.green}>
                  <Calling />
                </IconWrapper>
              </PhoneIconWrapper>
              <PhoneName>{props.phoneName}</PhoneName>
            </PhoneWrapper>
            <Stack flex={1} spacing="0" align="flex-start">
              <Flex gap="4px" alignItems="center">
                <Distance>{props.distance}</Distance>
                <MapButton onClick={e => onClickMap(e)}>
                  <IconWrapper width="14px" height="14px" color={theme.colors.white}>
                    <Map />
                  </IconWrapper>
                  지도
                </MapButton>
              </Flex>
              <Name>{props.name}</Name>
            </Stack>
          </Flex>
          <Stack spacing="4px" onClick={e => props.hasModal && onClickItem(props.title)} p="8px 0 0">
            <StoreName>{props.storeName}</StoreName>
            <StoreAddress>{props.storeAddress}</StoreAddress>
            <Flex gap="4px">
              {props.buildingNumber && <BuildingNumber>{props.buildingNumber}</BuildingNumber>}
              {props.buildingFloor && <BuildingFloor>{`${props.buildingFloor}층`}</BuildingFloor>}
            </Flex>
          </Stack>
          {props.buildingInfo && <BuildingInfo>{props.buildingInfo}</BuildingInfo>}
        </Stack>
        {props.containerBottom && <ContainerBottom>{props.containerBottom}</ContainerBottom>}
      </Container>

      {isModalOpen && <FacilityModal setIsModalOpen={setIsModalOpen} isDangerCategory={isDangerFacilities} />}
      {isMapModalOpen && <MapModal setIsMapModalOpen={setIsMapModalOpen} />}
    </>
  );
};

export default MobileFacilityItem;

MobileFacilityItem.defaultProps = {
  hasModal: true,
};

const ContainerSelected = styled.div<{ isSelected?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  pointer-events: none;
  ${({ isSelected }) =>
    isSelected &&
    css`
      outline: 1px solid #1dce00;
      background-color: rgba(29, 206, 0, 0.05);
    `}
`;

const Container = styled.div`
  border-radius: 4px;
  outline: 1px solid ${theme.colors.gray2};
  padding: 12px;
  flex: 1;
  // max-width: 50%;
  background: #fff;
  position: relative;
`;

const PhoneWrapper = styled.div``;

const PhoneIconWrapper = styled.div<{ type?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 8px;
  outline: none;
  background-color: rgba(119, 209, 52, 0.15);
  color: ${theme.colors.green};
`;

const PhoneName = styled.div`
  margin-top: 4px;
  color: ${theme.colors.gray6};
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
  text-align: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const LeftWrapper = styled.div`
  padding-right: 12px;
  margin-right: 12px;
`;

const Distance = styled.div`
  color: ${theme.colors.gray5};
  font-family: 'Pretendard Bold';
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const MapButton = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  border-radius: 4px;
  padding: 2px 4px;
  background-color: ${theme.colors.gray6};
  color: ${theme.colors.white};
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
  white-space: nowrap;
  z-index: 9;
`;

const Name = styled.div`
  flex: 1;
  width: 100%;
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  margin-top: 8px;
`;

const RightWrapper = styled.div`
  padding: 6px 0;
`;

const StoreName = styled.div`
  overflow: hidden;
  color: ${theme.colors.gray7};
  text-overflow: ellipsis;
  font-size: 12px;
  font-style: normal;
  letter-spacing: -0.24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-family: Pretendard Bold;
  line-height: 16px;
`;

const StoreAddress = styled.div`
  overflow: hidden;
  color: ${theme.colors.gray6};
  text-overflow: ellipsis;
  font-family: 'Pretendard Medium';
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
  margin-top: 0px;
  display: block;
`;

const StoreDetailAddress = styled.div`
  overflow: hidden;
  color: var(--07, #6c757d);
  text-overflow: ellipsis;
  font-family: Pretendard SemiBold;
  font-size: 12px;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;
`;

const BuildingInfo = styled.div`
  width: 100%;
  border-radius: 4px;
  padding: 8px;
  background-color: ${theme.colors.gray2};
`;

const ContainerBottom = styled.div`
  // margin-top: 16px;
`;

const BuildingAddress = styled.div`
  margin-top: 4px;
`;

const PhoneItem = styled.div<{ deviceType?: DeviceType }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  outline: 1px solid ${theme.colors.gray2};
  background-color: ${theme.colors.gray1};
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
`;

const BuildingNumber = styled.div`
  overflow: hidden;
  color: var(--07, #6c757d);
  text-overflow: ellipsis;
  font-family: Pretendard SemiBold;
  font-size: 12px;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;
`;

const BuildingFloor = styled.div`
  overflow: hidden;
  color: var(--07, #6c757d);
  text-overflow: ellipsis;
  font-family: Pretendard SemiBold;
  font-size: 12px;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;
`;
