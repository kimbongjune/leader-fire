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
  status: '업무운행' | '본소출동대기' | '본소출동불가능대기' | "편성중" | "출동중" | "귀소중편성가" | "귀소중편성불가" | "이동대기중" | "고장수리중" | "기타편성가능" | "기타편성불가능" | "활동중";
  name: string;
  transmissionStatus: "미확인" | "승인" | "미승인" | "상태 미정";
  carId?:string
}

interface Props {
  data: DispatchVehicleDataType[];
}

const VehicleStatus = (props: Props) => {
  const deviceType = useDeviceType();
  const [toggle, setToggle] = useState([true, true, true, true,true, true, true, true,true, true, true, true]); // '업무운행' | '본소출동대기' | '본소출동불가능대기' | "편성중" | "출동중" | "귀소중편성가" | "귀소중편성불가" | "이동대기중" | "고장수리중" | "기타편성가능" | "기타편성불가능" | "활동중";

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
            <ItemTitle>업무운행</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.orange}>
              {toggle[0] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[0] && (
            <>
              {props.data
                ?.filter(data => data.status === '업무운행')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
            </>
          )}
        </Wrapper>

        <Wrapper deviceType={deviceType}>
          <Flex justifyContent="space-between" alignItems="center" onClick={() => toggleSection(1)}>
            <ItemTitle>본소출동대기</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.blue}>
              {toggle[1] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[1] && (
            <>
              {props.data
                ?.filter(data => data.status === '본소출동대기')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
            </>
          )}
        </Wrapper>

        <Wrapper deviceType={deviceType}>
          <Flex justifyContent="space-between" alignItems="center" onClick={() => toggleSection(2)}>
            <ItemTitle>본소출동불가능대기</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.red}>
              {toggle[2] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[2] && (
            <>
              {props.data
                ?.filter(data => data.status === '본소출동불가능대기')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
            </>
          )}
        </Wrapper>
        <Wrapper deviceType={deviceType}>
          <Flex justifyContent="space-between" alignItems="center" onClick={() => toggleSection(3)}>
            <ItemTitle>편성중</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.yellow}>
              {toggle[3] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[3] && (
            <>
              {props.data
                ?.filter(data => data.status === '편성중')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
            </>
          )}
        </Wrapper>
        <Wrapper deviceType={deviceType}>
          <Flex justifyContent="space-between" alignItems="center" onClick={() => toggleSection(4)}>
            <ItemTitle>출동중</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.green}>
              {toggle[4] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[4] && (
            <>
              {props.data
                ?.filter(data => data.status === '출동중')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
            </>
          )}
        </Wrapper>
        <Wrapper deviceType={deviceType}>
          <Flex justifyContent="space-between" alignItems="center" onClick={() => toggleSection(5)}>
            <ItemTitle>귀소중편성가</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.purple}>
              {toggle[5] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[5] && (
            <>
              {props.data
                ?.filter(data => data.status === '귀소중편성가')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
            </>
          )}
        </Wrapper>
        <Wrapper deviceType={deviceType}>
          <Flex justifyContent="space-between" alignItems="center" onClick={() => toggleSection(6)}>
            <ItemTitle>귀소중편성불가</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.gray5}>
              {toggle[6] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[6] && (
            <>
              {props.data
                ?.filter(data => data.status === '귀소중편성불가')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
            </>
          )}
        </Wrapper>
        <Wrapper deviceType={deviceType}>
          <Flex justifyContent="space-between" alignItems="center" onClick={() => toggleSection(7)}>
            <ItemTitle>이동대기중</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.orange}>
              {toggle[7] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[7] && (
            <>
              {props.data
                ?.filter(data => data.status === '이동대기중')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
            </>
          )}
        </Wrapper>
        <Wrapper deviceType={deviceType}>
          <Flex justifyContent="space-between" alignItems="center" onClick={() => toggleSection(8)}>
            <ItemTitle>고장수리중</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.blue}>
              {toggle[8] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[8] && (
            <>
              {props.data
                ?.filter(data => data.status === '고장수리중')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
            </>
          )}
        </Wrapper>
        <Wrapper deviceType={deviceType}>
          <Flex justifyContent="space-between" alignItems="center" onClick={() => toggleSection(9)}>
            <ItemTitle>기타편성가능</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.red}>
              {toggle[9] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[9] && (
            <>
              {props.data
                ?.filter(data => data.status === '기타편성가능')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
            </>
          )}
        </Wrapper>
        <Wrapper deviceType={deviceType}>
          <Flex justifyContent="space-between" alignItems="center" onClick={() => toggleSection(10)}>
            <ItemTitle>기타편성불가능</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.yellow}>
              {toggle[10] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[10] && (
            <>
              {props.data
                ?.filter(data => data.status === '기타편성불가능')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
            </>
          )}
        </Wrapper>
        <Wrapper deviceType={deviceType}>
          <Flex justifyContent="space-between" alignItems="center" onClick={() => toggleSection(11)}>
            <ItemTitle>활동중</ItemTitle>
            <IconWrapper width="24px" height="24px" color={theme.colors.green}>
              {toggle[11] ? <ArrowUp /> : <ArrowDown />}
            </IconWrapper>
          </Flex>
          {toggle[11] && (
            <>
              {props.data
                ?.filter(data => data.status === '활동중')
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
      {/* {props.data
                ?.filter(data => data.status === '업무운행')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}

      {props.data
                ?.filter(data => data.status === '본소출동대기')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}

        {props.data
                ?.filter(data => data.status === '본소출동불가능대기')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
                
            {props.data
              ?.filter(data => data.status === '편성중')
              ?.map((data, index) => {
                return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
              })}
      {props.data
                ?.filter(data => data.status === '출동중')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
      {props.data
          ?.filter(data => data.status === '귀소중편성가')
          ?.map((data, index) => {
            return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
          })}

      {props.data
                ?.filter(data => data.status === '귀소중편성불가')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
      {props.data
                ?.filter(data => data.status === '이동대기중')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
      {props.data
                ?.filter(data => data.status === '고장수리중')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
      {props.data
                ?.filter(data => data.status === '기타편성가능')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
      {props.data
                ?.filter(data => data.status === '기타편성불가능')
                ?.map((data, index) => {
                  return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
                })}
      {props.data
          ?.filter(data => data.status === '활동중')
          ?.map((data, index) => {
            return <VehicleStatusItem key={index} status={data.status} name={data.name} transmissionStatus={data.transmissionStatus} />;
          })} */}
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
