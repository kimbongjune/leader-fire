import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import { DeviceType } from '@/types/types';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import useDeviceType from '@/hooks/useDeviceType';
import Call from '../../../../public/images/icons/call.svg';
import Calling from '../../../../public/images/icons/phone_in_talk.svg';

interface Props {
  title: string;
  count: number;
  datas: {
    phone: string;
    name: string;
    info: string;
    address: string;
    reason: string;
    protectorName: string;
    protectorPhone: string;
  }[];
}

//TODO 인근 피난약자 하위페이지, 가려야함
const VulnerablePerson = (props: Props) => {
  const deviceType = useDeviceType();

  return (
    <Container deviceType={deviceType}>
      <TitleWrapper deviceType={deviceType}>
        <Title deviceType={deviceType}>인근피난약자</Title>
        {deviceType !== 'mobile' && <Count>{props.count}명</Count>}
      </TitleWrapper>
      <Content deviceType={deviceType}>
        {props.datas?.map((data, index) => {
          return (
            <ItemWrapper deviceType={deviceType} key={index}>
              <Flex alignItems="center">
                {deviceType === 'mobile' && (
                  <PhoneWrapper deviceType={deviceType}>
                    <Flex gap="4px">
                      <IconWrapper width="16px" height="16px" color={theme.colors.purple}>
                        <Call />
                      </IconWrapper>
                      <PhoneNumber>{data.phone}</PhoneNumber>
                    </Flex>
                  </PhoneWrapper>
                )}
                {deviceType !== 'mobile' && (
                  <PhoneWrapper deviceType={deviceType}>
                    <IconWrapper width="32px" height="32px" color={theme.colors.purple}>
                      <Calling />
                    </IconWrapper>
                  </PhoneWrapper>
                )}
                {deviceType === 'mobile' && (
                  <NameWrapper deviceType={deviceType}>
                    <Name>{data.name}</Name>
                    <Position deviceType={deviceType}>{data.info}</Position>
                  </NameWrapper>
                )}
                {deviceType !== 'mobile' && (
                  <NameWrapper deviceType={deviceType}>
                    <Position deviceType={deviceType}>{data.info}</Position>
                    <Name>{data.name}</Name>
                  </NameWrapper>
                )}
              </Flex>
              <Address>{data.address}</Address>
              <Reason deviceType={deviceType}>{data.reason}</Reason>
              {deviceType !== 'mobile' && <Divider />}
              <Flex alignItems="center" marginTop="8px">
                {deviceType === 'mobile' && (
                  <PhoneWrapper deviceType={deviceType}>
                    <Flex gap="4px">
                      <IconWrapper width="16px" height="16px" color={theme.colors.purple}>
                        <Call />
                      </IconWrapper>
                      <PhoneNumber>{data.protectorPhone}</PhoneNumber>
                    </Flex>
                  </PhoneWrapper>
                )}
                {deviceType !== 'mobile' && (
                  <PhoneWrapper deviceType={deviceType} isProtector={data.protectorPhone ? true : false}>
                    <IconWrapper width="16px" height="16px" color={theme.colors.gray5}>
                      <Calling />
                    </IconWrapper>
                  </PhoneWrapper>
                )}
                <Flex gap="4px">
                  <Protector>보호자</Protector>
                  <Name>{data.protectorName}</Name>
                </Flex>
              </Flex>
            </ItemWrapper>
          );
        })}
      </Content>
    </Container>
  );
};

VulnerablePerson.defaultProps = {
  title: '인근 피난약자',
  count: 4,
  datas: [
    {
      phone: '010-1234-1234',
      name: '홍길동',
      info: '여, 56세, 대한민국',
      address: '경남 진주시 진주대로 345-13, 203호',
      reason: '피난약자 등록사유 텍스트입니다. 피난약자 등록사유 텍스트입니다.',
      protectorName: '홍길동2',
      protectorPhone: '010-5678-5678',
    },
    {
      phone: '010-1234-1234',
      name: '홍길동',
      info: '여, 56세, 대한민국',
      address: '경남 진주시 진주대로 345-13, 203호',
      reason: '피난약자 등록사유 텍스트입니다. 피난약자 등록사유 텍스트입니다.',
      protectorName: '홍길동2',
      protectorPhone: '010-5678-5678',
    },
  ],
};
export default VulnerablePerson;

const Container = styled.div<{ deviceType: DeviceType }>`
  width: 100%;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid ${theme.colors.gray2};
  background-color: ${theme.colors.gray1};
  margin-top: 16px;

  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      border: none;
      background-color: ${theme.colors.white};
      padding: 0;
      margin-top: 0px;
    `}
`;

const Content = styled.div<{ deviceType: DeviceType }>`
  display: block;
  ${props =>
    props.deviceType === 'tabletVertical' &&
    css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 8px;
    `}
  ${props =>
    props.deviceType === 'tabletHorizontal' &&
    css`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 16px;
      margin-top: 8px;
    `}
`;

const ItemWrapper = styled.div<{ deviceType: DeviceType }>`
  border-bottom: 1px solid ${theme.colors.gray2};
  padding-bottom: 16px;
  margin-bottom: 16px;
  :last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      border: 1px solid ${theme.colors.gray2};
      padding: 12px 16px;
      border-radius: 4px;
      :last-of-type {
        border: 1px solid ${theme.colors.gray2};
        padding: 12px 16px;
      }
    `}
`;

const TitleWrapper = styled.div<{ deviceType: DeviceType }>`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-bottom: 12px;
  ${props =>
    props.deviceType === 'mobile' &&
    css`
      padding: 4px 0;
    `}
`;

const Title = styled.div<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      font-family: 'Pretendard Bold';
      font-size: 16px;
      font-style: normal;
      line-height: 24px;
      letter-spacing: -0.32px;
    `}
`;

const Count = styled.div`
  color: ${theme.colors.gray3};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
`;

const PhoneWrapper = styled.div<{ deviceType: DeviceType; isProtector?: boolean }>`
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray2};
  background-color: ${theme.colors.white};
  padding: 8px;
  width: fit-content;
  margin-right: 16px;
  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      width: 48px;
      height: 48px;
      border-radius: 50%;
      padding: 8px;
      border: none;
      margin-right: 12px;
      background-color: rgba(164, 101, 227, 0.15);
    `}
  ${props =>
    props.isProtector &&
    css`
      width: 32px;
      height: 32px;
      border-radius: 50%;
      padding: 8px;
      border: none;
      margin-right: 8px;
      background-color: ${theme.colors.gray2};
    `}
`;

const PhoneNumber = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Medium';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;

const NameWrapper = styled.div<{ deviceType: DeviceType }>`
  display: flex;
  align-items: center;
  gap: 0 8px;
  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      display: block;
    `}
`;
const Name = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.32px;
`;

const Position = styled.div<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray5};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      margin-bottom: 4px;
    `}
`;

const Protector = styled.div`
  background-color: ${theme.colors.gray};
  color: ${theme.colors.white};
  border-radius: 4px;
  padding: 2px 4px;
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const Address = styled.div`
  overflow: hidden;
  color: ${theme.colors.gray6};
  text-overflow: ellipsis;
  font-family: 'Pretendard Medium';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  margin: 12px 0;
`;

const Reason = styled.div<{ deviceType: DeviceType }>`
  border-radius: 4px;
  background-color: ${theme.colors.white};
  padding: 8px;
  border: 1px solid ${theme.colors.gray2};
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Medium';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;

  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      color: ${theme.colors.gray7};
      background-color: ${theme.colors.gray1};
    `}
`;

const Divider = styled.hr`
  margin: 12px 0;
  border-top: 1px solid ${theme.colors.gray2};
`;
