import axios from 'axios';

// Axios 인스턴스를 생성
const axiosInstance = axios.create({
  baseURL: 'https://run.mocky.io/v3',
});

// 요청 인터셉터를 추가하여 모든 요청에 토큰을 포함
axiosInstance.interceptors.request.use((config) => {
  //TODO 앱의 room db에서 jwt 토큰을 가져와서 할당.
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  // 요청 오류가 있을 때 실행
  return Promise.reject(error);
});

// 토큰을 동적으로 axios 헤더에 추가하는 함수
export const setAuthToken = (token:String) => {
    console.log("setAuthToken", token);
    if (token) {
      // 토큰이 있는 경우, 모든 요청의 헤더에 Authorization을 설정합니다.
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // 토큰이 없는 경우, Authorization 헤더를 삭제합니다.
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

export default axiosInstance;