import theme from '@/theme/colors';
import styled from '@emotion/styled';
import RightArrowIcon from '../../../public/images/icons/arrow-circle-right.svg';
import LeftArrowIcon from '../../../public/images/icons/arrow-circle-left.svg';
import AmbulanceIcon from '../../../public/images/icons/ambulance.svg';
import CheckCircleIcon from '../../../public/images/icons/check-circle.svg';
import EmergencyIcon from '../../../public/images/icons/emergency.svg';
import CarCrashIcon from '../../../public/images/icons/car-crash.svg';
import HistoryIcon from '../../../public/images/icons/history.svg';
import ChipExtractionIcon from '../../../public/images/icons/chip-extraction.svg';
import MovingMinistryIcon from '../../../public/images/icons/moving-ministry.svg';
import EcgHeartIcon from '../../../public/images/icons/ecg-heart.svg';
import InHomeIcon from '../../../public/images/icons/in-home.svg';
import OutHomeIcon from '../../../public/images/icons/out-home.svg';
import CheckInIcon from '../../../public/images/icons/check-in.svg';
import { useState } from 'react';
import { Box, Flex, Stack } from '@chakra-ui/react';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import { DeviceType } from '@/types/types';
import useDeviceType from '@/hooks/useDeviceType';
import VehicleStatusPanelItem from '../Map/VehicleStatusPanelItem';

interface Props {
  isAuthenticated?: boolean; // 차량 인증
  isOut?: boolean; // 출동 여부
  hasArrivedToSite?: boolean; // 도착 여부
  hasDepartedOnSite?: boolean; // 현장 출발 여부
  hasArrivedToHospital?: boolean; // 병원 도착 여부
  isRescueFinished?: boolean; // 구조 완료 여부
  isAvailable?: boolean; // 출동가능 여부
  isUnAvailable?: boolean; // 출동불가능 여부
  isIn?: boolean; // 귀소 완료 여부
  onRefatch?: () => void; // 리패치 콜백
  changeStatus: (value: string) => void; // 상태 변경 콜백
}

const VehicleStatusPanel = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const deviceType = useDeviceType();

  return (
    <Container>
      <Button deviceType={deviceType} isActive={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <Stack align="center" spacing="4px">
          <IconWrapper width="24px" height="24px" color={theme.colors.white}>
            {!isOpen && <RightArrowIcon />}
            {isOpen && <LeftArrowIcon />}
          </IconWrapper>
          {!isOpen && <span>패널</span>}
          {isOpen && <span>패널닫기</span>}
        </Stack>
      </Button>
      {isOpen && (
        <Panel>
          <Stack spacing="16px">
            {/* 차량 인증 */}
            <Flex gap="8px">
              <PanelItemWrapper isActive={props.isAuthenticated} justify="space-between" minW="316px" h="fit-content" onClick={() => props.changeStatus('isAuthenticated')}>
                <Flex gap="8px" align="center">
                  <IconWrapper width="20px" height="20px" color={props.isAuthenticated ? theme.colors.orange : theme.colors.gray6}>
                    <AmbulanceIcon />
                  </IconWrapper>
                  <PanelText isActive={props.isAuthenticated}>차량 인증</PanelText>
                </Flex>
                <IconWrapper width="20px" height="20px" color={props.isAuthenticated ? theme.colors.orange : theme.colors.gray9}>
                  <CheckCircleIcon />
                </IconWrapper>
              </PanelItemWrapper>
              {deviceType === 'tabletVertical' && (
                <>
                  <VehicleStatusPanelItem isActive={props.isOut} activeColor={theme.colors.orange} onlyBackground={true} icon={<EmergencyIcon />} title="출동" onClick={() => props.changeStatus('isOut')}></VehicleStatusPanelItem>
                  <VehicleStatusPanelItem isActive={true} activeColor={theme.colors.orange} icon={<CarCrashIcon />} title="차량정체" subTitle="시간갱신" extraIcon={<HistoryIcon />} onClick={() => props.onRefatch}></VehicleStatusPanelItem>
                  <VehicleStatusPanelItem
                    isActive={props.hasArrivedToSite}
                    activeColor={theme.colors.orange}
                    hasBorder={true}
                    hasClickIcon={true}
                    icon={<EmergencyIcon />}
                    title="현장도착"
                    onClick={() => props.changeStatus('hasArrivedToSite')}
                  ></VehicleStatusPanelItem>
                </>
              )}
            </Flex>
            <Flex gap="8px">
              {deviceType === 'tabletHorizontal' && (
                <>
                  <VehicleStatusPanelItem isActive={props.isOut} activeColor={theme.colors.orange} onlyBackground={true} icon={<EmergencyIcon />} title="출동" onClick={() => props.changeStatus('isOut')}></VehicleStatusPanelItem>
                  <VehicleStatusPanelItem isActive={true} activeColor={theme.colors.orange} icon={<CarCrashIcon />} title="차량정체" subTitle="시간갱신" extraIcon={<HistoryIcon />} onClick={() => props.onRefatch}></VehicleStatusPanelItem>
                  <VehicleStatusPanelItem
                    isActive={props.hasArrivedToSite}
                    activeColor={theme.colors.orange}
                    hasBorder={true}
                    hasClickIcon={true}
                    icon={<EmergencyIcon />}
                    title="현장도착"
                    onClick={() => props.changeStatus('hasArrivedToSite')}
                  ></VehicleStatusPanelItem>
                </>
              )}
              <VehicleStatusPanelItem
                isActive={props.hasDepartedOnSite}
                activeColor={theme.colors.green}
                hasBorder={true}
                hasClickIcon={true}
                icon={<ChipExtractionIcon />}
                title="구급"
                subTitle="현장출발"
                onClick={() => props.changeStatus('hasDepartedOnSite')}
              ></VehicleStatusPanelItem>
              <VehicleStatusPanelItem
                isActive={props.hasArrivedToHospital}
                activeColor={theme.colors.green}
                hasBorder={true}
                hasClickIcon={true}
                icon={<MovingMinistryIcon />}
                title="구급"
                subTitle="병원도착"
                onClick={() => props.changeStatus('hasArrivedToHospital')}
              ></VehicleStatusPanelItem>
              <VehicleStatusPanelItem
                isActive={props.isRescueFinished}
                activeColor={theme.colors.green}
                hasBorder={true}
                hasClickIcon={true}
                icon={<EcgHeartIcon />}
                title="구급"
                subTitle="구조완료"
                onClick={() => props.changeStatus('isRescueFinished')}
              ></VehicleStatusPanelItem>
              <VehicleStatusPanelItem
                isActive={props.isAvailable}
                activeColor={theme.colors.blue}
                hasBorder={true}
                hasClickIcon={true}
                icon={<InHomeIcon />}
                title="귀소"
                subTitle="출동가"
                onClick={() => props.changeStatus('isAvailable')}
              ></VehicleStatusPanelItem>
              <VehicleStatusPanelItem
                isActive={props.isUnAvailable}
                activeColor={theme.colors.blue}
                hasBorder={true}
                hasClickIcon={true}
                icon={<OutHomeIcon />}
                title="귀소"
                subTitle="출동불"
                onClick={() => props.changeStatus('isUnAvailable')}
              ></VehicleStatusPanelItem>
              <VehicleStatusPanelItem isActive={props.isIn} activeColor={theme.colors.blue} onlyBackground={true} icon={<CheckInIcon />} title="귀소완료" onClick={() => props.changeStatus('isIn')}></VehicleStatusPanelItem>
            </Flex>
          </Stack>
        </Panel>
      )}
    </Container>
  );
};

export default VehicleStatusPanel;

const Container = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  bottom: 81px;
  z-index: 100;
`;

const Button = styled.button<{ deviceType?: DeviceType; isActive?: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 248px;
  min-width: 48px;
  box-sizing: border-box;

  color: ${theme.colors.white};
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;

  border-top: 2px solid ${theme.colors.gray4};
  border-right: 2px solid ${theme.colors.gray4};
  border-bottom: 2px solid ${theme.colors.gray4};
  border-radius: 0px 8px 8px 0px;
  background: ${theme.colors.gray7};

  padding: 0 10px;

  ${({ isActive }) =>
    isActive &&
    `
    border-radius: unset;
    border-top: unset;
    border-bottom: unset;
    padding: 0 16px;
  `}

  ${({ deviceType }) => {
    if (deviceType === 'tabletHorizontal') {
      return `
          min-height: 192px;
          min-width: 48px;
      `;
    }
  }}
`;

const Panel = styled.div`
  padding: 16px;
  background: ${theme.colors.gray2};
  border-radius: 0 16px 16px 0;
  border-top: 1px solid ${theme.colors.gray4};
  border-right: 1px solid ${theme.colors.gray4};
  border-bottom: 1px solid ${theme.colors.gray4};
`;

const PanelItemWrapper = styled(Flex)<{ isActive?: boolean }>`
  padding: 12px;
  background: ${theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray9};

  ${({ isActive }) =>
    isActive &&
    `
    border: 1px solid ${theme.colors.orange};
    background: var(--orange_15, linear-gradient(0deg, var(--colors-tp-orange, rgba(255, 138, 58, 0.15)) 0%, var(--colors-tp-orange, rgba(255, 138, 58, 0.15)) 100%), #FFF);;
  `}
`;

const PanelText = styled.div<{ isActive?: boolean }>`
  color: ${theme.colors.gray7};
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 16px; /* 100% */
  letter-spacing: -0.32px;

  ${({ isActive }) =>
    isActive &&
    `
  color: ${theme.colors.orange};
`}
`;
