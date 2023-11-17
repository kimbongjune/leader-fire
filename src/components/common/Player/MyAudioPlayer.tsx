import theme from '@/theme/colors';
import { Box, HStack, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import AudioPlayer from './AudioPlayer';
import { DeviceType } from '@/types/types';

interface Props {
  title: string;
  url: string;
  deviceType: DeviceType;
}

export const MyAudioPlayer = (props: Props) => {
  const { deviceType } = props;
  return (
    <Wrapper deviceType={deviceType}>
      <HStack divider={deviceType !== 'mobile' ? undefined : <Divider />} spacing="16px">
        <Title deviceType={deviceType}>{props.title}</Title>
        <AudioPlayerWrapper deviceType={deviceType}>
          <AudioPlayer url={props.url} />
        </AudioPlayerWrapper>
      </HStack>
    </Wrapper>
  );
};

export default MyAudioPlayer;

MyAudioPlayer.defaultProps = {
  title: '신고접수1',
  url: 'https://ccrma.stanford.edu/~jos/mp3/harpsi-cs.mp3',
};

const Wrapper = styled.div<{ deviceType: DeviceType }>`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.gray2}; // #e9ecef);
  background: ${theme.colors.white};

  .audio-player {
    height: 10px;
  }

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        padding: 12px 16px;
      `;
    }
  }}
`;

const Title = styled.div<{ deviceType: DeviceType }>`
  flex-shink: 0;
  color: ${theme.colors.gray8}; // #343a40;
  font-family: Pretendard SemiBold;
  font-size: 12px;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        color: ${theme.colors.gray};
        font-family: Pretendard Bold;
        font-size: 16px;
        line-height: 20px; /* 125% */
        letter-spacing: -0.32px;
      `;
    }
  }}
`;

const Divider = styled.div`
  height: 12px;
  border-left: 1px solid #dee2e6;
  margin: 0 8px;
`;

const AudioPlayerWrapper = styled.div<{ deviceType: DeviceType }>`
  flex: 1;
  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        .pause-icon, .play-icon {
          width: 24px;
          height: 24px;
          color: ${theme.colors.darkBlue};
        }

        .volume-up-icon, .mute-icon {
          width: 24px;
          height: 24px;
        }

        .button-container, .container {
          gap: 16px;
        }

        .passed-time, .total-time, .time-container {
          font-size: 16px;
        }
        
        .progress-bar {
          height: 4px;
        }

      `;
    }
  }}
`;
