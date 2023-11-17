import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { VStack } from '@chakra-ui/react';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import ArrowUp from '../../../public/images/icons/arrow-up.svg';
import ArrowDown from '../../../public/images/icons/arrowDown.svg';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType } from '@/types/types';
import { css } from '@emotion/react';

interface Props {
  isClickWater: boolean;
  isClickTarget: boolean;
  isClickDanger: boolean;
  isClickVolunteerCaptain: boolean;
  isClickVulnerble: boolean;
  changeStatus: (value: string) => void;
}

const DrawerButtons = (props: Props) => {
  const deviceType = useDeviceType();
  const [isOpen, setIsOpen] = useState(deviceType === 'mobile' ? false : true);

  return (
    <Container deviceType={deviceType}>
      <ButtonWrapper deviceType={deviceType}>
        {!isOpen && deviceType === 'mobile' && (
          <Button onClick={() => setIsOpen(true)}>
            <IconWrapper width="20px" height="20px" color={theme.colors.white}>
              <ArrowUp />
            </IconWrapper>
            <ButtonText>펼치기</ButtonText>
          </Button>
        )}

        {isOpen && (
          <>
            {deviceType === 'mobile' && (
              <Button onClick={() => setIsOpen(false)}>
                <IconWrapper width="20px" height="20px" color={theme.colors.white}>
                  <ArrowDown />
                </IconWrapper>
                <ButtonText>접기</ButtonText>
              </Button>
            )}

            {deviceType !== 'mobile' && <Distance>인근</Distance>}

            <VStack marginTop="12px" gap="8px" w="100%">
              <ButtonItem status={props.isClickWater} onClick={() => props.changeStatus('water')}>
                <ButtonItemText>소방용수</ButtonItemText>
                <ButtonItemNumber>2</ButtonItemNumber>
              </ButtonItem>

              <ButtonItem status={props.isClickTarget} onClick={() => props.changeStatus('target')}>
                <ButtonItemText>대상물</ButtonItemText>
                <ButtonItemNumber>2</ButtonItemNumber>
              </ButtonItem>

              <ButtonItem status={props.isClickDanger} onClick={() => props.changeStatus('danger')}>
                <ButtonItemText>위협물</ButtonItemText>
                <ButtonItemNumber>2</ButtonItemNumber>
              </ButtonItem>

              <ButtonItem status={props.isClickVolunteerCaptain} onClick={() => props.changeStatus('captain')}>
                <ButtonItemText>의용대장</ButtonItemText>
                <ButtonItemNumber>2</ButtonItemNumber>
              </ButtonItem>

              <ButtonItem status={props.isClickVulnerble} onClick={() => props.changeStatus('vulnerble')}>
                <ButtonItemText>피난약자</ButtonItemText>
                <ButtonItemNumber>2</ButtonItemNumber>
              </ButtonItem>
            </VStack>
          </>
        )}
      </ButtonWrapper>
    </Container>
  );
};

export default DrawerButtons;

const Container = styled.div<{ deviceType: DeviceType }>`
  position: absolute;
  bottom: 81px;
  right: 0;
  min-width: 128px;
  z-index: 99;
  border: 1px solid ${theme.colors.gray2};
  border-radius: 8px;
  ${({ deviceType }) => {
    if (deviceType === 'tabletHorizontal') {
      return `
      right: 32px;
      bottom: 121px;
      `;
    }
    if (deviceType === 'tabletVertical') {
      return `
        right: 16px;
        bottom: 105px;
      `;
    }
  }}
`;

const ButtonWrapper = styled.div<{ deviceType: DeviceType }>`
  padding: 8px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray2};
  border-radius: 4px 4px 0 0;
  ${({ deviceType }) => {
    return (
      deviceType !== 'mobile' &&
      css`
        padding: 12px 8px 8px;
      `
    );
  }}
`;

const Button = styled.div`
  padding: 8px;
  border-radius: 4px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: ${theme.colors.gray6};
`;

const ButtonText = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
`;

const ButtonItem = styled.div<{ status?: boolean }>`
  padding: 8px 12px;
  border-radius: 4px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${theme.colors.gray2};
  background: ${theme.colors.white};
  width: 100%;
  color: ${theme.colors.gray5};

  ${({ status }) => {
    if (status) {
      return `
       border: 1px solid ${theme.colors.orange};
      background: linear-gradient(0deg, rgba(255, 138, 58, 0.15) 0%, rgba(255, 138, 58, 0.15) 100%), #fff;
    color: ${theme.colors.orange};
    `;
    }
  }}
`;

const ButtonItemText = styled.div`
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
`;

const ButtonItemNumber = styled.div`
  color: ${theme.colors.gray3};
  font-family: 'Pretendard Bold';
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const Distance = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
  text-align: center;
`;
