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

const NeighborhoodFilterItem = (props: Props) => {
  const deviceType = useDeviceType();
  const router = useRouter();
  const selectedType = router.query.type;

  return (
    <Wrapper onClick={props.onClick} isSelected={selectedType === props.filterName} type={props.filterName} deviceType={deviceType}>
      <Text deviceType={deviceType}>
        {props.filterName === 'collaboration' && '협업대응'}
        {props.filterName === 'residents' && '인근주민'}
        {props.filterName === 'vulnerablePerson' && '인근피난약자'}
        {props.filterName === 'facilities' && '인근시설'}
      </Text>
      <Number isSelected={selectedType === props.filterName} type={props.filterName} deviceType={deviceType}>
        {props.filterName === 'collaboration' && `${props.countByType['collaboration']}명`}
        {props.filterName === 'residents' && `${props.countByType['residents']}명`}
        {props.filterName === 'vulnerablePerson' && `${props.countByType['vulnerablePerson']}건`}
        {props.filterName === 'facilities' && `${props.countByType['facilities']}건`}
      </Number>
    </Wrapper>
  );
};

export default NeighborhoodFilterItem;

const Wrapper = styled.div<any>`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--02, #e9ecef);
  background: var(--01, #f8f9fa);
  color: ${theme.colors.gray6};
  height: 54px;
  gap: 2px;
  padding: 8px 0px;

  ${({ isSelected, type }) => {
    if (isSelected) {
      if (type === 'collaboration') {
        return `
          background: #FF8A3A26;
          border: 1px solid ${theme.colors.orange};
          color:${theme.colors.orange};
        `;
      }

      if (type === 'residents') {
        return `
          border: 1px solid ${theme.colors.blue};
          background: rgba(121, 158, 255, 0.15);
          color:${theme.colors.blue};
        `;
      }

      if (type === 'vulnerablePerson') {
        return `
          border: 1px solid ${theme.colors.purple};
          background: rgba(164, 101, 227, 0.15);
          color:${theme.colors.purple};
        `;
      }

      if (type === 'facilities') {
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
      flex-direction: row;
      justify-content: center;
      height: 56px;
      gap: 0 8px;
      margin-bottom: 0;
    `}

      ${props =>
    props.deviceType === 'tabletHorizontal' &&
    css`
      flex: none;
      flex-direction: column;
      height: 100%;
      min-height: 118px;
      width: 176px;
      padding: 8px 24px;
      gap: 24px;
      margin-bottom: 0;
    `}
`;

const Text = styled.div<{ deviceType?: DeviceType }>`
  font-family: 'Pretendard Bold';
  font-weight: normal;
  font-style: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.24px;
  ${props =>
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      font-size: 20px;
      line-height: 32px;
      letter-spacing: -0.4px;
    `}
`;

const Number = styled.div<{ isZero?: boolean; deviceType?: DeviceType; isSelected: boolean; type?: string }>`
  color: ${theme.colors.gray8};
  font-family: 'Pretendard Bold';
  font-weight: normal;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.28px;
  text-align: center;

  ${({ isSelected, type }) => {
    if (isSelected) {
      if (type === 'collaboration') {
        return `
          color:${theme.colors.orange};
        `;
      }

      if (type === 'residents') {
        return `
          color:${theme.colors.blue};
        `;
      }

      if (type === 'vulnerablePerson') {
        return `
          color:${theme.colors.purple};
        `;
      }

      if (type === 'facilities') {
        return `
          color: ${theme.colors.green};
        `;
      }
    }
  }}

  ${({ isZero }) =>
    isZero &&
    `
  color: var(--04, #CED4DA);
  font-size: 20px;
  line-height: 20px; /* 100% */
  letter-spacing: -0.4px;
  `}

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
      font-family: Pretendard Bold;
      font-size: 24px;
      line-height: 32px; /* 133.333% */
      letter-spacing: -0.48px;
      `;
    }
  }}
`;
