import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { css } from '@emotion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import NeighborhoodModalItem from '../../NeighborhoodModalItem';
import ModalLayout from '@/components/common/Modal/ModalLayout';
import Close from '../../../../../public/images/icons/close.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import { dangerData, evacuationFacilityData, fireFacilityData, fireHistoryData, multiData, planData, tankData } from '../../NeighborhoodModalData';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType, FacilitiesDataResult, FacilitiyData, NearByDangerusList, NearByDangerusListResult } from '@/types/types';
import { Box } from '@chakra-ui/react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

interface DataItem {
  title: string;
  text: string;
}

interface SectionData {
  hasNumber: boolean;
  data: DataItem[][];
}

interface FormattedData {
  title: string;
  data: SectionData;
}

interface Props {
  data: {
    title: string;
    data: {
      hasNumber?: boolean;
      data: {
        title: string;
        text: string;
      }[][];
    };
  }[];
  dangerData: any;
  isDangerCategory: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  build_sn?:string;
}

const FacilityModal = (props: Props) => {
  const deviceType = useDeviceType();
  const [facilitiyData, setFacilitiyData] = useState<FacilitiyData>()

  const keyToKoreanTitleMap: { [key: string]: string } = {
    obj_nm: "대상물 명칭",
    spital_seq: "순번",
    direct_stairs: "직통계단",
    refge_stairs: "피난계단",
    outside_stairs: "옥외계단",
    spt_refge_stairs: "특별피난계단",
    front_room: "전실",
    regist_de_14: "등록일자",
    dtawrinvstg_sn: "자료조사서 순번",
    fgt_fclty_cn: "소방시설 내용",
    fgt_fclty_result: "소방시설점검결과",
    multi_use_bssh_sn: "다중 이용 업소 순번",
    aplcnt_bssh_nm: "신고인 업소명",
    induty_cd_nm: "업종 명칭",
    bulddong_sn: "건물동 순번",
    aplcnt_telno: "신고인 전화번호",
    aplcnt_mbtlnum: "신고인 휴대폰번호",
    supesn_cnd_result: "진압 여건 점검 결과",
    emrgncy_pasng_result: "긴급 통행환경",
    rescue_cnd_result: "구조활동 환경",
    refge_plan_result: "피난대피 환경",
    frext_uswtr_fclty_result: "소화용수환경",
    etc_result: "기타환경",
    fire_service_dept_cn: "자위소방대 조직현황",
    partclrmatter: "특이사항",
    fire_occrrnc_sn: "화재발생순번",
    occrrnc_dt: "발생일시",
    occrrnc_fctr_cd_nm: "발생요인명칭",
    hnldmge_sm: "인명피해계",
    prprtydmge_sm: "재산피해계",
    dgst_sn: "위험물 순번",
    dgst_se_cd_nm: "위험물 구분명",
    kind_cd_nm: "유종 명칭",
    prdnm_cd_nm: "품명 명칭",
    prdnm_detail: "품명 상세",
    dgst_qt: "위험물 수량",
    unit: "단위",
    dgst_prpos: "위험물 용도",
    buld_nm: "건물명",
    hnl_rescue_refge_cntrpln : "인명 구조 피난 대책",
    arson_manage_cntrvs : "방화 관리 문제점",
    etc_spcmnt_matter : "기타 특기 사항"
  };

  const keyToKoreanTitleMapDanger: { [key: string]: string } = {
    buld_nm : "대상물 명칭",
    tank_sn : "탱크 순번",
    tank_knd_cd_nm : "탱크 종류",
    oknd_cd_nm : "위험물 유종",
    prdnm_cd_nm : "위험물 품명",
    appn_qt : "위험물 지정 수량",
    mxmm_qt : "위험물 최대 수량",
    cmbstb : "가연성 증기회수설비 유무",
    atmcclsdevice : "자동폐쇄장치 유무",
    hoprclsdevice : "수동폐쇄장치 유무",
    undgrndtank_at : "지하탱크 여부"
  };
  
  const [formatFacilitiesDataResult, setFormatFacilitiesDataResult] = useState<FormattedData[]>()
  const [formatDangerusDataResult, setFormatDangerusDataResult] = useState<FormattedData>()

  console.log(props.build_sn)

  function transformFacilitiesData(jsonData: FacilitiyData): FormattedData[] {
    const transformedData: FormattedData[] = [];
  
    const sections = [
      { key: 'multiUseBsshInfoDataList', title: '시설물 내 다중이용업소' },
      { key: 'buldInfoDngmaterialDataList', title: '시설물 내 위험물' },
      { key: 'ojFireoccrrncsttusDataList', title: '시설물 화재발생이력' },
      { key: 'buldInfoFacilityDataList', title: '시설물 내 소방시설조사' },
      { key: 'buldInfoGuardDataList', title: '경방계획' },
      { key: 'buldInfoEvacuateDataList', title: '시설물 내 피난대피시설' }
    ];
  
    sections.forEach(section => {
      const dataList = jsonData.result[section.key as keyof FacilitiesDataResult]?.result?.dataList;
      if (dataList) {
        const sectionData: SectionData = {
          hasNumber: true,
          data: dataList.map((item: any) => {
            return Object.keys(item).map(key => ({
              title: keyToKoreanTitleMap[key] || key,
              text: item[key] || "알 수 없음"
            }));
          })
        };
        transformedData.push({ title: section.title, data: sectionData });
      }
    });
  
    return transformedData;
  }

  function transformDangerusData(jsonData: NearByDangerusList): FormattedData {
    const section = { key: 'danMnfctretcTankDataList', title: '저장탱크' };
    let dataItems: DataItem[][] = [];
  
    const dataList = jsonData.result[section.key as keyof NearByDangerusListResult]?.result?.dataList;
    if (dataList) {
      dataItems = dataList.map((item: any) => {
        return Object.keys(item).map(key => {
          const title = keyToKoreanTitleMapDanger[key] || key; // 위험물에 대한 매핑 사용
          const text = item[key] && item[key].trim() !== '' ? item[key] : "알 수 없음";
          return { title, text };
        });
      });
    }
  
    return {
      title: section.title,
      data: {
        hasNumber: true,
        data: dataItems
      }
    };
  }
  
  useEffect(() =>{
    if(!props.isDangerCategory){
      const data:FacilitiyData = {
          "response": "success",
          "responseCode": 200,
          "responseMsg": "성공",
          "totalCount": 0,
          "result": {
              "buldInfoEvacuateDataList": { // 시설물 내 피난대피시설
                  "response": "success",
                  "responseCode": 200,
                  "responseMsg": "성공",
                  "result": {
                      "dataList": [
                          {
                              "obj_nm": "올리브가요방(벤자민가요방)",
                              "spital_seq": "1",
                              "direct_stairs": "1",
                              "refge_stairs": "0",
                              "outside_stairs": "0",
                              "spt_refge_stairs": "0",
                              "front_room": "0",
                              "regist_de_14": "20191127063252"
                          }
                      ],
                      "ret_cd": "0",
                      "ret_msg": "success",
                      "rec_cnt": 3
                  }
              },
              "buldInfoFacilityDataList": { // 시설물 내 소방시설
                  "response": "success",
                  "responseCode": 200,
                  "responseMsg": "성공",
                  "result": {
                      "dataList": [
                          {
                              "obj_nm": "올리브가요방(벤자민가요방)",
                              "dtawrinvstg_sn": "1",
                              "fgt_fclty_cn": "-제연설비 : 제연구획, 제연방법\n-연결송수관설비 : 송수구위치, 설치층\n-연결살수설비 : 송수구위치, 사용여부\n-비상콘센트설비 : 설치위치, 사용여부\n-무선통신보조설비 : 접속단자위치, 사용여부\n-기타소화활동설비",
                              "fgt_fclty_result": "-자동화재탐지설비 설치되어 있음",
                              "regist_de_14": "20130108101011"
                          }
                      ],
                      "ret_cd": "0",
                      "ret_msg": "success",
                      "rec_cnt": 5
                  }
              },
              "multiUseBsshInfoDataList": { // 시설물 내 다중이용업소
                  "response": "success",
                  "responseCode": 200,
                  "responseMsg": "성공",
                  "result": {
                      "dataList": [
                          {
                              "multi_use_bssh_sn": "MU482009108635",
                              "aplcnt_bssh_nm": "벤쟈민",
                              "induty_cd_nm": "유흥주점",
                              "obj_nm": "올리브가요방(벤자민가요방) - 로얄파크장동",
                              "bulddong_sn": "1",
                              "aplcnt_telno": "010-3883-8681",
                              "aplcnt_mbtlnum": "010-3883-8681"
                          }
                      ],
                      "ret_cd": "0",
                      "ret_msg": "success",
                      "rec_cnt": 2
                  }
              },
              "buldInfoGuardDataList": { // 경방계획
                  "response": "success",
                  "responseCode": 200,
                  "responseMsg": "성공",
                  "result": {
                      "dataList": [
                          {
                              "obj_nm": "올리브가요방(벤자민가요방)",
                              "hnl_rescue_refge_cntrpln": "- 일반계단을 이용한 지상 및 옥상으로 \n  인명대피 유도\n\n- 굴절사다리 차량을 이용한 인명구조\n\n- 2-3층 유흥업소는 야간에 운영\n\n- 기타 모텔은 현재 이용객 없음\n  (2016. 06. 폐업절차 진행중)",
                              "arson_manage_cntrvs": "- 건물 위치 특성상 주도로에 주정차량이 빈번하고 대형차량 진입이 어려울 것으로 예상됨\n\n- 현재 모텔업은 폐업절차 진행중(2016.06.)이며\n  야간에만 유흥업소 운영하므로 주간 상황발생시\n  제3자에 의한 신고로 즉시 신고가 어려움.",
                              "etc_spcmnt_matter": "- 2016. 06. 로얄파크장 모텔업 폐업절차 진행중\n  현재 투숙객 없음 확인함\n\n- 2/3층 유흥업소 야간운영하고 있으며, \n  이또한 업주가 불시에 변동이 발생함\n  (경제적 이유)",
                              "regist_de_14": ""
                          }
                      ],
                      "ret_cd": "0",
                      "ret_msg": "success",
                      "rec_cnt": 1
                  }
              },
              "ojFireoccrrncsttusDataList": { // 시설물 화재발생이력
                  "response": "success",
                  "responseCode": 200,
                  "responseMsg": "성공",
                  "result": {
                      "dataList": [
                        {
                          "buld_nm": "모아엔트몰",
                          "fire_occrrnc_sn": "1",
                          "occrrnc_dt": "201806011152",
                          "occrrnc_fctr_cd_nm": "미상",
                          "hnldmge_sm": "0",
                          "prprtydmge_sm": "50"
                        }
                      ],
                      "ret_cd": "0",
                      "ret_msg": "success",
                      "rec_cnt": 1
                  }
              },
              "buldInfoDngmaterialDataList": { // 시설물 내 위험물
                  "response": "success",
                  "responseCode": 200,
                  "responseMsg": "성공",
                  "result": {
                      "dataList": [
                          {
                              "obj_nm": "올리브가요방(벤자민가요방)",
                              "dgst_sn": "9270",
                              "dgst_se_cd_nm": "가스취급현황",
                              "kind_cd_nm": "가스류",
                              "prdnm_cd_nm": "LPG",
                              "prdnm_detail": "",
                              "dgst_qt": "500",
                              "unit": "㎏",
                              "dgst_prpos": "",
                              "regist_de_14": "20201117192402"
                          }
                      ],
                      "ret_cd": "0",
                      "ret_msg": "success",
                      "rec_cnt": 1
                  }
              }
          }
      }
  
      setFormatFacilitiesDataResult(transformFacilitiesData(data))
    }else{
      const data:NearByDangerusList = {
          "response": "success",
          "responseCode": 200,
          "responseMsg": "성공",
          "totalCount": 0,
          "result": {
              "danMnfctretcTankDataList": {
                  "response": "success",
                  "responseCode": 200,
                  "responseMsg": "성공",
                  "result": {
                      "dataList": [
                          {
                              "buld_nm": "",
                              "tank_sn": "1",
                              "tank_knd_cd_nm": "",
                              "oknd_cd_nm": "제4류",
                              "prdnm_cd_nm": "제3석유류(비수용성액체)",
                              "appn_qt": "2000",
                              "mxmm_qt": "3700",
                              "cmbstb": " ",
                              "atmcclsdevice": " ",
                              "hoprclsdevice": " ",
                              "undgrndtank_at": "N"
                          }
                      ],
                      "ret_cd": "0",
                      "ret_msg": "success",
                      "rec_cnt": 1
                  }
              }
          }
      }
      console.log(data)
      setFormatDangerusDataResult(transformDangerusData(data))
      console.log(transformDangerusData(data).data.data)
      console.log(props.dangerData.data.data)
    }
  }, [])
  
  const [query, setQuery] = useQueryParams({build_sn: StringParam});

  setQuery({build_sn:props?.build_sn})

  return (
    <ModalLayout isOpen={true} onClose={() => props.setIsModalOpen(false)} padding="24px" borderRadius="12px">
      <ModalContent deviceType={deviceType}>
        <ModalClose onClick={() => props.setIsModalOpen(false)}>
          <Close />
        </ModalClose>
        {props.isDangerCategory && (
          <Box h="100%" overflowY="auto">
            <Title>{formatDangerusDataResult?.title}</Title>
            <Wrapper deviceType={deviceType}>
              <NeighborhoodModalItem data={formatDangerusDataResult?.data.data!!} hasNumber={formatDangerusDataResult?.data.hasNumber!!} />
            </Wrapper>
          </Box>
        )}

        {!props.isDangerCategory && (
          <CustomSwiper>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper" autoHeight={true}>
              {formatFacilitiesDataResult?.map((item, index) => {
                return (
                  <SwiperSlide key={`swiper-${index}`}>
                    <Title>{item.title}</Title>
                    <Wrapper deviceType={deviceType}>
                      <NeighborhoodModalItem data={item.data?.data} hasNumber={item.data?.hasNumber} />
                    </Wrapper>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </CustomSwiper>
        )}
      </ModalContent>
    </ModalLayout>
  );
};

FacilityModal.defaultProps = {
  data: [
    {
      title: '시설물 내 다중이용업소',
      data: multiData,
    },
    { title: '시설물 내 위험물', data: dangerData },
    { title: '시설물 화재발생이력', data: fireHistoryData },
    { title: '시설물 내 소방시설조사', data: fireFacilityData },
    { title: '경방계획', data: planData },
    { title: '시설물 내 피난대피시설', data: evacuationFacilityData },
  ],
  dangerData: { title: '저장탱크', data: tankData },
};
export default FacilityModal;

const ModalContent = styled.div<{ deviceType: DeviceType }>`
  // padding: 16px;
  width: 80vw;
  height: 80vh;
  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      // width: 100%;
      // max-height: 460px;
      // min-height: 460px;
      width: 80vw;
      height: 80vh;
      overflow-y: scroll;
    `}
`;

const ModalClose = styled.button`
  width: 28px;
  height: 28px;
  color: ${theme.colors.gray};
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 99;
`;

const Title = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 20px;
  font-style: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
  text-align: center;
  width: fit-content;
  margin: 0 auto 26px;
`;

const Wrapper = styled.div<{ deviceType: DeviceType }>`
  // max-height: 300px;
  // height: 100%;
  overflow-y: auto;
  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      max-height: fit-content;
    `}
`;

const CustomSwiper = styled.div`
  height: 100%;
  .mySwiper {
    height: 100%;
    overflow-y: auto;
    /* 이전 버튼 */
    .swiper-button-prev {
      width: 24px;
      height: 24px;
      margin-top: 0;
      top: 0px;
      left: 43px;
      ::after {
        content: url('/images/icons/arrow-left.svg');
        color: ${theme.colors.gray6};
        width: 100%;
        height: 100%;
        font-size: unset;
      }
    }
    /* 다음 버튼 */
    .swiper-button-next {
      width: 24px;
      height: 24px;
      margin-top: 0;
      top: 0px;
      right: 43px;
      ::after {
        content: url('/images/icons/arrow-right.svg');
        color: ${theme.colors.gray6};
        width: 100%;
        height: 100%;
        font-size: unset;
      }
    }

    .swiper-button-disabled {
      ::after {
        color: ${theme.colors.gray4};
      }
    }
  }
`;
