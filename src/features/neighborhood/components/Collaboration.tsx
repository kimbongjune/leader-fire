import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import useDeviceType from '@/hooks/useDeviceType';
import Call from '../../../../public/images/icons/call.svg';
import Calling from '../../../../public/images/icons/phone_in_talk.svg';
import { DeviceType, ModCollaborativeResponseList } from '@/types/types';

type GroupData = {
  title: string;
  count: number;
  itemList: { phone: string; name: string; distance: string }[];
};

type GroupedData = {
  [key: string]: GroupData;
};
interface Props {
  data:ModCollaborativeResponseList[]
}

//  전화번호, 사용자 동태, 직급(소속), 성명, 위치와의거리,
//TODO 협업대응 하위 페이지
const Collaboration = (props: Props) => {
  const deviceType = useDeviceType();

  const transformData = (data:ModCollaborativeResponseList[]) => {
    const groupedData: GroupedData = {
      '1': { title: '인근 의용소방대', count: 0, itemList: [] },
      '2': { title: '인근 의소일반대', count: 0, itemList: [] },
      '3': { title: '인근 생명지킴이', count: 0, itemList: [] }
    };
  
    data?.forEach(item => {
      const { appUserType, tel, nmPerson } = item;
      const group = groupedData[appUserType];
  
      if (group) {
        group.itemList.push({ phone: tel, name: nmPerson, distance: '' });
        group.count += 1;
      }
    });
  
    return Object.values(groupedData).filter(group => group.count > 0);
  };

  const collaborationData = transformData(props.data)

  return (
    <>
      {collaborationData.map((data, index) => {
        return (
          <Container deviceType={deviceType} key={index}>
            <>
              <TitleWrapper deviceType={deviceType}>
                <Title deviceType={deviceType}>{data.title}</Title>
                {deviceType !== 'mobile' && <Count>{data.count}명</Count>}
              </TitleWrapper>
              <ItemContainer deviceType={deviceType}>
              {data.itemList?.map((item, index) => {
                const itemContent = (
                  <ItemWrapper deviceType={deviceType}>
                    <Flex alignItems="center">
                      {deviceType === 'mobile' && (
                        <PhoneWrapper deviceType={deviceType}>
                          <Flex gap="4px">
                            <IconWrapper width="16px" height="16px" color={item.phone? theme.colors.orange : theme.colors.gray}>
                              <Call />
                            </IconWrapper>
                            <PhoneNumber deviceType={deviceType}>{item.phone}</PhoneNumber>
                          </Flex>
                        </PhoneWrapper>
                      )}
                      {deviceType !== 'mobile' && (
                        <PhoneWrapper deviceType={deviceType}>
                          <IconWrapper width="32px" height="32px" color={item.phone? theme.colors.orange : theme.colors.gray}>
                            <Calling/>
                          </IconWrapper>
                        </PhoneWrapper>
                      )}
                      <NameWrapper>
                        <Name deviceType={deviceType}>{item.name}</Name>
                        {deviceType === 'tabletVertical' && <PhoneNumber deviceType={deviceType}>{item.phone}</PhoneNumber>}
                      </NameWrapper>
                      <Distance deviceType={deviceType}>{item.distance}</Distance>
                    </Flex>
                  </ItemWrapper>
                );

                return item.phone ? (
                  <a href={`tel:${item.phone}`} key={index}>{itemContent}</a>
                ) : (
                  <React.Fragment key={index}>{itemContent}</React.Fragment>
                );
              })}
            </ItemContainer>
            </>
          </Container>
        );
      })}
    </>
  );
};
export default Collaboration;

const Container = styled.div<{ deviceType: DeviceType }>`
  width: 100%;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid ${theme.colors.gray2};
  background-color: ${theme.colors.gray1};
  margin-top: 16px;
  ${props =>
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      border: none;
      background-color: ${theme.colors.white};
      padding: 0;
      margin-top: 0px;
    `}
`;

const TitleWrapper = styled.div<{ deviceType: DeviceType }>`
  display: flex;
  align-items: center;
  gap: 4px;
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
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      font-family: 'Pretendard Bold';
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.32px;
    `}
`;

const ItemContainer = styled.div<{ deviceType: DeviceType }>`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${props =>
    props.deviceType === 'tabletVertical' &&
    css`
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 8px;
    `}
  ${props =>
    props.deviceType === 'tabletHorizontal' &&
    css`
      display: flex;
      flex-direction: row;
      gap: 8px;
      margin-top: 8px;
    `}
`;

const ItemWrapper = styled.div<{ deviceType: DeviceType }>`
  ${props =>
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      border-radius: 4px;
      padding: 12px 16px;
      border: 1px solid ${theme.colors.gray2};
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

const PhoneWrapper = styled.div<{ type?: string; deviceType: DeviceType }>`
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray2};
  background-color: ${theme.colors.white};
  padding: 8px;
  width: fit-content;
  margin-right: 16px;
  ${({ type }) => {
    if (type === 'collaboration') {
      return `
          color:${theme.colors.orange};
        `;
    }

    if (type === 'residents') {
      return `
          color:${theme.colors.blue};
        `;
    }

    if (type === 'vulnerablePerson') {
      return `
          color:${theme.colors.purple};
        `;
    }

    if (type === 'facilities') {
      return `
          color: ${theme.colors.green};
        `;
    }
  }}
  ${props =>
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      width: 48px;
      height: 48px;
      border-radius: 50%;
      padding: 8px;
      border: none;
      margin-right: 12px;
      background-color: rgba(255, 138, 58, 0.15);
    `}
`;

const PhoneNumber = styled.div<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Medium';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;

  ${props =>
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.32px;
    `}
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0 8px;
`;
const Name = styled.div<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.32px;

  ${props =>
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      color: ${theme.colors.gray10};
      font-size: 18px;
      line-height: 24px;
      letter-spacing: -0.36px;
    `}
`;

const Distance = styled.div<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray5};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  margin-left: 8px;
  ${props =>
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      margin-left: 16px;
    `}
`;
