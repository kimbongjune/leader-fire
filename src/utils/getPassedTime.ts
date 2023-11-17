import dayjs from 'dayjs';

export const getPassedTime = (time : string) => {
  const currentTime = dayjs();
  const differenceInMinutes = currentTime.diff(time, 'minute');
  const passedHours = Math.floor(differenceInMinutes / 60);
  const passeddMinutes = differenceInMinutes % 60;

  if (passedHours === 0) return `${passeddMinutes}분`;
  return `${passedHours}시간 ${passeddMinutes}분`;
}