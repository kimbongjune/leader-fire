import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import Layout from '@/components/common/Layout/Layout';
import Menu from '@/components/common/Menu/Menu';
import SwiperView from '@/components/common/SwiperView/SwiperView';
import DetailItem from '@/features/Detail/DetailItem';
import OrganizationTable from '@/features/Detail/Table/OrganizationTable';
import { OrganizationTableData } from '@/features/Detail/Table/TableData';
import VehicleStatusTable from '@/features/Detail/Table/VehicleStatusTable';
import VehicleTable from '@/features/Detail/Table/VehicleTable';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType } from '@/types/types';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import SwiperIcon from '../../../../public/images/icons/swipe.svg';
import theme from '@/theme/colors';
import { Swiper, SwiperSlide } from 'swiper/react';

//TODO 출동대 편성 상세보기 페이지
const OrganizationPage = () => {
  const router = useRouter();
  const deviceType = useDeviceType();

  if (!deviceType) return null;

  return (
    <Layout>
      <Flex direction="column" height="100%" background={theme.colors.gray1}>
        <MenuWrapper deviceType={deviceType}>
          <Menu title="출동대 편성" contentAlign="center" hasBackButton={false} onCloseButton={() => router.back()} />
        </MenuWrapper>
        {deviceType === 'mobile' && (
          <Flex align="center" justify="center" m="16px" gap="8px">
            <IconWrapper width="20px" height="20px" color={theme.colors.gray}>
              <SwiperIcon />
            </IconWrapper>
            <Guide>좌우 스크롤로 확인하실 수 있습니다</Guide>
          </Flex>
        )}
        <Children deviceType={deviceType}>
          {deviceType === 'mobile' && (
            <SwiperWrapper>
              <Swiper className="mySwiper" slidesPerView={1.1} spaceBetween={8} centeredSlides={true}>
                <SwiperSlide>
                  <DetailItemWrapperForTitle>
                    <DetailItem title="출동대 편성 목록 (60초마다 갱신, #1)">
                      <VehicleStatusTable deviceType={deviceType} />
                    </DetailItem>
                  </DetailItemWrapperForTitle>
                </SwiperSlide>
                <SwiperSlide>
                  <DetailItemWrapperForTitle>
                    <DetailItem title="출동대 편성 집계 (60초마다 갱신, #2)">
                      <Stack spacing="12px">
                        <OrganizationTable deviceType={deviceType} />
                        <VehicleTable deviceType={deviceType} />
                      </Stack>
                    </DetailItem>
                  </DetailItemWrapperForTitle>
                </SwiperSlide>
                <SwiperSlide>
                  <DetailItemWrapperForTitle>
                    <DetailItem title="출동 집계 (60초마다 갱신, #3)">
                      <OrganizationTable columnNames={['구분', '출동', '인원수']} deviceType={deviceType} />
                      <VehicleTable deviceType={deviceType} />
                    </DetailItem>
                  </DetailItemWrapperForTitle>
                </SwiperSlide>
                <SwiperSlide>
                  <DetailItemWrapperForTitle minW="343px">
                    <DetailItem title="현장도착 집계 (60초마다 갱신, #4)">
                      <OrganizationTable columnNames={['구분', '현장도착', '인원수']} deviceType={deviceType} />
                      <VehicleTable deviceType={deviceType} />
                    </DetailItem>
                  </DetailItemWrapperForTitle>
                </SwiperSlide>
                <SwiperSlide>
                  <DetailItemWrapperForTitle minW={deviceType === 'mobile' && '343px'}>
                    <DetailItem title="귀소 집계 (60초마다 갱신, #5)">
                      <OrganizationTable columnNames={['구분', '귀소', '인원수']} deviceType={deviceType} />
                      <VehicleTable deviceType={deviceType} />
                    </DetailItem>
                  </DetailItemWrapperForTitle>
                </SwiperSlide>
              </Swiper>
            </SwiperWrapper>
          )}
          {deviceType !== 'mobile' && (
            <SwiperViewWrapper deviceType={deviceType}>
              <SwiperView gap={deviceType === 'tabletVertical' ? 40 : 48}>
                <DetailItemWrapperForTitle>
                  <DetailItemWrapper>
                    <DetailItem title="출동대 편성 목록 (60초마다 갱신, #1)">
                      {deviceType === 'tabletVertical' && (
                        <Stack spacing="12px">
                          <VehicleStatusTable deviceType={deviceType} />
                        </Stack>
                      )}
                      {deviceType === 'tabletHorizontal' && (
                        <Flex gap="16px">
                          <Box flex={1}>
                            <VehicleStatusTable deviceType={deviceType} />
                          </Box>
                        </Flex>
                      )}
                    </DetailItem>
                  </DetailItemWrapper>
                </DetailItemWrapperForTitle>
                <DetailItemWrapperForTitle>
                  <DetailItemWrapper>
                    <DetailItem title="출동대 편성 집계 (60초마다 갱신, #2)">
                      {deviceType === 'tabletVertical' && (
                        <Stack spacing="12px">
                          <OrganizationTable deviceType={deviceType} />
                          <VehicleTable deviceType={deviceType} />
                        </Stack>
                      )}
                      {deviceType === 'tabletHorizontal' && (
                        <Flex gap="16px">
                          <Box flex={1}>
                            <OrganizationTable deviceType={deviceType} />
                          </Box>
                          <Box flex={1}>
                            <VehicleTable deviceType={deviceType} />
                          </Box>
                        </Flex>
                      )}
                    </DetailItem>
                  </DetailItemWrapper>
                </DetailItemWrapperForTitle>
                <DetailItemWrapperForTitle>
                  <DetailItemWrapper>
                    <DetailItem title="출동 집계 (60초마다 갱신, #3)">
                      {deviceType === 'tabletVertical' && (
                        <Stack spacing="12px">
                          <OrganizationTable columnNames={['구분', '출동', '인원수']} deviceType={deviceType} />
                          <VehicleTable deviceType={deviceType} />
                        </Stack>
                      )}
                      {deviceType === 'tabletHorizontal' && (
                        <Flex gap="16px">
                          <Box flex={1}>
                            <OrganizationTable columnNames={['구분', '출동', '인원수']} deviceType={deviceType} />
                          </Box>
                          <Box flex={1}>
                            <VehicleTable deviceType={deviceType} />
                          </Box>
                        </Flex>
                      )}
                    </DetailItem>
                  </DetailItemWrapper>
                </DetailItemWrapperForTitle>
                <DetailItemWrapperForTitle>
                  <DetailItemWrapper>
                    <DetailItem title="현장도착 집계 (60초마다 갱신, #4)">
                      {deviceType === 'tabletVertical' && (
                        <Stack spacing="12px">
                          <OrganizationTable columnNames={['구분', '현장도착', '인원수']} deviceType={deviceType} />
                          <VehicleTable deviceType={deviceType} />
                        </Stack>
                      )}
                      {deviceType === 'tabletHorizontal' && (
                        <Flex gap="16px">
                          <Box flex={1}>
                            <OrganizationTable columnNames={['구분', '현장도착', '인원수']} deviceType={deviceType} />
                          </Box>
                          <Box flex={1}>
                            <VehicleTable deviceType={deviceType} />
                          </Box>
                        </Flex>
                      )}
                    </DetailItem>
                  </DetailItemWrapper>
                </DetailItemWrapperForTitle>
                <DetailItemWrapperForTitle>
                  <DetailItemWrapper>
                    <DetailItem title="귀소 집계 (60초마다 갱신, #5)">
                      {deviceType === 'tabletVertical' && (
                        <Stack spacing="12px">
                          <OrganizationTable columnNames={['구분', '귀소', '인원수']} deviceType={deviceType} />
                          <VehicleTable deviceType={deviceType} />
                        </Stack>
                      )}
                      {deviceType === 'tabletHorizontal' && (
                        <Flex gap="16px">
                          <Box flex={1}>
                            <OrganizationTable columnNames={['구분', '귀소', '인원수']} deviceType={deviceType} />
                          </Box>
                          <Box flex={1}>
                            <VehicleTable deviceType={deviceType} />
                          </Box>
                        </Flex>
                      )}
                    </DetailItem>
                  </DetailItemWrapper>
                </DetailItemWrapperForTitle>
              </SwiperView>
            </SwiperViewWrapper>
          )}
        </Children>
      </Flex>
    </Layout>
  );
};

export default OrganizationPage;

const Children = styled.div<{ deviceType: DeviceType }>`
  display: flex;
  flex-direction: column;
  // gap: 20px;
  flex: 1;
  background: #f8f9fa;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
  }

  scrollbar-width: none;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        padding: 0;
        // margin: 24px 0;
      }
      `;
    }
  }}
`;

const MenuWrapper = styled.div<{ deviceType: DeviceType }>`
  ${({ deviceType }) => {
    if (deviceType !== 'mobile') {
      return `
          .menu-container {
            padding: 20px 16px;
          }

          .close-button {
            width: 32px;
            height: 32px;
          }

          .title {
            font-family: Pretendard Bold;
            font-size: 24px;
            line-height: 32px; /* 133.333% */
            letter-spacing: -0.48px;
            justify-content: flex-start;
            padding: 0;
          }
      `;
    }
  }}
`;

const DetailItemWrapper = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }

  div:nth-of-type(2) {
    height: 100%;
  }
`;

const DetailItemWrapperForTitle = styled.div<any>`
  // height: 100%;
  width: 100%;
  min-width: ${({ minW }) => minW};
  .title {
    color: #495057;
  }
`;

const SwiperViewWrapper = styled.div<{ deviceType?: DeviceType }>`
  height: 100%;
  ${({ deviceType }) =>
    deviceType === 'tabletHorizontal' &&
    `
    .swiper-slide {
      display: flex;
      width: 100%;
      height: fit-content;
    }
  `};
`;

const Guide = styled.div`
  color: ${theme.colors.gray};
  font-family: Pretendard SemiBold;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
`;

const SwiperWrapper = styled.div`
  height: 100%;
  
  .swiper-wrapper {
    margin-bottom: 8px;
  }
`;
