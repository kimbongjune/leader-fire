import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import { VStack } from '@chakra-ui/react';
import VulnerablePerson from './components/VulnerablePerson';
import useDeviceType from '@/hooks/useDeviceType';
import Collaboration from './components/Collaboration';
import Residents from './components/Residents/Residents';
import Facility from './components/Facility';
import NeighborhoodFilter from './NeighborhoodFilter';
import { useRouter } from 'next/router';
import { DispatchLists, NeightBorHoodData, ModDispatchLists } from '@/types/types';

export interface CountByType {
  collaboration: number;
  residents: number;
  vulnerablePerson: number;
  facilities: number;
}

interface Props {
  dispatchLists: NeighborhoodType[];
}

export type NeighborhoodType = {
  eventName: string;
  totalCount: number;
  status?: string;
  age?: number;
  type: 'collaboration' | 'residents' | 'vulnerablePerson' | 'facilities';
  description: string;
  created: string;
};

//TODO 연관인근 아이템 리스트
const NeighborhoodList = (props: Props) => {
  const deviceType = useDeviceType();
  const { query } = useRouter();
  const type = query.type;

  const [neightborHoodData, setNeightborHoodData] = useState<ModDispatchLists>();
  const fetchNeighborhoodData = () =>{

    try {
      //axios.get("history_data")
      const testData:NeightBorHoodData = {
            "response": "success",
            "responseCode": 200,
            "responseMsg": "성공",
            "totalCount": 212,
            "result": {
                "nearbyFacilityPersonnelList": { // 인근주민-인근시설물관계자 완
                    "response": "success",
                    "responseCode": 200,
                    "responseMsg": "성공",
                    "result": {
                        "dataList": [
                            {
                                "obj_nm": "까치빌라",
                                "partcpnt_cd_nm": "관리자",
                                "partcpnt": "유수정(전반장)",
                                "tlphon_no": "01085541919",
                                "bunji_adress": "경상남도 합천군 합천읍 합천리  1256",
                                "doro_adress": "경상남도 합천군 합천읍 옥산로 0 16",
                                "gis_x_5181": "304858.0170545473",
                                "gis_y_5181": "230811.08909041138",
                                "gis_x_4326": "128.156683525",
                                "gis_y_4326": "35.56875061320001",
                                "dist": "1.74461852",
                                "keyword_yn": "N"
                            }
                        ],
                        "ret_cd": "0",
                        "ret_msg": "success",
                        "rec_cnt": 88
                    }
                },
                "nearbyOfficialsList": { // 인근주민-소방등록정보 완
                    "response": "success",
                    "responseCode": 200,
                    "responseMsg": "성공",
                    "result": {
                "dataList": [
                  {
                    "partcpnt_cd_nm": "소유자",
                    "partcpnt": "최미선",
                    "obj_nm": "한림면 퇴래리 46-2 제2종근린생활시설 (최미선)",
                    "bunji_adress": "번지주소",
                    "doro_adress": "도로명주소",
                    "tlphon_no": "010-5697-9889"
                  }
                ],
                        "ret_cd": "0",
                        "ret_msg": "success",
                        "rec_cnt": 88
              }
                },
                "collaborativeResponseList": { // 협업대응-appUserType(1:의소전담대, 2:의소일반대, 3:생명지킴이) 완
                    "response": "success",
                    "responseCode": 200,
                    "responseMsg": "성공",
                    "result": [
                        {
                            "appUserId": "1didaltns1700",
                            "appUserType": "3",
                            "nmPerson": "박성현",
                            "tel": "010-7168-8438",
                            "volunPosition": null,
                            "userLocX": 350554.03,
                            "userLocY": 153987.22
                        },
                        {
                          "appUserId": "1didaltns1700",
                          "appUserType": "2",
                          "nmPerson": "박성철",
                          "tel": "010-1234-5678",
                          "volunPosition": null,
                          "userLocX": 350554.03,
                          "userLocY": 153987.22
                      },
                      {
                        "appUserId": "1didaltns1700",
                        "appUserType": "1",
                        "nmPerson": "김성철",
                        "tel": "010-5678-5678",
                        "volunPosition": null,
                        "userLocX": 350554.03,
                        "userLocY": 153987.22
                    },
                    {
                      "appUserId": "1didaltns1700",
                      "appUserType": "1",
                      "nmPerson": "김성철2",
                      "tel": "010-5678-5678",
                      "volunPosition": null,
                      "userLocX": 350554.03,
                      "userLocY": 153987.22
                  }
                    ]
                },
                "fightingPropertyList": {  // 인근시설-대상물 완
                    "response": "success",
                    "responseCode": 200,
                    "responseMsg": "성공",
                    "result": {
                        "dataList": [
                            {
                                "bild_sn": "48000000022172",
                                "obj_nm": "까치빌라",
                                "main_prpos_cd_nm": "복합건축물",
                                "bunji_adress": "경상남도 합천군 합천읍 합천리 1256-0 번지",
                                "doro_adress": "경상남도 합천군 합천읍 옥산로 16 까치빌라",
                                "dsprvn_tlphon": "",
                                "dytm_tlphon": "010-8528-7536",
                                "night_tlphon": "010-9353-2087",
                                "gis_x_5181": "304858.0170545473",
                                "gis_y_5181": "230811.08909041138",
                                "gis_x_4326": "128.156683525",
                                "gis_y_4326": "35.56875061320001",
                                "dist": "1.74461852",
                                "keyword_yn": "N"
                            }
                        ],
                        "ret_cd": "0",
                        "ret_msg": "success",
                        "rec_cnt": 53
                    }
                },
                "hazardousSubstancList": { // 인근시설-위험물 완
                    "response": "success",
                    "responseCode": 200,
                    "responseMsg": "성공",
                    "result": {
                        "dataList": [
                            {
                                "bild_sn": "48000000022212",
                                "obj_nm": "합천군종합사회복지관",
                                "itlpc_buld_nm": "종합사회복지관",
                                "itlpc_bunji_adress": "경상남도 합천군 합천읍 합천리 524-1 번지 9필지",
                                "itlpc_doro_adress": "경상남도 합천군 합천읍 동서로 39 종합사회복지관",
                                "mnfctretc_sn": "MF482005000626",
                                "mnfctretc_se_no": "23",
                                "mnfctretc_detail_se_cd_nm": "옥내탱크저장소",
                                "bulddong_sn": "1",
                                "floor_sn": "11",
                                "dsprvn_tlphon": "방진봉 010-3876-0040",
                                "dytm_tlphon": "055-930-4924",
                                "night_tlphon": "055-930-4502(4924)",
                                "gis_x_5181": 304865.42120541824,
                                "gis_y_5181": 230719.9018908944,
                                "gis_x_4326": 128.1567533729,
                                "gis_y_4326": 35.5679281286,
                                "dist": 91.15718067,
                                "keyword_yn": "N"
                            },
                            {
                              "bild_sn": "48000000022213",
                              "obj_nm": "합천군종합사회복지관",
                              "itlpc_buld_nm": "종합사회복지관",
                              "itlpc_bunji_adress": "경상남도 합천군 합천읍 합천리 524-1 번지 9필지",
                              "itlpc_doro_adress": "경상남도 합천군 합천읍 동서로 39 종합사회복지관",
                              "mnfctretc_sn": "MF482005000626",
                              "mnfctretc_se_no": "23",
                              "mnfctretc_detail_se_cd_nm": "옥내탱크저장소",
                              "bulddong_sn": "1",
                              "floor_sn": "11",
                              "dsprvn_tlphon": "방진봉 010-3876-0040",
                              "dytm_tlphon": "055-930-4924",
                              "night_tlphon": "055-930-4502(4924)",
                              "gis_x_5181": 304865.42120541824,
                              "gis_y_5181": 230719.9018908944,
                              "gis_x_4326": 128.1567533729,
                              "gis_y_4326": 35.5679281286,
                              "dist": 91.15718067,
                              "keyword_yn": "N"
                          }
                        ],
                        "ret_cd": "0",
                        "ret_msg": "success",
                        "rec_cnt": 8
                    }
                },
                "toxicFacilityList": { // 인근시설-유독물 완
                    "response": "No Content",
                    "responseCode": 200,
                    "responseMsg": "조회된 값이 없습니다.",
                    "result": {
                "dataList": [
                  {
                    "regist_de_14": "20210630172102",
                    "buld_nm": "진양",
                    "entrps_nm": "(주)진양",
                    "hold_cout_cstdy": "",
                    "hold_ffgq": "",
                    "hold_cout": "",
                    "bunji_adress": "경상남도 진주시 상대동 33-21 번지 상대동 33-21",
                    "doro_adress": "경상남도 진주시 상대동 동진로311번길 11 진양동진로311번길",
                    "rprsntv_tel1": "055-756-5226",
                    "rprsntv_tel2": "",
                    "txsb_safer_tel1": "",
                    "txsb_safer_tel2": "",
                    "gis_x_5181": "302468.62688924145",
                    "gis_y_5181": "187825.02016967715",
                    "gis_x_4326": "128.1249413234",
                    "gis_y_4326": "35.1816306074",
                    "dist": "2.4e-07",
                    "keyword_yn": "N"
                  }
                ],
                        "ret_cd": "0",
                        "ret_msg": "success",
                        "rec_cnt": 8
              }
                },
                "nearbyResidentsList": {// 인근주민-보호자 완
                    "response": "success",
                    "responseCode": 200,
                    "responseMsg": "성공",
                    "result": {
                        "dataList": [
                            {
                                "pat_name": "김수동",
                                "care_name": "권정남",
                                "care_rel": "딸",
                                "care_tel": "010-8836-5106"
                            },
                        ],
                        "ret_cd": "0",
                        "ret_msg": "success",
                        "rec_cnt": 50
                    }
                },
                "nearbyBusinessesList": {
                  "response": "success",
                        "responseCode": 200,
                        "responseMsg": "성공",
                        "result": {
                            "dataList": [
                                {
                                    "bild_sn": "48000000022172",
                                    "entrps_nm": "한살림",
                                    "main_prpos_cd_nm": "근린생활시설",
                                    "sub_prpos_cd_nm": "소매점",
                                    "buld_nm": "까치빌라",
                                    "bulddong_sn": "1",
                                    "floor_sn": "11",
                                    "cttpc": "",
                                    "bunji_adress": "경상남도 합천군 합천읍 합천리 1256-0 번지",
                                    "doro_adress": "경상남도 합천군 합천읍 옥산로 16 까치빌라",
                                    "gis_x_5181": "304858.0170545473",
                                    "gis_y_5181": "230811.08909041138",
                                    "gis_x_4326": "128.156683525",
                                    "gis_y_4326": "35.56875061320001",
                                    "dist": "1.74461852",
                                    "keyword_yn": "N"
                                }
                    ],
                            "ret_cd": "0",
                            "ret_msg": "success",
                            "rec_cnt": 154
                  }
                }

            }
        }
        //협업대응 -> 1:의소전담대, 2:의소일반대, 3:생명지킴이
        const collaborativeResponseList = testData.result.collaborativeResponseList.result.map(item => ({
          ...item,
          type: 'collaboration' as 'collaboration'
        }));

         //인근주민 ->인근시설물관계자
        const nearbyFacilityPersonnelList = testData.result.nearbyFacilityPersonnelList.result.dataList.map(item => ({
          ...item,
          type: 'residents' as 'residents'
        }));

        //인근주민 -> 소방등록정보
        const nearbyOfficialsList = testData.result.nearbyOfficialsList.result.dataList.map(item => ({
          ...item,
          type: 'residents' as 'residents'
        }));

        //인근주민 -> 보호자
        const nearbyResidentsList = testData.result.nearbyResidentsList.result.dataList.map(item => ({
          ...item,
          type: 'residents' as 'residents'
        }));

        //인근시설 -> 대상물
        const fightingPropertyList = testData.result.fightingPropertyList.result.dataList.map(item => ({
          ...item,
          type: 'facilities' as 'facilities'
        }));

        //인근시설 -> 위험물
        const hazardousSubstancList = testData.result.hazardousSubstancList.result.dataList.map(item => ({
          ...item,
          type: 'facilities' as 'facilities'
        }));

        //인근시설 -> 유독물
        const toxicFacilityList = testData.result.toxicFacilityList.result.dataList.map(item => ({
          ...item,
          type: 'facilities' as 'facilities',
          bild_sn : new Date().getTime().toString()
        }));

        const nearbyBusinessesList = testData.result.nearbyBusinessesList.result.dataList.map(item => ({
          ...item,
          type: 'facilities' as 'facilities',
        }));
        
        const combinedData:DispatchLists = {
          collaborativeResponseList : collaborativeResponseList,
          nearbyFacilityPersonnelList : nearbyFacilityPersonnelList,
          nearbyOfficialsList : nearbyOfficialsList,
          nearbyResidentsList : nearbyResidentsList,
          fightingPropertyList : fightingPropertyList,
          hazardousSubstancList : hazardousSubstancList,
          toxicFacilityList : toxicFacilityList,
          nearbyBusinessesList: nearbyBusinessesList
        }

        const data = {
          dispatchLists : combinedData
        }
        setNeightborHoodData(data)
        console.log(data)
      }catch(e){

      }
    }

  useEffect(() => {
    fetchNeighborhoodData()
  }, [])
    
  const countItemsByType = (data:ModDispatchLists | undefined) => {
    // 결과 객체 초기화
    const counts = {
      collaboration: 0,
      residents: 0,
      facilities: 0,
      vulnerablePerson:0
    };
  
    if (data && data.dispatchLists) {
      // 각 타입별로 개수 세기
      counts.collaboration = data.dispatchLists.collaborativeResponseList.length;
      counts.residents = data.dispatchLists.nearbyFacilityPersonnelList.length 
                       + data.dispatchLists.nearbyOfficialsList.length
                       + data.dispatchLists.nearbyResidentsList.length;
      counts.facilities = data.dispatchLists.fightingPropertyList.length
                        + data.dispatchLists.hazardousSubstancList.length
                        + data.dispatchLists.toxicFacilityList.length;
    }
  
    return counts;
  }

  return (
    <Container deviceType={deviceType}>
      <NeighborhoodFilter deviceType={deviceType} countByType={countItemsByType(neightborHoodData)} />
     {type && <VStack gap={deviceType === 'mobile' ? '16px' : '24px'} width="100%">
        {type === 'collaboration' && <Collaboration data={neightborHoodData?.dispatchLists?.collaborativeResponseList!!}/>}
        {type === 'residents' && <Residents 
          nearbyFacilityPersonnelList={neightborHoodData?.dispatchLists?.nearbyFacilityPersonnelList!!} 
          nearbyOfficialsList={neightborHoodData?.dispatchLists?.nearbyOfficialsList!!} 
          nearbyResidentsList={neightborHoodData?.dispatchLists?.nearbyResidentsList!!} 
        />}
        {type === 'vulnerablePerson' && <VulnerablePerson />}
        {type === 'facilities' && <Facility 
          fightingPropertyList={neightborHoodData?.dispatchLists?.fightingPropertyList!!}
          hazardousSubstancList={neightborHoodData?.dispatchLists?.hazardousSubstancList!!}
          toxicFacilityList={neightborHoodData?.dispatchLists?.toxicFacilityList!!}
          nearbyBusinessesList={neightborHoodData?.dispatchLists?.nearbyBusinessesList!!}
        />}
      </VStack>}
    </Container>
  );
};

NeighborhoodList.defaultProps = {
  dispatchLists: [
    {
      eventName: '협업대응',
      type: 'collaboration',
      totalCount: 7,
    },
    {
      eventName: '인근주민',
      type: 'residents',
      totalCount: 17,
    },
    {
      eventName: '인근피난약자',
      type: 'vulnerablePerson',
      totalCount: 9,
    },
    {
      eventName: '인근시설',
      type: 'facilities',
      totalCount: 34,
    },
  ],
};
export default NeighborhoodList;

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
      gap: 24px;
    `}

  ${props =>
    props.deviceType === 'tabletHorizontal' &&
    css`
      flex-direction: row;
      gap: 0 24px;
    `}

  .nearFilter {
    ${props =>
      props.deviceType === 'tabletHorizontal' &&
      css`
        display: flex;
        flex-direction: column;
        width: fit-content;
      `}
  }
`;
