import Layout from '@/components/common/Layout/Layout';
import AddressTab from '@/components/common/Menu/AddressTab';
import Menu from '@/components/common/Menu/Menu';
import ChatContainer from '@/features/Chat/ChatContainer';
import theme from '@/theme/colors';
import { DeviceType } from '@/types/types';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Div100vh from 'react-div-100vh';

interface Props {
  deviceType: DeviceType;
}

const TabletPage = (props: Props) => {
  const { deviceType } = props;
  const router = useRouter();

  return (
    <Layout>
      <Flex direction="column" height="100%">
        <MenuWrapper deviceType={deviceType}>
          <Menu title="공장화재" status="progress" timestamp="2023 09 10 23:09" contentAlign="space-between" hasCloseButtonWithoutString={false} onClickBackButton={() => router.back()} />
        </MenuWrapper>
        <AddressTabWrapper deviceType={deviceType}>
          <AddressTab />
        </AddressTabWrapper>
        <Children>
          <ChatContainer deviceType={deviceType} />
        </Children>
      </Flex>
    </Layout>
  );
};

export default TabletPage;

const Children = styled.div`
  flex: 1;
  height: 100%;
  z-index: 2;
  background: ${theme.colors.white};
  overflow: hidden;
`;

const FilterWrapper = styled.div`
  .filter-container {
    width: 100%;
    gap: 8px;
  }

  display: flex;
  width: 100%;
  gap: 4px;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid var(--02, #e9ecef);
  background: #dee2e6;
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

const Divider = styled.div`
  margin: 24px 0;
  border-bottom: 1px solid #e9ecef;
`;
