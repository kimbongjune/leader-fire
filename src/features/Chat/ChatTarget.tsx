import theme from '@/theme/colors';
import { ChatMessageType } from '@/types/types';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import ImageIcon from '../../../public/images/icons/image.svg';
import VideoIcon from '../../../public/images/icons/video2.svg';
import ArrowRightIcon from '../../../public/images/icons/arrow-right3.svg';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import Image from 'next/image';
import { useRouter } from 'next/router';

export interface ChatTargetType {
  id: string; // 식별자
  profileUrl?: string; // 프로필 이미지 url
  isGroup?: boolean; // 그룹 유무
  messageType: ChatMessageType; // 메시지 타입
  time: string; // 시간
  name: string; // 개인 이름 | 채팅방 이름
  numberOfMembers?: number; // 인원 수
  comment?: string; // 문자열 메시지
  url?: string; // 이미지, 동영상 경로
  onClick?: (id: string) => void; // 클릭 이벤트 핸들러
  isActive?: boolean; // 선택 시 커스텀 변경 용도
  hasTail?: boolean; // 말풍선 모양 커스텀
}

// 채팅 대상 컴포넌트 (개인 or 그룹)
const ChatTarget = (props: ChatTargetType) => {
  const router = useRouter();

  const defualtHandleClick = () => {
    router.push(`/chat/${props.id}`);
  };

  return (
    <Wrapper onClick={() => (props.onClick ? props.onClick(props.id) : defualtHandleClick())} isActive={props.isActive} hasTail={props.hasTail}>
      <Flex gap="12px" overflow="hidden">
        <Profile>
          <Image src={props.profileUrl || ''} fill alt="프로필 이미지" />
        </Profile>
        <Stack spacing="4px" overflow="hidden">
          <Flex gap="4px">
            {props.isGroup && <NumberOfMember>{props.numberOfMembers ?? 1}</NumberOfMember>}
            <Name>{props.name}</Name>
          </Flex>
          {props.messageType === 'string' && props.comment && <Comment>{props.comment}</Comment>}
          {props.messageType === 'image' && props.url && (
            <Flex gap="4px">
              <IconWrapper width="16px" height="16px" color={theme.colors.gray}>
                <ImageIcon />
              </IconWrapper>
              <Comment>사진전송</Comment>
            </Flex>
          )}
          {props.messageType === 'video' && props.url && (
            <Flex gap="4px">
              <IconWrapper width="16px" height="16px" color={theme.colors.gray}>
                <VideoIcon />
              </IconWrapper>
              <Comment>동영상전송</Comment>
            </Flex>
          )}
        </Stack>
      </Flex>
      <Time>{props.time}</Time>
      {props.hasTail && props.isActive && (
        <Box position="absolute" left="100%">
          <IconWrapper width="8px" height="16px" color={theme.colors.gray9}>
            <ArrowRightIcon />
          </IconWrapper>
        </Box>
      )}
    </Wrapper>
  );
};

export default ChatTarget;

ChatTarget.defaultProps = {
  profileUrl: '/images/icons/default-profile.png',
};

const Wrapper = styled.div<{ isActive?: boolean; hasTail?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  position: relative;

  border-radius: 8px;
  border: 1px solid ${theme.colors.gray2};
  background: ${theme.colors.white};

  ${({ isActive }) =>
    isActive &&
    `
    background: ${theme.colors.gray9};
  `}
`;

const Profile = styled.div`
  width: 48px;
  height: 48px;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  flex-shrink: 0;
`;

const NumberOfMember = styled.div`
  color: ${theme.colors.gray};
  text-align: center;
  text-overflow: ellipsis;
  font-family: Pretendard Medium;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  flex-shrink: 0;
`;

const Name = styled.div`
  color: ${theme.colors.gray7};
  font-family: Pretendard Bold;
  font-size: 18px;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.36px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Comment = styled.div`
  color: ${theme.colors.gray};
  font-family: Pretendard Medium;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Time = styled.div`
  color: ${theme.colors.gray};
  font-family: Pretendard Medium;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
  flex-shink: 0;
`;
