import React, { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import ModalLayout from './ModalLayout';
import Image from 'next/image';
import { Flex } from '@chakra-ui/react';
import theme from '@/theme/colors';
import axios from "../../../components/common/api/axios"
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { apiPostResponse } from '@/types/types';

interface Props {
  hasRead: boolean;
  setHasRead: Dispatch<SetStateAction<boolean>>;
  disasterNumber : string[];
  userId: string
}

//TODO 팝업 클릭하면 RootState에 데이터 갱신(DispatchItem.tsx와 동일하게)
const AlertModal = (props: Props) => {
  console.log(props)

  const useInfo = useSelector((state: RootState) => state.userReducer.userInfo);

  const onClickCloseModal = async () => {
    //TODO axios로 재난번호에 대해 수신 확인 전송

    const requestData = {
      dsrSeqList: props.disasterNumber.map(dsrSeq => ({ dsrSeq })),
      userId: useInfo.userId
    };

    const disasterCheckResponse = await axios.put<apiPostResponse>("/api/disaster_info/check_call",requestData)
    if(disasterCheckResponse.data.responseCode == 200){
      props.setHasRead(false);
    }else{
      console.log("disasterCheckResponse call failed")
      props.setHasRead(false);
    }
  };

  return (
    <ModalLayout isOpen={true} onClose={() => {}} borderRadius="12px">
      <ModalContent>
        <Image src="/images/icons/bell.png" width={48} height={48} alt="알림" />
        <Text>긴급구조 알림</Text>
        <Flex gap="8px" padding="12px 16px" borderRadius="8px" bgColor={theme.colors.gray1} margin="16px 0px">
          <Image src="/images/icons/Police car light.png" width={24} height={24} alt="알림" />
          <SubText>신규 긴급 구조 정보가{props.disasterNumber.length}건 발생했습니다.</SubText>
        </Flex>
        <Button onClick={onClickCloseModal}>확인</Button>
      </ModalContent>
    </ModalLayout>
  );
};

export default AlertModal;

const ModalContent = styled.div`
  padding: 32px 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
  margin-top: 8px;
`;

const SubText = styled.div`
  color: ${theme.colors.gray6};
  font-family: 'Pretendard SemiBold';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.32px;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background-color: ${theme.colors.orange};
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.36px;
`;
