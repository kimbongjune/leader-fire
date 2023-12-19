import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType } from '@/types/types';
import { css } from '@emotion/react';
import Location from '../../../public/images/icons/location.svg';
import FireTruck from '../../../public/images/icons/fireTruck.svg';
import Video from '../../../public/images/icons/video.svg';
import Airplane from '../../../public/images/icons/airplane.svg';

interface Props {
  isClickRescuePosition: boolean;
  isClickVehicle: boolean;
  isClickVideo: boolean;
  hasSkyButton?: boolean;
  changeStatus: (value: string) => void;
  setHasSky?: (hasSky: boolean) => void;
  vihicleMarkerCount:number;
  videoMarkerCount:number;
}

interface SkyButtonProps {
  hasSky: boolean;
}

const FloatingButtons = (props: Props) => {
  const deviceType = useDeviceType();

  return (
    <Container>
      <Flex alignItems="center" justifyContent="space-between" padding={deviceType !== 'tabletHorizontal' ? '16px' : '40px 32px 0'}>
      {/* <Flex direction={props.direction} alignItems="center" justifyContent="space-between"> */}
        <Flex gap="8px" alignItems="center" justifyContent="center" w={deviceType === 'mobile' ? '100%' : '50%'}>
          <Button deviceType={deviceType} colorType="green" status={props.isClickRescuePosition} onClick={() => props.changeStatus('rescuePosition')}>
            <Flex gap="2px">
              <IconWrapper width="16px" height="16px" color={props.isClickRescuePosition ? theme.colors.green : theme.colors.gray5}>
                <Location />
              </IconWrapper>
              <ButtonText deviceType={deviceType}>긴급구조위치</ButtonText>
            </Flex>
          </Button>

          <Button deviceType={deviceType} colorType="orange" status={props.isClickVehicle} onClick={() => props.changeStatus('vehicle')}>
            <Flex gap="2px">
              <IconWrapper width="16px" height="16px" color={props.isClickVehicle ? theme.colors.orange : theme.colors.gray5}>
                <FireTruck />
              </IconWrapper>
              <ButtonText deviceType={deviceType}>출동차량</ButtonText>
            </Flex>
            <Count>{props.vihicleMarkerCount}</Count>
          </Button>

          {/* <Button deviceType={deviceType} colorType="blue" status={props.isClickVideo} onClick={() => props.changeStatus('video')}>
            <Flex gap="2px">
              <IconWrapper width="16px" height="16px" color={props.isClickVideo ? theme.colors.blue : theme.colors.gray5}>
                <Video />
              </IconWrapper>
              <ButtonText deviceType={deviceType}>영상공유</ButtonText>
            </Flex>
            <Count>{props.videoMarkerCount | 0}</Count>
          </Button> */}
        </Flex>
        {deviceType !== 'mobile' && props.hasSkyButton != null && props.setHasSky != undefined && (
          <SkyButton hasSky={props.hasSkyButton} onClick={() => props.setHasSky && props.setHasSky(!props.hasSkyButton)}>
            <Flex gap="4px">
              <IconWrapper width="16px" height="16px" color={theme.colors.white}>
                <Airplane />
              </IconWrapper>
              <ButtonText deviceType={deviceType}>항공사진</ButtonText>
            </Flex>
          </SkyButton>
        )}
      </Flex>
    </Container>
  );
};

export default FloatingButtons;
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
`;

const Button = styled.div<{ colorType: string; status?: boolean; deviceType: DeviceType }>`
  padding: 8px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 109px;
  border: 1px solid ${theme.colors.gray2};
  background: #fff;
  color: ${theme.colors.gray5};
  flex: 1;
  ${({ deviceType }) => {
    return (
      deviceType !== 'mobile' &&
      css`
        padding: 12px;
        min-width: 136px;
        height: 40px;
      `
    );
  }}

  ${({ colorType, status }) => {
    if (status) {
      if (colorType === 'green') {
        return `
      border: 1px solid ${theme.colors.green};
      color:  ${theme.colors.green};
      background: linear-gradient(0deg, rgba(119, 209, 52, 0.15) 0%, rgba(119, 209, 52, 0.15) 100%), #fff;
      `;
      }
      if (colorType === 'orange') {
        return `
      border: 1px solid ${theme.colors.orange};
      color:  ${theme.colors.orange};
      background: linear-gradient(0deg, rgba(255, 138, 58, 0.15) 0%, rgba(255, 138, 58, 0.15) 100%), #fff;
      `;
      }
      if (colorType === 'blue') {
        return `
        border: 1px solid ${theme.colors.blue};
        color:  ${theme.colors.blue};
        background: linear-gradient(0deg, rgba(121, 158, 255, 0.15) 0%, rgba(121, 158, 255, 0.15) 100%), #fff;
        `;
      }
    }
  }}
`;

const ButtonText = styled.div<{ deviceType: DeviceType }>`
  font-family: 'Pretendard Bold';
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.24px;

  ${({ deviceType }) => {
    return (
      deviceType !== 'mobile' &&
      css`
        font-size: 14px;
        letter-spacing: -0.28px;
      `
    );
  }}
`;

const Count = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
  margin-left: auto;
`;

const SkyButton = styled.button<SkyButtonProps>`
  padding: 8px 30px;
  width: fit-content;
  height: 40px;
  border-radius: 8px;
  background-color: ${props => props.hasSky ? theme.colors.orange : theme.colors.gray3};
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;
