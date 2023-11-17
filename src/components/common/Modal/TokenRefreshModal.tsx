import { useRouter } from 'next/router';
import ModalLayout from './ModalLayout';
import { Flex, Modal, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Refresh from '../../../../public/images/icons/refresh.svg';
import Call from '../../../../public/images/icons/call.svg';
import theme from '@/theme/colors';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  existingToken: string;
  newToken: string;
}

const TokenRefreshModal = (props: Props) => {
  return (
    <ModalLayout isOpen={props.isOpen} onClose={props.onClose} borderRadius="12px">
      <ModalContent>
        <Stack spacing="16px" align="center">
          <Title>토큰 재발급</Title>
          <Stack w="100%" spacing="12px">
            <Stack w="100%" spacing="16px" p="16px" border="1px solid #e9ecef" borderRadius="8px">
              <Flex justify="space-between">
                <TokenName>기존 토큰</TokenName>
                <TokenValue>{props.existingToken}</TokenValue>
              </Flex>
              <RefreshButton>
                <Refresh width="20px" height="20px" color="#fff" />
                재발급
              </RefreshButton>
            </Stack>
            <Flex justify="space-between" p="16px" border="1px solid #e9ecef" borderRadius="8px">
              <TokenName>신규 토큰</TokenName>
              <TokenValue>{props.newToken}</TokenValue>
            </Flex>
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
