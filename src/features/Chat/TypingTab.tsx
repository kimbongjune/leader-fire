import { Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import AddIcon from '../../../public/images/icons/add.svg';
import CloseIcon from '../../../public/images/icons/close.svg';
import SendIcon from '../../../public/images/icons/send.svg';
import AddPhotoIcon from '../../../public/images/icons/add-photo.svg';
import CameraIcon from '../../../public/images/icons/camera.svg';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import { useState } from 'react';
import TypingTabMenuItem from './TypingTabMenuItem';

interface Props {}

const TypingTab = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <Wrapper>
        <Stack spacing="12px">
          <StyledButton onClick={() => setIsOpen(false)}>
            <IconWrapper width="24px" height="24px" color="#909AA4">
              <CloseIcon />
            </IconWrapper>
          </StyledButton>
          <Stack spacing="8px">
            <TypingTabMenuItem icon={<AddPhotoIcon />} title="갤러리 찾기" />
            <TypingTabMenuItem icon={<CameraIcon />} title="사진 촬영" />
          </Stack>
        </Stack>
      </Wrapper>
    );
  }

  return (
    <Wrapper isOpen={isOpen}>
      <Flex gap="12px" align="center">
        <StyledButton onClick={() => setIsOpen(true)}>
          <IconWrapper width="24px" height="24px" color="#909AA4">
            <AddIcon />
          </IconWrapper>
        </StyledButton>
        <TextInput placeholder="이곳에 메시지를 입력하세요" />
        <button onClick={() => {}}>
          <IconWrapper width="24px" height="24px" color="#495057">
            <SendIcon />
          </IconWrapper>
        </button>
      </Flex>
    </Wrapper>
  );
};

export default TypingTab;

const Wrapper = styled.div<any>`
  padding: 8px 16px 40px 16px;
  position: sticky;
  bottom: 0;
  background: #fff;
  z-index: 10;
  border-top: 1px solid var(--02, #e9ecef);

  ${({ isOpen }) =>
    isOpen &&
    `
    padding-bottom: 36px;
  `}
`;

const StyledButton = styled.button`
  width: fit-content;
  padding: 8px;
  border-radius: 4px;
  background: #e9ecef;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  resize: none;

  &::placeholder {
    color: var(--06, #909aa4);
    font-family: Pretendard Medium;
    font-size: 16px;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
  }

  border-radius: 4px;
  border: 1px solid var(--02, #e9ecef);
  background: var(--01, #f8f9fa);
`;
