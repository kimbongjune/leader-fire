import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType } from '@/types/types';
import ResidentsItem from './ResidentsItem';

const Tag = (props: any) => {
  return <TagWrapper>{props.children}</TagWrapper>;
};

const Name = (props: any) => {
  return <NameWrapper>{props.children}</NameWrapper>;
};

const Age = (props: any) => {
  return <AgeWrapper>{props.children}</AgeWrapper>;
};

const Distance = (props: any) => {
  return <DistanceWrapper>{props.children}</DistanceWrapper>;
};

//TODO 태블릿 인근주민 하위페이지
const TabletResidents = () => {
  const deviceType = useDeviceType();

  return (
    <>
      <ResidentsContainer>
        <TitleWrapper>
          <Title deviceType={deviceType}>보호자</Title>
          <Count deviceType={deviceType}>4명</Count>
        </TitleWrapper>
        <ResidentsItemContainer deviceType={deviceType}>
          <ResidentsItem contentTop={<Tag>신고자의 보호자</Tag>} contentBottom={<Name>홍길동</Name>} />
          <ResidentsItem contentTop={<Tag>신고자의 보호자</Tag>} contentBottom={<Name>홍길동</Name>} />
          <ResidentsItem contentTop={<Tag>신고자의 보호자</Tag>} contentBottom={<Name>홍길동</Name>} />
          <ResidentsItem contentTop={<Tag>신고자의 보호자</Tag>} contentBottom={<Name>홍길동</Name>} />
        </ResidentsItemContainer>
      </ResidentsContainer>

      <ResidentsContainer>
        <TitleWrapper>
          <Title deviceType={deviceType}>U119등록자</Title>
          <Count deviceType={deviceType}>4명</Count>
        </TitleWrapper>
        <ResidentsItemContainer deviceType={deviceType}>
          <ResidentsItem contentTop={<Age>여, 56세</Age>} contentBottom={<Name>홍길동</Name>} />
          <ResidentsItem contentTop={<Age>여, 56세</Age>} contentBottom={<Name>홍길동</Name>} />
          <ResidentsItem contentTop={<Age>여, 56세</Age>} contentBottom={<Name>홍길동</Name>} />
          <ResidentsItem contentTop={<Age>여, 56세</Age>} contentBottom={<Name>홍길동</Name>} />
        </ResidentsItemContainer>
      </ResidentsContainer>

      <ResidentsContainer>
        <TitleWrapper>
          <Title deviceType={deviceType}>소방등록정보</Title>
          <Count deviceType={deviceType}>4명</Count>
        </TitleWrapper>
        <ResidentsItemContainer deviceType={deviceType}>
          <ResidentsItem
            contentTop={
              <Flex gap="4px" alignItems="center">
                <Tag>점유자</Tag>
                홍길동
              </Flex>
            }
            contentBottom={<Name>건물명</Name>}
            address="경남 진주시 진주대로 345-13, 203호"
          />
          <ResidentsItem
            contentTop={
              <Flex gap="4px" alignItems="center">
                <Tag>점유자</Tag>
                홍길동
              </Flex>
            }
            contentBottom={<Name>건물명</Name>}
            address="경남 진주시 진주대로 345-13, 203호"
          />
          <ResidentsItem
            contentTop={
              <Flex gap="4px" alignItems="center">
                <Tag>점유자</Tag>
                홍길동
              </Flex>
            }
            contentBottom={<Name>건물명</Name>}
            address="경남 진주시 진주대로 345-13, 203호"
          />
          <ResidentsItem
            contentTop={
              <Flex gap="4px" alignItems="center">
                <Tag>점유자</Tag>
                홍길동
              </Flex>
            }
            contentBottom={<Name>건물명</Name>}
            address="경남 진주시 진주대로 345-13, 203호"
          />
        </ResidentsItemContainer>
      </ResidentsContainer>

      <ResidentsContainer>
        <TitleWrapper>
          <Title deviceType={deviceType}>인근 주민</Title>
          <Count deviceType={deviceType}>시설관계자, 4명</Count>
        </TitleWrapper>
        <ResidentsItemContainer deviceType={deviceType}>
          <ResidentsItem
            contentTop={
              <Flex justifyContent="space-between">
                <Flex gap="4px" alignItems="center">
                  <Tag>점유자</Tag>
                  <Name>홍길동</Name>
                </Flex>
                <Distance>10m</Distance>
              </Flex>
            }
            contentBottom={
              <Flex gap="8px" alignItems="center">
                <Name>건물명</Name>
                <div>경남 진주시 진주대로 345-13, 203호</div>
              </Flex>
            }
          />
          <ResidentsItem
            contentTop={
              <Flex justifyContent="space-between">
                <Flex gap="4px" alignItems="center">
                  <Tag>점유자</Tag>
                  <Name>홍길동</Name>
                </Flex>
                <Distance>10m</Distance>
              </Flex>
            }
            contentBottom={
              <Flex gap="8px" alignItems="center">
                <Name>건물명</Name>
                <div>경남 진주시 진주대로 345-13, 203호</div>
              </Flex>
            }
          />
        </ResidentsItemContainer>
      </ResidentsContainer>
    </>
  );
};

export default TabletResidents;

const ResidentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ResidentsItemContainer = styled.div<{ deviceType: DeviceType }>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  ${props =>
    props.deviceType === 'tabletHorizontal' &&
    css`
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    `}

  ${props =>
    props.deviceType === 'mobile' &&
    css`
      display: block;
    `}
`;

const AgeWrapper = styled.div`
  color: ${theme.colors.gray5};
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const DistanceWrapper = styled.div`
  color: ${theme.colors.gray5};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;

const TagWrapper = styled.div`
  padding: 2px 4px;
  border-radius: 4px;
  width: fit-content;
  color: ${theme.colors.white};
  background-color: ${theme.colors.gray3};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled.div<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.28px;

  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      font-family: 'Pretendard Bold';
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.32px;
    `}
`;

const Count = styled.div<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      color: ${theme.colors.gray3};
      font-family: 'Pretendard Bold';
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.32px;
    `}
`;

const NameWrapper = styled.div`
  color: ${theme.colors.gray10};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.36px;
  white-space: nowrap;
`;
