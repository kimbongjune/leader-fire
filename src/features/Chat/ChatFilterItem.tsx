import { FilterItemProps } from '@/components/common/Filter/Filter';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const ChatFilterItem = (props: FilterItemProps) => {
  const router = useRouter();

  return (
    <Wrapper {...props} isSelected={props.filterName === router.query.filter}>
      {props.filterName}
    </Wrapper>
  );
};

export default ChatFilterItem;

const Wrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  flex: 1;

  color: var(--06, #909aa4);
  font-family: Pretendard SemiBold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;

  border-radius: 2px;
  background: #dee2e6;

  ${({ isSelected }) =>
    isSelected &&
    `
    color: var(--08, #495057);
    font-size: 16px;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
    background: #fff;
  `}
`;
