let pollingInterval: NodeJS.Timeout | null = null;

export const setPollingInterval = (interval: NodeJS.Timeout): void => {
  pollingInterval = interval;
};

export const clearPollingInterval = (): void => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
};

export const isPollingActive = (): boolean => {
  return pollingInterval !== null;
};

export const fetchDisasterDetail = async (id: string): Promise<void> => {
    console.log(`api call!!!!!!!!! disaster ID: ${id}`);
    // TODO 재난정보 상세조회 실제 API 호출 코드, redux store에 저장
    // return await fetch(`/api/disaster/${id}`);
    {
        [
          {
            "CTL_DESC" : "[구조-동물구조][긴급구조위치] (지)경상남도 거제시 거제면 남동리 3 ",
            "CTL_SEQ" : 1,
            "PROC_SITU_CD" : "0140001",
            "CTL_PROC_DTIME" : "20231026103952"
          },
          {
            "CTL_DESC" : "[주촌-피음주촌펌프(화학)(펌프차)]출동지령\n",
            "CTL_SEQ" : 2,
            "PROC_SITU_CD" : "0140002",
            "CTL_PROC_DTIME" : "20231026104022"
          }
        ]
      }
  };