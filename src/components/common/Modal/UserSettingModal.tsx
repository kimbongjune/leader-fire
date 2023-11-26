import { useRouter } from 'next/router';
import ModalLayout from './ModalLayout';
import { Flex, Modal, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Person from '../../../../public/images/icons/person2.svg';
import Call from '../../../../public/images/icons/call.svg';
import theme from '@/theme/colors';
import { useState } from 'react';
import Switch from 'react-switch';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  phoneNumber: string;
}

const UserSettingModal = (props: Props) => {
  const [checked, setChecked] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(props?.phoneNumber)

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
              <StyledInput type="number" placeholder="전화번호 입력" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </InputWrapper>
            <Flex justify="flex-end" gap="8px" pb="16px" borderBottom="1px solid #e9ecef">
              <Switch id="myPosition" onChange={e => setChecked(e)} checked={checked} onColor={theme.colors.gray4} offColor={theme.colors.blue} width={34} height={18} handleDiameter={12} uncheckedIcon={false} checkedIcon={false} />
              <SwitchText htmlFor="myPosition">내 위치 전송</SwitchText>
            </Flex>
          </Stack>
          <Stack w="100%" spacing="16px" align="center">
            <Attention>항상 최신 정보로 유지해주세요</Attention>
          </Stack>
          <Flex w="100%" gap="16px">
            <StyledButton onClick={props.onClose}>취소</StyledButton>
            <StyledButton bgColor={theme.colors.orange} onClick={props.onClick}>
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
