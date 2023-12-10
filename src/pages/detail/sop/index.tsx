import React,{useEffect} from 'react';
import Layout from '@/components/common/Layout/Layout';
import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType } from '@/types/types';
import SOPContainer from '@/features/SOP/SOPContainer';
import { NextPageContext } from 'next';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import axios from '@/components/common/api/axios';

//TODO SOP 페이지 pdf 로직 작성
const SOPPage = () => {
  const deviceType = useDeviceType();

  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);

  useEffect(() =>{
    const sendClickStream = async () =>{
      if(userInfo){
        const clickStreamResponse = await axios.post("/api/menu_log/enter",{
          menuId : "3160",
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
        <Children>
          <SOPContainer deviceType={deviceType} />
        </Children>
      </Flex>
    </Layout>
  );
};

export default SOPPage;

SOPPage.defaultProps = {};

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  return { props: { query } };
};

const Children = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
`;

const MenuWrapper = styled.div<{ deviceType: DeviceType }>`
  .button {
    color: #909aa4;
  }

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical') {
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
    if (deviceType === 'tabletVertical') {
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
