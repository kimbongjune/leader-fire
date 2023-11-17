import { FilterItemProps } from '@/components/common/Filter/Filter';
import theme from '@/theme/colors';
import { DeviceType } from '@/types/types';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { StringParam, useQueryParam } from 'use-query-params';

const SOPFilterItem = (props: FilterItemProps) => {
  const router = useRouter();

  return (
    <Wrapper {...props} isSelected={props.filterName === router.query.menu}>
      {props.filterName}
    </Wrapper>
  );
};

export default SOPFilterItem;

const Wrapper = styled.div<{ isSelected: boolean; deviceType?: DeviceType }>`
  display: flex;
  justify-content: center;
  flex: 1;
  padding: 4px 10px;
  color: var(--06, #909aa4);
  font-family: Pretendard SemiBold;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
  border-radius: 2px;
  background: #dee2e6;
  white-space: nowrap;

  ${({ isSelected }) =>
    isSelected &&
    `
    color: ${theme.colors.white};
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
    letter-spacing: -0.28px;
    background: ${theme.colors.gray6}; //#6C757D;
  `}

  ${({ deviceType }) => {
    if (deviceType !== 'mobile') {
      return `
      font-family: Pretendard SemiBold;
      font-size: 16px;
      line-height: 24px; /* 150% */
      letter-spacing: -0.32px;

        padding: 8px 10px;
      `;
    }
  }}
`;
