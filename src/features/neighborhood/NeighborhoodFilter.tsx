import { DeviceType } from '@/types/types';
import styled from '@emotion/styled';
import React from 'react';
import { CountByType } from './NeighborhoodList';
import Filter from '@/components/common/Filter/Filter';
import NeighborhoodFilterItem from './NeighborhoodFilterItem';
import { css } from '@emotion/react';

interface Props {
  countByType: CountByType;
  deviceType?: DeviceType;
}

const NeighborhoodFilter = (props: Props) => {
  const { deviceType } = props;

  return (
    <Wrapper deviceType={deviceType}>
      <Filter queryKey="type" filterNames={['collaboration', 'residents', 'vulnerablePerson', 'facilities']} filterItem={filterProps => <NeighborhoodFilterItem {...filterProps} countByType={props.countByType} />} />
    </Wrapper>
  );
};

export default NeighborhoodFilter;

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
