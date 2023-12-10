import React,{useEffect} from 'react';
import Layout from '@/components/common/Layout/Layout';
import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import VideoList from '@/features/Video/VideoList';
import Menu from '@/components/common/Menu/Menu';
import AddressTab from '@/components/common/Menu/AddressTab';
import { useRouter } from 'next/router';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType } from '@/types/types';
import { IncidentType } from '@/types/types';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { selectDisasterById } from '@/features/slice/test';
import axios from '@/components/common/api/axios';

interface Props {
  status: IncidentType;
}

//TODO 영상공유페이지
const VideoPage = (props: Props) => {
  const deviceType = useDeviceType();
  const router = useRouter();

  const id = router.query.id as string

  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);

  const selectedDisaster = useSelector((state: RootState) => selectDisasterById(state, id), shallowEqual);

  useEffect(() =>{
    const sendClickStream = async () =>{
      if(userInfo){
        const clickStreamResponse = await axios.post("/api/menu_log/enter",{
          menuId : "3150",
          userId : userInfo.userId
        })
        console.log(clickStreamResponse.data)
      }
    }
    sendClickStream()
  }, [userInfo])

  if (!deviceType) return null;

  return (
    <Layout>
      <Flex direction="column" height="100%">
        <MenuWrapper deviceType={deviceType}>
          <Menu
            title={selectedDisaster?.eventName}
            status={selectedDisaster?.status}
            closeButtonText={deviceType === 'mobile' ? '닫기' : ''}
            hasCloseButtonWithoutString={false}
            onClickBackButton={() => router.back()}
            onCloseButton={() => router.back()}
            timestamp={deviceType === 'mobile' ? '' : '2023 10 20 23:09'}
            contentAlign="space-between"
          />
        </MenuWrapper>
        <AddressTabWrapper deviceType={deviceType}>
          <AddressTab address={selectedDisaster?.lawAddr}/>
        </AddressTabWrapper>
        <Children deviceType={deviceType}>
        <iframe allow='camera; microphone' src={`https://info.gnfire.go.kr/ERSS_P/video2.do?dsr_seq=${selectedDisaster?.dsrSeq}`} width="100%" height="100%"></iframe>
        </Children>
      </Flex>
    </Layout>
  );
};

export default VideoPage;

VideoPage.defaultProps = {
  status: 'completion',
};

const MenuWrapper = styled.div<{ deviceType: DeviceType }>`
  .button {
    color: #909aa4;
  }

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        .menu-container {
          padding: 20px 16px;
        }

        .back-button {
          width: 32px;
          height: 32px;
        }

        .title {
          font-family: Pretendard Bold;
          font-size: 24px;
          line-height: 32px; /* 133.333% */
          letter-spacing: -0.48px;
          padding: 0 0 0 8px;
        }

        .timestamp-stack {
          flex-direction: row;
          align-items: center;
          gap: 8px;
        }

        .timestamp {
          font-family: Pretendard SemiBold;
          font-size: 20px;
          line-height: 32px; /* 160% */
          letter-spacing: -0.4px;
        }

        .clock-icon {
          width: 16px;
          height: 16px;
        }

        .passed-time {
          color: var(--05, #ADB5BD);
          font-family: Pretendard SemiBold;
          font-size: 16px;
          line-height: 24px; /* 150% */
          letter-spacing: -0.32px;
        }
      `;
    }
  }}
`;

const AddressTabWrapper = styled.div<{ deviceType: DeviceType }>`
  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        .address-tab-container {
          padding: 16px;
        }

        .address-tab-flex {
          gap: 8px;
          justify-content: flex-start;
        }

        .copy-icon-box {
          margin-left: 0;
        }
      `;
    }
  }}
`;

const Children = styled.div<{ deviceType: DeviceType }>`
  height: 100%;
  position: relative;
  background: #f8f9fa;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
  }

  scrollbar-width: none;

  ${({ deviceType }) => {
    if (deviceType === 'tabletHorizontal') {
      return `

      `;
    }
  }}
`;
