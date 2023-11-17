import { useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export type Position = {
  id?: string; // 위치 식별자
  location: string; //위치 (타입 정의하기 {})
  type: string; // 차량 종류, 소방용수, 대상물 ...
  label?: string; // 툴팁 라벨 (대상물 A)
  route?: string; // 인근시설 이동 route
};

export type KakaoPosition = {
  La: number; //경도 127.xxx
  Ma: number; //위도 37.xxx
};

export class KakaoUtil {
  private map: any;
  private bounds: any;
  private latitude: number;
  private longitude: number;
  // 인자 객체로넘기기
  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
    // id값 빼기
    var container = document.getElementById('map');
    var options = {
      center: new window.kakao.maps.LatLng(latitude, longitude), // 지도의 중심 좌표
      level: 3, // 지도의 확대 레벨 => 빼기
    };
    this.bounds = new window.kakao.maps.LatLngBounds();
    this.map = new window.kakao.maps.Map(container, options);
  }

  get getMap() {
    return this.map;
  }

  changeImage(src: string) {
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

  // 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수입니다
  createMarkerImage(src: any, size: any, options: any) {
    let imgSrc = this.changeImage(src);
    options = { offset: new window.kakao.maps.Point(size.width / 2, size.height / 2) };
    var markerImage = new window.kakao.maps.MarkerImage(imgSrc, size, options);
    return markerImage;
  }

  // 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
  createMarker(position: any, image: any, id?: string) {
    var marker = new window.kakao.maps.Marker({
      position: position,
      image: image,
      clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정한다.
    });
    marker.id = id;

    return marker;
  }

  // 마커 1개
  setMarker(latitude: number, longitude: number, width: number, height: number, img: string) {
    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const markerSize = new window.kakao.maps.Size(width, height);
    const markerOption = { offset: new window.kakao.maps.Point(width / 2, height / 2) };

    const maker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: this.createMarkerImage(img, markerSize, markerOption),
    });
    maker.setMap(this.map);
  }

  createMarkers(positionList: Position[], markerList: string[], imgWith: number, imgHight: number, id?: string) {
    for (var i = 0; i < positionList.length; i++) {
      var imageSize = new window.kakao.maps.Size(imgWith, imgHight);

      // 마커이미지와 마커를 생성합니다
      var markerImage = this.createMarkerImage(positionList[i].type, imageSize, null),
        marker = this.createMarker(positionList[i].location, markerImage, id);

      // 생성된 마커를 편의점 마커 배열에 추가합니다
      markerList.push(marker);
    }
  }

  createInfowindow(text?: string, route?: string) {
    const routeContent = `<div style="padding:5px;"><a href=${route}>${text}</a></div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    const Content = `<div style="padding:5px;">${text}</div>`;
    const iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
    return new window.kakao.maps.InfoWindow({
      content: route ? routeContent : Content,
      removable: iwRemoveable,
    });
  }

  // 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
  setMapType(map: any, maptype: string) {
    let roadmapControl = document.getElementById('btnRoadmap');
    let skyviewControl = document.getElementById('btnSkyview');
    if (maptype === 'roadmap') {
      map.setMapTypeId(window.kakao.maps.MapTypeId.ROADMAP);
      // roadmapControl.className = 'selected_btn';
      // skyviewControl.className = 'btn';
    } else {
      map.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);
      // skyviewControl.className = 'selected_btn';
      // roadmapControl.className = 'btn';
    }
  }

  // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  zoomIn(map: any) {
    map.setLevel(map.getLevel() - 1);
  }

  // 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  zoomOut(map: any) {
    map.setLevel(map.getLevel() + 1);
  }

  // 지도의 한 화면에 마커들이 다 보이게해준다.
  setBoundsByPositions = (positions: Position[]) => {
    //   const userLocation = new window.kakao.maps.LatLng(this.latitude, this.longitude);
    // const locations = positions.map(position => position.location);
    positions.forEach(location => this.bounds.extend(location));
    this.map.setBounds(this.bounds);
  };

  // positionList type빼기 , 객체로 받기
  addMarkers(markers: any[], kakaoMap: any) {
    markers.map(marker => marker.setMap(kakaoMap));
  }
  // positionList type빼기 , 객체로 받기
  subtractMarkers(markers: any[]) {
    markers.map(marker => marker.setMap(null));
  }

  // 마커목록을 지도에서 toggle시키고, 지도의 한 화면에 마커들이 다 보이게 해준다.
  toggleMarkersAndResetBounds({ type, markers, kakaoMap }: { type: 'add' | 'subtract'; markers: any[]; kakaoMap: any }) {
    const positions = markers.map(marker => marker.getPosition());
    if (type === 'add') this.addMarkers(markers, kakaoMap);
    if (type === 'subtract') this.subtractMarkers(markers);
    this.setBoundsByPositions(positions);
  }

  onClickMarkerButton({ isClick, markers }: { isClick: boolean; markers: any[] }) {
    if (isClick) return this.toggleMarkersAndResetBounds({ kakaoMap: this.map, type: 'add', markers: markers });
    if (!isClick) return this.toggleMarkersAndResetBounds({ kakaoMap: this.map, type: 'subtract', markers: markers });
  }

  // 지도 중심 이동시키기
  setCenter(latitude : number, longitude : number) {
    const moveLatLon = new window.kakao.maps.LatLng(latitude, longitude);
    this.map.panTo(moveLatLon);     
  }
}
