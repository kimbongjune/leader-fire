import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import Navbar from '@/components/common/Navbar/Navbar';
import DrawerButtons from './DrawerButtons';
import FloatingButtons from './FloatingButtons';
import VehicleStatus, { DispatchVehicleDataType, DispatchVehicleDataType2 } from './VehicleStatus';
import ShareVehicleModal from './ShareVehicleModal';
import { KakaoUtil, Position } from './kakaoUtil';
import useDeviceType from '@/hooks/useDeviceType';
import Menu from '@/components/common/Menu/Menu';
import { CarPostionData, DeviceType, DspCarMoveResultDtoList, FireFacilityData } from '@/types/types';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import AddressTab from '@/components/common/Menu/AddressTab';
import { Flex, Stack } from '@chakra-ui/react';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import Satellite from '../../../public/images/icons/satellite.svg';
import MyLocationIcon from '../../../public/images/icons/myLocation.svg';
import { useRouter } from 'next/router';
import proj4 from 'proj4';
import axios from '@/components/common/api/axios';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDangerMarkerActive, setIsExtinguisherMarkerActive, setIsTargetMarkerActive, setIsWaterMarkerActive,setIsRescuePositionActive, setIsVehicleActive, setIsVideoActive } from '../../features/slice/disasterSlice';
import { selectDisasterById } from '../slice/test';
import { shallowEqual } from 'react-redux';
import { MarkerType } from './ObjectPosition';

interface Props {
  latitude: number; // 위도
  longitude: number; // 경도
  title: string;
  vehicleData: DispatchVehicleDataType[]; // 출동차량 데이터
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

const epsg5181: string = '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs';

const convertCoordinateSystem = (x:number, y:number):[number, number] => {
  return proj4(epsg5181, 'EPSG:4326', [x,y]);
}

const transformData = (data:DspCarMoveResultDtoList[]):DispatchVehicleDataType[] => {
  const statusMap: { [key: string]: DispatchVehicleDataType['status'] } = {
    "0060200": "업무운행" as "업무운행",
    "0930001": "본소출동대기" as "본소출동대기",
    "0930002": "본소출동불가능대기" as "본소출동불가능대기",
    "0930003": "편성중" as "편성중",
    "0930004": "출동중" as "출동중",
    "0930005": "귀소중편성가" as "귀소중편성가",
    "0930006": "귀소중편성불가" as "귀소중편성불가",
    "0930007": "이동대기중" as "이동대기중",
    "0930008": "고장수리중" as "고장수리중",
    "0930010": "기타편성가능" as "기타편성가능",
    "0930011": "기타편성불가능" as "기타편성불가능",
    "0930014": "활동중" as "활동중",
  };

  return data.map(item => {
    const status = statusMap[item.carstatCd] || '상태 미정';
    let transmissionStatus: DispatchVehicleDataType['transmissionStatus'] = '미확인';
    if (item.targetlocRoger) {
        transmissionStatus = item.targetlocAcceptRoger ? '승인' : '미승인';
    }

    return {
        status,
        name: item.radioCallsign,
        transmissionStatus,
        carId : item.carId
    };
});
};

const transformData2 = (data:DspCarMoveResultDtoList[]):DispatchVehicleDataType2[] => {
  const statusMap: { [key: string]: DispatchVehicleDataType2['status'] } = {
    "0140040": "출동보고" as "출동보고",
    "1710243": "출동보고" as "출동보고",
    "0140041": "현장도착" as "현장도착",
    "0140021": "활동중" as "활동중",
    "0140055": "활동중" as "활동중",
    "0140042": "활동중" as "활동중",
    "0140043": "귀소" as "귀소",
    "0140044": "귀소" as "귀소",
  };

  return data.map(item => {
    const status = statusMap[item.carstatCd] || '상태없음';
    let transmissionStatus: DispatchVehicleDataType2['transmissionStatus'] = '미확인';
    if (item.targetlocRoger) {
        transmissionStatus = item.targetlocAcceptRoger ? '승인' : '미승인';
    }

    return {
        status,
        name: item.radioCallsign,
        transmissionStatus,
        carId : item.carId
    };
});
};

const kndCdMappingTable = (kndCd:string):string =>{
  switch(kndCd){
    case "0040001" :return 'P00301'
    case "0040002" :return 'P00302'
    case "0040003" :return 'P00303'
    default : return 'P00304'
  }
}

//TODO 지도(핸드폰 or 태블릿 크게보기), 소화전, 비상소화장치, 대상물, 위험물 표시/ 미터, 피난약자, 과거이력 제거, 롱클릭 시 오버레이와 마커 표시(마커는 한건만)
//TODO 지도 화면의 버튼이 미니맵의 버튼과 다름 개수, 이름 뭐로 맞춰야하는지
const Map = (props: Props) => {
  const dispatch = useDispatch()
  const apiKey = process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY;
  const router = useRouter();
  const mapInstance = useRef<any>();
  const mapContainer = useRef<HTMLDivElement>(null);
  const deviceType = useDeviceType();

  const onClickClose = () => {
    router.back();
  };

  const id = router.query.id as string;
  const gis_x_4326 = router.query.gis_x as string;
  const gis_y_4326 = router.query.gis_y as string;

  const selectedDisaster = useSelector((state: RootState) => selectDisasterById(state, id), shallowEqual);

  console.log(selectedDisaster)

  const apiIntervalRef = useRef<NodeJS.Timer | null>(null);
  const isWaterActive = useSelector((state: RootState) => state.disaster.isWaterMarkerActive);
  const isExtinguisherActive = useSelector((state: RootState) => state.disaster.isExtinguisherMarkerActive);
  const isTargerActive = useSelector((state: RootState) => state.disaster.isTargetMarkerActive);
  const isDangerActive = useSelector((state: RootState) => state.disaster.isDangerMarkerActive);
  const isRescuePositionActive = useSelector((state: RootState) => state.disaster.isRescuePositionActive);
  const isVehicleActive = useSelector((state: RootState) => state.disaster.isVehicleActive);
  const isVideoActive = useSelector((state: RootState) => state.disaster.isVideoActive);

  const [position, setPosition] = useState({La:0.0, Ma:0.0})
  const [hasSky, setHasSky] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const vehicleMarkers = useRef<any[]>([]);
  const rescueMarkers = useRef<any>();
  const rescueCircles = useRef<any>();
  const videoMarkers = useRef<any[]>([]);
  const dangerousMarkers = useRef<any[]>([]);
  const fireExtinguisherMarkers = useRef<any[]>([]);
  const hydrantMarkers = useRef<any[]>([]);
  const targetMarkers = useRef<any[]>([]);
  const positionMarker = useRef<any>();
  const positionOverlay = useRef<any>();

  const targetOverlays = useRef<any>();
  const dangerOverlays = useRef<any>();

  const [carMarkers, setCarMarkers] = useState<Markers[]>([])
  const [videoMarker, setVideoMarker] = useState<Markers[]>([])
  const [dangerousMarker, setDangerousMarker] = useState<Markers[]>([])
  const [fireExtinguisherMarker, setFireExtinguisherMarker] = useState<Markers[]>([])
  const [hydrantMarker, setHydrantMarker] = useState<Markers[]>([])
  const [targetMarker, setTargetMarker] = useState<Markers[]>([])

  const [rescueMarker, setRescueMarker] = useState<Markers[]>([])

  const [aponintList, setAponintList] = useState<DispatchVehicleDataType2[]>([])

  const gpsStatusSatelliteCount = useSelector((state: RootState) => state.userReducer.gpsStatusSatelliteCount);
  const gpsStatusDbHzAverage = useSelector((state: RootState) => state.userReducer.gpsStatusDbHzAverage);

  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);

  const [isReceivingGPS, setIsReceivingGPS] = useState(true);

  const userLocationX = useSelector((state: RootState) => state.userReducer.userLocationX);
  const userLocationY = useSelector((state: RootState) => state.userReducer.userLocationY);
  const userLocationMarker = useRef<any>(null);

  //console.log("userLocationX", userLocationX)
  //console.log("userLocationY", userLocationY)


  useEffect(() => {
    //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@",gpsStatusDbHzAverage)
    if(gpsStatusDbHzAverage >= 30){
      setIsReceivingGPS(true);
    }else{
      setIsReceivingGPS(false);
    }
  }, [gpsStatusDbHzAverage]);

  const changeStatus = (value: string) => {
    if (value === 'water') dispatch(setIsWaterMarkerActive(!isWaterActive));
    if (value === 'extinguisher') dispatch(setIsExtinguisherMarkerActive(!isExtinguisherActive));
    if (value === 'target') dispatch(setIsTargetMarkerActive(!isTargerActive));
    if (value === 'danger') dispatch(setIsDangerMarkerActive(!isDangerActive));
    if (value === 'rescuePosition') dispatch(setIsRescuePositionActive(!isRescuePositionActive));
    if (value === 'vehicle') dispatch(setIsVehicleActive(!isVehicleActive));
    if (value === 'video') dispatch(setIsVideoActive(!isVideoActive));
  };

  function changeImage(src: string) {
    let imgSrc = src;
    // 소방용수
    if (src === '지상') return (imgSrc = '/images/mapIcons/groundWater.svg');
    if (src === '지하') return (imgSrc = '/images/mapIcons/underGroundWater.svg');
    if (src === '비상') return (imgSrc = '/images/mapIcons/emergency.svg');
    // 도착지
    if (src === '도착지') return (imgSrc = '/images/mapIcons/destinationMarker.svg');
    // 긴급구조
    if (src === '긴급구조') return (imgSrc = '/images/icons/makerImage.svg');
    // 차량
    if (src.includes('펌프')) return (imgSrc = '/images/mapIcons/pumpVehicle.svg');
    if (src.includes('탱크')) return (imgSrc = '/images/mapIcons/tankVehicle.svg');
    if (src.includes('화학')) return (imgSrc = '/images/mapIcons/chemistryVehicle.svg');
    if (src.includes('기타')) return (imgSrc = '/images/mapIcons/etcVehicle.svg');
    if (src.includes('구조')) return (imgSrc = '/images/mapIcons/rescueVehicle.svg');
    if (src.includes('구급')) return (imgSrc = '/images/mapIcons/firstAidVehicle.svg');
    
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
    // 내 위치
    if (src === '내위치') return (imgSrc = '/images/icons/Ripple-3.1s-354px.gif');

    else imgSrc = '/images/mapIcons/flag.svg'

    return imgSrc;
  }

  function createMarkerImage(src: any, size: any, options: any) {
    let imgSrc = changeImage(src);
    var markerImage = new window.kakao.maps.MarkerImage(imgSrc, size, options);
    return markerImage;
  }

  const requestLocation = () =>{
    if (userLocationX && userLocationY) {
        console.log(userLocationX, userLocationY)
        const position = new window.kakao.maps.LatLng(userLocationX, userLocationY);
        const imageSize = new window.kakao.maps.Size(100, 100); // 마커의 크기 설정
        const imageOption = { offset: new window.kakao.maps.Point(100/2, 100/2) }; // 마커의 옵션 설정
        const markerImage = createMarkerImage('내위치', imageSize, imageOption);
        const marker = createMarker(position, markerImage);

        mapInstance.current.setCenter(position);
  
        marker.setMap(null)
  
        // 새로운 마커를 지도에 추가하고, 참조를 업데이트합니다.
        marker.setMap(mapInstance.current);
        userLocationMarker.current = marker;
    }else{
      alert("위치정보 수신 불가")
    }
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
          if(!selectedDisaster){
            return;
          }
          const location = convertCoordinateSystem(selectedDisaster.gisX, selectedDisaster.gisY)
          console.log(selectedDisaster!!.gisX)
          const options = {
            center: gis_x_4326 && gis_y_4326 ? new window.kakao.maps.LatLng(gis_y_4326, gis_x_4326) : new window.kakao.maps.LatLng(location[1], location[0]),
            level: 3,
          };
          if(gis_x_4326 && gis_y_4326) {
            dispatch(setIsTargetMarkerActive(true))
          }
          const map = new window.kakao.maps.Map(mapContainer.current, options);

          mapInstance.current = map

          dispatch(setIsRescuePositionActive(true))

          if (window.fireAgency && window.fireAgency.getLastLocation) {
            const location = window.fireAgency.getLastLocation();
            console.log("location", location)
            if(location != ""){
              const [locationX, locationY] = location.split(" ")
              const position = new window.kakao.maps.LatLng(locationX, locationY);
              const imageSize = new window.kakao.maps.Size(100, 100); // 마커의 크기 설정
              const imageOption = { offset: new window.kakao.maps.Point(100/2, 100/2) }; // 마커의 옵션 설정
              const markerImage = createMarkerImage('내위치', imageSize, imageOption);
              const marker = createMarker(position, markerImage);
        
              marker.setMap(null)
        
              // 새로운 마커를 지도에 추가하고, 참조를 업데이트합니다.
              marker.setMap(mapInstance.current);
              userLocationMarker.current = marker;
            }
          }

          setRescueMarker(
            [
              {
                location: new window.kakao.maps.LatLng(location[1], location[0]),
                type: '긴급구조',
                id :"2"
              }
            ]
          )

        const clickHandler = (mouseEvent:any) => {
          console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",mouseEvent)
          // 클릭한 위도, 경도 정보를 가져옵니다 
          const latlng = mouseEvent.latLng; 

          setPosition(latlng)
            
          var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
          message += '경도는 ' + latlng.getLng() + ' 입니다';
          
          console.log(message)
        };

        window.kakao.maps.event.addListener(map, 'click', clickHandler);
        
        })
      }
      return () => {
        kakaoMapScript.remove(); // 컴포넌트 언마운트 시 스크립트 제거
        if (apiIntervalRef.current) {
          clearInterval(apiIntervalRef.current);
        }
      };
  }, [selectedDisaster]);

  useEffect(() =>{
    async function fetchLocations():Promise<markerData | null> {
      console.log("Fetching locations")
      try {
        const positionResult = await axios.get<CarPostionData>("/api/disaster_info/car/seq",{
          params: {
            dsrSeq : id//id
          }
        });

        console.log(positionResult.data)

        if(positionResult.data.responseCode === 200){
          setAponintList(transformData2(positionResult.data.result.dspCarMoveResultDtoList))
          //setAponintList(transformData(positionResult.data.result.dspCarMoveResultDtoList.filter(s => s.avlGisX > 0)))
        }
        
        const carPosition = positionResult.data.result?.dspCarMoveResultDtoList?.filter(s => s.avlGisX > 0).map((item) => {
          const coordinate = convertCoordinateSystem(item.avlGisX, item.avlGisY)
          console.log(item.avlGisX)
          return{
            id :item.targetlocDspcarId,
            lat : coordinate[1].toString(),
            lon : coordinate[0].toString(),
            type : item.cdGrpName
          }
        })

        const videoPosition = positionResult.data.result.videoSharingList?.result?.map((item) => {
          return{
            id :item.USR_TEL,
            lat : item.GPS_Y,
            lon : item.GPS_X,
            type : "영상공유"
          }
        })
      
        const carFireFacilityResult = await axios.get<FireFacilityData>("/api/fire_facility/all",{
            params :{
              callTel: selectedDisaster?.callTell, //selectedDisaster?.callTell
              dsrClsCd: selectedDisaster?.dsrClsCd,  //selectedDisaster?.dsrClsCd
              dsrKndCd: kndCdMappingTable(selectedDisaster?.dsrKndCd || ""), //selectedDisaster?.dsrKndCd
              dsrSeq: id,//id
              gisX: selectedDisaster?.gisX,  //selectedDisaster?.gisX
              gisY: selectedDisaster?.gisY, //selectedDisaster?.gisY
              radius: "null"
            }
        });

        if(carFireFacilityResult.data.responseCode === 200){

        }
        const emergancyFireExcuterList = carFireFacilityResult.data.result.emergFireExtinguisherList.result?.dataList?.map((item) =>{
          const coordinate = convertCoordinateSystem(parseInt(item.gis_x_5181), parseInt(item.gis_y_5181))
          return {
            id : item.emerhyd_id,
            lat : coordinate[1].toString(),
            lon : coordinate[0].toString(),
            type : "비상소화장치"
          }
        })

        const targetList = carFireFacilityResult.data.result.fightingPropertyList.result?.dataList?.map((item) =>{
          const coordinate = convertCoordinateSystem(parseFloat(item.gis_x_5181), parseFloat(item.gis_y_5181))
          return {
            id : item.bild_sn,
            lat : coordinate[1].toString(),
            lon : coordinate[0].toString(),
            type : "대상물",
            build_sn : item.bild_sn,
            obj_nm : item.obj_nm,
            main_prpos_cd_nm :item.main_prpos_cd_nm
          }
        })

        const hazardousList = carFireFacilityResult.data.result.hazardousSubstancList.result?.dataList?.map((item) =>{
          const coordinate = convertCoordinateSystem(item.gis_x_5181, item.gis_y_5181)
          return {
            id : item.bild_sn,
            lat : coordinate[1].toString(),
            lon : coordinate[0].toString(),
            type : "위험물",
            build_sn : item.bild_sn,
            obj_nm : item.obj_nm,
            main_prpos_cd_nm :item.mnfctretc_detail_se_cd_nm
          }
        })

        const firePlugList = carFireFacilityResult.data.result.firePlugList.result?.dataList?.map((item) =>{
          const coordinate = convertCoordinateSystem(item.gis_x_5181, item.gis_y_5181)
          return {
            id : item.hyd_id,
            lat : coordinate[1].toString(),
            lon : coordinate[0].toString(),
            type : item.form_cd_nm.includes("지상") ? "지상" : "지하",
          }
        })
        
        const resultData = {
          car:carPosition,
          hydrant :  firePlugList,
          fireExtinguisher : emergancyFireExcuterList,
          target : targetList,
          dangerous: hazardousList,
          video : videoPosition
        }
        return processMapData(resultData)
      } catch (error) {
        console.error(error)
        return null
      }
    }

    const updateVehicleMarkers = () => {
      console.log("updateVehicleMarkers",id)
      if(id){
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
      }
    };

    updateVehicleMarkers();
    console.log("??????????????")
    apiIntervalRef.current = setInterval(updateVehicleMarkers, 60000);
    return () =>{
      if (apiIntervalRef.current) {
        clearInterval(apiIntervalRef.current);
      }
    }
  }, [id])

  function processMapData(data: locationData) {
    const processData = (items: Location[]) => items?.map(item => {
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

  const toggleSky = () => {
    if(mapInstance.current){
      hasSky ? mapInstance.current.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID) : mapInstance.current.setMapTypeId(window.kakao.maps.MapTypeId.ROADMAP)
    }
    
  };

  const toggleCarMarkers = () => {
    const bounds = new window.kakao.maps.LatLngBounds();  
    vehicleMarkers.current.forEach((marker) => {
      marker.setMap(isVehicleActive ? mapInstance.current : null);
      bounds.extend(marker.getPosition());
    });
    if(isVehicleActive && vehicleMarkers.current.length > 0){
      mapInstance.current?.setBounds(bounds);
    }
  };

  const toggleRescueMarkers = () => {
    rescueMarkers?.current?.setMap(isRescuePositionActive ? mapInstance.current : null);
    if(isRescuePositionActive){
      mapInstance.current.setCenter(rescueMarkers?.current?.getPosition());
    }
    rescueCircles?.current?.setMap(isRescuePositionActive ? mapInstance.current : null);
  };

  const toggleVideoMarkers = () => {
    const bounds = new window.kakao.maps.LatLngBounds();  
    videoMarkers.current.forEach((marker) => {
      marker.setMap(isVideoActive ? mapInstance.current : null);
      bounds.extend(marker.getPosition());
    });
    if(isVideoActive && videoMarkers.current.length > 0){
      mapInstance.current?.setBounds(bounds);
    }
  };

  const toggleDangerMarkers = () => {
    const bounds = new window.kakao.maps.LatLngBounds();  
    dangerousMarkers.current.forEach((marker) => {
      marker.setMap(isDangerActive ? mapInstance.current : null);
      bounds.extend(marker.getPosition());
    });
    dangerOverlays.current?.setMap(null)
    dangerOverlays.current = null
    if(isDangerActive && dangerousMarkers.current.length > 0){
      mapInstance.current?.setBounds(bounds);
    }
  };

  const toggleWarterMarkers = () => {
    const bounds = new window.kakao.maps.LatLngBounds();
    hydrantMarkers.current.forEach((marker) => {
      marker.setMap(isWaterActive ? mapInstance.current : null);
      bounds.extend(marker.getPosition());
    });
    if(isWaterActive && hydrantMarkers.current.length > 0){
      mapInstance.current?.setBounds(bounds);
    }
  };

  const toggleExtinguisherMarkers = () => {
    const bounds = new window.kakao.maps.LatLngBounds();
    fireExtinguisherMarkers.current.forEach((marker) => {
      marker.setMap(isExtinguisherActive ? mapInstance.current : null);
      bounds.extend(marker.getPosition());
    });
    if(isExtinguisherActive && fireExtinguisherMarkers.current.length > 0){
      mapInstance.current?.setBounds(bounds);
    }
  };

  const toggleTargerMarkers = () => {
    const bounds = new window.kakao.maps.LatLngBounds();
    targetMarkers.current.forEach((marker) => {
      marker.setMap(isTargerActive ? mapInstance.current : null);
      bounds.extend(marker.getPosition());
    });
    targetOverlays.current?.setMap(null)
    targetOverlays.current = null
    if(isTargerActive && targetMarkers.current.length > 0){
      mapInstance.current?.setBounds(bounds);
    }
  };

  useEffect(() => {
    if (mapInstance.current && window.kakao) {
      positionMarker.current?.setMap(null)
      positionMarker.current = null
      positionOverlay.current?.setMap(null)
      positionOverlay.current = null

      var imageSize = new window.kakao.maps.Size(48, 48);
      let markerOption = { offset: new window.kakao.maps.Point(48 / 2, 48 / 2) };
      var markerImage = createMarkerImage("도착지", imageSize, markerOption),
      marker = createMarker(position, markerImage);

      const content = document.createElement('div');
      content.innerHTML = `<div class="destinationMarker-wrapper">
                <div class="destinationMarker-label">도착지 <div class="delete-button">삭제</div></div>
                </div>`;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: content,
        clickable: true,
      });

      const deleteButton = content.querySelector('.delete-button');
      if (deleteButton) {
        deleteButton.addEventListener('click', event => {
          customOverlay.setMap(null);
          marker.setMap(null);
        });
      }
      customOverlay?.setMap(mapInstance.current);
      positionOverlay.current = customOverlay

      window.kakao.maps.event.addListener(marker, 'click', function() {
        // 마커 위에 인포윈도우를 표시합니다
        //infowindow.open(mapInstance.current, marker);  
        console.log("????")
        setIsModalOpen(true)
      });

      positionMarker.current = marker
      positionMarker.current.setMap(mapInstance.current)
    }
  }, [position]);

  useEffect(() => {
    if (mapInstance.current) {
      toggleSky();
    }
  }, [hasSky]);

  useEffect(() => {
    if (mapInstance.current) {
      toggleCarMarkers();
    }
  }, [isVehicleActive]);

  useEffect(() => {
    if (mapInstance.current) {
      toggleVideoMarkers();
    }
  }, [isVideoActive]);

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
  }, [isRescuePositionActive]);


  useEffect(() => {
    carMarkers?.forEach(vehicle => {
      var imageSize = new window.kakao.maps.Size(48, 48);
      let markerOption = { offset: new window.kakao.maps.Point(48 / 2, 48 / 2) };
      var markerImage = createMarkerImage(vehicle.type, imageSize, markerOption),
      marker = createMarker(vehicle.location, markerImage);
      vehicleMarkers.current.push(marker);
      if (isVehicleActive) marker.setMap(mapInstance.current);
    });
  },[carMarkers])

  useEffect(() => {
    rescueMarker?.forEach(rescue => {
        let markerSize = new window.kakao.maps.Size(191, 191); // 마커이미지의 크기입니다
        let markerOption = { offset: new window.kakao.maps.Point(191 / 2, 191 / 2) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        var markerImage = createMarkerImage(rescue.type, markerSize, markerOption),
        marker = createMarker(rescue.location, markerImage);
        marker.setClickable(false);

        let circle = new window.kakao.maps.Circle({
          center : rescue.location,  // 원의 중심좌표 입니다 
          radius: 200, // 미터 단위의 원의 반지름입니다 
          strokeWeight: 2, // 선의 두께입니다 
          strokeColor: '#DE9898', // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid', // 선의 스타일 입니다
          fillColor: '#DE9898', // 채우기 색깔입니다
          fillOpacity: 0.7  // 채우기 불투명도 입니다   
        }); 
        rescueMarkers.current = marker;
        rescueCircles.current = circle
      if (isRescuePositionActive) {
        marker.setMap(mapInstance.current)
        circle.setMap(mapInstance.current);
      };
    });
  },[rescueMarker])

  useEffect(() => {
    videoMarker?.forEach(rescue => {
      var imageSize = new window.kakao.maps.Size(48, 48);
      let markerOption = { offset: new window.kakao.maps.Point(48 / 2, 48 / 2) };
      var markerImage = createMarkerImage(rescue.type, imageSize, markerOption),
      marker = createMarker(rescue.location, markerImage);
      videoMarkers.current.push(marker);
      if (isVideoActive) marker.setMap(mapInstance.current);
    });
  },[videoMarker])

  useEffect(() => {
    dangerousMarker?.forEach(rescue => {
      var imageSize = new window.kakao.maps.Size(48, 48);
      let markerOption = { offset: new window.kakao.maps.Point(48 / 2, 48 / 2) };
      var markerImage = createMarkerImage(rescue.type, imageSize, markerOption),
      marker = createMarker(rescue.location, markerImage);
      dangerousMarkers.current.push(marker);
      
      const content = document.createElement('div');
      content.className = "overlay-container"
      content.innerHTML = `<div class="container">
                            <div class="header">
                              <span class="title">${rescue?.obj_nm && rescue.obj_nm}</span>
                              <span class="subtitle">${rescue?.mnfctretc_detail_se_cd_nm && rescue?.mnfctretc_detail_se_cd_nm}</span>
                              <button class="close-button">&times;</button>
                            </div>
                            <div class="footer">
                              <button class="action-button">위험물 정보</button>
                            </div>
                          </div>`;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: rescue.location,
        content: content,
        xAnchor: 0.5,
        yAnchor: 1.35,
        clickable: true,
      });

      const actionButton = content.querySelector('.action-button');
      if(actionButton){
        actionButton.addEventListener('click', () => {
          const url = `neighborhood?type=facilities&id=${router.query.id}&build_sn=${rescue?.build_sn}`;
          window.location.href = url;
        });
      }

      const deleteButton = content.querySelector('.close-button');
      if (deleteButton) {
        deleteButton.addEventListener('click', event => {
          customOverlay.setMap(null);
        });
      }

      window.kakao.maps.event.addListener(marker, 'click', function() {
        dangerOverlays.current?.setMap(null)
        dangerOverlays.current = null
        targetOverlays.current?.setMap(null)
        targetOverlays.current = null
        customOverlay?.setMap(mapInstance.current);
        dangerOverlays.current = customOverlay;
      });
      
      if (isDangerActive) marker.setMap(mapInstance.current);
    });
  },[dangerousMarker])

  useEffect(() => {
    hydrantMarker?.forEach(rescue => {
      var imageSize = new window.kakao.maps.Size(48, 48);
      let markerOption = { offset: new window.kakao.maps.Point(48 / 2, 48 / 2) };
      var markerImage = createMarkerImage(rescue.type, imageSize, markerOption),
      marker = createMarker(rescue.location, markerImage);
      hydrantMarkers.current.push(marker);
      if (isWaterActive) marker.setMap(mapInstance.current);
    });
  },[hydrantMarker])

  useEffect(() => {
    fireExtinguisherMarker?.forEach(rescue => {
      var imageSize = new window.kakao.maps.Size(48, 48);
      let markerOption = { offset: new window.kakao.maps.Point(48 / 2, 48 / 2) };
      var markerImage = createMarkerImage(rescue.type, imageSize, markerOption),
      marker = createMarker(rescue.location, markerImage);
      fireExtinguisherMarkers.current.push(marker);
      if (isExtinguisherActive) marker.setMap(mapInstance.current);
    });
  },[fireExtinguisherMarker])

  useEffect(() => {
    targetMarker?.forEach(rescue => {
      var imageSize = new window.kakao.maps.Size(48, 48);
      let markerOption = { offset: new window.kakao.maps.Point(48 / 2, 48 / 2) };
      var markerImage = createMarkerImage(rescue.type, imageSize, markerOption),
      marker = createMarker(rescue.location, markerImage);
      targetMarkers.current.push(marker);
      
      const content = document.createElement('div');
      content.className = "overlay-container"
      content.innerHTML = `<div class="container">
                            <div class="header">
                              <span class="title">${rescue?.obj_nm && rescue.obj_nm}</span>
                              <span class="subtitle">${rescue?.mnfctretc_detail_se_cd_nm && rescue?.mnfctretc_detail_se_cd_nm}</span>
                              <button class="close-button">&times;</button>
                            </div>
                            <div class="footer">
                              <button class="action-button">대상물 정보</button>
                            </div>
                          </div>`;

      //<a href="neighborhood?type=facilities&id=${router.query.id}&build_sn=${rescue?.build_sn}" style="color:blue" >위험물 정보</a></div>`

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: rescue.location,
        content: content,
        xAnchor: 0.5,
        yAnchor: 1.35,
        clickable: true,
      });

      const actionButton = content.querySelector('.action-button');
      if(actionButton){
        actionButton.addEventListener('click', () => {
          const url = `neighborhood?type=facilities&id=${router.query.id}&build_sn=${rescue?.build_sn}`;
          window.location.href = url;
        });
      }

      const deleteButton = content.querySelector('.close-button');
      if (deleteButton) {
        deleteButton.addEventListener('click', event => {
          customOverlay.setMap(null);
        });
      }

      window.kakao.maps.event.addListener(marker, 'click', function() {
        targetOverlays.current?.setMap(null)
        targetOverlays.current = null
        dangerOverlays.current?.setMap(null)
        dangerOverlays.current = null
        customOverlay?.setMap(mapInstance.current);
        targetOverlays.current = customOverlay;
      });
      
      if (isTargerActive) marker.setMap(mapInstance.current);
    });
  },[targetMarker])

  useEffect(() =>{
    const sendClickStream = async () =>{
      if(userInfo){
        const clickStreamResponse = await axios.post("/api/menu_log/enter",{
          menuId : "3110",
          userId : userInfo.userId
        })
        console.log(clickStreamResponse.data)
      }
    }
    sendClickStream()
  }, [userInfo])

  function createMarker(position: any, image: any) {
    var marker = new window.kakao.maps.Marker({
      position: position,
      image: image,
    });

    return marker;
  }

  if(id === undefined){
    return null;
  }

  if(!selectedDisaster){
    return null
  }

  return (
    <Flex direction="column" h="100vh">
      {deviceType === 'mobile' && (
        <>
          <Menu title={selectedDisaster?.eventName} status={selectedDisaster?.status} subTitle={selectedDisaster?.lawAddr} contentGap="12px" hasCloseButtonWithoutString={true} closeButtonText="닫기" onClickBackButton={onClickClose} onCloseButton={onClickClose} />
        </>
      )}
      {deviceType === 'tabletVertical' && (
        <>
          <Menu title={selectedDisaster?.eventName} status={selectedDisaster?.status} subTitle={selectedDisaster?.lawAddr} contentGap="12px" onClickBackButton={onClickClose} onCloseButton={onClickClose} />
          <AddressTab contentJustify={'flex-start'} marginLeft="8px" />
        </>
      )}
      {deviceType === 'tabletHorizontal' && <Menu status={selectedDisaster?.status} title={selectedDisaster?.eventName} subTitle={selectedDisaster?.lawAddr} contentGap="12px" onClickBackButton={onClickClose} onCloseButton={onClickClose} />}
      <Container deviceType={deviceType}>
        <VehicleStatus  data={aponintList}/>
        <Wrapper deviceType={deviceType}>
          <MapWrapper deviceType={deviceType} ref={mapContainer}>
            <FloatingButtons vihicleMarkerCount={carMarkers?.length | 0} videoMarkerCount={videoMarker?.length | 0} isClickRescuePosition={isRescuePositionActive} isClickVideo={isVideoActive} changeStatus={changeStatus} isClickVehicle={isVehicleActive} hasSkyButton={hasSky} setHasSky={setHasSky}/>
            <Stack spacing="16px" position={deviceType === 'tabletHorizontal' ? 'fixed' : 'fixed'} left={deviceType === 'tabletHorizontal' ? '331px' : '16px'} bottom={deviceType === 'tabletHorizontal' ? '120px' : '97px'} zIndex={10}>
            <GpsWarper isActive={isReceivingGPS}>
              <IconWrapper width="24px" height="24px" color={theme.colors.gray}>
                <Satellite />
              </IconWrapper>
            </GpsWarper>
              <CircleButton
                onClick={() => {
                  requestLocation();
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
            <DrawerButtons 
              warterMarkerCount={hydrantMarker?.length | 0} 
              extinguisherMarkerCount={fireExtinguisherMarker?.length | 0}
              targerMarkerCount={targetMarker?.length | 0}
              dangerMarkerCount={dangerousMarker?.length | 0}
              isClickWater={isWaterActive} 
              isClickTarget={isTargerActive} 
              isClickDanger={isDangerActive} 
              isExtinguisherMarkerActive={isExtinguisherActive} 
              changeStatus={changeStatus} 
            />
          )}
          {deviceType !== 'tabletHorizontal' && (
            <DrawerButtons 
              warterMarkerCount={hydrantMarker?.length | 0} 
              extinguisherMarkerCount={fireExtinguisherMarker?.length | 0}
              targerMarkerCount={targetMarker?.length | 0}
              dangerMarkerCount={dangerousMarker?.length | 0}
              isClickWater={isWaterActive} 
              isClickTarget={isTargerActive} 
              isClickDanger={isDangerActive} 
              isExtinguisherMarkerActive={isExtinguisherActive} 
              changeStatus={changeStatus} 
            />
          )}
          <Navbar />
        </NavbarWrapper>
        {isModalOpen && <ShareVehicleModal dsrSeq={id} position={position}  vehicleData={aponintList} onCloseModal={setIsModalOpen} />}
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
  .destinationMarker-wrapper {
    position: relative;
  }
  .destinationMarker-label {
    display: flex;
    position: absolute;
    width: fit-content;
    bottom: -45px;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    gap: 4px;
    border-radius: 4px;
    border: 1px solid ${theme.colors.gray2};
    background-color: ${theme.colors.white};
    color: #e57878;
    font-family: 'Pretendard Bold';
    font-size: 12px;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.24px;
  }

  .delete-button {
    color: ${theme.colors.darkBlue};
  }

  .container {
    font-family: 'Arial', sans-serif;
    background-color: white;
    position: relative;
    width: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .content {
    padding: 16px;
    position: relative;
  }
  
  .title {
    margin-right: 30px;
    display: block;
    font-size: 1em;
    font-weight: bold;
    padding: 8px 8px;/* Space between title and subtitle */
  }
  
  .subtitle {
    padding: 2px 8px;
    display: block;
    font-size: 0.875em;
    color: #6c757d;
  }
  
  .close-button {
    position: absolute;
    top: 2px;
    right: 16px;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
  }
  
  .footer {
    padding: 8px 8px; /* Reduced vertical padding */
    display: flex;
    align-items: center; /* Aligns button vertically */
  }
  
  .action-button {
    padding: 4px 8px; /* Adjust as needed */
    font-size: 1em;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px; /* Rounded corners for the button */
    cursor: pointer;
  }

  .overlay-container:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 14px solid transparent;
    border-top-color: white;
    border-bottom: 0;
    margin-left: -14px;
    margin-bottom: -14px;
  }
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

const GpsWarper = styled.div<{ isActive?: boolean }>`
  width: fit-content;
  padding: 16px;
  border-radius: 44px;
  border: 1px solid ${theme.colors.gray2};
  background: ${theme.colors.orange};
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.25);
  ${({ isActive }) =>
    isActive &&
    `
    background: ${theme.colors.green};
  `}
`;
