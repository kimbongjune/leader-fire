import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import Navbar from '@/components/common/Navbar/Navbar';
import DrawerButtons from './DrawerButtons';
import FloatingButtons from './FloatingButtons';
import VehicleStatus, { DispatchVehicleDataType } from './VehicleStatus';
import ShareVehicleModal from './ShareVehicleModal';
import { KakaoUtil, Position } from './kakaoUtil';
import useDeviceType from '@/hooks/useDeviceType';
import Menu from '@/components/common/Menu/Menu';
import { DeviceType } from '@/types/types';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import AddressTab from '@/components/common/Menu/AddressTab';
import { Flex, Stack } from '@chakra-ui/react';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import CompassIcon from '../../../public/images/icons/compass.svg';
import MyLocationIcon from '../../../public/images/icons/myLocation.svg';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
const KakaoMap = dynamic(() => import('./KakaoMap'), { ssr: false });

import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  latitude: number; // 위도
  longitude: number; // 경도
  title: string;
  vehicleData: DispatchVehicleDataType[]; // 출동차량 데이터
}

//TODO 지도(핸드폰 or 태블릿 크게보기), 소화전, 비상소화장치, 대상물, 위험물 표시/ 미터, 피난약자, 과거이력 제거, 롱클릭 시 오버레이와 마커 표시(마커는 한건만)
//TODO 지도 화면의 버튼이 미니맵의 버튼과 다름 개수, 이름 뭐로 맞춰야하는지
const Map = (props: Props) => {
  const router = useRouter();
  const deviceType = useDeviceType();
  const apiKey = process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY;
  const kakaoRef = useRef<any>();

  const isWaterActive = useSelector((state: RootState) => state.disaster.isWaterMarkerActive);
  const isExtinguisherActive = useSelector((state: RootState) => state.disaster.isExtinguisherMarkerActive);
  const isTargetActive = useSelector((state: RootState) => state.disaster.isTargetMarkerActive);
  const isDangerActive = useSelector((state: RootState) => state.disaster.isDangerMarkerActive);

  const [isClickRescuePosition, setIsClickRescuePosition] = useState(false); // 긴급구조위치
  const [isClickVehicle, setIsClickVehicle] = useState(false); //출동 차량
  const [isClickVideo, setIsClickVideo] = useState(false); //영상공유
  const [isClickWater, setIsClickWater] = useState(false); // 소방용수
  const [isClickTarget, setIsClickTarget] = useState(false); // 대상물
  const [isClickDanger, setIsClickDanger] = useState(false); // 위협물
  const [isClickVolunteerCaptain, setIsClickVolunteerCaptain] = useState(false); // 의용대장
  const [isClickVulnerble, setIsClickVulnerble] = useState(false); // 피난약자
  const [isClickCompassButton, setIsClickCompassButton] = useState(false); // 나침반 버튼 클릭 유무
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickClose = () => {
    router.back();
  };

  const changeStatus = (value: string) => {
    if (value === 'rescuePosition') setIsClickRescuePosition(prev => !prev);
    if (value === 'vehicle') setIsClickVehicle(prev => !prev);
    if (value === 'video') setIsClickVideo(prev => !prev);
    if (value === 'water') setIsClickWater(prev => !prev);
    if (value === 'target') setIsClickTarget(prev => !prev);
    if (value === 'danger') setIsClickDanger(prev => !prev);
    if (value === 'captain') setIsClickVolunteerCaptain(prev => !prev);
    if (value === 'vulnerble') setIsClickVulnerble(prev => !prev);
  };

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        kakaoRef.current = new KakaoUtil(props.latitude, props.longitude);
        const map = kakaoRef.current.getMap;
        // 출동 차량마커가 표시될 좌표 배열
        const vehiclePositions: Position[] = [
          {
            location: new window.kakao.maps.LatLng(37.518195, 127.071881),
            type: '펌프',
          },
        ];

        // 소방 용수마커가 표시될 좌표 배열
        const waterPositions: Position[] = [
          {
            location: new window.kakao.maps.LatLng(37.516386, 127.079452),
            type: '지상',
          },
          {
            location: new window.kakao.maps.LatLng(37.515658, 127.077578),
            type: '지하',
          },
        ];

        // 긴급구조위치가 표시될 좌표 배열
        const rescuePositions: Position[] = [
          {
            location: new window.kakao.maps.LatLng(37.514586, 127.074617),
            type: '긴급구조',
          },
        ];

        // 영상공유가 표시될 좌표 배열
        const videoPositions: Position[] = [
          {
            location: new window.kakao.maps.LatLng(37.513803, 127.073673),
            type: '영상공유',
          },
        ];

        // 대상물이 표시될 좌표 배열
        const targetPositions: Position[] = [
          {
            location: new window.kakao.maps.LatLng(37.514781, 127.074574),
            type: '대상물',
            label: '대상물 A',
            route: `/detail/neighborhood?type=facilities&id=1`,
          },
        ];

        // 위험물이 표시될 좌표 배열
        const dangerPositions: Position[] = [
          {
            location: new window.kakao.maps.LatLng(37.515394, 127.084616),
            type: '위험물',
            label: '위험물 A',
          },
        ];

        // 의용대장이 표시될 좌표 배열
        const volunteerCaptainPositions: Position[] = [
          {
            location: new window.kakao.maps.LatLng(37.512017, 127.078812),
            type: '의용대장',
          },
        ];
        // 피난약자가 표시될 좌표 배열
        const vulnerblePositions: Position[] = [
          {
            location: new window.kakao.maps.LatLng(37.5074886, 127.0736289),
            type: '피난약자',
          },
        ];

        const vehicleMarkers: any = []; // 출동차량 마커 객체를 가지고 있을 배열
        const waterMarkers: any = []; //소방용수 마커 객체를 가지고 있을 배열
        const rescueMarkers: any = []; //긴급구조위치 마커 객체를 가지고 있을 배열
        const videoMarkers: any = [];
        const targetMarkers: any = [];
        const dangerMarkers: any = [];
        const volunteerCaptainMarkers: any = [];
        const vulnerbleMarkers: any = [];
        let destinationMarkers: any = [];

        window.kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
          const id = uuidv4();
          let destinationPositions: Position[] = [
            {
              location: mouseEvent.latLng,
              type: '도착지',
              id: id,
            },
          ];
          kakaoRef.current.createMarkers(destinationPositions, destinationMarkers, 32, 32, id);
          kakaoRef.current.toggleMarkersAndResetBounds({ kakaoMap: map, markers: destinationMarkers, type: 'add' });

          // 커스텀 오버레이에 추가할 HTML
          const content = document.createElement('div');
          content.innerHTML = `<div class="destinationMarker-wrapper">
          <div class="destinationMarker-label">도착지 <div class="delete-button">삭제</div></div>
          </div>`;

          var customOverlay = new window.kakao.maps.CustomOverlay({
            position: mouseEvent.latLng,
            content: content,
            clickable: true,
          });

          // 삭제 버튼에 이벤트
          const deleteButton = content.querySelector('.delete-button');
          if (deleteButton) {
            deleteButton.addEventListener('click', event => {
              destinationMarkers = destinationMarkers.filter((marker: any) => {
                if (marker.id === id) {
                  marker?.setMap(null);
                  return false;
                }
                return true;
              });

              customOverlay.setMap(null);
            });
          }
          customOverlay.setMap(map);

          destinationMarkers.map((marker: any) => {
            return window.kakao.maps.event.addListener(marker, 'click', function () {
              setIsModalOpen(true);
            });
          });
        });

        if (isClickCompassButton) {
          const content = `<svg xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76" fill="none">
          <circle opacity=".2" cx="37.594" cy="37.594" r="28" transform="rotate(26.693 37.594 37.594)" fill="#9747FF"/>
          <path d="M35.822 29.987 44.78 23.3l-.025 11.18-8.934-4.492Z" fill="#9747FF"/>
          <circle cx="37.594" cy="37.594" r="8" transform="rotate(26.693 37.594 37.594)" fill="#9747FF" stroke="#fff" stroke-width="4"/>
        </svg>`;
          const position = new window.kakao.maps.LatLng(props.latitude, props.longitude);
          const customOverlay = new window.kakao.maps.CustomOverlay({
            position,
            content,
          });
          customOverlay.setMap(map);
        }

        if (!isClickCompassButton) {
          kakaoRef.current.setMarker(props.latitude, props.longitude, 56, 56, '/images/mapIcons/userMarker.svg'); // 내 위치 마커를 생성하고 지도에 표시합니다.
        }

        kakaoRef.current.setMarker(props.latitude, props.longitude, 56, 56, '/images/mapIcons/userMarker.svg'); // 내 위치 마커를 생성하고 지도에 표시합니다.
        kakaoRef.current.createMarkers(vehiclePositions, vehicleMarkers, 48, 48); // 출동차량 마커를 생성하고 주차장 마커 배열에 추가합니다
        kakaoRef.current.createMarkers(waterPositions, waterMarkers, 48, 48); // 소방용수 마커를 생성하고 주차장 마커 배열에 추가합니다
        kakaoRef.current.createMarkers(rescuePositions, rescueMarkers, 191, 191); // 긴급구조위치 마커를 생성하고 주차장 마커 배열에 추가합니다
        kakaoRef.current.createMarkers(videoPositions, videoMarkers, 48, 48); // 영상공유 마커를 생성하고 주차장 마커 배열에 추가합니다
        kakaoRef.current.createMarkers(targetPositions, targetMarkers, 48, 48); // 대상물 마커를 생성하고 주차장 마커 배열에 추가합니다
        kakaoRef.current.createMarkers(dangerPositions, dangerMarkers, 48, 48); // 위험물 마커를 생성하고 주차장 마커 배열에 추가합니다
        kakaoRef.current.createMarkers(volunteerCaptainPositions, volunteerCaptainMarkers, 48, 48); // 의용대장 마커를 생성하고 주차장 마커 배열에 추가합니다
        kakaoRef.current.createMarkers(vulnerblePositions, vulnerbleMarkers, 48, 48); // 피난약자 마커를 생성하고 주차장 마커 배열에 추가합니다

        kakaoRef.current.onClickMarkerButton({ isClick: isClickRescuePosition, markers: rescueMarkers });
        kakaoRef.current.onClickMarkerButton({ isClick: isClickVehicle, markers: vehicleMarkers });
        kakaoRef.current.onClickMarkerButton({ isClick: isClickVideo, markers: videoMarkers });
        kakaoRef.current.onClickMarkerButton({ isClick: isClickWater, markers: waterMarkers });
        kakaoRef.current.onClickMarkerButton({ isClick: isClickTarget, markers: targetMarkers });
        kakaoRef.current.onClickMarkerButton({ isClick: isClickDanger, markers: dangerMarkers });
        kakaoRef.current.onClickMarkerButton({ isClick: isClickVolunteerCaptain, markers: volunteerCaptainMarkers });
        kakaoRef.current.onClickMarkerButton({ isClick: isClickVulnerble, markers: vulnerbleMarkers });

        targetMarkers.map((marker: any) => {
          return window.kakao.maps.event.addListener(marker, 'click', function () {
            targetPositions.map(item => {
              kakaoRef.current.createInfowindow(item.label, item.route).open(map, marker);
            });
          });
        });

        dangerMarkers.map((marker: any) => {
          return window.kakao.maps.event.addListener(marker, 'click', function () {
            dangerPositions.map(item => {
              kakaoRef.current.createInfowindow(item.label).open(map, marker);
            });
          });
        });
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, [isClickVehicle, isClickVolunteerCaptain, isClickVulnerble, isClickWater, isClickRescuePosition, isClickVideo, isClickTarget, isClickDanger, props.latitude, props.longitude, isClickCompassButton]);

  return (
    <Flex direction="column" h="100vh">
      {deviceType === 'mobile' && (
        <>
          <Menu title={props.title} subTitle="경남 진주시 진주대로 345-13, 203호" contentGap="12px" hasCloseButtonWithoutString={true} closeButtonText="닫기" onClickBackButton={onClickClose} onCloseButton={onClickClose} />
        </>
      )}
      {deviceType === 'tabletVertical' && (
        <>
          <Menu title={props.title} subTitle="경남 진주시 진주대로 345-13, 203호" contentGap="12px" onClickBackButton={onClickClose} onCloseButton={onClickClose} />
          <AddressTab contentJustify={'flex-start'} marginLeft="8px" />
        </>
      )}
      {deviceType === 'tabletHorizontal' && <Menu title={props.title} subTitle="경남 진주시 진주대로 345-13, 203호" contentGap="12px" onClickBackButton={onClickClose} onCloseButton={onClickClose} />}
      <Container deviceType={deviceType}>
        <VehicleStatus />
        <Wrapper deviceType={deviceType}>
          <MapWrapper deviceType={deviceType}>
            <FloatingButtons isClickRescuePosition={isClickRescuePosition} isClickVideo={isClickVideo} changeStatus={changeStatus} isClickVehicle={isClickVehicle} hasSkyButton={true} />
            <KakaoMap />
            <Stack spacing="16px" position={deviceType === 'tabletHorizontal' ? 'fixed' : 'fixed'} left={deviceType === 'tabletHorizontal' ? '331px' : '16px'} bottom={deviceType === 'tabletHorizontal' ? '120px' : '97px'} zIndex={10}>
              <CircleButton onClick={() => setIsClickCompassButton(prev => !prev)}>
                <IconWrapper width="24px" height="24px" color={theme.colors.gray}>
                  <CompassIcon />
                </IconWrapper>
              </CircleButton>
              <CircleButton
                onClick={() => {
                  kakaoRef.current.setCenter(props.latitude, props.longitude);
                }}
              >
                <IconWrapper width="24px" height="24px" color={theme.colors.gray}>
                  <MyLocationIcon />
                </IconWrapper>
              </CircleButton>
            </Stack>
          </MapWrapper>
        </Wrapper>
        <NavbarWrapper>
          {deviceType === 'tabletHorizontal' && (
            <DrawerButtons isClickWater={isClickWater} isClickTarget={isClickTarget} isClickDanger={isClickDanger} isClickVolunteerCaptain={isClickVolunteerCaptain} isClickVulnerble={isClickVulnerble} changeStatus={changeStatus} />
          )}
          {deviceType !== 'tabletHorizontal' && (
            <DrawerButtons isClickWater={isClickWater} isClickTarget={isClickTarget} isClickDanger={isClickDanger} isClickVolunteerCaptain={isClickVolunteerCaptain} isClickVulnerble={isClickVulnerble} changeStatus={changeStatus} />
          )}
          <Navbar />
        </NavbarWrapper>
        {isModalOpen && <ShareVehicleModal vehicleData={props.vehicleData} onCloseModal={setIsModalOpen} />}
      </Container>
    </Flex>
  );
};

Map.defaultProps = {
  title: '지도',
  latitude: 37.516633,
  longitude: 127.077374,
  vehicleData: [
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
export default Map;

const Container = styled.div<{ deviceType: DeviceType }>`
  display: flex;
  flex-direction: column;
  // height: 100vh;
  flex: 1;
  ${({ deviceType }) => {
    return (
      deviceType === 'tabletHorizontal' &&
      css`
        display: flex;
        flex-direction: row;
        background-color: ${theme.colors.gray1};
      `
    );
  }}
`;

const Wrapper = styled.div<{ deviceType?: DeviceType }>`
  width: 100%;
  position: relative;
  // height: fit-content;
  flex: 1;
  // padding: 24px 16px;

  ${({ deviceType }) => {
    if (deviceType === 'tabletHorizontal') {
      return `
        padding: 24px 16px 105px;
      `;
    }
  }}
`;

const NavbarWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 99;
  width: 100%;
`;

const MapWrapper = styled.div<{ deviceType: DeviceType }>`
  display: flex;
  position: relative;
  flex: 1;
  height: 100%;
  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical') {
      return `
        min-height: 676px;
      `;
    }
  }}
`;

const CircleButton = styled.button`
  width: fit-content;
  padding: 16px;
  border-radius: 44px;
  border: 1px solid ${theme.colors.gray2};
  background: #fff;
`;
