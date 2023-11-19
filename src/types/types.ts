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
