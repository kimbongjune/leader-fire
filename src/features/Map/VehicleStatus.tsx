import React, { useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import VehicleStatusItem from './VehicleStatusItem';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType } from '@/types/types';
import { css } from '@emotion/react';
import { Flex } from '@chakra-ui/react';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import ArrowUp from '../../../public/images/icons/arrow-drop-up.svg';
import ArrowDown from '../../../public/images/icons/arrow-drop-down.svg';

// 출동 차량 데이터 타입
export interface DispatchVehicleDataType {
  status: '출동' | '도착' | '귀소';
  name: string;
  transmissionStatus: '전송 성공' | '전송 실패' | '확인 완료';
  
}

interface Props {
  data: DispatchVehicleDataType[];
}

const VehicleStatus = (props: Props) => {
  const deviceType = useDeviceType();
  const [toggle, setToggle] = useState([true, true, true]); // 출동, 현장도착, 귀소

  const toggleSection = (index: number) => {
    setToggle(prevToggle => {
      const newToggle = [...prevToggle];
      newToggle[index] = !newToggle[index];
      return newToggle;
    });
  };

  if (deviceType === 'tabletHorizontal') {
    return (
      <Container deviceType={deviceType}>
        <Title deviceType={deviceType}>출동차량</Title>

        <Wrapper deviceType={deviceType}>
          <Flex justifyContent="space-between" alignItems="center" onClick={() => toggleSection(0)}>
            <ItemTitle>출동</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.gray6}>
              {toggle[0] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[0] && (
            <>
              {props.data
                ?.filter(data => data.status === '출동')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
            </>
          )}
        </Wrapper>

        <Wrapper deviceType={deviceType}>
          <Flex justifyContent="space-between" alignItems="center" onClick={() => toggleSection(1)}>
            <ItemTitle>현장도착</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.gray6}>
              {toggle[1] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[1] && (
            <>
              {props.data
                ?.filter(data => data.status === '도착')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
            </>
          )}
        </Wrapper>

        <Wrapper deviceType={deviceType}>
          <Flex justifyContent="space-between" alignItems="center" onClick={() => toggleSection(2)}>
            <ItemTitle>귀소</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.gray6}>
              {toggle[2] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[2] && (
            <>
              {props.data
                ?.filter(data => data.status === '귀소')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
            </>
          )}
        </Wrapper>
      </Container>
    );
  }

  return (
    <Container deviceType={deviceType}>
      <Title deviceType={deviceType}>출동차량</Title>
      <Wrapper deviceType={deviceType}>
        <VehicleStatusItem status="출동" name="상대펌프" transmissionStatus="전송 성공" />
        <VehicleStatusItem status="출동" name="상대펌프" transmissionStatus="전송 실패" />
        <VehicleStatusItem status="도착" name="진주구조골절" transmissionStatus="전송 성공" />
        <VehicleStatusItem status="도착" name="상대펌프" transmissionStatus="확인 완료" />
        <VehicleStatusItem status="귀소" name="진주구조골절" transmissionStatus="전송 성공" />
        <VehicleStatusItem status="귀소" name="상대펌프" transmissionStatus="확인 완료" />
      </Wrapper>
    </Container>
  );
};

export default VehicleStatus;

VehicleStatus.defaultProps = {
  data: [
    {
      status: '출동',
      name: '상대펌프1',
      transmissionStatus: '전송 성공',
    },
    {
      status: '출동',
      name: '상대펌프2',
      transmissionStatus: '전송 실패',
    },
    {
      status: '도착',
      name: '진주구조골절1',
      transmissionStatus: '전송 성공',
    },
    {
      status: '도착',
      name: '상대펌프3',
      transmissionStatus: '확인 완료',
    },
    {
      status: '귀소',
      name: '진주구조골절2',
      transmissionStatus: '전송 성공',
    },
    {
      status: '귀소',
      name: '상대펌프4',
      transmissionStatus: '확인 완료',
    },
  ],
};

const Container = styled.div<{ deviceType: DeviceType }>`
  padding: 16px;
  background-color: ${theme.colors.white};
  ${({ deviceType }) => {
    if (deviceType === 'tabletHorizontal') {
      return `
      padding: 24px 16px 105px;
      `;
    }

    if (deviceType === 'tabletVertical') {
      return `
      padding: 24px 16px;
      `;
    }
  }}
  ${({ deviceType }) => {
    return (
      deviceType === 'tabletHorizontal' &&
      css`
        width: 299px;
      `
    );
  }}
`;

const Title = styled.div<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray6};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
  margin-bottom: 8px;
  ${({ deviceType }) => {
    return (
      deviceType !== 'mobile' &&
      css`
        font-size: 20px;
        letter-spacing: -0.4px;
        margin-bottom: 16px;
      `
    );
  }}
`;

const Wrapper = styled.div<{ deviceType: DeviceType }>`
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(2, 1fr);
  ${({ deviceType }) => {
    return (
      deviceType === 'tabletVertical' &&
      css`
        gap: 16px;
        grid-template-columns: repeat(3, 1fr);
      `
    );
  }}

  ${({ deviceType }) => {
    return (
      deviceType === 'tabletHorizontal' &&
      css`
        width: 267px;
        gap: 4px;
        grid-template-columns: repeat(1, 1fr);
        :not(:last-of-type) {
          margin-bottom: 16px;
        }
      `
    );
  }}
`;

const ItemTitle = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
  margin-bottom: 4px;
`;
