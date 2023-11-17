import styled from '@emotion/styled';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import LeftArrow from '../../../public/images/icons/arrow-left.svg';
import Clock from '../../../public/images/icons/clock.svg';
import Map from '../../../public/images/icons/map.svg';
import Copy from '../../../public/images/icons/contentCopy.svg';
import { getPassedTime } from '@/utils/getPassedTime';
import MenuTab from '@/components/common/Menu/AddressTab';

interface Props {
  title: string;
  timestamp: string;
  address: string;
}

const DetailMenu = (props: Props) => {
  const router = useRouter();
  return (
    <div>
      <TopSection>
        <Flex gap="8px">
          <LeftArrow width="24px" height="24px" color="#fff" onClick={() => router.back()} />
          <Title>{props.title}</Title>
        </Flex>
        <Stack spacing="2px" align="flex-end">
          <TimeStamp>{props.timestamp}</TimeStamp>
          <Flex gap="2px" align="center">
            <Clock width="14px" height="14px" color="#ADB5BD" />
            <PassedTime>{getPassedTime(props.timestamp)} 경과</PassedTime>
          </Flex>
        </Stack>
      </TopSection>
      <MenuTab />
    </div>
  );
};

export default DetailMenu;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #343a40;
`;

const BottomSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid var(--08, #495057);
  background: var(--09, #343a40);
`;

const Title = styled.div`
  color: var(--00, #fff);
  font-family: NanumSquare;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 140% */
  letter-spacing: -0.4px;
`;

const TimeStamp = styled.div`
  color: var(--00, #fff);
  font-family: Pretendard SemiBold;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
`;

const PassedTime = styled.div`
  color: var(--05, #adb5bd);
  font-family: Pretendard SemiBold;
  font-size: 12px;
  line-height: 14px; /* 116.667% */
  letter-spacing: -0.24px;
`;

const Address = styled.div`
  color: var(--00, #fff);
  font-family: Pretendard SemiBold;
  font-size: 18px;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.36px;
  text-overflow: ellipsis;
`;
