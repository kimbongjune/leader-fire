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
    gisX:number;
    gisY:number;
    dFstRegSeq:string;
    callTell:string | null
    description: string | null
    created: string | null
    isNew?: boolean;
    hasRead:boolean;
  };

type CarMoveType = {
  dsrSeq:string;
}

export interface UserInformation {
  userId: string;
  userName: string;
  classCd: string;
  wardId: string;
  wardName: string;
  deviceTel: string;
  fcmToken: string;
  authUserPw: string;
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

export type FacilitiyData = {
  response: string
  responseCode: number
  responseMsg: string
  totalCount: number
  result: FacilitiesDataResult
}
export type FacilitiesDataResult = {
  buldInfoEvacuateDataList: BuldInfoEvacuateDataList
  buldInfoFacilityDataList: BuldInfoFacilityDataList
  multiUseBsshInfoDataList: MultiUseBsshInfoDataList
  buldInfoGuardDataList: BuldInfoGuardDataList
  ojFireoccrrncsttusDataList: OjFireoccrrncsttusDataList
  buldInfoDngmaterialDataList: BuldInfoDngmaterialDataList
}

type BuldInfoEvacuateDataList = {
  response: string
  responseCode: number
  responseMsg: string
  result: BuldInfoEvacuateDataListResult
}

type BuldInfoEvacuateDataListResult =  {
  dataList: BuldInfoEvacuateDataListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

type BuldInfoEvacuateDataListResultList = {
  obj_nm: string
  spital_seq: string
  direct_stairs: string
  refge_stairs: string
  outside_stairs: string
  spt_refge_stairs: string
  front_room: string
  regist_de_14: string
}

type BuldInfoFacilityDataList = {
  response: string
  responseCode: number
  responseMsg: string
  result: BuldInfoFacilityDataListResult
}

type BuldInfoFacilityDataListResult = {
  dataList: BuldInfoFacilityDataListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

type BuldInfoFacilityDataListResultList = {
  obj_nm: string
  dtawrinvstg_sn: string
  fgt_fclty_cn: string
  fgt_fclty_result: string
  regist_de_14: string
}

type MultiUseBsshInfoDataList = {
  response: string
  responseCode: number
  responseMsg: string
  result: MultiUseBsshInfoDataListResult
}

type MultiUseBsshInfoDataListResult = {
  dataList: MultiUseBsshInfoDataListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

type MultiUseBsshInfoDataListResultList = {
  multi_use_bssh_sn: string
  aplcnt_bssh_nm: string
  induty_cd_nm: string
  obj_nm: string
  bulddong_sn: string
  aplcnt_telno: string
  aplcnt_mbtlnum: string
}

type BuldInfoGuardDataList = {
  response: string
  responseCode: number
  responseMsg: string
  result: BuldInfoGuardDataListResult
}

type BuldInfoGuardDataListResult = {
  dataList: BuldInfoGuardDataListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

type BuldInfoGuardDataListResultList = {
  obj_nm: string
  hnl_rescue_refge_cntrpln: string
  arson_manage_cntrvs: string
  etc_spcmnt_matter: string
  regist_de_14: string
}

type OjFireoccrrncsttusDataList = {
  response: string
  responseCode: number
  responseMsg: string
  result: OjFireoccrrncsttusDataListResult
}

type OjFireoccrrncsttusDataListResult = {
  dataList: OjFireoccrrncsttusDataListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

type OjFireoccrrncsttusDataListResultList = {
  buld_nm: string
  fire_occrrnc_sn: string
  occrrnc_dt: string
  occrrnc_fctr_cd_nm: string
  hnldmge_sm: string
  prprtydmge_sm: string
}

type BuldInfoDngmaterialDataList = {
  response: string
  responseCode: number
  responseMsg: string
  result: BuldInfoDngmaterialDataListResult
}

type BuldInfoDngmaterialDataListResult = {
  dataList: BuldInfoDngmaterialDataListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

type BuldInfoDngmaterialDataListResultList = {
  obj_nm: string
  dgst_sn: string
  dgst_se_cd_nm: string
  kind_cd_nm: string
  prdnm_cd_nm: string
  prdnm_detail: string
  dgst_qt: string
  unit: string
  dgst_prpos: string
  regist_de_14: string
}

export type NearByDangerusList = {
  response: string
  responseCode: number
  responseMsg: string
  totalCount: number
  result: NearByDangerusListResult
}

export type NearByDangerusListResult = {
  danMnfctretcTankDataList: DanMnfctretcTankDataList
}

type DanMnfctretcTankDataList = {
  response: string
  responseCode: number
  responseMsg: string
  result: DanMnfctretcTankDataListResult
}

type DanMnfctretcTankDataListResult = {
  dataList: DanMnfctretcTankDataListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

type DanMnfctretcTankDataListResultList = {
  buld_nm: string
  tank_sn: string
  tank_knd_cd_nm: string
  oknd_cd_nm: string
  prdnm_cd_nm: string
  appn_qt: string
  mxmm_qt: string
  cmbstb: string
  atmcclsdevice: string
  hoprclsdevice: string
  undgrndtank_at: string
}

export type DisasterInformation = {
  response: string
  responseCode: number
  responseMsg: string
  totalCount: number
  result: DisasterInformationResult
}

type DisasterInformationResult = {
  CmDsrCallDto: CmDsrCallDto
}

type CmDsrCallDto = {
  response: string
  responseCode: number
  responseMsg: string
  result: CmDsrCallDtoResult[]
}

type CmDsrCallDtoResult = {
  dsrSeq: string
  dsrKndCd: string
  dsrClsCd: string
  wardId: string
  seoWardName: string
  jurisWardId: string
  semiWardName: string
  procCd: string
  lawAddr: string
  roadAddr: string
  statEndDtime: string
  gisX: number
  gisY: number
  dFstRegSeq: string
  regDtime: string
  callContent: string
  callTel: string
  sameCall: number
  chkYn: string | null
  viewYn: string | null
}

export interface BriefDisasterInfo {
  result: BriefDisasterInfoResult[]
  response: string
  responseCode: number
  responseMsg: string
}

export interface BriefDisasterInfoResult {
  dspAggregateDtoList: DspAggregateDtoList
  disasterDetailInfo: DisasterDetailInfo[]
}

export interface DspAggregateDtoList {
  response: string
  responseCode: number
  responseMsg: string
  result: DspAggregateDtoListResult
}

export interface DspAggregateDtoListResult {
  briefHsaver: BriefHsaver[]
  briefCenter: BriefCenter[]
  briefCar: BriefCar[]
  briefVolunteeFire: BriefVolunteeFire[]
}

export interface BriefHsaver {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: any
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: any
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface BriefCenter {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: any
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: any
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface BriefCar {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: any
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: any
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface BriefVolunteeFire {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: any
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: any
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface DisasterDetailInfo {
  ctlSeq: number
  procSituCd: string
  ctlProcDtime: string
  ctlDesc: string
}

export interface DisasterDetailInfo {
  ctlSeq: number
  procSituCd: string
  ctlProcDtime: string
  ctlDesc: string
}

export interface ControlContentData {
  result: ControlContentDataResult[]
  response: string
  responseCode: number
  responseMsg: string
}

export interface ControlContentDataResult {
  disasterDetailInfo: DisasterDetailInfo[]
}

export interface MobilizeData {
  result: MobilizeDataResult[]
  response: string
  responseCode: number
  responseMsg: string
}

export interface MobilizeDataResult {
  dspAggregateDtoList: DspAggregateDtoList
}

export interface DspAggregateDtoList {
  response: string
  responseCode: number
  responseMsg: string
  result: DspAggregateDtoListResult
}

export interface DspAggregateDtoListResult {
  dispatchedB: DispatchedB[]
  dispatchedA: DispatchedA[]
  dispatchedD: DispatchedD[]
  dispatchedC: DispatchedC[]
  contingentList: ContingentList[]
  centerListD: CenterListD[]
  mobilizeA: MobilizeA[]
  mobilizeB: MobilizeB[]
  mobilizeC: MobilizeC[]
  mobilizeD: MobilizeD[]
  centerListC: CenterListC[]
  arrivalA: ArrivalA[]
  arrivalB: ArrivalB[]
  arrivalC: ArrivalC[]
  arrivalD: arrivalD[]
  centerListB: CenterListB[]
  centerListA: CenterListA[]
  homecomingA: HomecomingA[]
  homecomingB: HomecomingB[]
  homecomingD: HomecomingD[]
  homecomingC: HomecomingC[]
}

export interface DispatchedB {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: any
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface DispatchedA {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: any
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface DispatchedD {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: any
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface DispatchedC {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: any
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface ContingentList {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: any
  teamSeoName: any
  teamName: any
  eleType1: any
  eleType2: string
  eleType3: any
  eleType4?: string
  eleType5: any
  type1TeamCnt: any
  aggregate: string
}

export interface CenterListD {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: any
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface MobilizeA {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: string
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface MobilizeB {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: string
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface MobilizeC {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: string
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface MobilizeD {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: string
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface CenterListC {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: string
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: any
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface ArrivalA {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: string
  eleType4: string
  eleType5: any
  type1TeamCnt: any
  aggregate: string
}

export interface ArrivalB {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: string
  eleType4: string
  eleType5: any
  type1TeamCnt: any
  aggregate: string
}

export interface ArrivalC {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: string
  eleType4: string
  eleType5: any
  type1TeamCnt: any
  aggregate: string
}

export interface arrivalD {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: string
  eleType4: string
  eleType5: any
  type1TeamCnt: any
  aggregate: string
}

export interface CenterListB {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: string
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: any
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface CenterListA {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: string
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: any
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface HomecomingA {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: any
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface HomecomingB {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: string
  eleType4: string
  eleType5: any
  type1TeamCnt: any
  aggregate: string
}

export interface HomecomingD {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: any
  eleType4: any
  eleType5: any
  type1TeamCnt: string
  aggregate: string
}

export interface HomecomingC {
  dsrSeq: string
  teamClsCd: any
  teamClsNm: string
  teamSeoName: any
  teamName: string
  eleType1: any
  eleType2: any
  eleType3: string
  eleType4: string
  eleType5: any
  type1TeamCnt: any
  aggregate: string
}

export interface CarPostionData {
  result: CarPostionDataResult
  response: string
  responseCode: number
  responseMsg: string
}

export interface CarPostionDataResult {
  dspCarMoveResultDtoList: DspCarMoveResultDtoList[]
  videoSharingList : VideoSharingData
}

export interface VideoSharingData{
  result: VideoSharingList[]
  response: string
  responseCode: number
  responseMsg: string
}

export interface VideoSharingList{
  USR_TEL: string
  VIDEO_DATE: string
  DSR_SEQ: string
  GPS_Y: string
  GPS_X: string
}

export interface DspCarMoveResultDtoList {
  dsrSeq: string
  carId: string
  avlGisX: number
  avlGisY: number
  carstatCd: string
  radioCallsign: string
  cdGrpName: string
  targetlocBunziAddr: string
  targetlocX: number
  targetlocY: number
  targetlocDspcarId: string
  targetlocRoger: boolean
  targetlocAcceptRoger: boolean
}

export interface FireFacilityData {
  response: string
  responseCode: number
  responseMsg: string
  totalCount: number
  result: FireFacilityDataResult
}

export interface FireFacilityDataResult {
  fightingPropertyList: FireFacilityFightingPropertyList
  emergFireExtinguisherList: EmergFireExtinguisherList
  hazardousSubstancList: HazardousSubstancList
  firePlugList: FirePlugList
}

export interface FireFacilityFightingPropertyList {
  response: string
  responseCode: number
  responseMsg: string
  result: FireFacilityFightingPropertyListResult
}

export interface FireFacilityFightingPropertyListResult {
  dataList: FireFacilityFightingPropertyListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

export interface FireFacilityFightingPropertyListResultList {
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

export interface EmergFireExtinguisherList {
  response: string
  responseCode: number
  responseMsg: string
  result: EmergFireExtinguisherListResult
}

export interface EmergFireExtinguisherListResult {
  dataList: EmergFireExtinguisherListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

export interface EmergFireExtinguisherListResultList {
  emerhyd_id: string
  inst_equip_desc: string
  bunji_adress: string
  doro_adress: string
  gis_x_5181: string
  gis_y_5181: string
  dist: string
  stat_cd_nm: string
  use_yn: string
}


export interface FireFacilityHazardousSubstancList {
  response: string
  responseCode: number
  responseMsg: string
  result: FireFacilityHazardousSubstancListResult
}

export interface FireFacilityHazardousSubstancListResult {
  dataList: FireFacilityHazardousSubstancListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

export interface FireFacilityHazardousSubstancListResultList {
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

export interface FirePlugList {
  response: string
  responseCode: number
  responseMsg: string
  result: FirePlugListResult
}

export interface FirePlugListResult {
  dataList: FirePlugListResultList[]
  ret_cd: string
  ret_msg: string
  rec_cnt: number
}

export interface FirePlugListResultList {
  hyd_id: string
  form_cd_nm: string
  adj_bldg: string
  gis_x_5181: number
  gis_y_5181: number
  dist: number
  pipe: number
  use_yn: string
}

export interface UserDto {
  sub: string
  userId: string
  userName: string
  classCd: string
  wardId: string
  wardName: string
  deviceTel: string
  fcmToken: string
  userPw: string
  iat: number
}

export interface apiPostResponse {
  response:string
  responseCode:number
  responseMsg:string
  result:null
}