import { RootState, store } from '@/app/store';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Axios 인스턴스를 생성
const axiosInstance = axios.create({
  baseURL: 'http://121.152.148.227:18080/gnfire-1.0.0-BUILD-SNAPSHOT',
  //baseURL: 'http://192.168.10.210:8080/gnfire-1.0.0-BUILD-SNAPSHOT',
});

// 토큰을 동적으로 axios 헤더에 추가하는 함수
export const setAuthToken = (token:String) => {
    console.log("setAuthToken", token);
    if (token) {
      // 토큰이 있는 경우, 모든 요청의 헤더에 Authorization을 설정합니다.
      axiosInstance.defaults.headers.common['Authorization'] = `${token}`;
    } else {
      // 토큰이 없는 경우, Authorization 헤더를 삭제합니다.
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

export default axiosInstance;