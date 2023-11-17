import { Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { ReactNode } from 'react';

export type MessageType = {
  profileImgUrl: string;
  name: string;
  type: 'string' | 'image' | 'video';
  children?: ReactNode;
  time: string;
  isSystem?: boolean;
  isYours?: boolean;
  imageUrl?: string;
};

const Message = (props: MessageType) => {
  // 시스템 메시지
  if (props.isSystem) {
    return (
      <Flex gap="8px" pr="76px" height="fit-content">
        <Profile>
          <Image src={'/images/icons/system.png'} fill alt="프로필 이미지" />
        </Profile>
        <Stack spacing="8px" w="100%">
          <Flex gap="8px" align="flex-end">
            {props.type === 'string' && <TextBox isSystem={props.isSystem}>{props.children}</TextBox>}
          </Flex>
        </Stack>
      </Flex>
    );
  }

  // 타인 메시지
  if (!props.isYours) {
    return (
      <Flex gap="8px" pr="35px" height="fit-content">
        <Profile>
          <Image src={props.profileImgUrl} fill alt="프로필 이미지" />
        </Profile>
        <Stack spacing="8px" w="100%">
          <Name>{props.name}</Name>
          <Flex gap="8px" align="flex-end">
            {props.type === 'string' && <TextBox>{props.children}</TextBox>}
            {props.type === 'image' && <ImageBox imageUrl={props.imageUrl}></ImageBox>}
            <Time>{props.time}</Time>
          </Flex>
        </Stack>
      </Flex>
    );
  }

  // 본인 메시지
  if (props.isYours) {
    return (
      <Flex gap="8px" justify="flex-end">
        <Flex gap="8px" align="flex-end">
          <Time>{props.time}</Time>
          {props.type === 'string' && <TextBox isYours={props.isYours}>{props.children}</TextBox>}
          {props.type === 'image' && <ImageBox imageUrl={props.imageUrl}></ImageBox>}
        </Flex>
      </Flex>
    );
  }

  return null;
};

export default Message;

Message.defaultProps = {
  profileImgUrl: '/images/icons/default-profile.png',
  isYours: false,
  imageUrl: '/images/fires sample.png',
};

const Wrapper = styled.div``;

const Profile = styled.div`
  position: relative;
  min-width: 32px;
  width: 32px;
  height: 32px;
`;

const Name = styled.div`
  color: var(--08, #495057);
  font-family: Pretendard SemiBold;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
`;

const TextBox = styled.div<any>`
  flex: 1;
  color: var(--09, #343a40);
  font-family: Pretendard Medium;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;

  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid var(--02, #e9ecef);
  background: #fff;

  ${({ isYours }) =>
    isYours &&
    `
    color: var(--00, #FFF);
    font-family: Pretendard Medium;
    font-size: 16px;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
    border-radius: 4px;
    background: var(--colors-orange, #FF8A3A);
  `}

  ${({ isSystem }) =>
    isSystem &&
    `
      color: var(--00, #FFF);
      font-family: Pretendard Bold;
      font-size: 16px;
      line-height: 24px; /* 150% */
      letter-spacing: -0.32px;

      border-radius: 4px;
      background: var(--06, #909AA4);
`}
`;

const Time = styled.div`
  min-width: 37px;
  color: var(--06, #909aa4);
  font-family: Pretendard Medium;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
`;

const ImageBox = styled.div<any>`
  width: 100%;
  height: 0;
  padding-bottom: 57%;
  background: red;
  border-radius: 2px;

  ${({ imageUrl }) =>
    imageUrl &&
    `
    background-image: url("${imageUrl}");
    background-size: cover;
  `};
`;
