import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import ImageIcon from '../../../public/images/icons/image.svg';
import VideoIcon from '../../../public/images/icons/video2.svg';
import { useRouter } from 'next/router';

interface Props {
  id: string;
  profileImgUrl: string;
  name: string;
  contentType: 'string' | 'image' | 'video';
  content: string;
  time: string;
  type: 'single' | 'group';
  memberCount?: number; // 채팅방 인원 수
}

const ChatListItem = (props: Props) => {
  const router = useRouter();
  return (
    <Wrapper onClick={() => router.push(`/detail/chat/${props.id}`)}>
      <Flex gap="12px" flex={1}>
        <Profile>
          <Image src={props.profileImgUrl} fill alt="프로필 이미지" />
        </Profile>
        <Stack spacing="4px">
          <Box>
            {props.memberCount && <MemberCount>{props.memberCount}</MemberCount>}
            <Name>{props.name}</Name>
          </Box>
          {props.contentType === 'string' && <Content>{props.content}</Content>}
          {props.contentType === 'image' && (
            <Content>
              <Flex gap="4px">
                <IconWrapper width="16px" height="16px" color="#909AA4">
                  <ImageIcon />
                </IconWrapper>
                사진전송
              </Flex>
            </Content>
          )}
          {props.contentType === 'video' && (
            <Content>
              <Flex gap="4px">
                <IconWrapper width="16px" height="16px" color="#909AA4">
                  <VideoIcon />
                </IconWrapper>
                동영상전송
              </Flex>
            </Content>
          )}
        </Stack>
      </Flex>
      <Time>{props.time}</Time>
    </Wrapper>
  );
};

export default ChatListItem;

ChatListItem.defaultProps = {
  profileImgUrl: '/images/icons/default-profile.png',
  type: 'single',
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--02, #e9ecef);
  background: var(--00, #fff);
`;

const Profile = styled.div`
  width: 48px;
  height: 48px;
  position: relative;
  overflow: hidden;
`;

const Name = styled.div`
  color: var(--08, #495057);
  font-family: Pretendard Bold;
  font-size: 18px;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.36px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Content = styled.div`
  color: var(--06, #909aa4);
  font-family: Pretendard Medium;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
`;

const Time = styled.div`
  color: var(--06, #909aa4);
  font-family: Pretendard Medium;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
`;

const MemberCount = styled.div`
  overflow: hidden;
  color: var(--06, #909aa4);
  text-align: center;
  text-overflow: ellipsis;
  font-family: Pretendard Medium;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;
