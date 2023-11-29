import { useRouter } from 'next/router';
import ModalLayout from './ModalLayout';
import { Flex, Modal, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Refresh from '../../../../public/images/icons/refresh.svg';
import Call from '../../../../public/images/icons/call.svg';
import theme from '@/theme/colors';
import { useEffect, useState } from 'react';
import axios from '@/components/common/api/axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useDispatch } from 'react-redux';
import { saveUserInformation } from '@/features/slice/UserinfoSlice';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  existingToken: string;
}

const TokenRefreshModal = (props: Props) => {
  const [newToken, setNewToken] = useState("");
  const [tokent, setToken] = useState(props.existingToken)

  const useInfo = useSelector((state: RootState) => state.userReducer.userInfo);

  const dispatch = useDispatch();

  const refreshToken =() =>{
    try {
      //앱과 통신하여 새로운 토큰을 받아오고 state에 저장함
      if (window.fireAgency && window.fireAgency.requestUpdateFcmToken) {
        window.fireAgency.requestUpdateFcmToken();
      }
    } catch (error) {
      // 에러 처리
      console.error('Failed to fetch user info status:', error);
    }

    window.updateToken = (token: string) => {
      console.log(token)
      setNewToken(token)
    }; 
  }

  useEffect(() =>{
    if (window.fireAgency && window.fireAgency.requestGetToken) {
      window.fireAgency.requestGetToken();
    }
    window.updateToken = (token: string) => {
      console.log(token)
      setToken(token)
    }; 
  }, [])

  const handleAcceptButton = () =>{
    console.log("????????????")
    axios.post(`/api/user/info/${useInfo.userId}`,{
      "deviceTel": useInfo.deviceTel,
      "fcmToken": newToken,
      "userId": useInfo.userId
    }).then(response =>{
      dispatch(saveUserInformation({...useInfo, fcmToken : newToken}))
      setToken(newToken)
      setNewToken("")
      console.log(response)
      props.onClick()
    }).catch(error =>{
      console.log(error)
      props.onClick()
    })
    
    //api를 이용해 토큰 갱신
  }
  

  return (
    <ModalLayout isOpen={props.isOpen} onClose={props.onClose} borderRadius="12px">
      <ModalContent>
        <Stack spacing="16px" align="center">
          <Title>토큰 재발급</Title>
          <Stack w="100%" spacing="12px">
            <Stack w="100%" spacing="16px" p="16px" border="1px solid #e9ecef" borderRadius="8px">
              <Flex justify="space-between">
                <TokenName>기존 토큰</TokenName>
                <TokenValue>{tokent}</TokenValue>
              </Flex>
              <RefreshButton onClick={refreshToken}>
                <Refresh width="20px" height="20px" color="#fff" />
                재발급
              </RefreshButton>
            </Stack>
            <Flex justify="space-between" p="16px" border="1px solid #e9ecef" borderRadius="8px">
              <TokenName>신규 토큰</TokenName>
              <TokenValue>{newToken}</TokenValue>
            </Flex>
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

export default TokenRefreshModal;

TokenRefreshModal.defaultProps = {
  existingToken: 'qiuwi-09423-qweiu-vjxck',
  newToken: 'qiuwi-09423-qweiu-vjxck',
};

const ModalContent = styled.div`
  min-width: 343px;
  padding: 32px 16px 16px;
`;

const Title = styled.div`
  color: #495057;
  font-family: Pretendard Bold;
  font-size: 20px;
  line-height: 24px; /* 120% */
  letter-spacing: -0.4px;
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

const TokenName = styled.div`
  color: #495057;
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;

const TokenValue = styled.div`
  color: var(--06, #909aa4);
  font-family: Pretendard SemiBold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;

const RefreshButton = styled.button`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: var(--06, #909aa4);

  color: #fff;
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;
