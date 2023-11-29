import styled from '@emotion/styled';
import theme from '@/theme/colors';
import Layout from '@/components/common/Layout/Layout';
import HistoryList from '@/features/history/HistoryList';
import Menu from '@/components/common/Menu/Menu';
import AddressTab from '@/components/common/Menu/AddressTab';
import useDeviceType from '@/hooks/useDeviceType';
import { useRouter } from 'next/router';
import { DeviceType } from '@/types/types';
import { selectDisasterById } from '../../../features/slice/test';
import { useSelector, shallowEqual  } from 'react-redux';
import React from 'react';
import { RootState } from '@/app/store';


//TODO 과거이력 페이지
const HistoryComponent = () => {
  const deviceType = useDeviceType();
  const router = useRouter();
  const id = router.query.id as string;

  const selectedDisaster = useSelector((state: RootState) => selectDisasterById(state, id), shallowEqual);

  //const selectedDisaster = useSelector((state: RootState) => state.disaster.subDisasterInformation);
  
  if (!selectedDisaster) return null
  if (!deviceType) return null;

  console.log("history call")

  return (
    <Layout>
      <Container deviceType={deviceType}>
        <div>
          <MenuWrapper deviceType={deviceType}>
            <Menu status={selectedDisaster.status} title={selectedDisaster?.eventName} timestamp={selectedDisaster?.created!!} contentAlign="space-between" hasCloseButtonWithoutString={false} onClickBackButton={() => router.push(`/detail/${id}`)} />
          </MenuWrapper>
          <AddressTabWrapper deviceType={deviceType}>
            <AddressTab address={selectedDisaster?.lawAddr}/>
          </AddressTabWrapper>
        </div>
        <Wrapper>
          <HistoryList />
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default HistoryComponent;

const Container = styled.div<{ deviceType: string | null }>`
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
