import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import SelectBox from '@/components/common/SelectBox/SelectBox';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { DeviceType } from '@/types/types';
import theme from '@/theme/colors';
import Calendar from '@/components/common/Calendar/Calendar';
import { CountByType } from './HomeFilterItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setSearchStartDate, setSearchEndDate } from '../slice/disasterSlice';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { setDate } from 'date-fns';

interface Props {
  NumberOfEmergencyDispatches: number;
  deviceType?: DeviceType;
  countByType: CountByType;
}

const typeMapping: { [K in keyof CountByType]: string } = {
  fires: "화재",
  rescue: "구조",
  firstAid: "구급",
  others: "기타"
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('it-IT').substring(0, 5);
};

const SearchDispatch = (props: Props) => {
  const dispatch = useDispatch()
  const { deviceType } = props;
  const [dates, setDates] = useState<{ value: string; label: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState(new Date().toLocaleTimeString('it-IT').substring(0, 5));

  const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'))

  useEffect(() => {
    adjustTimesBasedOnSelectedDate(selectedDate);
  }, []);

  const adjustTimesBasedOnSelectedDate = (date: Date) => {
    const now = new Date();
  
    // 시작 시간 설정
    const start = new Date(date);
    if (now.getHours() < 9) {
      // 현재 시간이 오전 9시 이전이면 전날 오전 9시로 설정
      start.setDate(start.getDate() - 1);
    }
    start.setHours(9, 0, 0, 0);
  
    // 종료 시간 설정
    let end = new Date(start);
    end.setDate(start.getDate() + 1);
    if (now < end || now.getHours() < 9) {
      // 현재 시간이 다음날 오전 9시 이전이면 현재 시간으로 설정
      end = now;
    }
  
    setStartTime(formatTime(start));
    setEndTime(formatTime(end));
  
    // 콘솔에 출력
    console.log("설정된 시작 시간:", formatDateAndTime(start));
    console.log("설정된 종료 시간:", formatDateAndTime(end));
    dispatch(setSearchStartDate(formatDateAndTime(start)+":00"))
    dispatch(setSearchEndDate(formatDateAndTime(end)+":00"))
  };

  const handleSearchCrear = () =>{
    const date = new Date()
    const newDate = dayjs(date).format('YYYY-MM-DD')
    setDate(newDate)
    adjustTimesBasedOnSelectedDate(new Date(newDate))
  }

  const formatDateAndTime = (date: Date) => {
    return `${date?.toISOString().split('T')[0]} ${formatTime(date)}`;
  };

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
    setDate(dayjs(newDate).format('YYYY-MM-DD'))
    adjustTimesBasedOnSelectedDate(newDate);
  };

  const handleStartTimeChange = (option: { value: string; label: string } | null) => {
    if (option) {
      setStartTime(option.value);
      const newStartDateTime = new Date(selectedDate);
      newStartDateTime.setHours(parseInt(option.value.split(':')[0]), parseInt(option.value.split(':')[1]));
      dispatch(setSearchStartDate(formatDateAndTime(newStartDateTime) + ":00"));
    }
  };


  const handleEndTimeChange = (option: { value: string; label: string } | null) => {
    if (!option) return;
  
    const endTimeValue = option.value;
    const [hour, minute] = endTimeValue.split(':').map(Number);
  
    // selectedDate에 기반하여 새로운 종료 날짜 및 시간을 설정
    const newEndDate = new Date(selectedDate);
    newEndDate.setHours(hour, minute, 0, 0);
  
    setEndTime(formatTime(newEndDate)); // 시간 업데이트
    dispatch(setSearchEndDate(formatDateAndTime(newEndDate) + ":00")); // Redux 상태 업데이트
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => ({
    value: `${i.toString().padStart(2, '0')}:00`,
    label: `${i.toString().padStart(2, '0')}:00`
  }));


  const count = (Object.entries(props.countByType) as [keyof CountByType, number][])
  .map(([key, value]) => `${typeMapping[key]} ${value}`)
  .join(', ');

  const generateDateOptions = () => {
    const options = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(new Date().getDate() - i);

      const formattedDate = date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      options.push({ value: formattedDate, label: formattedDate });
    }
    return options;
  };

  useEffect(() => {
    setDates(generateDateOptions());
  }, []);

  if (isEmpty(dates)) return null;

  if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
    return (
      <Wrapper deviceType={deviceType}>
        <Flex justify="space-between" align="center">
          {deviceType === 'tabletVertical' && (
            <Box width="148px">
              <Calendar height="44px" onDateChange={handleDateChange} date={date}/>
            </Box>
          )}
          <Flex gap="24px">
            {deviceType === 'tabletHorizontal' && (
              <Box width="148px">
                <Calendar height="44px" onDateChange={handleDateChange} date={date}/>
              </Box>
            )}
            <Flex gap="8px" align="center">
              <Time>시작시간</Time>
              <SelectBox width={90} height={32} options={timeOptions} padding="0px 8px" defaultValue={{ label: startTime, value: startTime }} onChange={handleStartTimeChange} />
              <Time>현재시간</Time>
              <SelectBox width={90} height={32} options={timeOptions} padding="0px 8px" defaultValue={{ label: endTime, value: endTime }}  onChange={handleEndTimeChange} />
              <StyledButton onClick={handleSearchCrear} deviceType={deviceType}>초기화</StyledButton>
            </Flex>
          </Flex>
          <EmergencyDispatch deviceType={deviceType}>
            <Stack spacing={deviceType === 'tabletHorizontal' ? '8px' : '4px'} align="center" direction={deviceType === 'tabletHorizontal' ? 'row' : 'column'}>
              <Flex gap="16px">
                <Flex gap="4px" align="center" width="fit-content">
                  <Box width="24px" height="24px" position="relative">
                    <Image src="/images/icons/Police car light.png" fill alt="경찰차 라이트" />
                  </Box>
                  <Text>긴급출동</Text>
                </Flex>
                <NumberOfEmergencyDispatches>
                  <span>{props.NumberOfEmergencyDispatches}</span> 건
                </NumberOfEmergencyDispatches>
              </Flex>
              <Status>{count}</Status>
            </Stack>
          </EmergencyDispatch>
        </Flex>
      </Wrapper>
    );
  }

  // 모바일
  return (
    <Wrapper>
      <Flex gap="16px">
        <Stack minW="149px" flex={1} spacing="8px">
          {/* <SelectBox height={44} options={dates} padding="12px 8px" defaultValue={dates[0]} /> */}
          <Calendar height="44px" onDateChange={handleDateChange} date={date}/>
          <EmergencyDispatch>
            <Flex gap="4px" align="center">
              <Box width="24px" height="24px" position="relative">
                <Image src="/images/icons/Police car light.png" fill alt="경찰차 라이트" />
              </Box>
              <Text>긴급출동</Text>
            </Flex>
            <NumberOfEmergencyDispatches>
              <span>{props.NumberOfEmergencyDispatches}</span> 건
            </NumberOfEmergencyDispatches>
          </EmergencyDispatch>
        </Stack>
        <Stack spacing="8px" flex={1}>
          <Flex w="100%" gap="8px" align="center">
            <Time>시작시간</Time>
            <SelectBox height={32} options={timeOptions} padding="0px 8px" defaultValue={{ label: startTime, value: startTime }} onChange={handleStartTimeChange}  />
          </Flex>
          <Flex w="100%" gap="8px" align="center">
            <Time>현재시간</Time>
            <SelectBox height={32} options={timeOptions} padding="0px 8px" defaultValue={{ label: endTime, value: endTime }} onChange={handleEndTimeChange}   />
          </Flex>
          <StyledButton onClick={handleSearchCrear}>초기화</StyledButton>
        </Stack>
      </Flex>
    </Wrapper>
  );
};

export default SearchDispatch;

SearchDispatch.defaultProps = {
  NumberOfEmergencyDispatches: 5,
};

const Wrapper = styled.div<{ deviceType?: DeviceType }>`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--02, #e9ecef);
  background: #fff;
  margin-top: 28px;

  ${({ deviceType }) =>
    deviceType &&
    `
    margin-top: 32px;
  `}
`;

const EmergencyDispatch = styled.div<{ deviceType?: DeviceType }>`
  display: flex;
  padding: 16px 12px;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  background: #f8f9fa;

  ${({ deviceType }) =>
    deviceType &&
    `
    width: fit-content;
    gap: 16px;
    flex: unset;
    justify-content: unset;
    padding: 8px 12px;
  `}
`;

const Text = styled.div`
  color: #6c757d;
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: -0.32px;
`;

const NumberOfEmergencyDispatches = styled.div`
  color: var(--10, #212529);
  font-family: Pretendard SemiBold;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.4px;

  span {
    color: var(--main, #ff8a3a);
    font-family: Pretendard SemiBold;
    font-size: 20px;
    line-height: 28px; /* 140% */
    letter-spacing: -0.4px;
  }
`;

const Time = styled.div`
  color: ${theme.colors.gray6};
  font-family: Pretendard Bold;
  font-size: 14px;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.28px;
`;

const StyledButton = styled.button<{ deviceType?: DeviceType }>`
  padding: 8px 16px;
  border-radius: 4px;
  background: var(--colors-orange, #ff8a3a);
  color: #fff;
  font-family: Pretendard Bold;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical') {
      return `
        min-width: 96px;
    `;
    }

    if (deviceType === 'tabletHorizontal') {
      return `
         min-width: 146px;
      `;
    }
  }}
`;

const Status = styled.div`
  color: var(--05, #adb5bd);
  font-family: Pretendard SemiBold;
  font-size: 12px;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;
`;
