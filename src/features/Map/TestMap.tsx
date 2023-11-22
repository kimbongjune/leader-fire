import { DeviceType } from '@/types/types';
import FloatingButtons from './FloatingButtons';
import { useEffect, useRef, useState } from 'react';
import { KakaoUtil, Position } from './kakaoUtil';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { Box, Stack } from '@chakra-ui/react';
import theme from '@/theme/colors';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import CompassIcon from '../../../public/images/icons/compass.svg';
import MyLocationIcon from '../../../public/images/icons/myLocation.svg';
import FullScreenIcon from '../../../public/images/icons/fullscreen.svg';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDangerMarkerActive, setIsExtinguisherMarkerActive, setIsTargetMarkerActive, setIsWaterMarkerActive } from '../../features/slice/disasterSlice';
import axios from '@/components/common/api/axios';

const KakaoMap = dynamic(() => import('./KakaoMap'), { ssr: false });

interface Props {
  deviceType: DeviceType;
  latitude: number; // 위도
  longitude: number; // 경도
  alpha: number; // z축 회전 각도
}

interface Location {
  lat: string;
  lon: string;
  type: string;
  id: string;
  build_sn?:string;
  obj_nm?:string;
  mnfctretc_detail_se_cd_nm?:string
  main_prpos_cd_nm?:string
}

interface Markers {
  location:any;
  type: string;
  id: string;
  build_sn?:string;
  obj_nm?:string;
  mnfctretc_detail_se_cd_nm?:string
  main_prpos_cd_nm?:string
}

interface locationData {
  car: Location[]
  video: Location[]
  hydrant: Location[]
  fireExtinguisher: Location[]
  target: Location[]
  dangerous: Location[]
}

interface markerData {
  car: Markers[]
  video: Markers[]
  hydrant: Markers[]
  fireExtinguisher: Markers[]
  target: Markers[]
  dangerous: Markers[]
}


//TODO 지도(태블릿 미니맵), 소화전, 비상소화장치, 대상물, 위험물 표시, 롱클릭 시 오버레이와 마커 표시(마커는 한건만)
const MiniMap = (props: Props) => {
  const dispatch = useDispatch()
  const apiKey = process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY;
  const router = useRouter();
  const mapInstance = useRef<any>();
  const mapContainer = useRef<HTMLDivElement>(null);

  const [apiInterval, setApiInterval] = useState<NodeJS.Timer>()

  const isWaterActive = useSelector((state: RootState) => state.disaster.isWaterMarkerActive);
  const isExtinguisherActive = useSelector((state: RootState) => state.disaster.isExtinguisherMarkerActive);
  const isTargerActive = useSelector((state: RootState) => state.disaster.isTargetMarkerActive);
  const isDangerActive = useSelector((state: RootState) => state.disaster.isDangerMarkerActive);

  const [isClickRescuePosition, setIsClickRescuePosition] = useState(true); // 긴급구조위치
  const [isClickVehicle, setIsClickVehicle] = useState(false); //출동 차량
  const [isClickVideo, setIsClickVideo] = useState(false); //영상공유

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClickCompassButton, setIsClickCompassButton] = useState(false); // 나침반 버튼 클릭 유무

  const vehicleMarkers = useRef<any[]>([]);
  const rescueMarkers = useRef<any[]>([]);
  const videoMarkers = useRef<any[]>([]);
  const dangerousMarkers = useRef<any[]>([]);
  const fireExtinguisherMarkers = useRef<any[]>([]);
  const hydrantMarkers = useRef<any[]>([]);
  const targetMarkers = useRef<any[]>([]);

  const [carMarkers, setCarMarkers] = useState<Markers[]>([])
  const [videoMarker, setVideoMarker] = useState<Markers[]>([])
  const [dangerousMarker, setDangerousMarker] = useState<Markers[]>([])
  const [fireExtinguisherMarker, setFireExtinguisherMarker] = useState<Markers[]>([])
  const [hydrantMarker, setHydrantMarker] = useState<Markers[]>([])
  const [targetMarker, setTargetMarker] = useState<Markers[]>([])

  const [rescueMarker, setRescueMarker] = useState<Markers[]>([])

  const changeStatus = (value: string) => {
    if (value === 'rescuePosition') setIsClickRescuePosition(prev => !prev);
    if (value === 'vehicle') setIsClickVehicle(prev => !prev);
    if (value === 'video') setIsClickVideo(prev => !prev);
  };

  function changeImage(src: string) {
    let imgSrc = src;
    // 소방용수
    if (src === '지상') return (imgSrc = '/images/mapIcons/groundWater.svg');
    if (src === '지하') return (imgSrc = '/images/mapIcons/underGroundWater.svg');
    if (src === '비상') return (imgSrc = '/images/mapIcons/emergency.svg');
    // 차량
    if (src === '펌프') return (imgSrc = '/images/mapIcons/pumpVehicle.svg');
    if (src === '탱크') return (imgSrc = '/images/mapIcons/tankVehicle.svg');
    if (src === '화학') return (imgSrc = '/images/mapIcons/chemistryVehicle.svg');
    if (src === '기타') return (imgSrc = '/images/mapIcons/etcVehicle.svg');
    if (src === '구조') return (imgSrc = '/images/mapIcons/rescueVehicle.svg');
    if (src === '구급') return (imgSrc = '/images/mapIcons/firstAidVehicle.svg');
    // 도착지
    if (src === '도착지') return (imgSrc = '/images/mapIcons/destinationMarker.svg');
    // 긴급구조
    if (src === '긴급구조') return (imgSrc = '/images/mapIcons/rescueMarker.svg');
    // 영상공유
    if (src === '영상공유') return (imgSrc = '/images/mapIcons/videoMarker.svg');
    // 대상물
    if (src === '대상물') return (imgSrc = '/images/mapIcons/flag.svg');
    // 위험물
    if (src === '위험물') return (imgSrc = '/images/mapIcons/flag.svg');
    // 의용대장
    if (src === '의용대장') return (imgSrc = '/images/mapIcons/flag.svg');
    // 피난약자
    if (src === '피난약자') return (imgSrc = '/images/mapIcons/flag.svg');
    // 비상소화장치
    if (src === '비상소화장치') return (imgSrc = '/images/mapIcons/flag.svg');
    // 과거이력
    if (src === '과거이력') return (imgSrc = '/images/mapIcons/flag.svg');
    return imgSrc;
  }

  function createMarkerImage(src: any, size: any, options: any) {
    let imgSrc = changeImage(src);
    var markerImage = new window.kakao.maps.MarkerImage(imgSrc, size, options);
    return markerImage;
  }

  useEffect(() => {
    dispatch(setIsWaterMarkerActive(isWaterActive === true));
    dispatch(setIsExtinguisherMarkerActive(isExtinguisherActive === true));
    dispatch(setIsTargetMarkerActive(isTargerActive === true));
    dispatch(setIsDangerMarkerActive(isDangerActive === true));
  }, [isWaterActive, isExtinguisherActive, isTargerActive, isDangerActive, dispatch]);

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.51535, 127.08517),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer.current, options);

        mapInstance.current = map

        let markerPosition = new window.kakao.maps.LatLng(37.51535, 127.08517);
        let markerSize = new window.kakao.maps.Size(191, 191); // 마커이미지의 크기입니다
        let markerOption = { offset: new window.kakao.maps.Point(191 / 2, 191 / 2) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        let marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: createMarkerImage('/images/icons/makerImage.svg', markerSize, markerOption),
        });
        marker.setMap(mapInstance.current);

        let circle = new window.kakao.maps.Circle({
          center : markerPosition,  // 원의 중심좌표 입니다 
          radius: 200, // 미터 단위의 원의 반지름입니다 
          strokeWeight: 2, // 선의 두께입니다 
          strokeColor: '#DE9898', // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid', // 선의 스타일 입니다
          fillColor: '#DE9898', // 채우기 색깔입니다
          fillOpacity: 0.7  // 채우기 불투명도 입니다   
        }); 
        circle.setMap(mapInstance.current);

        setRescueMarker(
          [
            {
              location: new window.kakao.maps.LatLng(props.latitude, props.longitude),
              type: '긴급구조',
              id :"2"
            }
          ]
        )

      const clickMarker = new window.kakao.maps.Marker({
        position: mapInstance.current.getCenter(),
        image: createMarkerImage('/images/icons/makerImage.svg', markerSize, markerOption),
      });

      clickMarker.setMap(map)

      const clickHandler = (mouseEvent:any) => {
        console.log(mouseEvent)
        // 클릭한 위도, 경도 정보를 가져옵니다 
        var latlng = mouseEvent.latLng; 
          
        // 마커 위치를 클릭한 위치로 옮깁니다
        clickMarker.setPosition(latlng);
        
        var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';
        
        console.log(message)
      };

      window.kakao.maps.event.addListener(map, 'click', clickHandler);

      
    // 차량 위치 정보 API 호출 함수
    async function fetchLocations():Promise<markerData | null> {
      console.log("Fetching locations")
      // 실제 API 호출 로직
      // 예시로는 가상의 데이터 반환
      try {
        //const result = await axios.get<locationData>("/ccf853b7-cfa8-4d04-b875-39b32e2a4e49");
        //const data = result.data;
  
        const data = {
          "car":[
          {
              "lat": "37.518195",
              "lon": "127.071881",
              "type": "탱크",
              "id": "1"
          },
          {
              "lat": "36.35930",
              "lon": "127.96978",
              "type": "펌프",
              "id": "2"
          }],
          "video":[
          {
              "lat": " 37.51208",
              "lon": "127.06334",
              "type": "영상공유",
              "id": "3"
          },
          {
              "lat": " 37.51287",
              "lon": "127.07252",
              "type": "영상공유",
              "id": "4"
          }],
          "hydrant":[
           {
              "lat": "37.51222",
              "lon": "127.07030",
              "type": "지상",
              "id": "5"
          },
          {
              "lat": "37.51113",
              "lon": "127.07176",
              "type": "지하",
              "id": "6"
          }
          ],
          "fireExtinguisher" :[
          {
              "lat": "37.51297",
              "lon": "127.07279",
              "type": "비상소화장치",
              "id": "7"
          }
          ],
          "target":[
          {
              "lat": "37.51344",
              "lon": "127.07691",
              "type": "대상물",
              "id": "8",
              "build_sn" : "48000000022172",
              "obj_nm" : "까치빌라",
              "main_prpos_cd_nm" : "복합건축물"
          }
          ],
          "dangerous":[
          {
              "lat": "37.51508",
              "lon": "127.07553",
              "type": "위험물",
              "id": "9",
              "build_sn": "48000000022212",
              "obj_nm": "합천군종합사회복지관",
              "mnfctretc_detail_se_cd_nm" : "옥내탱크저장소"
          }
          ]
      }
        console.log("????????")
        return processMapData(data)
      } catch (error) {
        console.error(error)
        return null
      }
    }

    const updateVehicleMarkers = () => {
      fetchLocations().then(location => {
        if(!location){
          return;
        }
        vehicleMarkers.current.forEach(marker => marker.setMap(null));
        vehicleMarkers.current = []; // 마커 배열 초기화

        videoMarkers.current.forEach(marker => marker.setMap(null));
        videoMarkers.current = []; // 마커 배열 초기화

        dangerousMarkers.current.forEach(marker => marker.setMap(null));
        dangerousMarkers.current = []; // 마커 배열 초기화

        fireExtinguisherMarkers.current.forEach(marker => marker.setMap(null));
        fireExtinguisherMarkers.current = []; // 마커 배열 초기화

        hydrantMarkers.current.forEach(marker => marker.setMap(null));
        hydrantMarkers.current = []; // 마커 배열 초기화

        targetMarkers.current.forEach(marker => marker.setMap(null));
        targetMarkers.current = []; // 마커 배열 초기화

        dangerousMarkers.current.forEach(marker => marker.setMap(null));
        dangerousMarkers.current = []; // 마커 배열 초기화

        setCarMarkers(location?.car)
        setVideoMarker(location?.video)
        setDangerousMarker(location?.dangerous)
        setFireExtinguisherMarker(location?.fireExtinguisher)
        setHydrantMarker(location?.hydrant)
        setTargetMarker(location?.target)
      }).catch(error => {
        return;
      });
    };

    updateVehicleMarkers();
    console.log("??????????????")
    const vehicleInterval = setInterval(updateVehicleMarkers, 10000);
    setApiInterval(vehicleInterval)
      })
    }
    return () => {
      kakaoMapScript.remove(); // 컴포넌트 언마운트 시 스크립트 제거
      clearInterval(apiInterval);
    };
  }, []);

  function processMapData(data: locationData) {
    const processData = (items: Location[]) => items.map(item => {
      const result: any = {
        location: new window.kakao.maps.LatLng(parseFloat(item.lat), parseFloat(item.lon)),
        type: item.type,
        id: item.id,
      };
  
      // 옵셔널 필드 추가
      if (item.build_sn !== undefined) result.build_sn = item.build_sn;
      if (item.mnfctretc_detail_se_cd_nm !== undefined) result.mnfctretc_detail_se_cd_nm = item.mnfctretc_detail_se_cd_nm;
      if (item.main_prpos_cd_nm !== undefined) result.mnfctretc_detail_se_cd_nm = item.main_prpos_cd_nm;
      if (item.obj_nm !== undefined) result.obj_nm = item.obj_nm;
  
      return result;
    });
  
    return {
      car: processData(data.car),
      video: processData(data.video),
      hydrant: processData(data.hydrant),
      fireExtinguisher: processData(data.fireExtinguisher),
      target: processData(data.target),
      dangerous: processData(data.dangerous),
    };
  }

  const toggleCarMarkers = () => {
    vehicleMarkers.current.forEach((marker) => {
      marker.setMap(isClickVehicle ? mapInstance.current : null);
    });
  };

  const toggleRescueMarkers = () => {
    rescueMarkers.current.forEach((marker) => {
      marker.setMap(isClickRescuePosition ? mapInstance.current : null);
    });
  };

  const toggleVideoMarkers = () => {
    videoMarkers.current.forEach((marker) => {
      marker.setMap(isClickVideo ? mapInstance.current : null);
    });
  };

  const toggleDangerMarkers = () => {
    dangerousMarkers.current.forEach((marker) => {
      marker.setMap(isDangerActive ? mapInstance.current : null);
    });
  };

  const toggleWarterMarkers = () => {
    hydrantMarkers.current.forEach((marker) => {
      marker.setMap(isWaterActive ? mapInstance.current : null);
    });
  };

  const toggleExtinguisherMarkers = () => {
    fireExtinguisherMarkers.current.forEach((marker) => {
      marker.setMap(isExtinguisherActive ? mapInstance.current : null);
    });
  };

  const toggleTargerMarkers = () => {
    targetMarkers.current.forEach((marker) => {
      marker.setMap(isTargerActive ? mapInstance.current : null);
    });
  };

  useEffect(() => {
    if (mapInstance.current) {
      toggleCarMarkers();
    }
  }, [isClickVehicle]);

  useEffect(() => {
    if (mapInstance.current) {
      toggleVideoMarkers();
    }
  }, [isClickVideo]);

  useEffect(() => {
    if (mapInstance.current) {
      toggleDangerMarkers();
    }
  }, [isDangerActive]);

  useEffect(() => {
    if (mapInstance.current) {
      toggleWarterMarkers();
    }
  }, [isWaterActive]);

  useEffect(() => {
    if (mapInstance.current) {
      toggleExtinguisherMarkers();
    }
  }, [isExtinguisherActive]);

  useEffect(() => {
    if (mapInstance.current) {
      toggleTargerMarkers();
    }
  }, [isTargerActive]);

  useEffect(() => {
    if (mapInstance.current) {
      toggleRescueMarkers();
    }
  }, [isClickRescuePosition]);


  useEffect(() => {
    carMarkers.forEach(vehicle => {
      var imageSize = new window.kakao.maps.Size(48, 48);
      var markerImage = createMarkerImage(vehicle.type, imageSize, null),
      marker = createMarker(vehicle.location, markerImage);
      vehicleMarkers.current.push(marker);
      if (isClickVehicle) marker.setMap(mapInstance.current);
    });
  },[carMarkers])

  useEffect(() => {
    rescueMarker.forEach(rescue => {
      var imageSize = new window.kakao.maps.Size(48, 48);
      var markerImage = createMarkerImage(rescue.type, imageSize, null),
      marker = createMarker(rescue.location, markerImage);
      rescueMarkers.current.push(marker);
      if (isClickRescuePosition) marker.setMap(mapInstance.current);
    });
  },[rescueMarker])

  useEffect(() => {
    videoMarker.forEach(rescue => {
      var imageSize = new window.kakao.maps.Size(48, 48);
      var markerImage = createMarkerImage(rescue.type, imageSize, null),
      marker = createMarker(rescue.location, markerImage);
      videoMarkers.current.push(marker);
      if (isClickVideo) marker.setMap(mapInstance.current);
    });
  },[videoMarker])

  useEffect(() => {
    dangerousMarker.forEach(rescue => {
      var imageSize = new window.kakao.maps.Size(48, 48);
      var markerImage = createMarkerImage(rescue.type, imageSize, null),
      marker = createMarker(rescue.location, markerImage);
      dangerousMarkers.current.push(marker);
      
      let iwContent = `<div style="padding:5px;">${rescue?.obj_nm && rescue.obj_nm}(${rescue?.mnfctretc_detail_se_cd_nm && rescue?.mnfctretc_detail_se_cd_nm})
      <br><a href="neighborhood?type=facilities&id=${router.query.id}&build_sn=${rescue?.build_sn}" style="color:blue" >위험물 정보</a></div>`
      const iwRemoveable = true;

      const infowindow = new window.kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
      });

      window.kakao.maps.event.addListener(marker, 'click', function() {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(mapInstance.current, marker);  
      });
      
      if (isDangerActive) marker.setMap(mapInstance.current);
    });
  },[dangerousMarker])

  useEffect(() => {
    hydrantMarker.forEach(rescue => {
      var imageSize = new window.kakao.maps.Size(48, 48);
      var markerImage = createMarkerImage(rescue.type, imageSize, null),
      marker = createMarker(rescue.location, markerImage);
      hydrantMarkers.current.push(marker);
      if (isWaterActive) marker.setMap(mapInstance.current);
    });
  },[hydrantMarker])

  useEffect(() => {
    fireExtinguisherMarker.forEach(rescue => {
      var imageSize = new window.kakao.maps.Size(48, 48);
      var markerImage = createMarkerImage(rescue.type, imageSize, null),
      marker = createMarker(rescue.location, markerImage);
      fireExtinguisherMarkers.current.push(marker);
      if (isExtinguisherActive) marker.setMap(mapInstance.current);
    });
  },[fireExtinguisherMarker])

  useEffect(() => {
    targetMarker.forEach(rescue => {
      var imageSize = new window.kakao.maps.Size(48, 48);
      var markerImage = createMarkerImage(rescue.type, imageSize, null),
      marker = createMarker(rescue.location, markerImage);
      targetMarkers.current.push(marker);

      let iwContent = `<div style="padding:5px;">${rescue?.obj_nm && rescue.obj_nm}(${rescue?.mnfctretc_detail_se_cd_nm && rescue?.mnfctretc_detail_se_cd_nm})
      <br><a href="neighborhood?type=facilities&id=${router.query.id}&build_sn=${rescue?.build_sn}" style="color:blue" >위험물 정보</a></div>`
      const iwRemoveable = true;

      const infowindow = new window.kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
      });

      window.kakao.maps.event.addListener(marker, 'click', function() {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(mapInstance.current, marker);  
      });
      
      if (isTargerActive) marker.setMap(mapInstance.current);
    });
  },[targetMarker])

  useEffect(() => {
    if (isClickCompassButton) {
      const content = `<svg xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76" fill="none">
      <circle opacity=".2" cx="37.594" cy="37.594" r="28" transform="rotate(26.693 37.594 37.594)" fill="#9747FF"/>
      <path d="M35.822 29.987 44.78 23.3l-.025 11.18-8.934-4.492Z" fill="#9747FF"/>
      <circle cx="37.594" cy="37.594" r="8" transform="rotate(26.693 37.594 37.594)" fill="#9747FF" stroke="#fff" stroke-width="4"/>
    </svg>`;
      const position = new window.kakao.maps.LatLng(37.51535, 127.08517);
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position,
        content,
      });
      customOverlay.setMap(mapInstance.current);
    }
  },[isClickCompassButton])

  function createMarker(position: any, image: any) {
    var marker = new window.kakao.maps.Marker({
      position: position,
      image: image,
    });

    return marker;
  }

  return (
    <MapWrapper ref={mapContainer}>
      <KakaoMap />
      <FloatingButtonWrapper>
        <FloatingButtons isClickRescuePosition={isClickRescuePosition} isClickVideo={isClickVideo} changeStatus={changeStatus} isClickVehicle={isClickVehicle} />
      </FloatingButtonWrapper>
      <Stack spacing="8px" position="absolute" left="16px" bottom="16px" zIndex={10}>
        <CircleButton onClick={() => setIsClickCompassButton(prev => !prev)}>
          <IconWrapper width="24px" height="24px" color={theme.colors.gray}>
            <CompassIcon />
          </IconWrapper>
        </CircleButton>
        <CircleButton
          onClick={() => {
            mapInstance.current.setCenter(props.latitude, props.longitude);
          }}
        >
          <IconWrapper width="24px" height="24px" color={theme.colors.gray}>
            <MyLocationIcon />
          </IconWrapper>
        </CircleButton>
      </Stack>
      <ZoomInButton right="16px" bottom="16px" onClick={() => router.push('/detail/map')}>
        <Stack align="center" spacing="2px">
          <IconWrapper width="24px" height="24px" color={theme.colors.gray}>
            <FullScreenIcon />
          </IconWrapper>
          <span>크게보기</span>
        </Stack>
      </ZoomInButton>
    </MapWrapper>
  );
};

export default MiniMap;

MiniMap.defaultProps = {
  latitude: 37.516633,
  longitude: 127.077374,
  alpha: 130,
};

const MapWrapper = styled.div`
  height: 100%;
  .map_container {
    height: 100%;
  }
  position: relative;

  #map > div:nth-of-type(2) {
    display: none;
  }
`;

const FloatingButtonWrapper = styled.div`
  & > div > div > div {
    flex-direction: row;
    width: fit-content;
  }

  & > div > div {
    padding: 16px;
  }

  & > div > div > div > div > div:nth-of-type(2) {
    display: none;
  }

  & > div > div > div > div {
    width: 136px;
    padding: 8px;
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

const CircleButton = styled.button`
  width: fit-content;
  padding: 16px;
  border-radius: 44px;
  border: 1px solid ${theme.colors.gray2};
  background: #fff;
`;