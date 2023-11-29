import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import ReFreshIcon from '../../../public/images/icons/refresh.svg';
import theme from '@/theme/colors';
import { Button, Flex, Grid, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { BooleanParam, NumberParam, StringParam, useQueryParam, useQueryParams, withDefault } from 'use-query-params';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDangerMarkerActive, setIsExtinguisherMarkerActive, setIsTargetMarkerActive, setIsWaterMarkerActive } from '../../features/slice/disasterSlice';
import { RootState } from '../../app/store';

export interface MarkerType{
  label:string;
  value:string;
  count:number;
}

interface Props {
  items:MarkerType[];
}

//TODO 지도 하단 소화전, 비상소화장치, 대상물, 위험물 등, 미터, 피난약자, 과거이력 제거
const ObjectPosition = (props: Props) => {
  //const [position, setPosition] = useState(props.distances?.[0]);
  const dispatch = useDispatch()

  console.log(props)

  const isWaterActive = useSelector((state: RootState) => state.disaster.isWaterMarkerActive);
  const isExtinguisherActive = useSelector((state: RootState) => state.disaster.isExtinguisherMarkerActive);
  const isTargetActive = useSelector((state: RootState) => state.disaster.isTargetMarkerActive);
  const isDangerActive = useSelector((state: RootState) => state.disaster.isDangerMarkerActive);

  const toggleMarker = (type: string) => {
    if (type === 'water') dispatch(setIsWaterMarkerActive(!isWaterActive));
    if (type === 'extinguisher') dispatch(setIsExtinguisherMarkerActive(!isExtinguisherActive));
    if (type === 'target') dispatch(setIsTargetMarkerActive(!isTargetActive));
    if (type === 'danger') dispatch(setIsDangerMarkerActive(!isDangerActive));
  };

  return (
    <Wrapper>
      <Stack spacing="16px">
        {/* <ButtonWrapper>
          {props.distances?.map((distance, index) => {
            return (
              <StyledButton onClick={() => setQuery({ distance })} isActive={query.distance === distance} key={index}>
                {distance}미터
              </StyledButton>
            );
          })}
        </ButtonWrapper> */}
        <Grid templateColumns="repeat(2, 1fr)" columnGap="12px" rowGap="8px">
          {props.items?.map((item, index) => {
            let isActive;
            if (item.value === 'water') isActive = isWaterActive;
            if (item.value === 'extinguisher') isActive = isExtinguisherActive;
            if (item.value === 'target') isActive = isTargetActive;
            if (item.value === 'danger') isActive = isDangerActive;
            return (
              <ObjectItem
                key={index}
                onClick={() => toggleMarker(item.value)}
                isActive={isActive}
              >
                <Text>{item.label}</Text>
                <Flex align="center" gap="4px">
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

const ObjectItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 4px;
  background: #f8f9fa;

  ${({ isActive }) =>
    isActive &&
    `
    background: ${theme.colors.orange}; // 활성화 상태일 때의 배경색
  `}
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
