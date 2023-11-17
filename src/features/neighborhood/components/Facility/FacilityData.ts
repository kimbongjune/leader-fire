export const facilityData = [
  {
    title: '인근 대상물',
    count: 2,
    itemList: [
      {
        id: 1,
        phoneList: [
          { title: '주간전화', number: '010-1111-2222' },
          { title: '야간전화', number: '010-1111-3333' },
        ],
        name: '근린생활시설',
        distance: '10m',
        storeName: '좋은 이웃마트 장유점 (종합삭자재할인마트)',
        storeAddress: '경상남도 김해시 대청동 계동로 153',
        phoneName: '방제실',
        phone: '010-0000-1111',
      },
      {
        id: 2,
        phoneList: [
          { title: '주간전화', number: '010-1111-2222' },
          { title: '야간전화', number: '010-1111-3333' },
        ],
        name: '위험물 저장 및 처리시설',
        distance: '10m',
        storeName: '대상물 명칭',
        storeAddress: '경상남도 김해시 대청동 계동로 153',
        phone: '010-0000-1111',
        phoneName: '방제실',
      },
    ],
  },
  {
    title: '인근 위험물제조소 등',
    count: 2,
    itemList: [
      {
        id: 3,
        phoneList: [
          { title: '주간전화', number: '010-1111-2222' },
          { title: '야간전화', number: '010-1111-3333' },
        ],
        name: '건물명',
        distance: '10m',
        storeName: '대상물 명칭',
        storeAddress: '경상남도 김해시 대청동 계동로 153',
        storeNumber: 102,
        storeFloor: 7,
        isDangerManufacuring: true,
        phoneName: '방제실',
        phone: '010-0000-1111',
        additionalInfo: [
          {
            title: '옥외저장소',
            infoList: [
              { title: '구분', info: 23 },
              { title: '제조소일렬번호', info: 'MF482021000204' },
            ],
          },
        ],
      },
      {
        id: 4,
        phoneList: [
          { title: '주간전화', number: '010-1111-2222' },
          { title: '야간전화', number: '010-1111-3333' },
        ],
        name: '건물명',
        distance: '10m',
        storeName: '대상물 명칭',
        isDangerManufacuring: true,
        storeNumber: 102,
        storeFloor: 7,
        storeAddress: '경상남도 김해시 대청동 계동로 153',
        phoneName: '방제실',
        phone: '010-0000-1111',
        additionalInfo: [
          {
            title: '옥외저장소',
            infoList: [
              { title: '구분', info: 23 },
              { title: '제조소일렬번호', info: 'MF482021000204' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: '인근 유독물시설 등',
    count: 2,
    itemList: [
      {
        id: 5,
        phoneList: [
          { title: '안전관리자', number: '010-1111-2222' },
          { title: '대표자1', number: '010-1111-3333' },
          { title: '대표자2', number: '010-1111-3333' },
        ],
        name: '건물명',
        distance: '10m',
        storeName: '대상물 명칭',
        storeAddress: '경상남도 김해시 대청동 계동로 153',
        phoneName: '방제실',
        phone: '010-0000-1111',
        additionalInfo: [
          {
            title: null,
            infoList: [
              { title: '보유보호장비', info: '보호장비명, 보호장비명' },
              { title: '보유중화제', info: '이름,이름' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: '인근 업소',
    count: 2,
    itemList: [
      {
        id: 6,
        phone: '010-1111-4444',
        phoneName: '방제실',
        storeNumber: 102,
        storeFloor: 7,
        name: '건물명',
        distance: '10m',
        storeName: '좋은 이웃마트 장유점 (종합삭자재할인마트)',
        storeAddress: '경상남도 김해시 대청동 계동로 153',
        danger: '부용도',
      },
    ],
  },
];

export const TargetFacilityData = [
  {
    id: 1,
    phoneName: '방제실',
    distance: '10m',
    name: '위험물 저장 및 처리시설',
    storeName: '대상물 명칭',
    storeAddress: '경상남도 김해시 대청동 계동로 153 상세주소임',
    phones: [
      { phoneTitle: '주간전화', phoneNumber: '010-0000-0000' },
      { phoneTitle: '야간전화', phoneNumber: '010-0000-1111' },
    ],
  },
  {
    id: 2,
    phoneName: '방제실',
    distance: '10m',
    name: '위험물 저장 및 처리시설',
    storeName: '대상물 명칭',
    storeAddress: '경상남도 김해시 대청동 계동로 153 상세주소임',
    phones: [
      { phoneTitle: '주간전화', phoneNumber: '010-0000-0000' },
      { phoneTitle: '야간전화', phoneNumber: '010-0000-2222' },
    ],
  },
  {
    id: 3,
    phoneName: '방제실',
    distance: '10m',
    name: '위험물 저장 및 처리시설',
    storeName: '대상물 명칭',
    storeAddress: '경상남도 김해시 대청동 계동로 153 상세주소임',
    phones: [
      { phoneTitle: '주간전화', phoneNumber: '010-0000-0000' },
      { phoneTitle: '야간전화', phoneNumber: '010-0000-3333' },
    ],
  },
  {
    id: 4,
    phoneName: '방제실',
    distance: '10m',
    name: '위험물 저장 및 처리시설',
    storeName: '대상물 명칭',
    storeAddress: '경상남도 김해시 대청동 계동로 153 상세주소임',
    phones: [
      { phoneTitle: '주간전화', phoneNumber: '010-0000-0000' },
      { phoneTitle: '야간전화', phoneNumber: '010-0000-4444' },
    ],
  },
  {
    id: 5,
    phoneName: '방제실',
    distance: '10m',
    name: '위험물 저장 및 처리시설',
    storeName: '대상물 명칭',
    storeAddress: '경상남도 김해시 대청동 계동로 153 상세주소임',
    phones: [
      { phoneTitle: '주간전화', phoneNumber: '010-0000-0000' },
      { phoneTitle: '야간전화', phoneNumber: '010-0000-5555' },
    ],
  },
];

export const DangerFacilityData = [
  {
    phoneName: '방제실',
    distance: '10m',
    name: '건물명',
    storeName: '대상물 명칭',
    storeAddress: '경상남도 김해시 대청동 계동로 153 상세주소임',
    buildingInfoTitle: '옥외저장소',
    categoryNumber: 23, //구분번호
    buildingNumber: '103동',
    buildingFloor: 7,
    serialNumber: 'MF482021000204',
    phones: [
      { phoneTitle: '주간전화', phoneNumber: '010-0000-2222' },
      { phoneTitle: '야간전화', phoneNumber: '010-0000-1111' },
    ],
  },
  {
    phoneName: '방제실',
    distance: '10m',
    name: '건물명',
    storeName: '대상물 명칭',
    storeAddress: '경상남도 김해시 대청동 계동로 153 상세주소임',
    buildingInfoTitle: '옥외저장소',
    categoryNumber: 23, //구분번호
    buildingNumber: '103동',
    buildingFloor: 7,
    serialNumber: 'MF482021000204',
    phones: [
      { phoneTitle: '주간전화', phoneNumber: '010-0000-2222' },
      { phoneTitle: '야간전화', phoneNumber: '010-0000-2222' },
    ],
  },
];

export const ToxicFacilityData = [
  {
    id: 10,
    phoneName: '방제실',
    distance: '10m',
    name: '건물명',
    storeName: '대상물 명칭',
    storeAddress: '경상남도 김해시 대청동 계동로 153 상세주소임',
    buildingInfo: [
      { title: '보유보호장비', text: '보호장비명, 보호장비명' },
      { title: '보유보호장비', text: '보호장비명, 보호장비명' },
    ],
    phones: [
      { phoneTitle: '안전관리자', phoneNumber: '010-0000-0000' },
      { phoneTitle: '대표자1', phoneNumber: '010-0000-5555' },
      { phoneTitle: '대표자2', phoneNumber: '010-0000-5555' },
    ],
  },
];

export const FacilityTabletData = [
  {
    id: 9,
    phoneName: '방제실',
    distance: '10m',
    name: '건물명',
    storeName: '좋은 이웃마트 장유점 (종합삭자재할인마트)',
    storeAddress: '경상남도 김해시 대청동 계동로 153',
    buildingNumber: '102동',
    buildingFloor: 7,
    danger: '부용도',
  },
];
