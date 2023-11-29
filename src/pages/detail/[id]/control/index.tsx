import Layout from '@/components/common/Layout/Layout';
import Menu from '@/components/common/Menu/Menu';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import theme from '@/theme/colors';
import DetailItem from '@/features/Detail/DetailItem';
import HistoryTable from '@/features/Detail/HistoryTable';
import useDeviceType from '@/hooks/useDeviceType';
import { ControlContentData, DeviceType, DisasterDetailInfo } from '@/types/types';
import SwiperView from '@/components/common/SwiperView/SwiperView';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { selectDisasterById } from '@/features/slice/test';
import { useEffect, useRef, useState } from 'react';
import axios from '@/components/common/api/axios';

interface Props {
  histories: {
    date: string;
    timeSeries: {
      time: string;
      description: string;
    }[];
  }[];
}

interface TimeSeriesItem {
  time: string;
  description: string;
}

interface HistoryItem {
  date: string;
  timeSeries: TimeSeriesItem[];
}

const convertToHistoryFormat = (data: DisasterDetailInfo[]): Props => {
  const groupedByDate: Record<string, { time: string; description: string; }[]> = {};

  data.forEach(item => {
    const dateKey = item.ctlProcDtime.substring(0, 8); // YYYYMMDD 형식
    const formattedDate = `${dateKey.substring(0, 4)}-${dateKey.substring(4, 6)}-${dateKey.substring(6, 8)}T00:00:00`;
    const formattedTime = `${formattedDate.substring(0, 10)}T${item.ctlProcDtime.substring(8, 10)}:${item.ctlProcDtime.substring(10, 12)}:${item.ctlProcDtime.substring(12, 14)}`;

    if (!groupedByDate[formattedDate]) {
      groupedByDate[formattedDate] = [];
    }

    groupedByDate[formattedDate].push({
      time: formattedTime,
      description: item.ctlDesc
    });
  });

  const histories = Object.keys(groupedByDate).map(date => ({
    date,
    timeSeries: groupedByDate[date]
  }));

  return { histories };
};

//TODO 관제내용 상세보기 탭
const ControlDetail = (props: Props) => {
  const router = useRouter();
  const deviceType = useDeviceType();

  const id = router.query.id as string;

  const apiIntervalRef = useRef<NodeJS.Timer | null>(null);

  const [controlContent, setControlContent] = useState<Props>();

  useEffect(() => {
    if (id) {
      const fetchData = async () =>{
        const data = await axios.get<ControlContentData>('/api/disaster_info/control/seq',{
          params: {
            dsrSeq : id
          }
        });
        const controlContentList = data.data.result[0].disasterDetailInfo
        const histories = convertToHistoryFormat(controlContentList);
        setControlContent(histories);
      }
      fetchData()
      apiIntervalRef.current =  setInterval(() => fetchData(), 60000);
    }
    return () => {
      if (apiIntervalRef.current) {
        clearInterval(apiIntervalRef.current);
      }
    };
  }, [id]);

  return (
    <Layout>
      <Flex direction="column" height="100%">
        <MenuWrapper deviceType={deviceType}>
          <Menu status={"progress"} title="관제 내용" contentAlign="center" hasBackButton={false} onCloseButton={() => router.back()} />
        </MenuWrapper>
        <Children deviceType={deviceType}>
          {controlContent?.histories?.map((history, index) => {
            return (
              <DetailItem key={index} title={dayjs(history.date).format('YYYY년 MM월 DD일')}>
                <HistoryTable rows={history.timeSeries} />
              </DetailItem>
            );
          })}
        </Children>
      </Flex>
    </Layout>
  );
};

export default ControlDetail;

ControlDetail.defaultProps = {
  histories: [
    {
      date: '2023-10-15T00:00:00',
      timeSeries: [
        {
          time: '2023-10-15T21:00:00',
          description: '추가 편성함',
        },
        {
          time: '2023-10-15T21:01:00',
          description: '진주평거 현장도착',
        },
        {
          time: '2023-10-15T21:05:00',
          description: '대응단계 상향 필요',
        },
        {
          time: '2023-10-15T21:10:00',
          description: '부산본부에 응원요청',
        },
        {
          time: '2023-10-15T21:10:00',
          description: `글자가 길어질 경우 셀 길이가 늘어납니다 글자가 길어질 경우 셀 길이가 늘어납니다 글자가 길어질 경우 셀 길이가 늘어납니다`,
        },
        {
          time: '2023-10-15T21:10:00',
          description: `글자가 길어질 경우 셀 길이가 늘어납니다 글자가 길어질 경우 셀 길이가 늘어납니다 글자가 길어질 경우 셀 길이가 늘어납니다`,
        },
      ],
    },
    {
      date: '2023-10-16T00:00:00',
      timeSeries: [
        {
          time: '2023-10-16T10:00:00',
          description: '일자 변경됨',
        },
        {
          time: '2023-10-16T12:01:00',
          description: '일자 변경됨',
        },
      ],
    },
  ],
};

const Children = styled.div<{ deviceType: DeviceType }>`
  display: flex;
  flex-direction: column;
  padding: 24px 16px 16px;
  gap: 20px;
  flex: 1;
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
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        padding: 24px 20px;
      }
      `;
    }
  }}
`;

const MenuWrapper = styled.div<{ deviceType: DeviceType }>`
  ${({ deviceType }) => {
    if (deviceType !== 'mobile') {
      return `
          .menu-container {
            padding: 20px 16px;
          }

          .close-button {
            width: 32px;
            height: 32px;
          }

          .title {
            font-family: Pretendard Bold;
            font-size: 24px;
            line-height: 32px; /* 133.333% */
            letter-spacing: -0.48px;
            justify-content: flex-start;
            padding: 0;
          }
      `;
    }
  }}
`;

const DetailItemWrapper = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }

  div:nth-of-type(2) {
    height: 100%;
  }
`;

const DetailItemWrapperForTitle = styled.div`
  // height: 100%;
  .title {
    color: #495057;
  }
`;
