import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import VolumeUp from '../../../../public/images/icons/volume-up.svg';
import Mute from '../../../../public/images/icons/mute.svg';
import Play from '../../../../public/images/icons/play-arrow.svg';
import Pause from '../../../../public/images/icons/pause.svg';
import IconWrapper from '../IconWrapper/IconWrapper';
import theme from '@/theme/colors';

interface Props {
  url: string;
}

const AudioPlayer = (props: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isVolumeButtonClicked, setIsVolumeButtonClicked] = useState(false);
  const playerRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    setCurrentTime(Math.round(playedSeconds));
    setProgress(Math.round(playedSeconds));
  };

  const handleDuration = (duration: number) => {
    setDuration(duration); // 총 시간 업데이트
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Wrapper>
      <Box hidden>
        <ReactPlayer ref={playerRef} onProgress={handleProgress} onDuration={handleDuration} url={props.url} volume={volume} playing={isPlaying} width="100%" height="0" />
      </Box>
      <Flex className="container" flex={1} gap="8px" align="center">
        <Flex className="button-container" gap="4px" align="center">
          <PlayButton onClick={togglePlay}>{isPlaying ? <Pause className="pause-icon" width="16px" height="16px" color={theme.colors.gray6} /> : <Play className="play-icon" width="16px" height="16px" color={theme.colors.gray6} />}</PlayButton>
          <Flex className="time-container" gap="2px" align="center">
            <PassedTime className="passed-time">{formatTime(Number(currentTime.toFixed(0)))}</PassedTime> /<TotalTime className="total-time">{formatTime(Number(duration.toFixed(0)))}</TotalTime>
          </Flex>
        </Flex>
        <ProgressBar className="progress-bar">{duration > 0 && <CurrentBar className="current-progress" progress style={{ width: `${(progress / Math.round(duration)) * 100}%` }} />}</ProgressBar>
        <VolumeButton onClick={() => setIsVolumeButtonClicked(!isVolumeButtonClicked)}>
          {!!volume && <VolumeUp className="volume-up-icon" width="16px" height="16px" color="#6C757D" />}
          {!volume && <Mute className="mute-icon" width="16px" height="16px" color="#909AA4" />}
        </VolumeButton>
        {isVolumeButtonClicked && (
          <VolumeSliderContainer>
            <VolumeSlider type="range" min={0} max={1} step={0.1} onChange={e => handleVolumeChange(Number(e.target.value))} />
          </VolumeSliderContainer>
        )}
      </Flex>
    </Wrapper>
  );
};

export default AudioPlayer;

AudioPlayer.defaultProps = {
  mp3Url: 'https://ccrma.stanford.edu/~jos/mp3/harpsi-cs.mp3',
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  align-items: center;
  position: relative;
`;

const PlayButton = styled.button``;

const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  background-color: #ced4da;
  border-radius: 4px;
`;
const CurrentBar = styled.div<any>`
  z-index: 2;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 4px;
  background-color: ${theme.colors.orange};
`;

const VolumeButton = styled.button``;

const VolumeSliderContainer = styled.div`
  position: absolute;
  margin-left: 10px;
  right: -20px;
  top: -50px;
  transform: rotate(-90deg);
`;

const VolumeSlider = styled.input`
  width: 60px;
  height: 5px;
  margin-left: 5px;
`;

const PassedTime = styled.div`
  color: var(--06, #909aa4);
  font-family: Pretendard SemiBold;
  font-size: 12px;
  line-height: 14px; /* 116.667% */
  letter-spacing: -0.24px;
`;

const TotalTime = styled.div`
  color: var(--08, #495057);
  font-family: Pretendard SemiBold;
  font-size: 12px;
  line-height: 14px; /* 116.667% */
  letter-spacing: -0.24px;
`;
