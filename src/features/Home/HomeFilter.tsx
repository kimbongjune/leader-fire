import Filter from '@/components/common/Filter/Filter';
import styled from '@emotion/styled';
import HomeFilterItem, { CountByType } from './HomeFilterItem';
import { DeviceType } from '@/types/types';

interface Props {
  countByType: CountByType;
  deviceType?: DeviceType;
}

const HomeFilter = (props: Props) => {
  const { deviceType } = props;
  return (
    <Wrapper deviceType={deviceType}>
      <Filter queryKey="type" filterNames={['fires', 'rescue', 'firstAid', 'others']} filterItem={FilterProps => <HomeFilterItem {...FilterProps} deviceType={deviceType} countByType={props?.countByType} />} />
    </Wrapper>
  );
};

export default HomeFilter;

HomeFilter.defaultProps = {};

const Wrapper = styled.div<{ deviceType?: DeviceType }>`
  display: flex;

  .filter-container {
    flex: 1;
    gap: 10px;
  }

  ${({ deviceType }) => {
    if (deviceType === 'tabletHorizontal') {
      return `
        .filter-container {
          flex-direction: column;
        }
      `;
    }
  }}
`;
