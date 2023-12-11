import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import ChevronRight from '../../../public/images/icons/chevron-right.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { DeviceType } from '@/types/types';
import theme from '@/theme/colors';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { selectDisasterById } from '../slice/test';
import proj4 from 'proj4';

interface Props {
  description: string;
  deviceType: DeviceType;
  callTell:string;
}

const epsg5181: string = '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs';

const convertCoordinateSystem = (x:number, y:number):[number, number] => {
  return proj4(epsg5181, 'EPSG:4326', [x,y]);
}

//TODO 신고내용 간략 표시 탭
const ReportItem = (props: Props) => {
  const { deviceType } = props;
  const router = useRouter();

  const id = router.query.id as string;

  const data = useSelector((state: RootState) => selectDisasterById(state, id), shallowEqual);

  console.log(data)


  const openThirdPartyMapApplication = (mapType:string) =>{
    if(data){
      if (window.fireAgency && window.fireAgency.openThirdPartyMapApplication) {
        console.log(data?.gisX, data?.gisY)
        const location = convertCoordinateSystem(data.gisX, data.gisY)
        console.log(location)
        if(data.gisX && data.gisY){
          window.fireAgency.openThirdPartyMapApplication(mapType, location[0].toString(), location[1].toString(), data.lawAddr);
        }else{
          return alert("재난 좌표 정보가 없습니다.")
        }
      }
    }
  }

  return (
    <Stack spacing="8px">
      <Title>신고내용</Title>
      <ReportContentWrapper>
        {props.description}
        <StyledButton onClick={() => router.push(`/detail/${router.query.id}/report`)} deviceType={deviceType}>
          <Flex gap="4px" justify={deviceType === 'mobile' ? 'center' : 'flex-end'} align="center">
            <Box pt="2px">더보기</Box>
            <ChevronRight width="24px" height="24px" color="#6C757D" />
          </Flex>
        </StyledButton>
      </ReportContentWrapper>
      <TabBar>
        <Flex justify="space-between" gap="24px" align="center">
          <Flex gap="12px" align="center" width="fit-content">
          <a href={props.callTell && props.callTell?.trim() != "" ? `tel:${props.callTell}` : undefined}>
              <Image src="/images/icons/call.png" width={36} height={36} alt="통화 아이콘" />
          </a>
            <Image src="/images/icons/naverMap.png" width={36} height={36} alt="네이버지도 아이콘" onClick={() => openThirdPartyMapApplication("naver")}/>
            <Image src="/images/icons/kakaoMap.png" width={36} height={36} alt="카카오지도 아이콘"onClick={() => openThirdPartyMapApplication("kakao")} />
            <Image src="/images/icons/map.png" width={36} height={36} alt="원내비지도 아이콘" onClick={() => openThirdPartyMapApplication("onenavi")} />
          </Flex>
          <Response deviceType={deviceType}>대응 단계 없음</Response>
        </Flex>
      </TabBar>
    </Stack>
  );
};

export default ReportItem;

const Title = styled.div`
  color: ${theme.colors.gray6};
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;

const ReportContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;

  color: var(--08, #495057);
  text-overflow: ellipsis;
  whitespace: nowrap;
  font-family: Pretendard SemiBold;
  font-size: 16px;
  line-height: 24px; /* 125% */
  letter-spacing: -0.32px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  background: var(--00, #fff);
`;

const StyledButton = styled.button<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray6};
  text-overflow: ellipsis;
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: -0.32px;

  padding: 8px 0;
  border-radius: 4px;
  outline: 1px solid #e9ecef;
  background: #f8f9fa;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        padding: 0;
        outline: unset;
        background: ${theme.colors.white};
      `;
    }
  }}
`;

const TabBar = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--02, #e9ecef);
  background: var(--02, #e9ecef);
  backdrop-filter: blur(8px);
`;

const Response = styled.div<{ deviceType: DeviceType }>`
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  color: #495057;
  font-family: Pretendard Bold;
  font-size: 14px;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.28px;
  flex-shrink: 0;

  padding: 8px 13px;
  border-radius: 4px;
  background: #ced4da;
`;
