import React,{useEffect} from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import Layout from '@/components/common/Layout/Layout';
import NeighborhoodList from '@/features/neighborhood/NeighborhoodList';
import AddressTab from '@/components/common/Menu/AddressTab';
import Menu from '@/components/common/Menu/Menu';
import { useRouter } from 'next/router';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType } from '@/types/types';
import { RootState } from '../../../app/store';
import { shallowEqual, useSelector } from 'react-redux';
import { selectDisasterById } from '@/features/slice/test';
import axios from '@/components/common/api/axios';

interface Props {
  title: string;
  timestamp: string;
  address: string;
}

//TODO 연관인근 페이지
const Neighborhood = (props: Props) => {
  const router = useRouter();
  const id = router.query.id as string;
  const deviceType = useDeviceType();

  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);

  const selectedDisaster = useSelector((state: RootState) => selectDisasterById(state, id), shallowEqual);

  useEffect(() =>{
    const sendClickStream = async () =>{
      if(userInfo){
        const clickStreamResponse = await axios.post("/api/menu_log/enter",{
          menuId : "3130",
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
      <Container>
        <div>
          <MenuWrapper deviceType={deviceType}>
            <Menu title={selectedDisaster?.eventName} status={selectedDisaster?.status} timestamp={selectedDisaster?.created!!} contentAlign="space-between" hasCloseButtonWithoutString={false} onClickBackButton={() => router.push(`/detail/${id}`)} />
          </MenuWrapper>
          <AddressTabWrapper deviceType={deviceType}>
            <AddressTab address={selectedDisaster?.lawAddr} />
          </AddressTabWrapper>
        </div>
        <Wrapper>
          <NeighborhoodList />
        </Wrapper>
      </Container>
    </Layout>
  );
};

Neighborhood.defaultProps = {
  title: '공장화재',
  timestamp: '2023.09.10 23:09',
  address: '경남 진주시 진주대로 345-13, 203호',
};
export default Neighborhood;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  padding: 24px 16px;
  background-color: ${theme.colors.gray1};

  ::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
  }

  scrollbar-width: none;
`;

const MenuWrapper = styled.div<{ deviceType: DeviceType }>`
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
