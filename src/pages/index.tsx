import React, { useEffect } from 'react';
import Loading from './loading';
import { useRouter } from 'next/router';
import axios, {setAuthToken} from "../components/common/api/axios"

//TODO 자동로그인 처리
const Index = () => {
  const router = useRouter();
  useEffect(() => {
    if (window.fireAgency && window.fireAgency.getUserData) {
      window.fireAgency.getUserData();
    }

    window.getSavedUserToken = (userdata:string) => {
      console.log(userdata)
      var user:userData = JSON.parse(userdata);
      if(user !== null){
        verifyToken(user)
      }else{
        router.replace('/logIn');
      }
    };

    const verifyToken = async (user:userData) => {
      //TODO 앱의 roomdb에 자동로그인 정보가 저장되어있는지 확인.
      const isAutoLogin = user.autoLoginFlag;
      if(isAutoLogin){
        try {
          const id = user.id;
          const password = user.password;
          let token = user.jwtToken;
          //있다면 axios 인스턴스에 토큰 할당
          setAuthToken(token)
          console.log("token is@@@@@@@@@@@@@@@@@@@@@@@@")
          
          //TODO axios를 사용하여 토큰 검증 요청 및 네이티브의 vpn 로그인 같이 진행
          //토큰 검증이 실패하면 아이디 비밀번호를 가지고 서버에서 재 인증 후 토큰 반환.
          //반환된 토큰을 token 변수에 할당
          if (window.fireAgency && window.fireAgency.saveUserData) {
            window.fireAgency.saveUserData(id, password, isAutoLogin, "test_token");
          }
          // 성공하면 자동으로 홈 페이지로 리디렉션
          router.replace('/home');
        } catch (error) {
          // 토큰 검증에 실패하면 로그인 페이지로 리디렉션
          console.log(error)
          router.replace('/logIn');
        }
      }else{
        router.replace('/logIn');
      }
    };
  }, []);

  return <Loading />;
};

export default Index;
