// 화면 너비에 따른 디바이스 타입 지정
export type DeviceType = 'mobile' | 'tabletVertical' | 'tabletHorizontal' | null;

// 상태 타입 지정 (진행중 | 종결)
export type IncidentType = 'progress' | 'completion';

// 채팅 메시지 타입 (문자열 | 이미지 | 영상)
export type ChatMessageType = 'string' | 'image' | 'video';