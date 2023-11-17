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