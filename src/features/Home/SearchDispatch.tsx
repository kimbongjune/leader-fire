import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import SelectBox from '@/components/common/SelectBox/SelectBox';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { DeviceType, DispatchItemType } from '@/types/types';
import theme from '@/theme/colors';
import Calendar from '@/components/common/Calendar/Calendar';
import { CountByType } from './HomeFilterItem';

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

const SearchDispatch = (props: Props) => {
  const { deviceType } = props;
  const [dates, setDates] = useState<{ value: string; label: string }[]>([]);

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

  const timeOptions = [];

  for (let i = 0; i < 24; i++) {
    const formattedTime = `${i.toString().padStart(2, '0')}:00`;
    timeOptions.push({ value: formattedTime, label: formattedTime });
  }

  if (isEmpty(dates)) return null;

  if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
    return (
      <Wrapper deviceType={deviceType}>
        <Flex justify="space-between" align="center">
          {deviceType === 'tabletVertical' && (
            <Box width="148px">
              <Calendar height="44px" />
            </Box>
          )}
          <Flex gap="24px">
            {deviceType === 'tabletHorizontal' && (
              <Box width="148px">
                <Calendar height="44px" />
              </Box>
            )}
            <Flex gap="8px" align="center">
              <Time>시작시간</Time>
              <SelectBox width={90} height={32} options={timeOptions} padding="0px 8px" defaultValue={{ label: '09:00', value: '09:00' }} />
              <Time>현재시간</Time>
              <SelectBox width={90} height={32} options={timeOptions} padding="0px 8px" defaultValue={{ label: '13:00', value: '13:00' }} />
              <StyledButton deviceType={deviceType}>조회</StyledButton>
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
          <Calendar height="44px" />
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
            <SelectBox height={32} options={timeOptions} padding="0px 8px" defaultValue={{ label: '09:00', value: '09:00' }} />
          </Flex>
          <Flex w="100%" gap="8px" align="center">
            <Time>현재시간</Time>
            <SelectBox height={32} options={timeOptions} padding="0px 8px" defaultValue={{ label: '10:00', value: '10:00' }} />
          </Flex>
          <StyledButton>조회</StyledButton>
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
