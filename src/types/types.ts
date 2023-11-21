import { type } from "os";

// 화면 너비에 따른 디바이스 타입 지정
export type DeviceType = 'mobile' | 'tabletVertical' | 'tabletHorizontal' | null;

// 상태 타입 지정 (진행중 | 종결)
export type IncidentType = 'progress' | 'completion';

// 채팅 메시지 타입 (문자열 | 이미지 | 영상)
export type ChatMessageType = 'string' | 'image' | 'video';

export type DispatchItemType = {
    jurisWardId:string;
    dsrKndCd:string;
    dsrClsCd:string;
    dsrSeq: string;
    status: 'progress' | 'completion';
    reportCount: number;
    eventName: string;
    type: 'fires' | 'rescue' | 'firstAid' | 'others';
    lawAddr: string;
    roadAddr:string;
    procCd:string;
    gisX:string;
    gisY:string;
    dFstRegSeq:string;
    callTell:string
    description: string;
    created: string;
    isNew?: boolean;
  };

type CarMoveType = {
  dsrSeq:string;
}

export type EmergencyReportType = {
  ctlDesc:string[];
  ctlSeq:number[];
  procSituCd:string[];
  ctlProcDTime:string[];
}

export type HistoryData = {
  response: string
  responseCode: number
  responseMsg: string
  totalCount: number
  result: HistoryDataResult
}

type HistoryDataResult = {
  reportHistoryList: ReportHistoryList
  rescueHistoryList: RescueHistoryList
  firstAidHistoryList: FirstAidHistoryList
  dispatchHistoryList: DispatchHistoryList
}

type ReportHistoryList = {
  response: string
  responseCode: number
  responseMsg: string
  result: ReportHistoryListResult
}

type ReportHistoryListResult = {
  dataList: ReportHistoryListResultDataList[]
}

type ReportHistoryListResultDataList = {
  reg_dtime: string
  dsr_knd_cd_nm: string
  treat_cls_cd_nm: string
  call_content: string
  aware_yn: string
  breath_yn: string
  cpr_yn: string
  noemer_yn: string
}

type RescueHistoryList = {
  response: string
  responseCode: number
  responseMsg: string
  result: RescueHistoryListResult
}

type RescueHistoryListResult = {
  dataList: RescueHistoryListResultDataList[]
}

type RescueHistoryListResultDataList = {
  reg_dtime: string
  age_cd_nm: string
  acc_place_cd_nm: string
  acc_rsn_cd_nm: string
  acc_rsn_etc_desc: string
  act_desc: string
  guide: string
  proc_rslt_cd_nm: string
  crime_cd_nm: string
  dsr_act_trouble_cd_nm: string
  dsr_act_trouble_desc: string
}

type FirstAidHistoryList = {
  response: string
  responseCode: number
  responseMsg: string
  result: FirstAidHistoryListResult
}

type FirstAidHistoryListResult = {
  dataList: FirstAidHistoryListResultDataList[]
}

type FirstAidHistoryListResultDataList = {
  reg_dtime: string
  emg_acc_type_cd_nm: string
  emg_acc_type_etc_desc: string
  pat_stat_cd_nm: string
  pat_name: string
  pat_sex_cd_nm: string
  pat_age: string
  crime_cd_nm: string
  doc_guide: string
  emger_opinion: string
}

type DispatchHistoryList = {
  response: string
  responseCode: number
  responseMsg: string
  result: DispatchHistoryListResult
}

type DispatchHistoryListResult = {
  dataList: DispatchHistoryListResultDataList[]
}

type DispatchHistoryListResultDataList = {
  reg_dtime: string
  dsr_seq: string
  dsr_knd_cd_nm: string
  dsr_cls_cd_nm: string
  dsr_bunji_adress: string
  dsr_doro_adress: string
  call_content: string
  copertn_cntrmsr_yn: string
  gis_x_5181: string
  gis_y_5181: string
  gis_x_4326: string
  gis_y_4326: string
  dist: string
}

export type DisasterHistoryData = {
  reportNumber: number
  dispatchLists: DispatchList[]
}

export type DispatchList = {
  reg_dtime: string
  dsr_knd_cd_nm?: string
  treat_cls_cd_nm?: string
  call_content?: string
  aware_yn?: string
  breath_yn?: string
  cpr_yn?: string
  noemer_yn?: string
  type: 'report' | 'rescue' | 'patient' | 'mobilize'
  age_cd_nm?: string
  acc_place_cd_nm?: string
  acc_rsn_cd_nm?: string
  acc_rsn_etc_desc?: string
  act_desc?: string
  guide?: string
  proc_rslt_cd_nm?: string
  crime_cd_nm?: string
  dsr_act_trouble_cd_nm?: string
  dsr_act_trouble_desc?: string
  emg_acc_type_cd_nm?: string
  emg_acc_type_etc_desc?: string
  pat_stat_cd_nm?: string
  pat_name?: string
  pat_sex_cd_nm?: string
  pat_age?: string
  doc_guide?: string
  emger_opinion?: string
  dsr_seq?: string
  dsr_cls_cd_nm?: string
  dsr_bunji_adress?: string
  dsr_doro_adress?: string
  copertn_cntrmsr_yn?: string
  gis_x_5181?: string
  gis_y_5181?: string
  gis_x_4326?: string
  gis_y_4326?: string
  dist?: string
}

export type NeightBorHoodData = {
  response: string
  responseCode: number
  responseMsg: string
  totalCount: number
  result: NeightBorHoodDataResult
}

export type NeightBorHoodDataResult = {
  nearbyFacilityPersonnelList: NearbyFacilityPersonnelList
  nearbyOfficialsList: NearbyOfficialsList
  collaborativeResponseList: CollaborativeResponseList
  fightingPropertyList: FightingPropertyList
  hazardousSubstancList: HazardousSubstancList
  toxicFacilityList: ToxicFacilityList
  nearbyResidentsList: NearbyResidentsList
  nearbyBusinessesList: nearbyBusinessesList
}
type NearbyFacilityPersonnelList = {
  response: string
  responseCode: number
  responseMsg: string
  result: NearbyFacilityPersonnelListResult
}

type NearbyFacilityPersonnelListResult = {
  dataList: NearbyFacilityPersonnelListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

type NearbyFacilityPersonnelListResultList = {
  obj_nm: string
  partcpnt_cd_nm: string
  partcpnt: string
  tlphon_no: string
  bunji_adress: string
  doro_adress: string
  gis_x_5181: string
  gis_y_5181: string
  gis_x_4326: string
  gis_y_4326: string
  dist: string
  keyword_yn: string
}

type NearbyOfficialsList = {
  response: string
  responseCode: number
  responseMsg: string
  result: NearbyOfficialsListResult
}

type NearbyOfficialsListResult = {
  dataList: NearbyOfficialsListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

type NearbyOfficialsListResultList = {
  partcpnt_cd_nm: string
  partcpnt: string
  obj_nm: string
  bunji_adress: string
  doro_adress: string
  tlphon_no: string
}

type CollaborativeResponseList = {
  response: string
  responseCode: number
  responseMsg: string
  result: CollaborativeResponseListResult[]
}

type CollaborativeResponseListResult = {
  appUserId: string
  appUserType: string
  nmPerson: string
  tel: string
  type?:string
  volunPosition: any
  userLocX: number
  userLocY: number
}

type FightingPropertyList = {
  response: string
  responseCode: number
  responseMsg: string
  result: FightingPropertyListResult
}

type FightingPropertyListResult = {
  dataList: FightingPropertyListResultData[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

type FightingPropertyListResultData = {
  bild_sn: string
  obj_nm: string
  main_prpos_cd_nm: string
  bunji_adress: string
  doro_adress: string
  dsprvn_tlphon: string
  dytm_tlphon: string
  night_tlphon: string
  gis_x_5181: string
  gis_y_5181: string
  gis_x_4326: string
  gis_y_4326: string
  dist: string
  keyword_yn: string
}

type HazardousSubstancList = {
  response: string
  responseCode: number
  responseMsg: string
  result: HazardousSubstancListResult
}

type HazardousSubstancListResult = {
  dataList: HazardousSubstancListResultData[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

type HazardousSubstancListResultData = {
  bild_sn: string
  obj_nm: string
  itlpc_buld_nm: string
  itlpc_bunji_adress: string
  itlpc_doro_adress: string
  mnfctretc_sn: string
  mnfctretc_se_no: string
  mnfctretc_detail_se_cd_nm: string
  bulddong_sn: string
  floor_sn: string
  dsprvn_tlphon: string
  dytm_tlphon: string
  night_tlphon: string
  gis_x_5181: number
  gis_y_5181: number
  gis_x_4326: number
  gis_y_4326: number
  dist: number
  keyword_yn: string
}

type ToxicFacilityList = {
  response: string
  responseCode: number
  responseMsg: string
  result: ToxicFacilityListResult
}

type ToxicFacilityListResult = {
  dataList: ToxicFacilityListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

type ToxicFacilityListResultList = {
  regist_de_14: string
  buld_nm: string
  entrps_nm: string
  hold_cout_cstdy: string
  hold_ffgq: string
  hold_cout: string
  bunji_adress: string
  doro_adress: string
  rprsntv_tel1: string
  rprsntv_tel2: string
  txsb_safer_tel1: string
  txsb_safer_tel2: string
  gis_x_5181: string
  gis_y_5181: string
  gis_x_4326: string
  gis_y_4326: string
  dist: string
  keyword_yn: string
}

type NearbyResidentsList =  {
  response: string
  responseCode: number
  responseMsg: string
  result: NearbyResidentsListResult
}

type NearbyResidentsListResult = {
  dataList: NearbyResidentsListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

type NearbyResidentsListResultList = {
  pat_name: string
  care_name: string
  care_rel: string
  care_tel: string
}

type nearbyBusinessesList = {
  response: string
  responseCode: number
  responseMsg: string
  result: nearbyBusinessesListResult
}

type nearbyBusinessesListResult = {
  dataList: nearbyBusinessesListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

type nearbyBusinessesListResultList = {
  bild_sn: string
  entrps_nm: string
  main_prpos_cd_nm: string
  sub_prpos_cd_nm: string
  buld_nm: string
  bulddong_sn: string
  floor_sn: string
  cttpc: string
  bunji_adress: string
  doro_adress: string
  gis_x_5181: string
  gis_y_5181: string
  gis_x_4326: string
  gis_y_4326: string
  dist: string
  keyword_yn: string
}

export type ModCollaborativeResponseList = {
  appUserId: string
  appUserType: string
  nmPerson: string
  tel: string
  volunPosition: any
  userLocX: number
  userLocY: number
  type: 'collaboration'
}

export type ModNearbyFacilityPersonnelList = {
  obj_nm: string
  partcpnt_cd_nm: string
  partcpnt: string
  tlphon_no: string
  bunji_adress: string
  doro_adress: string
  gis_x_5181: string
  gis_y_5181: string
  gis_x_4326: string
  gis_y_4326: string
  dist: string
  keyword_yn: string
  type: 'residents';
}

export type ModNearbyOfficialsList = {
  partcpnt_cd_nm: string
  partcpnt: string
  obj_nm: string
  bunji_adress: string
  doro_adress: string
  tlphon_no: string
  type: 'residents';
}

export type ModNearbyResidentsList = {
  pat_name: string
  care_name: string
  care_rel: string
  care_tel: string
  type: 'residents';
}

export type ModnearbyBusinessesList = {
  bild_sn: string
  entrps_nm: string
  main_prpos_cd_nm: string
  sub_prpos_cd_nm: string
  buld_nm: string
  bulddong_sn: string
  floor_sn: string
  cttpc: string
  bunji_adress: string
  doro_adress: string
  gis_x_5181: string
  gis_y_5181: string
  gis_x_4326: string
  gis_y_4326: string
  dist: string
  keyword_yn: string
  type: 'facilities';
}

export type ModFightingPropertyList = {
  bild_sn: string
  obj_nm: string
  main_prpos_cd_nm: string
  bunji_adress: string
  doro_adress: string
  dsprvn_tlphon: string
  dytm_tlphon: string
  night_tlphon: string
  gis_x_5181: string
  gis_y_5181: string
  gis_x_4326: string
  gis_y_4326: string
  dist: string
  keyword_yn: string
  type: 'facilities';
}

export type ModHazardousSubstancList = {
  bild_sn: string
  obj_nm: string
  itlpc_buld_nm: string
  itlpc_bunji_adress: string
  itlpc_doro_adress: string
  mnfctretc_sn: string
  mnfctretc_se_no: string
  mnfctretc_detail_se_cd_nm: string
  bulddong_sn: string
  floor_sn: string
  dsprvn_tlphon: string
  dytm_tlphon: string
  night_tlphon: string
  gis_x_5181: number
  gis_y_5181: number
  gis_x_4326: number
  gis_y_4326: number
  dist: number
  keyword_yn: string
  type: 'facilities';
}

export type ModToxicFacilityList = {
  regist_de_14: string
  buld_nm: string
  entrps_nm: string
  hold_cout_cstdy: string
  hold_ffgq: string
  hold_cout: string
  bunji_adress: string
  doro_adress: string
  rprsntv_tel1: string
  rprsntv_tel2: string
  txsb_safer_tel1: string
  txsb_safer_tel2: string
  gis_x_5181: string
  gis_y_5181: string
  gis_x_4326: string
  gis_y_4326: string
  dist: string
  keyword_yn: string
  bild_sn: string
  type: 'facilities';
}

export type DispatchLists = {
  collaborativeResponseList: ModCollaborativeResponseList[]
  nearbyFacilityPersonnelList: ModNearbyFacilityPersonnelList[]
  nearbyOfficialsList: ModNearbyOfficialsList[]
  nearbyResidentsList: ModNearbyResidentsList[]
  fightingPropertyList: ModFightingPropertyList[]
  hazardousSubstancList: ModHazardousSubstancList[]
  toxicFacilityList: ModToxicFacilityList[]
  nearbyBusinessesList : ModnearbyBusinessesList[]
}

export type ModDispatchLists = {
  dispatchLists: DispatchLists
}
