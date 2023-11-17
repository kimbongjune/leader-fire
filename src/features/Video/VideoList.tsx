import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import SyncIcon from '../../../public/images/icons/sync.svg';
import FullscreenIcon from '../../../public/images/icons/fullscreen.svg';
import { useState } from 'react';
import { DeviceType } from '@/types/types';

interface Props {
  deviceType: DeviceType;
  videos: string[];
}
//TODO 영상공유 리스트
const VideoList = (props: Props) => {
  const { deviceType } = props;
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <Wrapper deviceType={deviceType} isFullScreen={isFullScreen}>
      <MainVideo isFullScreen={isFullScreen} deviceType={deviceType}>
        {deviceType === 'mobile' && (
          <SyncButton>
            <IconWrapper width="32px" height="32px" color="#fff">
              <SyncIcon />
            </IconWrapper>
          </SyncButton>
        )}
        <Image src="/images/fires sample.png" fill alt="메인비디오" />
        {!isFullScreen && (
          <Box position="absolute" bottom="16px" right="16px">
            <IconWrapper width={deviceType === 'mobile' ? '32px' : '48px'} height={deviceType === 'mobile' ? '32px' : '48px'} color="#fff">
              <FullscreenIcon />
            </IconWrapper>
          </Box>
        )}
      </MainVideo>
      <Grid templateColumns={'repeat(2, 1fr)'} gap="8px" padding={deviceType === 'mobile' ? '16px' : '0'} h="fit-content" flex={1}>
        <SubVideo deviceType={deviceType}>
          <Image src="/images/video default.png" fill alt="서브비디오" />
        </SubVideo>
        <SubVideo deviceType={deviceType}>
          <Image src="/images/video default.png" fill alt="서브비디오" />
        </SubVideo>
        <SubVideo deviceType={deviceType}>
          <Image src="/images/video default.png" fill alt="서브비디오" />
        </SubVideo>
        <SubVideo deviceType={deviceType}>
          <Image src="/images/video default.png" fill alt="서브비디오" />
        </SubVideo>
        <SubVideo deviceType={deviceType}>
          <Image src="/images/video default.png" fill alt="서브비디오" />
        </SubVideo>
        <SubVideo deviceType={deviceType}>
          <Image src="/images/video default.png" fill alt="서브비디오" />
        </SubVideo>
      </Grid>
    </Wrapper>
  );
};

export default VideoList;

VideoList.defaultProps = {
  videos: ['/images/fires sample.png', '/images/video default.png', '/images/video default.png', '/images/video default.png'],
};

const Wrapper = styled.div<{ deviceType: DeviceType; isFullScreen: boolean }>`
  display: flex;
  flex-direction: column;
  background: #f8f9fa;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical') {
      return `
        padding: 24px 16px;
        gap: 24px;
      `;
    }

    if (deviceType === 'tabletHorizontal') {
      return `
        min-height: 100%;
        flex-direction: row;
        padding: 24px 16px;
        gap: 32px;
      `;
    }
  }}

  ${({ isFullScreen }) =>
    isFullScreen &&
    `
    padding: 0;
  `}
`;

const MainVideo = styled.div<any>`
  width: 100%;
  height: 0;
  padding-bottom: 66%;
  position: relative;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical') {
      return `
        padding-bottom: 57.3%;
      `;
    }

    if (deviceType === 'tabletHorizontal') {
      return `
        flex: 1;
        height: 100%;
        padding-bottom: 45.955%;
      `;
    }
  }}

  ${({ isFullScreen }) =>
    isFullScreen &&
    `
  height: 100%;
  padding: 0 0 0 0;
  position: absolute;
  top: 0;
  z-index: 100;
`}
`;

const SubVideo = styled.div<any>`
  flex: 1;
  width: 100%;
  height: 0;
  padding-bottom: 77%;
  position: relative;
  background: black;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical') {
      return `
        padding-bottom: 50%;
        height: 197px;
      `;
    }

    if (deviceType === 'tabletHorizontal') {
      return `
        padding-bottom: 62%;
        // height: 172px;
      `;
    }
  }}
`;

const SyncButton = styled.button`
  padding: 8px;
  border-radius: 44px;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 16px;
  top: 24px;
  z-index: 20;
`;
