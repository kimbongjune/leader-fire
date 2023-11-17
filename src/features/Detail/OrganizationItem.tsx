import theme from '@/theme/colors';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import DetailItem from './DetailItem';
import { isUndefined } from 'lodash';
import ChevronRightIcon from '../../../public/images/icons/chevron-right.svg';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import { DeviceType } from '@/types/types';
import { useRouter } from 'next/router';

interface Props {
  TotalNumberOfVehicle: number;
  TotalNumberOfPeople: number;
  groups: {
    name: string;
    unit?: number;
    numberOfPeople: number;
  }[];
  vehicles: {
    name: string;
    numberOfVehicles: number;
  }[];
  deviceType: DeviceType;
}

const OrganizationItem = (props: Props) => {
  const router = useRouter();
  const id = router.query.id;
  const { deviceType } = props;
  return (
    <Box onClick={() => router.push(`/detail/organization`)}>
      <DetailItem title="출동대 편성">
        <ContentWrapper>
          <Stack spacing="8px" flex={1}>
            <Content>
              <PersonnelStatus>
                <Flex gap="4px" align="center">
                  총<span>{String(props.TotalNumberOfVehicle).padStart(3, '0')}</span>대 / <span>{String(props.TotalNumberOfPeople).padStart(3, '0')}</span> 명
                </Flex>
              </PersonnelStatus>
            </Content>
            <Flex gap="8px" flex={1} align="center">
              <Content flex={1} height="100%" align="flex-start">
                <Stack flex={1} divider={<Divider deviceType={deviceType} />}>
                  {props.groups?.map((group, index) => {
                    return (
                      <Flex key={index} justify="space-between" align="center">
                        <Name>{group.name}</Name>
                        {!isUndefined(group.unit) && (
                          <Status>
                            {String(group.unit).padStart(2, '0')}개소 <span>({String(group.numberOfPeople).padStart(2, '0')}명)</span>
                          </Status>
                        )}
                        {isUndefined(group.unit) && <Status>{String(group.numberOfPeople).padStart(2, '0')}명</Status>}
                      </Flex>
                    );
                  })}
                </Stack>
              </Content>
              {/* 태블릿 차량 대수 */}
              {deviceType !== 'mobile' && (
                <Content>
                  <Stack spacing={'8px'} minW="152px" flex={1}>
                    {props.vehicles?.map((vehicle, index) => {
                      return (
                        <Flex key={index} justify="space-between" gap="8px" align="center">
                          <Name>{vehicle.name}</Name>
                          <Status>{String(vehicle.numberOfVehicles).padStart(2, '0')}대</Status>
                        </Flex>
                      );
                    })}
                  </Stack>
                </Content>
              )}
            </Flex>
          </Stack>
          {/* 모바일 차량 대수 */}
          {deviceType === 'mobile' && (
            <Content>
              <Stack spacing="8px">
                {props.vehicles?.map((vehicle, index) => {
                  return (
                    <Flex key={index} justify="space-between" gap="8px" align="center">
                      <Name>{vehicle.name}</Name>
                      <Status>{String(vehicle.numberOfVehicles).padStart(2, '0')}대</Status>
                    </Flex>
                  );
                })}
              </Stack>
            </Content>
          )}
        </ContentWrapper>
      </DetailItem>
    </Box>
  );
};

export default OrganizationItem;

OrganizationItem.defaultProps = {
  TotalNumberOfVehicle: 0,
  TotalNumberOfPeople: 0,
  groups: [
    {
      name: '안전센터',
      unit: 0,
      numberOfPeople: 0,
    },
    {
      name: '구조대',
      unit: 0,
      numberOfPeople: 0,
    },
    {
      name: '지역대',
      unit: 0,
      numberOfPeople: 0,
    },
    {
      name: '의소대',
      unit: 2,
      numberOfPeople: 90,
    },
    {
      name: '생명지킴이',
      numberOfPeople: 0,
    },
  ],
  vehicles: [
    {
      name: '펌프차',
      numberOfVehicles: 0,
    },
    {
      name: '사다리',
      numberOfVehicles: 0,
    },
    {
      name: '물탱크',
      numberOfVehicles: 0,
    },
    {
      name: '화학차',
      numberOfVehicles: 0,
    },
    {
      name: '굴절차',
      numberOfVehicles: 0,
    },
    {
      name: '영상차',
      numberOfVehicles: 0,
    },
    {
      name: '기타',
      numberOfVehicles: 0,
    },
  ],
};

const ContentWrapper = styled.div`
  display: flex;
  gap: 8px;
  background: ${theme.colors.white};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray2};
`;

const Content = styled.div<{ height?: string; align?: string; flex?: number }>`
  display: flex;
  justify-content: center;
  align-items: ${({ align }) => align ?? 'center'};
  border-radius: 4px;
  background: ${theme.colors.gray1};
  padding: 16px;
  flex: ${({ flex }) => flex};
  height: ${({ height }) => height};
`;

const PersonnelStatus = styled.div`
  color: ${theme.colors.gray10};
  text-overflow: ellipsis;
  font-family: NanumSquare;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 111.111% */
  letter-spacing: -0.36px;
  span {
    color: ${theme.colors.orange}; // #FF8A3A;
    text-overflow: ellipsis;
    font-family: NanumSquare;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 111.111% */
    letter-spacing: -0.36px;
  }
`;

const Name = styled.div`
  overflow: hidden;
  color: ${theme.colors.gray3}; //#909aa4;
  text-overflow: ellipsis;
  font-family: Pretendard SemiBold;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
`;

const Status = styled.div`
  overflow: hidden;
  color: ${theme.colors.gray8}; // #343a40;
  text-overflow: ellipsis;
  font-family: Pretendard SemiBold;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;

  span {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: ${theme.colors.gray6}; // #6c757d;
    text-overflow: ellipsis;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: -0.28px;
  }
`;

const Divider = styled.div<{ deviceType: DeviceType }>`
  height: 8px;
  ${({ deviceType }) => {
    if (deviceType !== 'mobile') {
      return `
      height: 0px;
      border-bottom: 1px solid ${theme.colors.gray2};
      margin: 10px 0;
      `;
    }
  }}
`;
