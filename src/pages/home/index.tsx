import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Layout from '@/components/common/Layout/Layout';
import { Flex } from '@chakra-ui/react';
import Home from '@/features/Home/Home';
import HomeMenu from '@/features/Home/HomeMenu';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType, UserDto, apiPostResponse } from '@/types/types';
import { NextPageContext } from 'next';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux';
import axios,{setAuthToken} from "../../components/common/api/axios"
import { saveLogedInStatus, saveUserInformation } from '@/features/slice/UserinfoSlice';

//TODO 메인페이지
const HomePage = () => {
  const deviceType = useDeviceType();
  const dispatch = useDispatch();

  const parsingJwt = async (token: string) => {
    const userData = jwtDecode<UserDto>(token)
    return userData
  }

  const sendLocationFlag = useSelector((state: RootState) => state.userReducer.sendLocationFlag);

  if(sendLocationFlag){
    if (window.fireAgency && window.fireAgency.startLocationService) {
      window.fireAgency.startLocationService();
    }
  }

  // window.updateToken = async (token: string) => {
  //   console.log("token" , token, userInfo)
  //   if(userInfo){
  //     try{
  //       const userUpdateResponse = await axios.put<apiPostResponse>("/api/user/info", {
  //         fcmToken: token,
  //         userId : userInfo.sub
  //       })
  //       if(userUpdateResponse.data.responseCode === 200){
  //         console.log(userInfo)
  //         const fetchUserData = await axios.post("/api/user/login/auth",{
  //             userId : userInfo.userId,
  //             userPassword : userInfo.userPw
  //         })
  //         if(fetchUserData.data.responseCode === 200){
  //           localStorage.setItem("token", fetchUserData.headers['authorization']);
  //           setAuthToken(fetchUserData.headers['authorization'])
  //         }
  //         if (window.fireAgency && window.fireAgency.saveJwtToken) {
  //           window.fireAgency.saveJwtToken(userInfo.userId, fetchUserData.headers['authorization']);
  //         }
  //         dispatch(saveUserInformation(jwtDecode<UserDto>(fetchUserData.headers['authorization'])))
  //         console.log(jwtDecode<UserDto>(fetchUserData.headers['authorization']))
  //       }else{
  //         alert("유저 정보 갱신 실패")
  //       }
  //     }catch(error){
  //       console.error(error)
  //     }
  //   }
    
  // };

  window.getSavedUserToken = async (userdata:userData) => {
    console.log("@@@@@@@@@@@@@@@@@",userdata)
    if(userdata !== null){
      dispatch(saveLogedInStatus(true))
      const userInfo = await parsingJwt(userdata.jwtToken.replace("Bearer ", ""))

      console.log("@@@@@@@@@@@@@@@@@", userInfo)
      localStorage.setItem("token", userdata.jwtToken);
      setAuthToken(userdata.jwtToken)

      try{
        const userUpdateResponse = await axios.put<apiPostResponse>("/api/user/info", {
          fcmToken: userInfo.fcmToken,
          userId : userInfo.sub
        })
        if(userUpdateResponse.data.responseCode === 200){
          console.log(userInfo)
          const fetchUserData = await axios.post("/api/user/login/auth",{
              userId : userInfo.userId,
              userPassword : userInfo.userPw
          })
          if(fetchUserData.data.responseCode === 200){
            localStorage.setItem("token", fetchUserData.headers['authorization']);
            setAuthToken(fetchUserData.headers['authorization'])
          }
          if (window.fireAgency && window.fireAgency.saveJwtToken) {
            window.fireAgency.saveJwtToken(userInfo.userId, fetchUserData.headers['authorization']);
          }
          dispatch(saveUserInformation(jwtDecode<UserDto>(fetchUserData.headers['authorization'])))
          console.log(jwtDecode<UserDto>(fetchUserData.headers['authorization']))
        }else{
          alert("유저 정보 갱신 실패")
        }
      }catch(error){
        console.error(error)
      }
    }
  };
  
  useEffect(() => {

    if (window.fireAgency && window.fireAgency.getUserData) {
      window.fireAgency.getUserData();
    }

  }, [dispatch]);
  
  const testData = useSelector((state: RootState) => state.disaster.disasterInformation);
  console.log("@@@@@@@@@@@@@@@@@@@@@@",testData)

  if (!deviceType) return null;

  return (
    <Layout>
      <Flex direction="column" height="100%">
        <HomeMenu deviceType={deviceType} testData={testData}/>
        <Children deviceType={deviceType}>
          <Home deviceType={deviceType} testDate={testData} />
        </Children>
      </Flex>
    </Layout>
  );
};

export default HomePage;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  return { props: { query } };
};

const Children = styled.div<{ deviceType?: DeviceType }>`
  padding: 32px 16px 16px;
  flex: 1;
  height: 100%;
  z-index: 2;
  overflow-y: auto;
  background: #f8f9fa;
  ::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
  }

  scrollbar-width: none;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical') {
      return `
      padding: 68px 16px 16px;
  `;
    }

    if (deviceType === 'tabletHorizontal') {
      return `
      padding: 48px 16px 16px;
  `;
    }
  }}
`;
