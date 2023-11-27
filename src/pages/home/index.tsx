import React, {useEffect} from 'react';
import styled from '@emotion/styled';
import Layout from '@/components/common/Layout/Layout';
import { Flex } from '@chakra-ui/react';
import Home from '@/features/Home/Home';
import HomeMenu from '@/features/Home/HomeMenu';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType } from '@/types/types';
import { NextPageContext } from 'next';
import { clearPollingInterval } from '@/features/global/GlobalApiCallHandler';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

//TODO 메인페이지
const HomePage = () => {
  const deviceType = useDeviceType();
  
  useEffect(() => {
    clearPollingInterval();
  }, []);

  
  const testData = useSelector((state: RootState) => state.disaster.disasterInformation);
  console.log(testData)

  if (!deviceType) return null;

  return (
    <Layout>
      <Flex direction="column" height="100%">
        <HomeMenu deviceType={deviceType} testData={testData}/>
        <Children deviceType={deviceType}>
          <Home deviceType={deviceType} testDate={testData} />
        </Children>
      </Flex>
    </Layout>
  );
};

export default HomePage;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  return { props: { query } };
};

const Children = styled.div<{ deviceType?: DeviceType }>`
  padding: 32px 16px 16px;
  flex: 1;
  height: 100%;
  z-index: 2;
  overflow-y: auto;
  background: #f8f9fa;
  ::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
  }

  scrollbar-width: none;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical') {
      return `
      padding: 68px 16px 16px;
  `;
    }

    if (deviceType === 'tabletHorizontal') {
      return `
      padding: 48px 16px 16px;
  `;
    }
  }}
`;
