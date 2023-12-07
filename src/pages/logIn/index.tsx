import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import Input from '@/components/common/Input/input';
import { Flex, Stack } from '@chakra-ui/react';
import Switch from 'react-switch';
import Button from '@/components/common/Button/Button';
import Image from 'next/image';
import LoginFooter from '@/features/Login/LoginFooter';
import useDeviceType from '@/hooks/useDeviceType';
import { useRouter } from 'next/router';
import axios, {setAuthToken} from "../../components/common/api/axios"
import { useDispatch } from 'react-redux';
import { MyInfoState, saveLogedInStatus, saveUserInformation} from '../../features/slice/UserinfoSlice';
import { UserInformation } from '@/types/types';
import { AppDispatch, RootState  } from '../../app/store';
import { useSelector } from 'react-redux';

//TODO 로그인 페이지, 로그인 처리, 로그인 성공시 redux에 내정보 넣기
const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.userReducer.logedIn);
  const sendLocationFlag = useSelector((state: RootState) => state.userReducer.sendLocationFlag);
  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/home'); // 로그인 상태라면 홈 페이지(또는 다른 페이지)로 리디렉션
    }
  }, [isLoggedIn, router]);

  const [checked, setChecked] = useState(false);
  const deviceType = useDeviceType();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [userInfo, setUserInfo] = useState<UserInformation>()

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 기본 이벤트를 방지
    if (username === null || username ==="") {
      setLoginError('아이디를 입력해주세요.'); // 아이디 입력값이 없을 경우 오류 메시지
      usernameInputRef.current?.focus();
      return; // 입력값이 없으면 여기서 실행중단
    }

    if (password === null || password ==="") {
      setLoginError('비밀번호를 입력해주세요.'); // 비밀번호 입력값이 없을 경우 오류 메시지
      passwordInputRef.current?.focus();
      return; // 입력값이 없으면 여기서 실행중단
    }

    //TODO 모든 입력이 제대로 되었다면 서버에 로그인 요청 및 네이티브의 vpn 로그인 같이 진행
    try {
      console.log(location)
      const response = await axios.post<UserInformation>('/api/user/login/auth', {
        userId: username,
        userPassword : password,
      });
      
      console.log(response.headers['authorization'])
      localStorage.setItem("token", response.headers['authorization']);
      setAuthToken(response.headers['authorization'])

      if (window.fireAgency && window.fireAgency.saveUserData) {
        window.fireAgency.saveUserData(username, password, checked, response.headers['authorization']);
      }

      //위치전송 플래그 조회해서 전송한다면 보냄
      // if (window.fireAgency && window.fireAgency.startLocationService) {
      //   window.fireAgency.startLocationService();
      // }
      dispatch(saveLogedInStatus(true))
      console.log(response.data)
      setUserInfo(response.data)

      if (window.fireAgency && window.fireAgency.requestGetToken) {
        window.fireAgency.requestGetToken();
      }

      if(sendLocationFlag){
        if (window.fireAgency && window.fireAgency.startLocationService) {
            window.fireAgency.startLocationService();
        }
      }else{
        if (window.fireAgency && window.fireAgency.stopLocationService) {
          window.fireAgency.stopLocationService();
        }
      }
      
      
    } catch (error) {
      console.log(error)
      // 오류가 발생했을 경우 오류 메시지를 설정
      setLoginError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      return;
    }
  };

//   window.updateToken = (token: string) => {
//     axios.post(`/api/user/info/${userInfo?.userId}`,{
//       "deviceTel": userInfo?.deviceTel,
//       "fcmToken": token,
//       "userId": userInfo?.userId
//     }).then(response =>{
//       dispatch(saveUserInformation({...userInfo!!, fcmToken : token}))
//       router.replace('/home');
//     }).catch(error =>{
//       console.log(error)
//     })
//   }; 

  if (!deviceType) return null;

  if (isLoggedIn) {
    return null;
  }

  return (
    <Flex minH="100vh" background={theme.colors.gray1}>
      <Container deviceType={deviceType}>
        <LoginBody>
          {deviceType === 'mobile' && <Image width={204} height={32} src="/images/logo/logo-black.png" alt="경상남도 소방본부" />}
          <Stack spacing="4px" align="center" mt={deviceType === 'mobile' ? '36px' : '0'} mb="32px">
            <Title>지휘관·대원</Title>
            <HighlightedTitle>
              <span>정보지원</span> 전용앱
            </HighlightedTitle>
          </Stack>
          <form style={{ width: '100%' }} onSubmit={handleLogin}>
            <Flex direction="column" gap="16px">
              <div>
                <FormTitle>아이디</FormTitle>
                <Input onChange={(e) => setUsername(e.target.value)} ref={usernameInputRef} fontSize="16px" lineHeight="20px" fontWeight={600} letterSpacing="-0.32px" color={theme.colors.gray5} placeholder={deviceType === 'mobile' ? '영문/숫자만 허용' : '긴급구조표준 로그인 ID'} />
              </div>
              <div>
                <FormTitle>비밀번호</FormTitle>
                <Input onChange={(e) => setPassword(e.target.value)} ref={passwordInputRef} fontSize="16px" lineHeight="20px" fontWeight={600} letterSpacing="-0.32px" color={theme.colors.gray5} placeholder={deviceType === 'mobile' ? '특수기호 1개 이상 포함' : '긴급구조표준 로그인 PW'} />
              </div>
            </Flex>
            <Flex gap="8px" marginTop="16px" marginBottom="24px">
              <Switch id="autoLogin" onChange={e => setChecked(e)} checked={checked} onColor={theme.colors.blue} offColor={theme.colors.gray4} width={34} height={18} handleDiameter={12} uncheckedIcon={false} checkedIcon={false} />
              <AutoLogin htmlFor="autoLogin">자동 로그인</AutoLogin>
              {loginError && <FailLogin>{loginError}</FailLogin>}
            </Flex>
            <Button height="52px" padding="16px 10px" backgroundColor={theme.colors.orange}>
              <LogInText>로그인</LogInText>
            </Button>
          </form>
          <Flex gap="4px" marginTop="12px" justifyContent="center" alignItems="center">
            <InfoText>VPN에 동시에 로그인합니다</InfoText>
          </Flex>
        </LoginBody>
        <LoginFooter deviceType={deviceType} />
      </Container>
    </Flex>
  );
};

export default LoginPage;

const Container = styled.div<any>`
  padding: 0 16px;
  background: ${theme.colors.gray1};
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 64px;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical') {
      return `
      gap: 226px;
      margin-top: 370px;
      `;
    }

    if (deviceType === 'tabletHorizontal') {
      return `
        gap: 92px;
        margin-top: 176px;
      `;
    }
  }}
`;

const LoginBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 343px;
  width: 100%;
`;

const Title = styled.div`
  color: ${theme.colors.gray8};
  font-family: 'Pretendard SemiBold';
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
  width: fit-content;
  text-align: center;
`;

const HighlightedTitle = styled.div`
  color: #343a40;
  font-family: Pretendard Bold;
  font-size: 28px;
  line-height: 32px;
  letter-spacing: -0.56px;

  span {
    color: ${theme.colors.orange};
    font-family: Pretendard Bold;
    font-size: 28px;
    line-height: 32px; /* 114.286% */
    letter-spacing: -0.56px;
  }
`;

const FormTitle = styled.div`
  font-size: 16px;
  font-family: 'Pretendard Bold';
  line-height: 24px;
  letter-spacing: -0.32px;
  color: ${theme.colors.gray6};
  margin-bottom: 8px;
`;

const AutoLogin = styled.label`
  color: ${theme.colors.gray6};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;

const FailLogin = styled.div`
  color: ${theme.colors.red};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  margin-left: auto;
`;

const InfoText = styled.div`
  color: ${theme.colors.gray6};
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const LogInText = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.36px;
`;
