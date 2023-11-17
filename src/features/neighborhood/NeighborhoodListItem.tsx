import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import useDeviceType from '@/hooks/useDeviceType';
import Call from '../../../public/images/icons/call.svg';
import Info from '../../../public/images/icons/info.svg';
import NeighborhoodModal from './components/Facility/FacilityModal';

//  전화번호, 사용자 동태, 직급(소속), 성명, 위치와의거리,
const NeighborhoodListItem = (props: any) => {
  const deviceType = useDeviceType();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDangerFacilities, setIsDangerFacilities] = useState(false);
  const isFacilities = props.eventName === '인근시설';

  const onClickItem = (title: string) => {
    if (isFacilities) {
      setIsModalOpen(true);
      if (title === '인근 위험물제조소') {
        setIsDangerFacilities(true);
      }
    }
  };

  return (
    <>
      {props.data?.map((data: any, index: number) => {
        return (
          <Container key={index} deviceType={deviceType}>
            <TitleWrapper>
              <Title deviceType={deviceType}>{data.title}</Title>
              {data.subTitle && <SubTitle>{data.subTitle}</SubTitle>}
            </TitleWrapper>
            <>
              {data.itemList.map((item: any, index: number) => {
                return (
                  <>
                    <div key={`${item.title}-${index}`} onClick={() => onClickItem(data.title)}>
                      <Flex alignItems="center" marginTop="8px">
                        <PhoneWrapper type={props.type}>
                          <Flex gap="4px">
                            <IconWrapper width="16px" height="16px" color={props.type}>
                              <Call />
                            </IconWrapper>
                            <PhoneNumber>{item.phone}</PhoneNumber>
                          </Flex>
                        </PhoneWrapper>
                        <NameWrapper>
                          <Name>{item.name}</Name>
                          {item.position && <Position>{item.position}</Position>}
                          {item.info && <Position>{item.info}</Position>}
                        </NameWrapper>
                        {item.distance && <Distance>{item.distance}</Distance>}
                        {item.infoIcon && (
                          <InfoWrapper>
                            <IconWrapper width="16px" height="16px" color={theme.colors.gray6}>
                              <Info />
                            </IconWrapper>
                          </InfoWrapper>
                        )}
                      </Flex>
                      {item.storeName && <StoreName>{item.storeName}</StoreName>}
                      {item.reason && <Reason>{item.reason}</Reason>}
                      {item.storeAddress && <StoreAddress>{item.storeAddress}</StoreAddress>}
                      {item.protectorName && (
                        <Flex alignItems="center" marginTop="8px">
                          <PhoneWrapper>
                            <Flex gap="4px">
                              <IconWrapper width="16px" height="16px" color={theme.colors.purple}>
                                <Call />
                              </IconWrapper>
                              <PhoneNumber>{item.protectorNumber}</PhoneNumber>
                            </Flex>
                          </PhoneWrapper>
                          <NameWrapper>
                            <Protector>보호자</Protector>
                            <Name>{item.protectorName}</Name>
                          </NameWrapper>
                        </Flex>
                      )}
                    </div>
                  </>
                );
              })}
            </>
            {isModalOpen && <NeighborhoodModal setIsModalOpen={setIsModalOpen} isDangerCategory={isDangerFacilities} />}
          </Container>
        );
      })}
    </>
  );
};

export default NeighborhoodListItem;

const Container = styled.div<{ deviceType: string | null }>`
  width: 100%;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid ${theme.colors.gray2};
  background-color: ${theme.colors.gray1};
  ${props =>
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      border: none;
      background-color: ${theme.colors.white};
      padding: 0;
    `}
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled.div<{ deviceType: string | null }>`
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

const SubTitle = styled.div`
  color: ${theme.colors.gray5};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
`;

const PhoneWrapper = styled.div<{ type?: string }>`
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
`;

const PhoneNumber = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Medium';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0 8px;
`;
const Name = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.32px;
`;

const Position = styled.div`
  color: ${theme.colors.gray5};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;

const Distance = styled.div`
  color: ${theme.colors.gray5};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  margin-left: 8px;
`;

const InfoWrapper = styled.div`
  margin-left: 4px;
`;

const StoreName = styled.div`
  overflow: hidden;
  color: ${theme.colors.gray7};
  text-overflow: ellipsis;
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  margin-top: 8px;
`;

const StoreAddress = styled.div`
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
  margin-top: 4px;
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

const Reason = styled.div`
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
  margin-top: 12px;
`;

const Divider = styled.hr`
  margin: 16px 0;
  border: 1px solid ${theme.colors.gray2};
`;
