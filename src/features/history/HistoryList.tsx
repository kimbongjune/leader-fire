import React, { useMemo, useEffect, useState, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import HistoryListItem, { HistoryType } from './HistoryListItem';
import useDeviceType from '@/hooks/useDeviceType';
import HistoryFilter from './HistoryFilter';
import { useRouter } from 'next/router';
import { DeviceType, DisasterHistoryData, HistoryData } from '@/types/types';
import axios from "../../components/common/api/axios"
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { selectDisasterById } from '../slice/test';

export interface CountByType {
  report: number;
  rescue: number;
  patient: number;
  mobilize: number;
}

interface Props {
  dispatchLists: HistoryType[];
  reportNumber: number;
}


//TODO 과거이력 아이템 클릭시 표출 페이지, 신고자 바뀌면 다시?
const HistoryList = (props: Props) => {
  const deviceType = useDeviceType();
  const router = useRouter();
  const type = router.query.type;

  const id = router.query.id as string;
  const selectedDisaster = useSelector((state: RootState) => selectDisasterById(state, id), shallowEqual);

  const [historyData, setHistoryData] = useState<DisasterHistoryData>();
  const apiIntervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 첫 번째 API 호출을 수행
      const fetchData = async () =>{
          const historyData = await axios.get<HistoryData>("/api/past_history/all",{
            params : {
              callTel: selectedDisaster?.callTell, //selectedDisaster?.callTell
              dsrClsCd: selectedDisaster?.dsrClsCd,  //selectedDisaster?.dsrClsCd
              dsrKndCd: selectedDisaster?.dsrKndCd, //selectedDisaster?.dsrKndCd
              dsrSeq: id,//id
              gisX: selectedDisaster?.gisX,  //selectedDisaster?.gisX
              gisY: selectedDisaster?.gisY, //selectedDisaster?.gisY
              radius: "null"
            }
        });

        if(historyData.data.responseCode === 200){
          const reportHistoryList = historyData.data.result.reportHistoryList?.result?.dataList?.map(item => ({
            ...item,
            type: 'report' as 'report'
          }));
  
          const rescueHistoryList = historyData.data.result.rescueHistoryList?.result?.dataList?.map(item => ({
            ...item,
            type: 'rescue' as 'rescue'
          }));
          const firstAidHistoryList = historyData.data.result.firstAidHistoryList?.result?.dataList?.map(item => ({
            ...item,
            type: 'patient' as 'patient'
          }));
          const dispatchHistoryList = historyData.data.result.dispatchHistoryList?.result?.dataList?.map(item => ({
            ...item,
            type: 'mobilize' as 'mobilize'
          }));
          console.log(firstAidHistoryList)
          const combinedData = [
            ...reportHistoryList || [],
            ...rescueHistoryList || [],
            ...firstAidHistoryList || [],
            ...dispatchHistoryList || []
          ];
          const data = {
            reportNumber : historyData.data.totalCount,
            dispatchLists : combinedData
          }
          setHistoryData(data)
        }
      }
      fetchData()
      apiIntervalRef.current =  setInterval(() => fetchData(), 60000);
    return () => {
      if (apiIntervalRef.current) {
        clearInterval(apiIntervalRef.current);
      }
    };
  }, []);

  // 이벤트 타입별 카운팅
  const countByType = historyData?.dispatchLists.reduce(
    (res, dispatch) => {
      res[dispatch.type] = (res[dispatch.type] || 0) + 1;
      return res;
    },
    { report: 0, rescue: 0, patient: 0, mobilize: 0 },
  )|| { report: 0, rescue: 0, patient: 0, mobilize: 0 };;

  // 리스트 필터링
  const filteredList = useMemo(() => {
    if (type === null) return historyData?.dispatchLists;
    return historyData?.dispatchLists.filter(dispatch => dispatch.type === type);
  }, [type, historyData?.dispatchLists]);

  const historyTitles: { [key: string]: string } = {
    report: "신고이력",
    rescue: "구조이력",
    patient: "환자이력",
    mobilize: "출동이력"
  };
  
  const historyTitle = historyTitles[type as string] || '';

  return (
    <Container deviceType={deviceType}>
      <HistoryFilter deviceType={deviceType} countByType={countByType} />
      {deviceType === 'mobile' && type && (
        <HistoryCount>
          <HistoryCountTitle>{historyTitle}</HistoryCountTitle>
        </HistoryCount>
      )}
      {type && (
        <HistoryListItemWrapper deviceType={deviceType}>
          {filteredList?.map((item, index) => {
            return <HistoryListItem key={index} {...item} />;
          })}
        </HistoryListItemWrapper>
      )}
    </Container>
  );
};

HistoryList.defaultProps = {
  reportNumber: 10,
  dispatchLists: [
    {
      eventName: '구급',
      type: 'report',
      description: '할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급 할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급 할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급 할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급',
      created: '3개월 전',
      count: 100,
    },
    {
      eventName: '구급',
      type: 'report',
      description: '할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급 할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급 할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급 할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급',
      created: '3개월 전',
      count: 100,
    },
    {
      eventName: '고속도로(기타)',
      status: '차량내 가스중독 차량내 가스중독',
      type: 'rescue',
      description: '신고 내용 표시합니다. <br/> 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
      created: '3개월 전',
    },
    {
      eventName: '잠재응급상황',
      status: '잠재응급상황',
      age: 84,
      type: 'patient',
      description:
        '화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장 화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장,화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장 화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장 화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장,화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장 화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장 화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장,화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장 화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장',
      created: '3개월 전',
    },
    {
      eventName: '질병외',
      type: 'mobilize',
      description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
      created: '3개월 전',
    },
  ],
};
export default HistoryList;

const Container = styled.div<{ deviceType: string | null }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  padding: 16px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray2};

  ${props =>
    props.deviceType === 'tabletVertical' &&
    css`
      gap: 0 24px;
    `}

  ${props =>
    props.deviceType === 'tabletHorizontal' &&
    css`
      flex-direction: row;
      gap: 0 24px;
    `}

  .historyFilter {
    ${props =>
      props.deviceType === 'tabletHorizontal' &&
      css`
        display: flex;
        flex-direction: column;
        width: fit-content;
      `}
  }
`;

const HistoryCount = styled.div`
  display: flex;
  gap: 2px;
  margin: 16px 0;
`;

const HistoryCountTitle = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.28px;
`;

const HistoryCountNumber = styled.div`
  color: ${theme.colors.gray3};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
`;

const HistoryListItemWrapper = styled.div<{ deviceType: DeviceType }>`
  width: 100%;
  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      margin-top: 24px;
    `}
`;
