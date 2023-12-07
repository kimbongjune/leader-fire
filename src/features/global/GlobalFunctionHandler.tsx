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
    switch (code) {
        case "0040067": return "동물구조";
        case "0790052": return "고층건물(3층이상,아파트)";
        case "0790158": return "기타화재";
        case "1710210": return "대형화재(시장,공장)";
        case "1710211": return "일반화재(주택)";
        case "1710212": return "지하화재";
        case "1710213": return "특수화재(선박,위험물)";
        case "1710665": return "산불";
        case "0040006": return "붕괴사고";
        case "0040007": return "산악사고";
        case "0040008": return "수난사고";
        case "0040009": return "교통사고";
        case "0040010": return "기계사고";
        case "0040011": return "E/V사고";
        case "0040012": return "추락사고";
        case "0040013": return "약물사고";
        case "0040017": return "폭발사고";
        case "0040022": return "항공구조(항공사고)";
        case "0040023": return "항공구조(훈련상황)";
        case "0040024": return "항공구조(수색구조)";
        case "0040031": return "자연재해";
        case "0040044": return "시건개방";
        case "0040045": return "기타안전사고";
        case "3200001": return "벌집제거";
        case "0060039": return "구급예약";
        case "0060078": return "약물중독";
        case "0060079": return "가스중독";
        case "0060081": return "무선페이징";
        case "0060170": return "화상";
        case "0060204": return "부상";
        case "0060205": return "질병";
        case "0060206": return "임산부";
        case "0060211": return "행려병자";
        case "1710595": return "U안심폰대상자";
        case "1710619": return "질병외";
        case "1710620": return "사고부상";
        case "1710621": return "구급기타";
        case "0040032": return "산사태";
        case "0040063": return "지원출동(전기)";
        case "0040064": return "지원출동(가스)";
        case "0040065": return "지원출동(환경)";
        case "0040066": return "민원출동";
        case "0060004": return "훈련출동";
        case "0060005": return "응원출동";
        case "0060012": return "지원출동(재해)";
        case "0060013": return "지원출동(풍수해)";
        case "0060014": return "지원출동(배수)";
        case "0060015": return "지원출동(급수)";
        case "0060016": return "지원출동(청소)";
        case "0060017": return "지원출동(한해)";
        case "0060018": return "지원출동(기타)";
        case "0060019": return "지원출동(경호)";
        case "0060020": return "지원출동(데모시위)";
        case "0060021": return "지원출동(행사지원)";
        case "0060022": return "지원출동(근접배치)";
        case "0060023": return "지원출동(행락철)";
        case "0060024": return "지원출동(추석)";
        case "0060025": return "지원출동(설)";
        case "0060026": return "지원출동(도로세척)";
        case "0060027": return "지원출동(가옥정리)";
        case "0060028": return "순찰출동";
        case "0060029": return "상황출동";
        case "0060037": return "예방경계";
        case "0060044": return "대민지원";
        case "0060200": return "업무운행";
        case "0060212": return "기타출동";
        case "1710676": return "일반화재(차량)";
        case "0060072": return "자살";
        case "0060218": return "실종자";
        case "1712101": return "기타화재(속보설비)";
        case "1712102": return "사회적약자시설(요양원,장애인시설)";
        case "0500026": return "심정지";
        case "0062301": return "구급차소독";
        case "0042301": return "화학사고";
        case "1712301": return "전기차화재";
        case "0060030": return "화재확인출동";
        case "1710677": return "흉통";
        case "1710678": return "아나필락시스";
        case "1710679": return "응급신경증상(뇌졸중)";
        default: return "알 수 없는 코드";
    }
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

  try {

    const response = await axios.get('/api/disaster_info/all',{
      params: {
        disasterStartTime : "2023-12-06 09:00:00",
        disasterEndTime : "2023-12-07 00:08:00",
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
    console.log(response.data)
    if(response.data.responseCode === 200){
      dispatch(setDisasterInformation(transformApiResponse(response.data)));
    }
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

  console.log(isLoggedIn , searchStartDate,searchEndDate, useInfo)
  useEffect(() => {

    window.setGpsStatus = (satelliteCount: number, dbHzAverage: number) => {
      //console.log(`satelliteCount is ${satelliteCount} dbHzAverage is ${dbHzAverage}`)
      dispatch(saveGpsStatusSatelliteCount(satelliteCount));
      dispatch(saveGpsStatusDbHzAverage(dbHzAverage));
    };

    window.updateLocation = (latitude: number, longitude: number) => {
        //console.log(`location latitude=${latitude} longitude=${longitude}`)
        dispatch(saveUserLocationX(latitude));
        dispatch(saveUserLocationY(longitude));
    };

    if (isLoggedIn && searchStartDate && searchEndDate && useInfo.wardId) {
      console.log("useInfo",useInfo)
      // 컴포넌트가 마운트될 때 첫 번째 API 호출을 수행
      fetchDisasterInformation(dispatch, searchStartDate, searchEndDate, useInfo?.wardId, useInfo?.userId);

      // setInterval을 사용하여 주기적으로 API를 호출
      const intervalId = setInterval(() => fetchDisasterInformation(dispatch, searchStartDate, searchEndDate, useInfo?.wardId, useInfo?.userId), 60000);

      // 컴포넌트가 언마운트될 때 인터벌을 정리
      return () => clearInterval(intervalId);
    }
  }, [dispatch, isLoggedIn, searchStartDate, searchEndDate, useInfo.wardId]);

  return null;
};

export default GlobalFunctionHandler;