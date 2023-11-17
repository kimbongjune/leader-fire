import Filter from '@/components/common/Filter/Filter';
import styled from '@emotion/styled';
import SOPFilterItem from './SOPFilterItem';
import { DeviceType } from '@/types/types';

interface Props {
  onClick?: (name: string) => void;
  deviceType: DeviceType;
}

const SOPFilter = (props: Props) => {
  const { deviceType } = props;
  return (
    <FilterWrapper>
      <Filter deviceType={deviceType} queryKey="menu" filterNames={['SOP', '화학대응메뉴얼']} filterItem={SOPFilterItem} onClick={props.onClick} />
    </FilterWrapper>
  );
};

export default SOPFilter;

const FilterWrapper = styled.div`
  .filter-container {
    width: 100%;
  }
  display: flex;
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid var(--02, #e9ecef);
  background: #dee2e6;
`;
