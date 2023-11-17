import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import { VStack } from '@chakra-ui/react';
import VulnerablePerson from './components/VulnerablePerson';
import useDeviceType from '@/hooks/useDeviceType';
import Collaboration from './components/Collaboration';
import Residents from './components/Residents/Residents';
import Facility from './components/Facility';
import NeighborhoodFilter from './NeighborhoodFilter';
import { useRouter } from 'next/router';

export interface CountByType {
  collaboration: number;
  residents: number;
  vulnerablePerson: number;
  facilities: number;
}

interface Props {
  dispatchLists: NeighborhoodType[];
}
export type NeighborhoodType = {
  eventName: string;
  totalCount: number;
  status?: string;
  age?: number;
  type: 'collaboration' | 'residents' | 'vulnerablePerson' | 'facilities';
  description: string;
  created: string;
};

//TODO 연관인근 아이템 리스트
const NeighborhoodList = (props: Props) => {
  const deviceType = useDeviceType();
  const { query } = useRouter();
  const type = query.type;

  const getCountByType = (arr: NeighborhoodType[]) => {
    return arr.reduce((acc: any, cur: any) => {
      acc[cur.type] = cur.totalCount;
      return acc;
    }, {});
  };
  const countByType = getCountByType(props.dispatchLists);

  return (
    <Container deviceType={deviceType}>
      <NeighborhoodFilter deviceType={deviceType} countByType={countByType} />
     {type && <VStack gap={deviceType === 'mobile' ? '16px' : '24px'} width="100%">
        {type === 'collaboration' && <Collaboration />}
        {type === 'residents' && <Residents />}
        {type === 'vulnerablePerson' && <VulnerablePerson />}
        {type === 'facilities' && <Facility />}
      </VStack>}
    </Container>
  );
};

NeighborhoodList.defaultProps = {
  dispatchLists: [
    {
      eventName: '협업대응',
      type: 'collaboration',
      totalCount: 7,
    },
    {
      eventName: '인근주민',
      type: 'residents',
      totalCount: 17,
    },
    {
      eventName: '인근피난약자',
      type: 'vulnerablePerson',
      totalCount: 9,
    },
    {
      eventName: '인근시설',
      type: 'facilities',
      totalCount: 34,
    },
  ],
};
export default NeighborhoodList;

const Container = styled.div<{ deviceType: string | null }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  padding: 16px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray2};

  ${props =>
    props.deviceType === 'tabletVertical' &&
    css`
      gap: 24px;
    `}

  ${props =>
    props.deviceType === 'tabletHorizontal' &&
    css`
      flex-direction: row;
      gap: 0 24px;
    `}

  .nearFilter {
    ${props =>
      props.deviceType === 'tabletHorizontal' &&
      css`
        display: flex;
        flex-direction: column;
        width: fit-content;
      `}
  }
`;
