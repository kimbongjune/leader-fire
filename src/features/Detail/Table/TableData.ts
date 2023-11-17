import { VehicleTableRowType } from './VehicleTable';
import { VehicleStatusTableDataType } from './VehicleStatusTable';
import theme from '@/theme/colors';
import { OrganizationTableDataType } from './OrganizationTable';

// 출동대 편성 목록 #1 디폴트 데이터
export const VehicleStatusTableDefaultData = {
  rowData: [
    {
      callingName: '상동펌프1선',
      status: '출동',
      peopleCount: 4,
    },
    {
      callingName: '상동펌프2선',
      peopleCount: 4,
    },
    {
      callingName: '상동구급',
      status: '현장도착',
      peopleCount: 4,
    },
    {
      callingName: '한림물탱크',
      status: '귀소불',
      peopleCount: 4,
    },
    {
      callingName: '한림구급',
      status: '출동',
      peopleCount: 4,
    },
    {
      callingName: '상동물탱크',
      status: '귀소가',
      peopleCount: 4,
    },
    {
      callingName: '가락펌프',
      peopleCount: 4,
    },
  ],
  total: {
    vehicleCount: 7,
    peopleCount: 28,
  },
} as VehicleStatusTableDataType;

// 출동대 편성 집계 #2 디폴트 데이터
export const OrganizationTableData = {
  rowData: [
    {
      dispatcherType: '안전센터',
      dispatcherColor: theme.colors.orange,
      data: [
        {
          type: 'a센터',
          vehicleCount: 5,
          peopleCount: 5,
        },
        {
          type: 'b센터',
        },
        {
          type: '소계',
          vehicleCount: 5,
          peopleCount: 5,
        },
      ],
    },
    {
      dispatcherType: '구조대',
      dispatcherColor: theme.colors.blue,
      data: [
        {
          type: 'C구조대',
          vehicleCount: 5,
          peopleCount: 5,
        },
        {
          type: 'D구조대',
        },
        {
          type: '소계',
          vehicleCount: 5,
          peopleCount: 5,
        },
      ],
    },
    {
      dispatcherType: '지역대',
      dispatcherColor: theme.colors.green,
      data: [
        {
          type: 'E지역대',
          vehicleCount: 5,
          peopleCount: 5,
        },
        {
          type: '소계',
          vehicleCount: 5,
          peopleCount: 5,
        },
      ],
    },
    {
      dispatcherType: '의용소방대',
      dispatcherColor: theme.colors.red,
      data: [
        {
          type: 'F의소대',
          vehicleCount: 5,
          peopleCount: 5,
        },
        {
          type: 'G의소대',
          vehicleCount: 5,
          peopleCount: 5,
        },
        {
          type: '소계',
          vehicleCount: 10,
          peopleCount: 10,
        },
      ],
    },
    {
      dispatcherType: '생명지킴이',
      dispatcherColor: theme.colors.yellow,
      data: [
        {
          type: 'H생명지킴이',
          vehicleCount: 1,
          peopleCount: 1,
        },
      ],
    },
    {
      dispatcherType: '부산본부',
      data: [
        {
          vehicleCount: 1,
          peopleCount: 1,
        },
      ],
    },
    {
      dispatcherType: '울산본부',
      data: [
        {
          vehicleCount: 1,
          peopleCount: 1,
        },
      ],
    },
  ],

  total: {
    vehicleCount: 21,
    peopleCount: 21,
  },
} as OrganizationTableDataType;

// 출동 집계 테이블 #3 디폴트 데이터
export const DispatchTableData = {
  rowData: [
    {
      dispatcherType: '안전센터',
      dispatcherColor: theme.colors.orange,
      data: [
        {
          type: 'a센터',
          vehicleCount: 5,
          peopleCount: 5,
        },
        {
          type: 'b센터',
        },
        {
          type: '소계',
          vehicleCount: 5,
          peopleCount: 5,
        },
      ],
    },
    {
      dispatcherType: '구조대',
      dispatcherColor: theme.colors.blue,
      data: [
        {
          type: 'C구조대',
          vehicleCount: 5,
          peopleCount: 5,
        },
        {
          type: 'D구조대',
        },
        {
          type: '소계',
          vehicleCount: 5,
          peopleCount: 5,
        },
      ],
    },
    {
      dispatcherType: '지역대',
      dispatcherColor: theme.colors.green,
      data: [
        {
          type: 'E지역대',
          vehicleCount: 5,
          peopleCount: 5,
        },
        {
          type: '소계',
          vehicleCount: 5,
          peopleCount: 5,
        },
      ],
    },
    {
      dispatcherType: '의용소방대',
      dispatcherColor: theme.colors.red,
      data: [
        {
          type: 'F의소대',
          vehicleCount: 5,
          peopleCount: 5,
        },
        {
          type: 'G의소대',
          vehicleCount: 5,
          peopleCount: 5,
        },
        {
          type: '소계',
          vehicleCount: 10,
          peopleCount: 10,
        },
      ],
    },
    {
      dispatcherType: '생명지킴이',
      dispatcherColor: theme.colors.yellow,
      data: [
        {
          type: 'H생명지킴이',
          vehicleCount: 1,
          peopleCount: 1,
        },
      ],
    },
    {
      dispatcherType: '부산본부',
      data: [
        {
          vehicleCount: 1,
          peopleCount: 1,
        },
      ],
    },
    {
      dispatcherType: '울산본부',
      data: [
        {
          vehicleCount: 1,
          peopleCount: 1,
        },
      ],
    },
  ],
  total: {
    vehicleInUseCount: 8,
    vehicleOrganizationCount: 21,
  },
};

// 차량 테이블
export const VehicleTableRows = {
  rowData: [
    {
      vehicleType: '펌프차',
      vehicleColor: '#f8f9fa',
      data: [
        {
          type: 'a센터',
          vehicleCount: 5,
          peopleCount: 5,
        },
        {
          type: 'b센터',
        },
        {
          type: '소계',
          vehicleCount: 5,
          peopleCount: 5,
        },
      ],
    },
    {
      vehicleType: '물탱크차',
      vehicleColor: '#f8f9fa',
      data: [
        {
          type: 'a센터',
          vehicleCount: 5,
          peopleCount: 5,
        },
        {
          type: 'c구조대',
        },
        {
          type: '소계',
          vehicleCount: 5,
          peopleCount: 5,
        },
      ],
    },
    {
      vehicleType: '사다리차',
      data: [
        {
          peopleCount: 5,
        },
      ],
    },
    {
      vehicleType: '굴절차',
      data: [
        {
          peopleCount: 5,
        },
      ],
    },
    {
      vehicleType: '펌뷸란스',
      data: [
        {
          peopleCount: 5,
        },
      ],
    },
    {
      vehicleType: '구급차',
      data: [
        {
          peopleCount: 5,
        },
      ],
    },
    {
      vehicleType: '기타',
      data: [
        {
          peopleCount: 5,
        },
      ],
    },
  ],
  total: {
    vehicleCount: 21,
    peopleCount: 57,
  },
};
