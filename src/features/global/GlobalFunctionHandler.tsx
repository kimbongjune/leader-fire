import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "../../components/common/api/axios"
import { setDisasterInformation } from '../../features/slice/disasterSlice';
import { AppDispatch, RootState  } from '../../app/store';
import { DisasterInformation, DispatchItemType } from '../../types/types';
import { saveGpsStatusDbHzAverage, saveGpsStatusSatelliteCount, saveUserLocationX, saveUserLocationY } from '../slice/UserinfoSlice';

interface TypeMapping {
  [key: string]: 'others' | 'fires' | 'rescue' | 'firstAid';
}

const mapDsrKndCd = (code: string): string => {
  const mapping: { [key: string]: string } = {
      '0040001': '화재',
      '0040002': '구조',
      '0040003': '구급',
      '13306': '기타',
      // 추가적인 매핑이 필요한 경우 여기에 추가
  };
  return mapping[code] || '알 수 없음';
};

const mapDsrClsCd = (code: string): string => {
  const mapping: { [key: string]: string } = {
      '0040007': '산악사고',
      '0040008': '수난사고',
      '0040009': '교통사고',
      '0040010': '기계사고',
      '0040011': 'E/V사고',
      '0040012': '추락사고',
      '0040044': '시건개방',
      '0040045': '기타안전사고',
      '0040066': '민원출동',
      '0040067': '동물구조',
      '0060004': '훈련출동',
      '0060005': '응원출동',
      '0060013': '지원출동(풍수해)',
      '0060014': '지원출동(배수)',
      '0060015': '지원출동(급수)',
      '0060021': '지원출동(행사지원)',
      '0060022': '지원출동(근접배치)',
      '0060028': '순찰출동',
      '0060029': '상황출동',
      '0060030': '화재확인출동',
      '0060037': '예방경계',
      '0060044': '대민지원',
      '0060072': '자살',
      '0060078': '약물중독',
      '0060170': '화상',
      '0060200': '업무운행',
      '0060204': '부상',
      '0060205': '질병',
      '0060206': '임산부',
      '0060211': '행려병자',
      '0060212': '기타출동',
      '0060218': '실종자',
      '0500026': '심정지',
      '0790052': '고층건물(3층이상,아파트)',
      '0790158': '기타화재',
      '1710210': '대형화재(시장,공장)',
      '1710211': '일반화재(주택)',
      '1710595': 'U안심폰대상자',
      '1710619': '질병외',
      '1710620': '사고부상',
      '1710621': '구급기타',
      '1710665': '산불',
      '1710676': '일반화재(차량)',
      '1710677': '흉통',
      '1710678': '아나필락시스',
      '1710679': '응급신경증상(뇌졸중)',
      '1712101': '기타화재(속보설비)',
      '3200001': '벌집제거',
      // 추가적인 매핑이 필요한 경우 여기에 추가
  };
  return mapping[code] || '알 수 없음';
};

const mapProcCd = (code: string): string => {
  const mapping: { [key: string]: string } = {
      '0140002': '출동지령',
      '0140004': '추가출동지령',
      '0140021': '구조완료',
      '0140040': '출동보고',
      '0140041': '현장도착보고',
      '0140042': '병원도착보고',
      '0140043': '귀소보고',
      '0140044': '귀소완료보고',
      '0140055': '현장출발',
      '0140060': '상황종료',
      '0140061': '동일긴급구조처리',
      // 추가적인 매핑이 필요한 경우 여기에 추가
  };
  return mapping[code] || '알 수 없음';
};


//TODO 글로벌 함수
const fetchDisasterInformation = async (dispatch: AppDispatch, disasterStartTime:string, disasterEndTime:string, jurisWardId:string, userId:string) => {

  console.log(disasterStartTime, disasterEndTime)
  try {

    const response = await axios.get('/api/disaster_info/all',{
      params: {
        disasterStartTime : disasterStartTime,
        disasterEndTime : disasterEndTime,
        jurisWardId : jurisWardId,
        userId : userId
      }
    });

    console.log(response)
    // API 응답을 Redux 상태에 저장

    const data:DisasterInformation = {
      "response": "success",
      "responseCode": 200,
      "responseMsg": "성공",
      "totalCount": 0,
      "result": {
          "CmDsrCallDto": {
              "response": "success",
              "responseCode": 200,
              "responseMsg": "성공",
              "result": [
                  {
                      "dsrSeq": "XY4809448980",
                      "dsrKndCd": "0040001",
                      "dsrClsCd": "0790158",
                      "wardId": "4804000",
                      "seoWardName": "진주소방서",
                      "jurisWardId": "4804108",
                      "semiWardName": "문산119안전센터",
                      "procCd": "0140002",
                      "lawAddr": "경상남도 진주시 금산면 가방리 62 ",
                      "roadAddr": "경상남도 진주시 금산면 금산순환로359번길 44-8 ",
                      "statEndDtime": " ",
                      "gisX": 0.0,
                      "gisY": 0.0,
                      "dFstRegSeq": "XY4809448980",
                      "regDtime": "20231115145302",
                      "callContent": "화재출동 테스트",
                      "callTel": " ",
                      "sameCall": 1,
                      "chkYn": 'Y',
                      "viewYn": null
                  }
              ]
          }
      }
  }

  const transformApiResponse = (data: DisasterInformation): DispatchItemType[] => {
    return data.result.CmDsrCallDto.result.map(callData => {
        const typeMapping: TypeMapping = {
            '화재': 'fires',
            '구조': 'rescue',
            '구급': 'firstAid',
            '기타': 'others'
        };

        const type = typeMapping[mapDsrKndCd(callData.dsrKndCd)] || 'others';
        const status = callData.statEndDtime?.trim() == null || "" ? 'progress' as 'progress' : 'completion' as 'completion';

        return {
            jurisWardId : callData.jurisWardId,
            dsrKndCd: callData.dsrKndCd,
            dsrClsCd: callData.dsrClsCd,
            dsrSeq : callData.dsrSeq,
            status : status,
            reportCount : 6,
            eventName : mapDsrClsCd(callData.dsrClsCd),
            type : type,
            lawAddr : callData.lawAddr,
            roadAddr: callData.roadAddr,
            procCd: mapProcCd(callData.procCd),
            gisX: callData.gisX,
            gisY: callData.gisY,
            dFstRegSeq : callData.dFstRegSeq,
            callTell : callData.callTel,
            description : callData.callContent,
            isNew : callData.chkYn?.trim() == 'Y' ? false : true,
            hasRead : callData.viewYn?.trim() == 'Y' ? false : true,
            created : callData.regDtime,
        };
    });
};
    console.log("동원 api 콜")
    console.log(data)
    
    dispatch(setDisasterInformation(transformApiResponse(data)));
  } catch (error) {
    console.error('API 호출 실패:', error);
  }
};


const GlobalFunctionHandler = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isLoggedIn = useSelector((state: RootState) => state.userReducer.logedIn);
  const useInfo = useSelector((state: RootState) => state.userReducer.userInfo);
  const searchStartDate = useSelector((state: RootState) => state.disaster.searchStartDate);
  const searchEndDate = useSelector((state: RootState) => state.disaster.searchEndDate);

  console.log(isLoggedIn , searchStartDate,searchEndDate)
  useEffect(() => {

    window.setGpsStatus = (satelliteCount: number, dbHzAverage: number) => {
      console.log(`satelliteCount is ${satelliteCount} dbHzAverage is ${dbHzAverage}`)
      dispatch(saveGpsStatusSatelliteCount(satelliteCount));
      dispatch(saveGpsStatusDbHzAverage(dbHzAverage));
    };

    window.updateLocation = (latitude: number, longitude: number) => {
        console.log(`location latitude=${latitude} longitude=${longitude}`)
        dispatch(saveUserLocationX(latitude));
        dispatch(saveUserLocationY(longitude));
    };

    if (isLoggedIn && searchStartDate && searchEndDate) {
      // 컴포넌트가 마운트될 때 첫 번째 API 호출을 수행
      fetchDisasterInformation(dispatch, searchStartDate, searchEndDate, useInfo.wardId, useInfo.userId);

      // setInterval을 사용하여 주기적으로 API를 호출
      const intervalId = setInterval(() => fetchDisasterInformation(dispatch, searchStartDate, searchEndDate, useInfo.wardId, useInfo.userId), 60000);

      // 컴포넌트가 언마운트될 때 인터벌을 정리
      return () => clearInterval(intervalId);
    }
  }, [dispatch, isLoggedIn, searchStartDate, searchEndDate]);

  return null;
};

export default GlobalFunctionHandler;