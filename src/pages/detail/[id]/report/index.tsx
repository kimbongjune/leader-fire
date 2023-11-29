import Layout from '@/components/common/Layout/Layout';
import Menu from '@/components/common/Menu/Menu';
import DetailItem from '@/features/Detail/DetailItem';
import useDeviceType from '@/hooks/useDeviceType';
import theme from '@/theme/colors';
import { DeviceType } from '@/types/types';
import { Flex, Grid, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { RootState } from '../../../../app/store';
import { shallowEqual, useSelector } from 'react-redux';
import { selectDisasterById } from '@/features/slice/test';

interface Props {
  records: {
    title: string;
    url: string;
  }[];
  description: string;
}

//TODO 신고내용 상세보기 탭 녹취는 안보이게
const ReportDetailPage = (props: Props) => {
  // const MyAudioPlayer = dynamic(() => import('@/components/common/Player/MyAudioPlayer'), {
  //   loading: () => <p>loading...</p>,
  // });
  const router = useRouter();
  const deviceType = useDeviceType();

  const id = router.query.id as string;

  const selectedData = useSelector((state: RootState) => selectDisasterById(state, id), shallowEqual);

  return (
    <Layout>
      <Flex direction="column" height="100%" background="#F8F9FA">
        <MenuWrapper deviceType={deviceType}>
          <Menu status={selectedData?.status} title={selectedData?.description} contentAlign="center" hasBackButton={false} onCloseButton={() => router.back()} />
        </MenuWrapper>
        <Children>
          <Stack spacing="24px">
            {/* <DetailItem title="녹취파일">
              {deviceType === 'mobile' && (
                <Stack spacing="4px">
                  {props.records?.map((record, index) => {
                    return <MyAudioPlayer key={index} url={record.url} title={record.title} deviceType={deviceType} />;
                  })}
                </Stack>
              )}
              {deviceType !== 'mobile' && (
                <Grid templateColumns={'repeat(2, 1fr)'} columnGap="32px" rowGap="8px">
                  {props.records?.map((record, index) => {
                    return <MyAudioPlayer key={index} url={record.url} title={record.title} deviceType={deviceType} />;
                  })}
                </Grid>
              )}
            </DetailItem> */}
            <DetailItem title="신고내용">
              <Content dangerouslySetInnerHTML={{ __html: selectedData?.description as string }} />
            </DetailItem>
          </Stack>
        </Children>
      </Flex>
    </Layout>
  );
};

export default ReportDetailPage;

ReportDetailPage.defaultProps = {
  records: [
    { title: '신고접수1', url: 'https://ccrma.stanford.edu/~jos/mp3/harpsi-cs.mp3' },
    { title: '신고접수1', url: 'https://ccrma.stanford.edu/~jos/mp3/harpsi-cs.mp3' },
    { title: '신고접수1', url: 'https://ccrma.stanford.edu/~jos/mp3/harpsi-cs.mp3' },
    { title: '신고접수1', url: 'https://ccrma.stanford.edu/~jos/mp3/harpsi-cs.mp3' },
  ],
  description: `주차된 차량에 불이 붙었다 / 옆 차로 옮겨간다<br/> 연기가 자욱하다 / 사람들 많다 / 진입 어렵다 주차된 차량에 불이 붙었다 / 옆 차로 옮겨간다주차된 차량에 불이 붙었다 / 옆 차로 옮겨간다 /연기가 자욱하다 / 사람들 많다 / 진입 어렵다 주차된 차량에 불이 붙었다 / 옆 차로 옮겨간다`,
};

const Children = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px 16px;
  gap: 24px;
  flex: 1;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
  }

  scrollbar-width: none;
`;

const Content = styled.div`
  color: ${theme.colors.gray7}; // #495057;
  font-family: Pretendard Medium;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;

  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray2}; // #e9ecef);
  background: ${theme.colors.white};
`;

const MenuWrapper = styled.div<{ deviceType: DeviceType }>`
  ${({ deviceType }) => {
    if (deviceType !== 'mobile') {
      return `
          .menu-container {
            padding: 20px 16px;
          }

          .title {
            font-family: Pretendard Bold;
            font-size: 24px;
            line-height: 32px; /* 133.333% */
            letter-spacing: -0.48px;
            justify-content: flex-start;
            padding: 0;
          }

          .close-button {
            width: 32px;
            height: 32px;
          }
      `;
    }
  }}
`;
