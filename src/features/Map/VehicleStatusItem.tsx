import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType } from '@/types/types';
import { css } from '@emotion/react';

interface Props {
  status: string;
  name: string;
  transmissionStatus: string;
}

const VehicleStatusItem = (props: Props) => {
  const deviceType = useDeviceType();

  return (
    <Container deviceType={deviceType}>
      <Status deviceType={deviceType} status={props.status}>
        {props.status}
      </Status>
      <Wrapper deviceType={deviceType}>
        <Name deviceType={deviceType}>{props.name}</Name>
        <TransStatus deviceType={deviceType} status={props.transmissionStatus}>
          {props.transmissionStatus}
        </TransStatus>
      </Wrapper>
    </Container>
  );
};

export default VehicleStatusItem;

const Container = styled.div<{ deviceType: DeviceType }>`
  display: flex;
  background-color: ${theme.colors.gray2};
  border-radius: 4px;
`;

const Status = styled.div<{ status: string; deviceType: DeviceType }>`
  width: fit-content;
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 4px;
  color: ${theme.colors.white};
  border-radius: 4px 0 0 4px;
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.24px;

  ${({ deviceType }) => {
    return (
      deviceType !== 'mobile' &&
      css`
        padding: 16px 12px;
        font-family: 'Pretendard Bold';
        font-size: 14px;
        letter-spacing: -0.28px;
      `
    );
  }}

  ${({ status }) => {
    if (status === '출동') {
      return `
          background:${theme.colors.orange};
        `;
    }

    if (status === '도착') {
      return `
          background:${theme.colors.blue};
        `;
    }

    if (status === '귀소') {
      return `
          background:${theme.colors.gray3};
        `;
    }
  }}
`;

const Wrapper = styled.div<{ deviceType: DeviceType }>`
  padding: 4px;
  border-radius: 0px 4px 4px 0px;
  border-top: 1px solid ${theme.colors.gray2};
  border-right: 1px solid ${theme.colors.gray2};
  border-bottom: 1px solid ${theme.colors.gray2};
  display: flex;
  align-items: center;
  width: 100%;
  ${({ deviceType }) => {
    return (
      deviceType !== 'mobile' &&
      css`
        padding: 4px 12px;
      `
    );
  }}
`;

const Name = styled.div<{ deviceType: DeviceType }>`
  flex: 1;
  font-family: 'Pretendard Medium';
  font-size: 14px;
  letter-spacing: -0.28px;
  color: ${theme.colors.gray8};
  text-align: center;

  ${({ deviceType }) => {
    return (
      deviceType !== 'mobile' &&
      css`
        font-family: 'Pretendard SemiBold';
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.32px;
      `
    );
  }}
`;

const TransStatus = styled.div<{ status: string; deviceType: DeviceType }>`
  width: fit-content;
  padding: 2px 4px;
  text-align: center;
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
  border-radius: 4px;

  ${({ deviceType }) => {
    return (
      deviceType !== 'mobile' &&
      css`
        font-size: 14px;
        letter-spacing: -0.28px;
      `
    );
  }}

  ${({ status }) => {
    if (status === '전송 성공') {
      return `
          color:#42C147;
          background-color:rgba(66, 193, 71, 0.15);;
        `;
    }

    if (status === '전송 실패') {
      return `
          color:${theme.colors.darkRed};
          background-color:rgba(228, 89, 89, 0.15);
        `;
    }

    if (status === '확인 완료') {
      return `
          color:${theme.colors.blue};
          background-color:rgba(121, 158, 255, 0.15);
        `;
    }
  }}
`;
