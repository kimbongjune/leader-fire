import React, { useMemo, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import HistoryListItem, { HistoryType } from './HistoryListItem';
import useDeviceType from '@/hooks/useDeviceType';
import HistoryFilter from './HistoryFilter';
import { useRouter } from 'next/router';
import { DeviceType, DisasterHistoryData, HistoryData } from '@/types/types';
import axios from "../../components/common/api/axios"

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

  const [historyData, setHistoryData] = useState<DisasterHistoryData>();

  const fetchHistoryData = () =>{
    //10초마다 과거이력 정보 조회
    try {
      //axios.get("history_data")
      const testData:HistoryData = {
            "totalCount" : 4,
            "response": "success",
            "responseCode": 200,
            "responseMsg": "성공",
            "result": {
            "reportHistoryList": {
              "response": "success",
              "responseCode": 200,
              "responseMsg": "성공",
              "result": {
                "dataList": [
                  {
                    "reg_dtime": "20210818081323",
                    "dsr_knd_cd_nm": "구급",
                    "treat_cls_cd_nm": "정상",
                    "call_content": "동남로49번길 7-23\r\n할아버지 의식호흡없음(추가)의식없음 호흡없음/80대 남/CPR(동보)대동구급 / 의료지도",
                    "aware_yn": "",
                    "breath_yn": "",
                    "cpr_yn": "",
                    "noemer_yn": " "
                  },
                  {
                    "reg_dtime": "20210818081323",
                    "dsr_knd_cd_nm": "구급",
                    "treat_cls_cd_nm": "정상",
                    "call_content": "동남로49번길 7-23\r\n할아버지 의식호흡없음(추가)의식없음 호흡없음/80대 남/CPR(동보)대동구급 / 의료지도",
                    "aware_yn": "",
                    "breath_yn": "",
                    "cpr_yn": "",
                    "noemer_yn": " "
                  }
                ]
              }
            },
            "rescueHistoryList": {
              "response": "success",
                    "responseCode": 200,
                    "responseMsg": "성공",
                    "result": {
                        "dataList": [
                  {
                    "reg_dtime": "20200125134300",
                    "age_cd_nm": "50세이하",
                    "acc_place_cd_nm": "고속도로(기타)",
                    "acc_rsn_cd_nm": "차대차",
                    "acc_rsn_etc_desc": "",
                    "act_desc": "화재출동 귀소중 사고 목격하여 조치한건으로, 3중추돌 교통사고 현장(투싼53버5510, 스포티지34구4233, 아반테 14허8337) 요구조자 전원 구조완료후,주변안전확인한 뒤 통영분대에 환자 및 현장 인계후 인원장비 이상없이 귀소함.",
                    "guide": "",
                    "proc_rslt_cd_nm": "인명구조",
                    "crime_cd_nm": "",
                    "dsr_act_trouble_cd_nm": "장애없음",
                    "dsr_act_trouble_desc": ""
                  }
                ]
              }
            },
            "firstAidHistoryList": {
              "response": "success",
              "responseCode": 200,
              "responseMsg": "성공",
              "result": {
                "dataList": [
                  {
                    "reg_dtime": "20210813105200",
                    "emg_acc_type_cd_nm": "",
                    "emg_acc_type_etc_desc": "",
                    "pat_stat_cd_nm": "잠재응급증상",
                    "pat_name": "김정자",
                    "pat_sex_cd_nm": "여",
                    "pat_age": "78",
                    "crime_cd_nm": "",
                    "doc_guide": "",
                    "emger_opinion": "상습신고자 민원출동으로 민원 처리후 귀소."
                  }
                ]
              }
            },
            "dispatchHistoryList": {
              "response": "success",
              "responseCode": 200,
              "responseMsg": "성공",
              "result": {
                "dataList": [
                  {
                    "reg_dtime": "20190207081456",
                    "dsr_seq": "TP4806897877",
                    "dsr_knd_cd_nm": "구급",
                    "dsr_cls_cd_nm": "질병외",
                    "dsr_bunji_adress": "경상남도 합천군 합천읍 합천리 1256 (까치빌라302호)",
                    "dsr_doro_adress": "경상남도 합천군 합천읍 옥산로 16 (까치빌라)",
                    "call_content": "까치빌라 302호// 할아버지 거동불가",
                    "copertn_cntrmsr_yn": "",
                    "gis_x_5181": "304858.6514",
                    "gis_y_5181": "230808.9272",
                    "gis_x_4326": "128.1566902411275",
                    "gis_y_4326": "35.56873106496122",
                    "dist": "2.70204529"
                  }
                ]
              }
            }
          }
        }
        const reportHistoryList = testData.result.reportHistoryList.result.dataList.map(item => ({
          ...item,
          type: 'report' as 'report'
        }));

        const rescueHistoryList = testData.result.rescueHistoryList.result.dataList.map(item => ({
          ...item,
          type: 'rescue' as 'rescue'
        }));
        const firstAidHistoryList = testData.result.firstAidHistoryList.result.dataList.map(item => ({
          ...item,
          type: 'patient' as 'patient'
        }));
        const dispatchHistoryList = testData.result.dispatchHistoryList.result.dataList.map(item => ({
          ...item,
          type: 'mobilize' as 'mobilize'
        }));
        const combinedData = [
          ...reportHistoryList,
          ...rescueHistoryList,
          ...firstAidHistoryList,
          ...dispatchHistoryList
        ];
        const data = {
          reportNumber : testData.totalCount,
          dispatchLists : combinedData
        }
        setHistoryData(data)
        console.log(data)
      }catch(e){

      }
    }

  useEffect(() => {
    // 컴포넌트가 마운트될 때 첫 번째 API 호출을 수행
    fetchHistoryData();

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
