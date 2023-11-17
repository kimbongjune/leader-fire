import React, { ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import Calling from '../../../../../public/images/icons/phone_in_talk.svg';
import Map from '../../../../../public/images/icons/mapOutline.svg';
import ArrowRight from '../../../../../public/images/icons/arrow-right.svg';
import MapModal from '../MapModal';
import FacilityModal from './FacilityModal';
import { DeviceType } from '@/types/types';

interface Props {
  phoneName?: string;
  distance?: string;
  name?: string;
  storeName?: string;
  storeAddress?: string;
  buildingInfo?: ReactNode;
  containerBottom?: ReactNode;
  buildingAddress?: ReactNode;
  onClick?: any;
  title: string;
  isSelected?: boolean;
  hasModal?: boolean;
  deviceType?: DeviceType;
}

const TabletFacilityItem = (props: Props) => {
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
        <Flex gap={props.deviceType === 'tabletHorizontal' ? '16px' : '8px'} alignItems="center">
          <PhoneWrapper>
            <PhoneIconWrapper onClick={() => console.log('방제실 전화번호 클릭')}>
              <IconWrapper width="32px" height="32px" color={theme.colors.green}>
                <Calling />
              </IconWrapper>
            </PhoneIconWrapper>
            <PhoneName>{props.phoneName}</PhoneName>
          </PhoneWrapper>

          <ContentWrapper>
            <Flex width="100%">
              <LeftWrapper>
                <Flex gap="8px" alignItems="center">
                  <Distance>{props.distance}</Distance>
                  <MapButton onClick={e => onClickMap(e)}>
                    <IconWrapper width="16px" height="16px" color={theme.colors.white}>
                      <Map />
                    </IconWrapper>
                    지도
                    <IconWrapper width="12px" height="12px" color={theme.colors.gray4}>
                      <ArrowRight />
                    </IconWrapper>
                  </MapButton>
                </Flex>
                <Name>{props.name}</Name>
                {props.buildingAddress && <BuildingAddress>{props.buildingAddress}</BuildingAddress>}
              </LeftWrapper>

              <RightWrapper onClick={e => props.hasModal && onClickItem(props.title)}>
                <StoreName>{props.storeName}</StoreName>
                <StoreAddress>{props.storeAddress}</StoreAddress>
              </RightWrapper>
            </Flex>
            {props.buildingInfo && <BuildingInfo>{props.buildingInfo}</BuildingInfo>}
          </ContentWrapper>
        </Flex>
        {props.containerBottom && <ContainerBottom>{props.containerBottom}</ContainerBottom>}
      </Container>

      {isModalOpen && <FacilityModal setIsModalOpen={setIsModalOpen} isDangerCategory={isDangerFacilities} />}
      {isMapModalOpen && <MapModal setIsMapModalOpen={setIsMapModalOpen} />}
    </>
  );
};

export default TabletFacilityItem;

TabletFacilityItem.defaultProps = {
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
  padding: 12px 16px;
  flex: 1;
  // max-width: 50%;
  position: relative;
`;

const PhoneWrapper = styled.div``;

const PhoneIconWrapper = styled.div<{ type?: string; deviceType?: DeviceType }>`
  // margin-right: 16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  padding: 8px;
  outline: none;
  background-color: rgba(119, 209, 52, 0.15);
  color: ${theme.colors.green};
`;

const PhoneName = styled.div`
  margin-top: 4px;
  color: ${theme.colors.gray6};
  font-family: 'Pretendard Bold';
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
  text-align: center;
  // margin-right: 16px;
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const LeftWrapper = styled.div`
  border-right: 1px solid ${theme.colors.gray2};
  padding-right: 12px;
  margin-right: 12px;
`;

const Distance = styled.div`
  color: ${theme.colors.gray5};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;

const MapButton = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  border-radius: 4px;
  padding: 2px 4px;
  background-color: ${theme.colors.gray6};
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
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
  min-width: 81px;
  max-width: 89px;
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.32px;
  margin-top: 8px;
`;

const RightWrapper = styled.div`
  padding: 6px 0;
`;

const StoreName = styled.div`
  overflow: hidden;
  color: ${theme.colors.gray7};
  text-overflow: ellipsis;
  font-size: 14px;
  font-style: normal;
  letter-spacing: -0.28px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-family: 'Pretendard Bold';
  margin-top: 6px;
  margin-bottom: 8px;
  line-height: 20px;
`;

const StoreAddress = styled.div`
  overflow: hidden;
  color: ${theme.colors.gray6};
  text-overflow: ellipsis;
  font-family: 'Pretendard Medium';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  margin-top: 0px;
  display: block;
  min-width: 149px;
`;

const BuildingInfo = styled.div`
  width: 100%;
  border-radius: 4px;
  padding: 8px;
  background-color: ${theme.colors.gray2};
  margin-top: 8px;
`;

const ContainerBottom = styled.div`
  margin-top: 16px;
`;

const BuildingAddress = styled.div`
  margin-top: 4px;
`;
