import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { css } from '@emotion/react';
import { Flex, VStack } from '@chakra-ui/react';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType } from '@/types/types';

interface Props {
  hasNumber?: boolean;
  data: {
    title: string;
    text: string;
  }[][];
}

const NeighborhoodModalItem = (props: Props) => {
  const deviceType = useDeviceType();

  return (
    <Wrapper deviceType={deviceType} length={props.data.length}>
      {props.data?.map((item, index) => {
        return (
          <Container key={index}>
            {props.hasNumber && <Number>{index + 1}</Number>}
            {item.map((cell, cellIndex) => {
              return (
                <Flex key={`${index}-${cellIndex}`} alignItems="center" justifyContent="space-between" gap="8px">
                  <Title>{cell.title}</Title>
                  <Text>{cell.text}</Text>
                </Flex>
              );
            })}
          </Container>
        );
      })}
    </Wrapper>
  );
};

export default NeighborhoodModalItem;

const Wrapper = styled.div<{ deviceType: DeviceType; length: number }>`
  overflow-y: auto;
  width: 100%;

  ${({ deviceType, length }) =>
    deviceType !== 'mobile' &&
    length > 1 &&
    css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    `}

  ${({ deviceType, length }) =>
    deviceType !== 'mobile' &&
    length === 1 &&
    css`
      display: block;
      width: 100%;
    `}
`;

const Container = styled.div`
  padding: 16px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.gray2};
  background-color: ${theme.colors.gray1};
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Number = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${theme.colors.gray3};
  color: ${theme.colors.white};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
  text-align: center;
`;

const Title = styled.div`
  color: ${theme.colors.gray6};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
  width: 30%;
`;

const Text = styled.div`
  width: 70%;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray2};
  background-color: ${theme.colors.white};
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
`;
