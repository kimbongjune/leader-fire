import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import useDeviceType from '@/hooks/useDeviceType';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import { DeviceType } from '@/types/types';
import { Flex } from '@chakra-ui/react';
import Calling from '../../../../../public/images/icons/phone_in_talk.svg';

interface Props {
  contentTop: ReactNode;
  contentBottom: ReactNode;
  address?: ReactNode;
  call?:string;
}

const ResidentsItem = (props: Props) => {
  const deviceType = useDeviceType();

  return (
    <Container>
      {props.call ? (
        <a href={`tel:${props.call}`}>
          <Flex gap="12px" alignItems="center" width="100%">
            <PhoneWrapper deviceType={deviceType}>
              <IconWrapper width="32px" height="32px" color={theme.colors.blue}>
                <Calling />
              </IconWrapper>
            </PhoneWrapper>
            <ContentArea>
              <ContentTop>{props.contentTop}</ContentTop>
              <ContentBottom>{props.contentBottom}</ContentBottom>
            </ContentArea>
          </Flex>
          {props.address && <Address>{props.address}</Address>}
        </a>
      ) : (
        <React.Fragment>
          <Flex gap="12px" alignItems="center" width="100%">
            <PhoneWrapper deviceType={deviceType}>
              <IconWrapper width="32px" height="32px" color={theme.colors.gray}>
                <Calling />
              </IconWrapper>
            </PhoneWrapper>
            <ContentArea>
              <ContentTop>{props.contentTop}</ContentTop>
              <ContentBottom>{props.contentBottom}</ContentBottom>
            </ContentArea>
          </Flex>
          {props.address && <Address>{props.address}</Address>}
        </React.Fragment>
      )}
    </Container>
  );
};

export default ResidentsItem;

const Container = styled.div`
  border-radius: 4px;
  border: 1px solid ${theme.colors.gray2};
  padding: 12px 16px;
`;

const PhoneWrapper = styled.div<{ deviceType: DeviceType }>`
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray2};
  background-color: ${theme.colors.white};
  padding: 8px;
  width: fit-content;

  ${props =>
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      width: 48px;
      height: 48px;
      border-radius: 50%;
      padding: 8px;
      border: none;
      background-color: rgba(121, 158, 255, 0.15);
    `}
`;

const ContentArea = styled.div`
  flex: 1;
  overflow: hidden;
`;

const ContentTop = styled.div`
  color: ${theme.colors.gray8};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;

const ContentBottom = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
  margin-top: 4px;
`;

const Address = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Medium';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
  margin-top: 16px;
`;
