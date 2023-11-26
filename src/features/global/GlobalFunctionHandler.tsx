import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "../../components/common/api/axios"
import { setDisasterInformation } from '../../features/slice/disasterSlice';
import { AppDispatch, RootState  } from '../../app/store';
import { DispatchItemType } from '../../types/types';

//TODO 글로벌 함수
const fetchDisasterInformation = async (dispatch: AppDispatch) => {
  try {
    //const response = await axios.get('API_ENDPOINT');
    // API 응답을 Redux 상태에 저장
    console.log("동원 api 콜")

    const testData:DispatchItemType[] = [
      {
        jurisWardId:"관할서 센터 ID",
        dsrKndCd:"긴급구조종류",
        dsrClsCd:"긴급구조유형",
        dsrSeq: "XY4800262911",
        status: 'progress',
        reportCount: 5,
        eventName: '기타화재',
        type: 'fires',
        lawAddr: "경남 진주시 진주대로 234-13",
        roadAddr:"도로명주소",
        procCd:"진행상태",
        gisX:"36.4856398",
        gisY:"127.2590765",
        dFstRegSeq:"신고접수번호",
        callTell:"010-4164-9872",
        description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
        isNew: true,
        created: '2023.10.11 09:12',
      },
      {
        jurisWardId:"관할서 센터 ID",
        dsrKndCd:"긴급구조종류",
        dsrClsCd:"긴급구조유형",
        dsrSeq: "2",
        status: 'progress',
        reportCount: 1,
        eventName: '기타화재',
        type: 'fires',
        lawAddr: "경남 진주시 진주대로 234-13",
        roadAddr:"도로명주소",
        procCd:"진행상태",
        gisX:"36.4856398",
        gisY:"127.2590765",
        dFstRegSeq:"신고접수번호",
        callTell:"010-4164-9872",
        description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
        isNew: true,
        created: '2023.10.11 09:00',
      },
      {
        jurisWardId:"관할서 센터 ID",
        dsrKndCd:"긴급구조종류",
        dsrClsCd:"긴급구조유형",
        dsrSeq: "3",
        status: 'progress',
        reportCount: 1,
        eventName: '기타화재',
        type: 'fires',
        lawAddr: "경남 진주시 진주대로 234-13",
        roadAddr:"도로명주소",
        procCd:"진행상태",
        gisX:"36.4856398",
        gisY:"127.2590765",
        dFstRegSeq:"신고접수번호",
        callTell:"010-4164-9872",
        description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
        isNew: true,
        created: '2023.10.11 09:00',
      },
      {
        jurisWardId:"관할서 센터 ID",
        dsrKndCd:"긴급구조종류",
        dsrClsCd:"긴급구조유형",
        dsrSeq: "4",
        status: 'progress',
        reportCount: 3,
        eventName: '기타화재',
        type: 'fires',
        lawAddr: "경남 진주시 진주대로 234-13",
        roadAddr:"도로명주소",
        procCd:"진행상태",
        gisX:"36.4856398",
        gisY:"127.2590765",
        dFstRegSeq:"신고접수번호",
        callTell:"010-4164-9872",
        description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
        isNew: true,
        created: '2023.10.11 09:00',
      },
      {
        jurisWardId:"관할서 센터 ID",
        dsrKndCd:"긴급구조종류",
        dsrClsCd:"긴급구조유형",
        dsrSeq: "5",
        status: 'progress',
        reportCount: 10,
        eventName: '기타구급',
        type: 'firstAid',
        lawAddr: "경남 진주시 진주대로 234-13",
        roadAddr:"도로명주소",
        procCd:"진행상태",
        gisX:"36.4856398",
        gisY:"127.2590765",
        dFstRegSeq:"신고접수번호",
        callTell:"010-4164-9872",
        description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
        isNew: true,
        created: '2023.10.11 09:00',
      },
      {
        jurisWardId:"관할서 센터 ID",
        dsrKndCd:"긴급구조종류",
        dsrClsCd:"긴급구조유형",
        dsrSeq: "6",
        status: 'completion',
        reportCount: 10,
        eventName: '기타구급',
        type: 'firstAid',
        lawAddr: "경남 진주시 진주대로 234-13",
        roadAddr:"도로명주소",
        procCd:"진행상태",
        gisX:"36.4856398",
        gisY:"127.2590765",
        dFstRegSeq:"신고접수번호",
        callTell:"010-4164-9872",
        description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
        isNew: true,
        created: '2023.10.11 09:00',
      },
      {
        jurisWardId:"관할서 센터 ID",
        dsrKndCd:"긴급구조종류",
        dsrClsCd:"긴급구조유형",
        dsrSeq: "7",
        status: 'completion',
        reportCount: 10,
        eventName: '기타',
        type: 'others',
        lawAddr: "경남 진주시 진주대로 234-13",
        roadAddr:"도로명주소",
        procCd:"진행상태",
        gisX:"36.4856398",
        gisY:"127.2590765",
        dFstRegSeq:"신고접수번호",
        callTell:"010-4164-9872",
        description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
        isNew: true,
        created: '2023.10.11 09:00',
      }
    ]
    
    dispatch(setDisasterInformation(testData));
  } catch (error) {
    console.error('API 호출 실패:', error);
  }
};


const GlobalFunctionHandler = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isLoggedIn = useSelector((state: RootState) => state.userReducer.logedIn);

  useEffect(() => {
    if (isLoggedIn) {
      // 컴포넌트가 마운트될 때 첫 번째 API 호출을 수행
      fetchDisasterInformation(dispatch);

      // setInterval을 사용하여 주기적으로 API를 호출
      const intervalId = setInterval(() => fetchDisasterInformation(dispatch), 10000);

      // 컴포넌트가 언마운트될 때 인터벌을 정리
      return () => clearInterval(intervalId);
    }
  }, [dispatch, isLoggedIn]);

  return null;
};

export default GlobalFunctionHandler;