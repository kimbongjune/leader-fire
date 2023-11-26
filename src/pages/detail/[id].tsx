import Layout from '@/components/common/Layout/Layout';
import AddressTab from '@/components/common/Menu/AddressTab';
import Menu from '@/components/common/Menu/Menu';
import ControlItem from '@/features/Detail/ControlItem';
import Neighborhood from '@/features/Detail/Neighborhood';
import OrganizationItem from '@/features/Detail/OrganizationItem';
import ReportItem from '@/features/Detail/ReportItem';
import useDeviceType from '@/hooks/useDeviceType';
import theme from '@/theme/colors';
import { DeviceType } from '@/types/types';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import VehicleStatusPanelContainer from '@/features/Detail/VehicleStatusPanelContainer';
import dynamic from 'next/dynamic';
import ChevronRightIcon from '../../../public/images/icons/chevron-right.svg';
import { useEffect, useState } from 'react';
import { KakaoUtil, Position } from '@/features/Map/kakaoUtil';
import FloatingButtons from '@/features/Map/FloatingButtons';
import ObjectPosition, { MarkerType } from '@/features/Map/ObjectPosition';
import MiniMap from '@/features/Map/MiniMap';
import TestMap from '@/features/Map/TestMap';
import { NextPageContext } from 'next';
import { RootState } from '../../app/store';
import { shallowEqual, useSelector } from 'react-redux';
import axios from "../../components/common/api/axios"
import { selectDisasterById } from '@/features/slice/test';
import { setPollingInterval, isPollingActive, fetchDisasterDetail } from '../../features/global/GlobalApiCallHandler';

//TODO 상세 페이지, 상세정보 조회(폴링)
const DetailPage = () => {
  const router = useRouter();
  const deviceType = useDeviceType();
  const id = router.query.id as string;

  useEffect(() =>{
    //TODO 재난번호 파라미터로 상세 정보 조회
    //관제내용은 ControlItem 컴포넌트에
    //출동대 편성 데이터는 OrganizationItem 컴포넌트에
  })

  const [markerCount, setMarkerCount] = useState<MarkerType[]>([])

  useEffect(() => {
    if (id && !isPollingActive()) {
      fetchDisasterDetail(id);
      const interval =  setInterval(() => fetchDisasterDetail(id), 10000);
      setPollingInterval(interval);
    }
  }, [id]);

  const data = useSelector((state: RootState) => selectDisasterById(state, id), shallowEqual);

  if (!deviceType) return null;

  return (
    <Layout>
      <Flex direction="column" height="100%" background={deviceType === 'tabletHorizontal' ? theme.colors.white : theme.colors.gray1}>
        {deviceType === 'mobile' && <Menu status={data?.status} title={data?.eventName} timestamp={data?.created} contentAlign={'space-between'} hasCloseButtonWithoutString={false} onClickBackButton={() => router.back()} />}
        {deviceType !== 'mobile' && (
          <MenuWrapper deviceType={deviceType}>
            <Menu title={data?.eventName} status={data?.status} hasCloseButtonWithoutString={false} onClickBackButton={() => router.push("/home")} onCloseButton={() => router.push('/')} timestamp={data?.created} contentAlign="space-between" />
          </MenuWrapper>
        )}
        <AddressTabWrapper deviceType={deviceType}>
          <AddressTab address={data?.lawAddr} />
        </AddressTabWrapper>
        <Children>
          <Flex direction={deviceType === 'tabletHorizontal' ? 'row' : 'column'} w="100%">
            <Stack spacing="24px" p="24px 16px 16px" flex={1} borderRight={deviceType === 'tabletHorizontal' ? `1px solid ${theme.colors.gray2}` : ''}>
              {/* 신고내용 */}
              <ReportItem callTell={data?.callTell!!} deviceType={deviceType} description={data?.description!!} />
              {/* 관제내용 */}
              <ControlItem deviceType={deviceType} />
              {/* 모바일 지도보기 버튼 추가 */}
              {deviceType === 'mobile' && (
                <MapButton onClick={() => router.push(`/detail/map?id=${router.query.id}`)}>
                  지도보기
                  <IconWrapper width="24px" height="24px" color={theme.colors.white}>
                    <ChevronRightIcon />
                  </IconWrapper>
                </MapButton>
              )}
              {/* 출동대 편성 */}
              <OrganizationItem deviceType={deviceType} />
              {deviceType === 'mobile' && <Neighborhood />}
              {deviceType === 'tabletVertical' && (
                <Box height="424px" borderRadius="8px" overflow="hidden">
                  <TestMap deviceType={deviceType} setMarkerCount={setMarkerCount} />
                </Box>
              )}
            </Stack>
            {deviceType === 'tabletHorizontal' && (
              <Flex gap="24px" direction="column" h="100%" flex={1} p="24px 16px" bg={theme.colors.gray1}>
                <Box flex={2}>
                  {/* <MiniMap deviceType={deviceType} /> */}
                  <TestMap deviceType={deviceType} setMarkerCount={setMarkerCount} />
                </Box>
                <Box flex={1}>
                  <ObjectPosition items={markerCount} />
                </Box>
              </Flex>
            )}
          </Flex>
          {/* 사이드 패널 숨김 처리 */}
          {/* {deviceType !== 'mobile' && <VehicleStatusPanelContainer />} */}
        </Children>
      </Flex>
    </Layout>
  );
};

export default DetailPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  return { props: { query } };
};

const Children = styled.div`
  flex: 1;
  display: flex;
  // flex-direction: column;
  // padding: 24px 16px 16px;
  height: 100%;
  // gap: 24px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
  }

  scrollbar-width: none;
`;

const MenuWrapper = styled.div<{ deviceType: DeviceType }>`
  .button {
    color: #909aa4;
  }

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        .menu-container {
          padding: 20px 16px;
        }

        .back-button {
          width: 32px;
          height: 32px;
        }

        .title {
          font-family: Pretendard Bold;
          font-size: 24px;
          line-height: 32px; /* 133.333% */
          letter-spacing: -0.48px;
          padding: 0 0 0 8px;
        }

        .timestamp-stack {
          flex-direction: row;
          align-items: center;
          gap: 8px;
        }

        .timestamp {
          font-family: Pretendard SemiBold;
          font-size: 20px;
          line-height: 32px; /* 160% */
          letter-spacing: -0.4px;
        }

        .clock-icon {
          width: 16px;
          height: 16px;
        }

        .passed-time {
          color: var(--05, #ADB5BD);
          font-family: Pretendard SemiBold;
          font-size: 16px;
          line-height: 24px; /* 150% */
          letter-spacing: -0.32px;
        }
      `;
    }
  }}
`;

const AddressTabWrapper = styled.div<{ deviceType: DeviceType }>`
  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        .address-tab-container {
          padding: 16px;
        }

        .address-tab-flex {
          gap: 8px;
          justify-content: flex-start;
        }

        .copy-icon-box {
          margin-left: 0;
        }
      `;
    }
  }}
`;

const MapButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  paddding: 8px;
  color: ${theme.colors.white};
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: -0.32px;
  padding: 8px;
  gap: 4px;
  background: ${theme.colors.gray7};
  border-radius: 4px;
`;

const MapContainer = styled.div`
  flex: 2;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${theme.colors.gray2};
  position: relative;
  .map_container {
    height: 100%;
  }
`;

const FloatingButtonWrapper = styled.div`
  & > div > div > div {
    flex-direction: column;
    width: fit-content;
  }

  & > div > div {
    padding: 16px;
  }

  & > div > div > div > div > div:nth-of-type(2) {
    display: none;
  }

  & > div > div > div > div {
    min-width: 104px;
    padding: 8px;
  }
`;

const TabletVerticalMapContainer = styled.div`
  .map_container {
    max-height: 424px;
  }
  position: relative;
  padding: 16px;

  & > div > div {
    border-radius: 8px;
  }

  & > div > div > div > div {
    padding: 16px;
  }
`;

const ZoomInButton = styled(Box)`
  color: ${theme.colors.gray};
  font-family: Pretendard Bold;
  font-size: 12px;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;
  position: absolute;
  z-index: 100;
  padding: 7px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.gray2};
  background: ${theme.colors.white};
`;
