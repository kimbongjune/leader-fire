import React from 'react';
import theme from '@/theme/colors';
import styled from '@emotion/styled';
import { DeviceType } from '@/types/types';
import { useRouter } from 'next/router';
import useDeviceType from '@/hooks/useDeviceType';
import { css } from '@emotion/react';

interface Props {
  filterName?: string;
  countByType: any;
  onClick?: () => void;
}

const HistoryFilterItem = (props: Props) => {
  const deviceType = useDeviceType();
  const router = useRouter();
  const selectedType = router.query.type;

  return (
    <Wrapper onClick={props.onClick} isSelected={selectedType === props.filterName} type={props.filterName} deviceType={deviceType}>
      <Text deviceType={deviceType}>
        {props.filterName === 'report' && '신고이력'}
        {props.filterName === 'rescue' && '구조이력'}
        {props.filterName === 'patient' && '환자이력'}
        {props.filterName === 'mobilize' && '인근출동'}
      </Text>
      <Number isSelected={selectedType === props.filterName} type={props.filterName} deviceType={deviceType}>
        {props.filterName === 'report' && `${props.countByType['report']}건`}
        {props.filterName === 'rescue' && `${props.countByType['rescue']}건`}
        {props.filterName === 'patient' && `${props.countByType['patient']}건`}
        {props.filterName === 'mobilize' && `${props.countByType['mobilize']}건`}
      </Number>
    </Wrapper>
  );
};

export default HistoryFilterItem;

const Wrapper = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  border-radius: 4px;
  border: 1px solid ${theme.colors.gray2};
  background: ${theme.colors.gray1};
  color: ${theme.colors.gray6};
  height: 36px;
  gap: 0 4px;

  ${({ isSelected, type }) => {
    if (isSelected) {
      if (type === 'report') {
        return `
          background: #FF8A3A26;
          border: 1px solid ${theme.colors.orange};
          color:${theme.colors.orange};
        `;
      }

      if (type === 'rescue') {
        return `
          border: 1px solid ${theme.colors.blue};
          background: rgba(121, 158, 255, 0.15);
          color:${theme.colors.blue};
        `;
      }

      if (type === 'patient') {
        return `
          border: 1px solid ${theme.colors.purple};
          background: rgba(164, 101, 227, 0.15);
          color:${theme.colors.purple};
        `;
      }

      if (type === 'mobilize') {
        return `
          border: 1px solid ${theme.colors.green};
          background: rgba(29, 206, 0, 0.15);
          color: ${theme.colors.green};
        `;
      }
    }
  }}

  ${props =>
    props.deviceType === 'tabletVertical' &&
    css`
      height: 56px;
      gap: 0 8px;
    `}

  ${props =>
    props.deviceType === 'tabletHorizontal' &&
    css`
      flex: none;
      flex-direction: column;
      height: 100%;
      width: 176px;
      padding: 8px 24px;
    `}
`;

const Text = styled.div<any>`
  font-family: 'Pretendard Bold';
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.28px;

  ${props =>
    props.deviceType === 'tabletVertical' &&
    css`
      font-size: 20px;
      line-height: 32px;
      letter-spacing: -0.4px;
    `}

  ${props =>
    props.deviceType === 'tabletHorizontal' &&
    css`
      font-size: 20px;
      line-height: 28px;
      letter-spacing: -0.4px;
      margin-bottom: 24px;
    `}
`;

const Number = styled.div<any>`
  color: ${theme.colors.gray8};
  font-family: 'Pretendard Bold';
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.28px;

  ${({ isSelected, type }) => {
    if (isSelected) {
      if (type === 'report') {
        return `
          color:${theme.colors.orange};
        `;
      }

      if (type === 'rescue') {
        return `
          color:${theme.colors.blue};
        `;
      }

      if (type === 'patient') {
        return `
          color:${theme.colors.purple};
        `;
      }

      if (type === 'mobilize') {
        return `
          color: ${theme.colors.green};
        `;
      }
    }
  }}

  ${({ isZero }) =>
    isZero &&
    `
  color: ${theme.colors.gray4};
  font-family: NanumSquare;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.28px;
  `}

  ${props =>
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      font-size: 24px;
      line-height: 32px;
      letter-spacing: -0.48px;
    `}
`;
