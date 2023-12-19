import { Box, Flex, Stack } from '@chakra-ui/react';
import EventStatus from './EventStatus';
import styled from '@emotion/styled';
import Clock from '../../../public/images/icons/clock.svg';
import RightArrow from '../../../public/images/icons/arrow-right.svg';
import { useRouter } from 'next/router';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import { DeviceType, apiPostResponse } from '@/types/types';
import theme from '@/theme/colors';
import { useDispatch } from 'react-redux';
import { setSubDisasterInformation, setDisasterInformation } from '../../features/slice/disasterSlice';
import { useEffect } from 'react';
import { getPassedTime } from '@/utils/getPassedTime';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import axios from "../../components/common/api/axios"

interface Props {
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
  hasRead:boolean
  deviceType?: DeviceType;
}

const DispatchItem = (props: Props) => {
  const dispatch = useDispatch()
  const { deviceType } = props;
  const router = useRouter();

  const useInfo = useSelector((state: RootState) => state.userReducer.userInfo);

  const testData = useSelector((state: RootState) => state.disaster.disasterInformation);

  const moveDetailPage = async () => {
    console.log("move page")

    const viewResult = await axios.put<apiPostResponse>("/api/disaster_info/check_res",{
      userId : useInfo.userId,
      dsrSeq : props.dsrSeq
    })

    if(viewResult.data.responseCode === 200) {
      dispatch(setSubDisasterInformation(props))
      const updatedTestData = testData.map(item => 
        item.dsrSeq === props.dsrSeq ? { ...item, isNew: false } : item
      );
      dispatch(setDisasterInformation(updatedTestData));
      router.push(`/detail/${props.dsrSeq}`)
    }else{
      console.log("viewResult call failed")
      dispatch(setSubDisasterInformation(props))
      router.push(`/detail/${props.dsrSeq}`)
    }
  }

  return (
    <Container className="dispatch-item" onClick={moveDetailPage} deviceType={deviceType} type={props.type}>
      <Flex align="center">
        <Stack spacing={deviceType === 'mobile' ? '0px' : '16px'} w={deviceType === 'tabletHorizontal' ? 'auto' : '100%'}>
          <Flex gap={deviceType === 'mobile' ? '12px' : '16px'} align="center">
            <EventStatus eventType={props.type} reportCount={props.reportCount} status={props.status} />
            <Stack spacing={deviceType === 'mobile' ? '8px' : '0px'} position="relative" flex={1} w={deviceType === 'tabletHorizontal' ? '256px' : '100%'}>
              <Stack spacing="4px">
                <Flex align="center" gap="4px" justify={deviceType === 'tabletHorizontal' ? 'flex-start' : 'space-between'}>
                  <Title>{props.eventName}</Title>
                  <Time>
                    <Clock width={14} height={14} color="#ADB5BD" />
                    {getPassedTime(props?.created!!)} 경과
                  </Time>
                </Flex>
                <Address>{props.lawAddr}</Address>
              </Stack>
              <Flex gap="9px">
                {deviceType === 'mobile' && (
                  <>
                    <Description dangerouslySetInnerHTML={{ __html: props?.description!! }} />
                    <Box width="16px" />
                  </>
                )}
              </Flex>
              {deviceType === 'mobile' && (
                <Box position="absolute" right="0" top="50%" transform="translateY(-50%)">
                  <RightArrow width="16px" height="16px" color="#909AA4" />
                </Box>
              )}
            </Stack>
          </Flex>
          {deviceType === 'tabletVertical' && (
            <Flex justify="space-between">
              <Description dangerouslySetInnerHTML={{ __html: props?.description!! }} />
              <Flex align="center" gap="16px">
                {props.isNew && <NewDataDisplay type={props.type}>신규</NewDataDisplay>}
                <IconWrapper width="16px" height="16px" color="#909AA4">
                  <RightArrow />
                </IconWrapper>
              </Flex>
            </Flex>
          )}
        </Stack>
        {deviceType === 'tabletHorizontal' && (
          <>
            <Divider />
            <Description dangerouslySetInnerHTML={{ __html: props?.description!! }} />
            <Flex align="center" gap="16px">
              {props.isNew && <NewDataDisplay type={props.type}>신규</NewDataDisplay>}
              <IconWrapper width="16px" height="16px" color="#909AA4">
                <RightArrow />
              </IconWrapper>
            </Flex>
          </>
        )}
      </Flex>
    </Container>
  );
};

export default DispatchItem;

DispatchItem.defaultProps = {
  status: 'progress',
  reportCount: 1,
  eventName: '기타화재',
  type: 'fires',
  address: '경남 진주시 진주대로 234-13',
  description: '신고 내용 표시합니다. 마그네슘 공장화재 /검은 연기가 엄청나다 /사람들이 대피중이다',
  created: '2023.10.11 09:00',
};

const Container = styled.div<any>`
  ${({ deviceType, type }: { deviceType?: DeviceType; type: string }) => {
    if (deviceType !== 'mobile') {
      if (type === 'fires') {
        return `
        &:hover {
          border-radius: 16px;
          border: 1px solid rgba(255, 138, 58, 0.40);
        }
        `;
      }

      if (type === 'rescue') {
        return `
        &:hover {
          border-radius: 16px;
          border: 1px solid rgba(121, 158, 255, 0.4);
        }
        `;
      }

      if (type === 'firstAid') {
        return `
        &:hover {
          border-radius: 16px;
          border: 1px solid rgba(29, 206, 0, 0.4);
        }
        `;
      }

      if (type === 'others') {
        return `
        &:hover {
          border-radius: 16px;
          border: 1px solid rgba(164, 101, 227, 0.4);
        }
        `;
      }
    }
  }}

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
      padding: 12px 16px;
      `;
    }
  }}
`;

const Title = styled.div`
  color: var(--10, #212529);
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: -0.32px;
`;

const Address = styled.div`
  color: var(--06, #909aa4);
  font-family: Pretendard SemiBold;
  font-size: 14px;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.28px;
`;

const Description = styled.div`
  flex: 1;
  color: var(--08, #495057);
  font-family: Pretendard Medium;
  font-size: 14px;
  line-height: 18px; /* 128.571% */
  letter-spacing: -0.28px;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  color: var(--05, #adb5bd);
  font-family: Pretendard SemiBold;
  font-size: 12px;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;
`;

const Divider = styled.div`
  height: 32px;
  margin: 0 16px;
  border-left: 1px solid ${theme.colors.gray2};
`;

const NewDataDisplay = styled.div<any>`
  padding: 2px 4px;
  color: ${theme.colors.white};
  font-family: Pretendard Bold;
  font-size: 12px;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;
  border-radius: 4px;

  ${({ type }) => {
    if (type === 'fires') {
      return `
        background: ${theme.colors.orange};
        `;
    }

    if (type === 'rescue') {
      return `
        background: ${theme.colors.blue};
        `;
    }

    if (type === 'firstAid') {
      return `
        background: ${theme.colors.green};
        `;
    }

    if (type === 'others') {
      return `
        background: ${theme.colors.purple};
        `;
    }
  }}
`;
