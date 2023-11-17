import React from 'react';
import styled from '@emotion/styled';
import { DeviceType } from '@/types/types';
import { css } from '@emotion/react';
import Filter from '@/components/common/Filter/Filter';
import HistoryFilterItem from './HistoryFilterItem';
import { CountByType } from './HistoryList';

interface Props {
  countByType: CountByType;
  deviceType?: DeviceType;
}

const HistoryFilter = (props: Props) => {
  const { deviceType } = props;
  return (
    <Wrapper deviceType={deviceType}>
      <Filter queryKey="type" filterNames={['report', 'rescue', 'patient', 'mobilize']} filterItem={filterProps => <HistoryFilterItem {...filterProps} countByType={props.countByType} />} />
    </Wrapper>
  );
};

export default HistoryFilter;

const Wrapper = styled.div<{ deviceType?: DeviceType }>`
  .filter-container {
    gap: 4px;
    ${props =>
      props.deviceType === 'tabletHorizontal' &&
      css`
        flex-direction: column;
        gap: 10px;
      `};
    ${props =>
      props.deviceType === 'tabletVertical' &&
      css`
        gap: 10px;
      `};
  }
`;
