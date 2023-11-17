import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import ReFreshIcon from '../../../public/images/icons/refresh.svg';
import theme from '@/theme/colors';
import { Button, Flex, Grid, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { BooleanParam, NumberParam, StringParam, useQueryParam, useQueryParams, withDefault } from 'use-query-params';

interface Props {
  distances: number[];
  items: { label: string; value: string; count: number; hasRefreshButton?: boolean }[];
}

const ObjectPosition = (props: Props) => {
  const [position, setPosition] = useState(props.distances?.[0]);
  const [query, setQuery] = useQueryParams({
    distance: NumberParam,
    water: withDefault(StringParam, 'false'),
    extinguisher: withDefault(StringParam, 'false'),
    target: withDefault(StringParam, 'false'),
    danger: withDefault(StringParam, 'false'),
    vulnerble: withDefault(StringParam, 'false'),
    history: withDefault(StringParam, 'false'),
  });

  return (
    <Wrapper>
      <Stack spacing="16px">
        <ButtonWrapper>
          {props.distances?.map((distance, index) => {
            return (
              <StyledButton onClick={() => setQuery({ distance })} isActive={query.distance === distance} key={index}>
                {distance}미터
              </StyledButton>
            );
          })}
        </ButtonWrapper>
        <Grid templateColumns="repeat(2, 1fr)" columnGap="12px" rowGap="8px">
          {props.items?.map((item, index) => {
            return (
              <ObjectItem
                key={index}
                onClick={() => {
                  const currentValue = query[item.value as keyof typeof query];
                  if (currentValue) {
                    setQuery({ [item.value]: 'false' });
                  }
                  setQuery({ [item.value]: 'true' });
                }}
              >
                <Text>{item.label}</Text>
                <Flex align="center" gap="4px">
                  {item.hasRefreshButton && (
                    <button onClick={() => {}}>
                      <IconWrapper width="16px" height="16px" color={theme.colors.gray}>
                        <ReFreshIcon />
                      </IconWrapper>
                    </button>
                  )}
                  <NumberOfItem>{item.count}건</NumberOfItem>
                </Flex>
              </ObjectItem>
            );
          })}
        </Grid>
      </Stack>
    </Wrapper>
  );
};

export default ObjectPosition;

ObjectPosition.defaultProps = {
  distances: [20, 40, 80, 200],
  items: [
    {
      label: '소화전',
      value: 'water',
      count: 3,
    },
    {
      label: '비상소화장치',
      value: 'extinguisher',
      count: 3,
      hasRefreshButton: true,
    },
    {
      label: '대상물',
      value: 'target',
      count: 3,
    },
    {
      label: '위험물',
      value: 'danger',
      count: 3,
    },
    {
      label: '피난약자',
      value: 'vulnerble',
      count: 3,
    },
    {
      label: '과거이력',
      value: 'history',
      count: 3,
      hasRefreshButton: true,
    },
  ],
};

const Wrapper = styled.div`
  padding: 16px;
  border-radius: 8px;
  background: ${theme.colors.white};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px;
  background: ${theme.colors.gray9};
  border-radius: 4px;
`;
const StyledButton = styled.button<{ isActive?: boolean }>`
  flex: 1;
  color: ${theme.colors.gray};
  font-family: Pretendard SemiBold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  border-radius: 2px;
  padding: 4px 10px;
  background: ${theme.colors.gray9};

  ${({ isActive }) =>
    isActive &&
    `
  color: ${theme.colors.gray7};
  background: ${theme.colors.white};
  `}
`;

const ObjectItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 4px;
  background: #f8f9fa;
`;

const Text = styled.div`
  color: ${theme.colors.gray7};
  font-family: Pretendard SemiBold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;

const NumberOfItem = styled.div`
  color: ${theme.colors.gray8};
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;
