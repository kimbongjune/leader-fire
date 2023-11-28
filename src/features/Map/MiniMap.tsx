// import { DeviceType } from '@/types/types';
// import FloatingButtons from './FloatingButtons';
// import { useEffect, useRef, useState } from 'react';
// import { KakaoUtil, Position } from './kakaoUtil';
// import dynamic from 'next/dynamic';
// import styled from '@emotion/styled';
// import { Box, Stack } from '@chakra-ui/react';
// import theme from '@/theme/colors';
// import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
// import CompassIcon from '../../../public/images/icons/compass.svg';
// import MyLocationIcon from '../../../public/images/icons/myLocation.svg';
// import FullScreenIcon from '../../../public/images/icons/fullscreen.svg';
// import { useRouter } from 'next/router';
// import { v4 as uuidv4 } from 'uuid';

// import { RootState } from '../../app/store';
// import { useDispatch, useSelector } from 'react-redux';
// import { setIsDangerMarkerActive, setIsExtinguisherMarkerActive, setIsTargetMarkerActive, setIsWaterMarkerActive } from '../../features/slice/disasterSlice';

// const KakaoMap = dynamic(() => import('./KakaoMap'), { ssr: false });

// interface Props {
//   deviceType: DeviceType;
//   latitude: number; // 위도
//   longitude: number; // 경도
//   alpha: number; // z축 회전 각도
// }

// //TODO 지도(태블릿 미니맵), 소화전, 비상소화장치, 대상물, 위험물 표시, 롱클릭 시 오버레이와 마커 표시(마커는 한건만)
// const MiniMap = (props: Props) => {
//   const dispatch = useDispatch()
//   const apiKey = process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY;
//   const router = useRouter();
//   const kakaoRef = useRef<any>();

//   const isWaterActive = useSelector((state: RootState) => state.disaster.isWaterMarkerActive);
//   const isExtinguisherActive = useSelector((state: RootState) => state.disaster.isExtinguisherMarkerActive);
//   const isTargetActive = useSelector((state: RootState) => state.disaster.isTargetMarkerActive);
//   const isDangerActive = useSelector((state: RootState) => state.disaster.isDangerMarkerActive);

//   const [isClickRescuePosition, setIsClickRescuePosition] = useState(false); // 긴급구조위치
//   const [isClickVehicle, setIsClickVehicle] = useState(false); //출동 차량
//   const [isClickVideo, setIsClickVideo] = useState(false); //영상공유
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isClickCompassButton, setIsClickCompassButton] = useState(false); // 나침반 버튼 클릭 유무

//   const changeStatus = (value: string) => {
//     if (value === 'rescuePosition') setIsClickRescuePosition(prev => !prev);
//     if (value === 'vehicle') setIsClickVehicle(prev => !prev);
//     if (value === 'video') setIsClickVideo(prev => !prev);
//   };

//   useEffect(() => {
//     dispatch(setIsWaterMarkerActive(isWaterActive === true));
//     dispatch(setIsExtinguisherMarkerActive(isExtinguisherActive === true));
//     dispatch(setIsTargetMarkerActive(isTargetActive === true));
//     dispatch(setIsDangerMarkerActive(isDangerActive === true));
//   }, [isWaterActive, isExtinguisherActive, isTargetActive, isDangerActive]);

//   useEffect(() => {
//     const kakaoMapScript = document.createElement('script');
//     kakaoMapScript.async = false;
//     kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer,drawing&autoload=false`;
//     document.head.appendChild(kakaoMapScript);

//     const onLoadKakaoAPI = () => {
//       window.kakao.maps.load(() => {
//         kakaoRef.current = new KakaoUtil(props.latitude, props.longitude);
//         const map = kakaoRef.current.getMap;
//         // 출동 차량마커가 표시될 좌표 배열
//         const vehiclePositions: Position[] = [
//           {
//             location: new window.kakao.maps.LatLng(37.518195, 127.071881),
//             type: '펌프',
//           },
//         ];

//         // 소방 용수마커가 표시될 좌표 배열
//         const waterPositions: Position[] = [
//           {
//             location: new window.kakao.maps.LatLng(37.516386, 127.079452),
//             type: '지상',
//           },
//           {
//             location: new window.kakao.maps.LatLng(37.515658, 127.077578),
//             type: '지하',
//           },
//         ];

//         // 긴급구조위치가 표시될 좌표 배열
//         const rescuePositions: Position[] = [
//           {
//             location: new window.kakao.maps.LatLng(37.514586, 127.074617),
//             type: '긴급구조',
//           },
//         ];

//         // 영상공유가 표시될 좌표 배열
//         const videoPositions: Position[] = [
//           {
//             location: new window.kakao.maps.LatLng(37.513803, 127.073673),
//             type: '영상공유',
//           },
//         ];

//         // 대상물이 표시될 좌표 배열
//         const targetPositions: Position[] = [
//           {
//             location: new window.kakao.maps.LatLng(37.514781, 127.074574),
//             type: '대상물',
//             label: '대상물 A',
//             route: `/detail/neighborhood?type=facilities&id=1`,
//           },
//         ];

//         // 위험물이 표시될 좌표 배열
//         const dangerPositions: Position[] = [
//           {
//             location: new window.kakao.maps.LatLng(37.515394, 127.084616),
//             type: '위험물',
//             label: '위험물 A',
//           },
//         ];

//         // 비상소화장치가 표시될 좌표 배열
//         const EmergencyFireExtinguisherPositions: Position[] = [
//           {
//             location: new window.kakao.maps.LatLng(37.512017, 127.078812),
//             type: '비상소화장치',
//           },
//         ];
//         // 피난약자가 표시될 좌표 배열
//         const vulnerblePositions: Position[] = [
//           {
//             location: new window.kakao.maps.LatLng(37.5074886, 127.0736289),
//             type: '피난약자',
//           },
//         ];

//         // 과거이력이 표시될 좌표 배열
//         const historyPositions: Position[] = [
//           {
//             location: new window.kakao.maps.LatLng(37.5074886, 127.0736289),
//             type: '과거이력',
//           },
//         ];

//         const vehicleMarkers: any = []; // 출동차량 마커 객체를 가지고 있을 배열
//         const waterMarkers: any = []; //소방용수 마커 객체를 가지고 있을 배열
//         const rescueMarkers: any = []; //긴급구조위치 마커 객체를 가지고 있을 배열
//         const videoMarkers: any = [];
//         const targetMarkers: any = [];
//         const dangerMarkers: any = [];
//         const fireExtinguisherMarkers: any = [];
//         const vulnerbleMarkers: any = [];
//         const historyMarkers: any = [];
//         let destinationMarkers: any = [];

//         window.kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
//           const id = uuidv4();
//           let destinationPositions: Position[] = [
//             {
//               location: mouseEvent.latLng,
//               type: '도착지',
//               id: id,
//             },
//           ];
//           kakaoRef.current.createMarkers(destinationPositions, destinationMarkers, 32, 32, id);
//           kakaoRef.current.toggleMarkersAndResetBounds({ kakaoMap: map, markers: destinationMarkers, type: 'add' });

//           // 커스텀 오버레이에 추가할 HTML
//           const content = document.createElement('div');
//           content.innerHTML = `<div class="destinationMarker-wrapper">
//                    <div class="destinationMarker-label">도착지 <div class="delete-button">삭제</div></div>
//                    </div>`;

//           var customOverlay = new window.kakao.maps.CustomOverlay({
//             position: mouseEvent.latLng,
//             content: content,
//             clickable: true,
//           });

//           // 삭제 버튼에 이벤트
//           const deleteButton = content.querySelector('.delete-button');
//           if (deleteButton) {
//             deleteButton.addEventListener('click', event => {
//               destinationMarkers = destinationMarkers.filter((marker: any) => {
//                 if (marker.id === id) {
//                   marker?.setMap(null);
//                   return false;
//                 }
//                 return true;
//               });

//               customOverlay.setMap(null);
//             });
//           }
//           customOverlay.setMap(map);

//           destinationMarkers.map((marker: any) => {
//             return window.kakao.maps.event.addListener(marker, 'click', function () {
//               setIsModalOpen(true);
//             });
//           });
//         });

//         if (isClickCompassButton) {
//           const content = `<svg xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76" fill="none">
//           <circle opacity=".2" cx="37.594" cy="37.594" r="28" transform="rotate(26.693 37.594 37.594)" fill="#9747FF"/>
//           <path d="M35.822 29.987 44.78 23.3l-.025 11.18-8.934-4.492Z" fill="#9747FF"/>
//           <circle cx="37.594" cy="37.594" r="8" transform="rotate(26.693 37.594 37.594)" fill="#9747FF" stroke="#fff" stroke-width="4"/>
//         </svg>`;
//           const position = new window.kakao.maps.LatLng(props.latitude, props.longitude);
//           const customOverlay = new window.kakao.maps.CustomOverlay({
//             position,
//             content,
//           });
//           customOverlay.setMap(map);
//         }

//         if (!isClickCompassButton) {
//           kakaoRef.current.setMarker(props.latitude, props.longitude, 56, 56, '/images/mapIcons/userMarker.svg'); // 내 위치 마커를 생성하고 지도에 표시합니다.
//         }

//         kakaoRef.current.createMarkers(vehiclePositions, vehicleMarkers, 48, 48); // 출동차량 마커를 생성하고 주차장 마커 배열에 추가합니다
//         kakaoRef.current.createMarkers(waterPositions, waterMarkers, 48, 48); // 소방용수 마커를 생성하고 주차장 마커 배열에 추가합니다
//         kakaoRef.current.createMarkers(rescuePositions, rescueMarkers, 48, 48); // 긴급구조위치 마커를 생성하고 주차장 마커 배열에 추가합니다
//         kakaoRef.current.createMarkers(videoPositions, videoMarkers, 48, 48); // 영상공유 마커를 생성하고 주차장 마커 배열에 추가합니다
//         kakaoRef.current.createMarkers(targetPositions, targetMarkers, 48, 48); // 대상물 마커를 생성하고 주차장 마커 배열에 추가합니다
//         kakaoRef.current.createMarkers(dangerPositions, dangerMarkers, 48, 48); // 위험물 마커를 생성하고 주차장 마커 배열에 추가합니다
//         kakaoRef.current.createMarkers(EmergencyFireExtinguisherPositions, fireExtinguisherMarkers, 48, 48); // 비상소화장치 마커를 생성하고 주차장 마커 배열에 추가합니다
//         kakaoRef.current.createMarkers(vulnerblePositions, vulnerbleMarkers, 48, 48); // 피난약자 마커를 생성하고 주차장 마커 배열에 추가합니다
//         kakaoRef.current.createMarkers(historyPositions, historyMarkers, 48, 48); // 과거이력 마커를 생성하고 주차장 마커 배열에 추가합니다

//         kakaoRef.current.onClickMarkerButton({ isClick: isClickRescuePosition, markers: rescueMarkers });
//         kakaoRef.current.onClickMarkerButton({ isClick: isClickVehicle, markers: vehicleMarkers });
//         kakaoRef.current.onClickMarkerButton({ isClick: isClickVideo, markers: videoMarkers });
//         kakaoRef.current.onClickMarkerButton({ isClick: isWaterActive, markers: waterMarkers });
//         kakaoRef.current.onClickMarkerButton({ isClick: isTargetActive, markers: targetMarkers });
//         kakaoRef.current.onClickMarkerButton({ isClick: isDangerActive, markers: dangerMarkers });
//         kakaoRef.current.onClickMarkerButton({ isClick: isExtinguisherActive, markers: fireExtinguisherMarkers });

//         targetMarkers.map((marker: any) => {
//           return window.kakao.maps.event.addListener(marker, 'click', function () {
//             targetPositions.map(item => {
//               kakaoRef.current.createInfowindow(item.label, item.route).open(map, marker);
//             });
//           });
//         });

//         dangerMarkers.map((marker: any) => {
//           return window.kakao.maps.event.addListener(marker, 'click', function () {
//             dangerPositions.map(item => {
//               kakaoRef.current.createInfowindow(item.label).open(map, marker);
//             });
//           });
//         });
//       });
//     };

//     kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
    
//   }, [isClickVehicle, isWaterActive, isExtinguisherActive, isClickRescuePosition, isClickVideo, isTargetActive, isDangerActive, props.latitude, props.longitude, props.alpha, isClickCompassButton]);

//   return (
//     <MapWrapper>
//       <KakaoMap />
//       <FloatingButtonWrapper>
//         <FloatingButtons isClickRescuePosition={isClickRescuePosition} isClickVideo={isClickVideo} changeStatus={changeStatus} isClickVehicle={isClickVehicle} />
//       </FloatingButtonWrapper>
//       <Stack spacing="8px" position="absolute" left="16px" bottom="16px" zIndex={10}>
//         <CircleButton onClick={() => setIsClickCompassButton(prev => !prev)}>
//           <IconWrapper width="24px" height="24px" color={theme.colors.gray}>
//             <CompassIcon />
//           </IconWrapper>
//         </CircleButton>
//         <CircleButton
//           onClick={() => {
//             kakaoRef.current.setCenter(props.latitude, props.longitude);
//           }}
//         >
//           <IconWrapper width="24px" height="24px" color={theme.colors.gray}>
//             <MyLocationIcon />
//           </IconWrapper>
//         </CircleButton>
//       </Stack>
//       <ZoomInButton right="16px" bottom="16px" onClick={() => router.push('/detail/map')}>
//         <Stack align="center" spacing="2px">
//           <IconWrapper width="24px" height="24px" color={theme.colors.gray}>
//             <FullScreenIcon />
//           </IconWrapper>
//           <span>크게보기</span>
//         </Stack>
//       </ZoomInButton>
//     </MapWrapper>
//   );
// };

// export default MiniMap;

// MiniMap.defaultProps = {
//   latitude: 37.516633,
//   longitude: 127.077374,
//   alpha: 130,
// };

// const MapWrapper = styled.div`
//   height: 100%;
//   .map_container {
//     height: 100%;
//   }
//   position: relative;

//   #map > div:nth-of-type(2) {
//     display: none;
//   }
// `;

// const FloatingButtonWrapper = styled.div`
//   & > div > div > div {
//     flex-direction: row;
//     width: fit-content;
//   }

//   & > div > div {
//     padding: 16px;
//   }

//   & > div > div > div > div > div:nth-of-type(2) {
//     display: none;
//   }

//   & > div > div > div > div {
//     width: 136px;
//     padding: 8px;
//   }
// `;

// const ZoomInButton = styled(Box)`
//   color: ${theme.colors.gray};
//   font-family: Pretendard Bold;
//   font-size: 12px;
//   line-height: 16px; /* 133.333% */
//   letter-spacing: -0.24px;
//   position: absolute;
//   z-index: 100;
//   padding: 7px;
//   border-radius: 4px;
//   border: 1px solid ${theme.colors.gray2};
//   background: ${theme.colors.white};
// `;

// const CircleButton = styled.button`
//   width: fit-content;
//   padding: 16px;
//   border-radius: 44px;
//   border: 1px solid ${theme.colors.gray2};
//   background: #fff;
// `;
