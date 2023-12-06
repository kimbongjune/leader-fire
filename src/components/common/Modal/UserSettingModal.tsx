import { useRouter } from 'next/router';
import ModalLayout from './ModalLayout';
import { Flex, Modal, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Person from '../../../../public/images/icons/person2.svg';
import Call from '../../../../public/images/icons/call.svg';
import theme from '@/theme/colors';
import { useRef, useState } from 'react';
import Switch from 'react-switch';
import axios, {setAuthToken} from '@/components/common/api/axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useDispatch } from 'react-redux';
import { saveSendLocationFlag, saveUserInformation } from '@/features/slice/UserinfoSlice';
import { UserDto, apiPostResponse } from '@/types/types';
import { jwtDecode } from 'jwt-decode'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  phoneNumber: string;
}

const UserSettingModal = (props: Props) => {
  
  const dispatch = useDispatch()

  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);
  
  const sendLocationFlag = useSelector((state: RootState) => state.userReducer.sendLocationFlag);

  const [phoneNumber, setPhoneNumber] = useState(userInfo.deviceTel || '');

  const [checked, setChecked] = useState(sendLocationFlag);

  const phonNumberInput = useRef<HTMLInputElement>(null);

  const [phoneError, setPhoneError] = useState('');
  
  dispatch(saveSendLocationFlag(checked))
  if(checked){
    if (window.fireAgency && window.fireAgency.startLocationService) {
        window.fireAgency.startLocationService();
    }
  }else{
    if (window.fireAgency && window.fireAgency.stopLocationService) {
      window.fireAgency.stopLocationService();
    }
  }

  const handleAcceptButton = async () => {

    if (phoneNumber === null || phoneNumber ==="") {
      setPhoneError('전화번호를 입력해주세요.'); // 아이디 입력값이 없을 경우 오류 메시지
      phonNumberInput.current?.focus();
      return; // 입력값이 없으면 여기서 실행중단
    }
    const userUpdateResponse = await axios.put<apiPostResponse>("/api/user/info", {
      userId : userInfo.userId,
      deviceTel : phoneNumber
    })

    if(userUpdateResponse.data.responseCode === 200){
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
      props.onClick()
    }else{
      alert("유저 정보 갱신 실패")
    }

  }

  return (
    <ModalLayout isOpen={props.isOpen} onClose={props.onClose} borderRadius="12px">
      <ModalContent>
        <Stack spacing="16px" align="center">
          <Stack spacing="8px" align="center">
            <Person width={64} height={64} color="#DEE2E6" />
            <Stack spacing="4px" align="center">
              <Title>설정변경</Title>
              <Description>사용자 설정을 변경합니다</Description>
            </Stack>
          </Stack>
          <Stack w="100%" spacing="16px">
            <InputWrapper>
              <Call width="20px" height="20px" color={theme.colors.orange} />
              <StyledInput ref={phonNumberInput} type="text" placeholder="전화번호 입력" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </InputWrapper>
            <Flex justify="flex-end" gap="8px" pb="16px" borderBottom="1px solid #e9ecef">
            {phoneError && <FaildChangePhoneNumber>{phoneError}</FaildChangePhoneNumber>}
              <Switch id="myPosition" onChange={e => setChecked(e)} checked={checked} onColor={theme.colors.blue} offColor={theme.colors.gray4} width={34} height={18} handleDiameter={12} uncheckedIcon={false} checkedIcon={false} />
              <SwitchText htmlFor="myPosition">내 위치 전송</SwitchText>
            </Flex>
          </Stack>
          <Stack w="100%" spacing="16px" align="center">
            <Attention>항상 최신 정보로 유지해주세요</Attention>
          </Stack>
          <Flex w="100%" gap="16px">
            <StyledButton onClick={props.onClose}>취소</StyledButton>
            <StyledButton bgColor={theme.colors.orange} onClick={() => handleAcceptButton()}>
              확인
            </StyledButton>
          </Flex>
        </Stack>
      </ModalContent>
    </ModalLayout>
  );
};

export default UserSettingModal;

const ModalContent = styled.div`
  min-width: 343px;
  padding: 32px 16px;
`;

const Title = styled.div`
  color: #495057;
  font-family: Pretendard Bold;
  font-size: 20px;
  line-height: 24px; /* 120% */
  letter-spacing: -0.4px;
`;

const Description = styled.div`
  color: #6c757d;
  font-family: Pretendard Medium;
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: -0.32px;
`;

const FaildChangePhoneNumber = styled.div`
  color: ${theme.colors.red};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  margin-left: auto;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 14px 16px 14px 16px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  background: #fff;
  gap: 10px;
`;

const StyledInput = styled.input`
  height: 20px;
  width: 100%;
  &::placeholder {
    color: var(--05, #adb5bd);
    font-family: Pretendard SemiBold;
    font-size: 16px;
    line-height: 20px; /* 125% */
    letter-spacing: -0.32px;
  }
`;

const SwitchText = styled.label`
  color: #6c757d;
  font-family: Pretendard SemiBold;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
`;

const Attention = styled.div`
  color: var(--07, #6c757d);
  font-family: Pretendard SemiBold;
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: -0.32px;
`;

const StyledButton = styled.button<{ bgColor?: string }>`
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 8px;
  background: ${({ bgColor }) => bgColor ?? '#adb5bd'};

  color: #fff;
  font-family: Pretendard Bold;
  font-size: 18px;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.36px;
`;
