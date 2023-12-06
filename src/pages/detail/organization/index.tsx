import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import Layout from '@/components/common/Layout/Layout';
import Menu from '@/components/common/Menu/Menu';
import SwiperView from '@/components/common/SwiperView/SwiperView';
import DetailItem from '@/features/Detail/DetailItem';
import OrganizationTable, { OrganizationTableDataType } from '@/features/Detail/Table/OrganizationTable';
import { OrganizationTableData } from '@/features/Detail/Table/TableData';
import VehicleStatusTable, { VehicleStatusTableDataType } from '@/features/Detail/Table/VehicleStatusTable';
import VehicleTable, { VehicleTableRowType } from '@/features/Detail/Table/VehicleTable';
import useDeviceType from '@/hooks/useDeviceType';
import { CenterListA, CenterListB, CenterListC, CenterListD, DeviceType, MobilizeData } from '@/types/types';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import SwiperIcon from '../../../../public/images/icons/swipe.svg';
import theme from '@/theme/colors';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';
import axios from '@/components/common/api/axios';

type VehicleDataItem = {
  type: string;
  vehicleCount: number;
  peopleCount:number
};

type VehicleGroupItem = {
  vehicleType: string;
  vehicleColor: string;
  data: VehicleDataItem[];
};

const organizationTableARowData = (data: CenterListA[]): OrganizationTableDataType => {
  const groupedData: Record<string, { dispatcherType: string; data: { type: string; vehicleCount: number; peopleCount: number; }[] }> = {};
  let totalVehicleCount = 0;
  let totalPeopleCount = 0;

  data?.forEach((item) => {
    const { teamClsNm, teamName, type1TeamCnt } = item;

    if (!teamClsNm) return;

    if (!groupedData[teamClsNm]) {
      groupedData[teamClsNm] = {
        dispatcherType: teamClsNm,
        data: []
      };
    }

    const vehicleCount = parseInt(type1TeamCnt || '0', 10);
    totalVehicleCount += vehicleCount;

    groupedData[teamClsNm].data.push({
      type: teamName || '',
      vehicleCount,
      peopleCount: 0
    });
  });

  return {
    rowData: Object.values(groupedData).map(group => ({
      dispatcherType: group.dispatcherType,
      dispatcherColor: theme.colors.orange, // 적절한 색상 코드로 변경 가능
      data: group.data
    })),
    total: {
      vehicleCount: totalVehicleCount,
      peopleCount: totalPeopleCount
    }
  };
};

const organizationTableBRowData = (data: CenterListB[]): OrganizationTableDataType => {
  const groupedData: Record<string, { dispatcherType: string; data: { type: string; vehicleCount: number; peopleCount: number; }[] }> = {};
  let totalVehicleCount = 0; // 차량 수 총계
  let totalPeopleCount = 0; // 인원 수 총계

  data?.forEach((item) => {
    const { teamClsNm, teamName, type1TeamCnt } = item;

    if (!teamClsNm) return;

    if (!groupedData[teamClsNm]) {
      groupedData[teamClsNm] = {
        dispatcherType: teamClsNm,
        data: []
      };
    }

    const peopleCount = parseInt(type1TeamCnt || '0', 10);
    totalPeopleCount += peopleCount; // 인원 수에 더함

    groupedData[teamClsNm].data.push({
      type: teamName || '',
      vehicleCount: 0, // 각 팀별로 차량 1대로 가정
      peopleCount
    });
  });

  return {
    rowData: Object.values(groupedData).map(group => ({
      dispatcherType: group.dispatcherType,
      dispatcherColor: theme.colors.red,
      data: group.data
    })),
    total: {
      vehicleCount: totalVehicleCount,
      peopleCount: totalPeopleCount // 총 인원 수
    }
  };
};

const organizationTableCRowData = (data: CenterListC[]): OrganizationTableDataType => {
  const groupedData: Record<string, { dispatcherType: string; data: { type: string; vehicleCount: number; peopleCount: number; }[] }> = {};
  let totalVehicleCount = 0; // 차량 수 총계
  let totalPeopleCount = 0; // 인원 수 총계

  data?.forEach((item) => {
    const { teamClsNm, teamName, type1TeamCnt } = item;

    if (!teamClsNm) return;

    if (!groupedData[teamClsNm]) {
      groupedData[teamClsNm] = {
        dispatcherType: teamClsNm,
        data: []
      };
    }

    const peopleCount = parseInt(type1TeamCnt || '0', 10);
    totalPeopleCount += peopleCount; // 인원 수에 더함

    groupedData[teamClsNm].data.push({
      type: teamName || '',
      vehicleCount: 0, // 각 팀별로 차량 1대로 가정
      peopleCount
    });
  });

  return {
    rowData: Object.values(groupedData).map(group => ({
      dispatcherType: group.dispatcherType,
      dispatcherColor: theme.colors.red,
      data: group.data
    })),
    total: {
      vehicleCount: totalVehicleCount,
      peopleCount: totalPeopleCount // 총 인원 수
    }
  };
};

const organizationTableDRowData = (data: CenterListD[]): VehicleTableRowType => {
  const groupedByType: Record<string, VehicleGroupItem> = {};
  let totalVehicleCount = 0;
  let totalPeopleCount = 0; // 이 예제에서는 항상 0으로 설정됩니다.

  data?.forEach(item => {
    const vehicleType = item.teamClsNm || '기타';
    const teamName = item.teamName || '기타';
    const vehicleCount = parseInt(item.type1TeamCnt || '0', 10);
    totalVehicleCount += vehicleCount;

    if (!groupedByType[vehicleType]) {
      groupedByType[vehicleType] = {
        vehicleType,
        vehicleColor: '#f8f9fa', // 색상은 필요에 따라 변경 가능
        data: []
      };
    }

    const vehicleGroup = groupedByType[vehicleType];
    const existingDataItem = vehicleGroup.data.find(d => d.type === teamName);

    if (existingDataItem) {
      existingDataItem.vehicleCount += vehicleCount;
    } else {
      vehicleGroup.data.push({
        type: teamName,
        vehicleCount,
        peopleCount: 0
      });
    }
  });

  // 각 그룹별 소계 추가
  Object.values(groupedByType).forEach(group => {
    const subtotalVehicleCount = group.data.reduce((total, item) => total + item.vehicleCount, 0);
    group.data.push({
      type: '소계',
      vehicleCount: subtotalVehicleCount,
      peopleCount: 0
    });
  });

  return {
    rowData: Object.values(groupedByType),
    total: {
      vehicleCount: totalVehicleCount,
      peopleCount: totalPeopleCount
    }
  };
};

const combineOrganizationData = (
  dataA: OrganizationTableDataType,
  dataB: OrganizationTableDataType,
  dataC: OrganizationTableDataType
): OrganizationTableDataType => {
  // rowData 배열들을 연결
  const combinedRowData = [
    ...dataA.rowData,
    ...dataB.rowData,
    ...dataC.rowData
  ];

  // total 객체들의 vehicleCount 및 peopleCount 합산
  const combinedTotal = {
    vehicleCount: dataA.total.vehicleCount + dataB.total.vehicleCount + dataC.total.vehicleCount,
    peopleCount: dataA.total.peopleCount + dataB.total.peopleCount + dataC.total.peopleCount
  };

  return {
    rowData: combinedRowData,
    total: combinedTotal
  };
};


//TODO 출동대 편성 상세보기 페이지
const OrganizationPage = () => {
  const router = useRouter();
  const deviceType = useDeviceType();

  const id = router.query.id as string;

  const apiIntervalRef = useRef<NodeJS.Timer | null>(null);

  const [vehicleData, setVehicleData] = useState<VehicleStatusTableDataType>()

  const [taskForceOrganization, setTaskForceOrganization] = useState<OrganizationTableDataType>()
  const [dispathcesOrganization, setDispathcesOrganization] = useState<OrganizationTableDataType>()
  const [mobilizationOrganization, setMobilizationOrganization] = useState<OrganizationTableDataType>()
  const [arrivalOrganization, setArrivalOrganization] = useState<OrganizationTableDataType>()
  const [homeComingOrganization, setHomeComingOrganization] = useState<OrganizationTableDataType>()

  const [taskForeceVehicle, setTaskForeceVehicle] = useState<VehicleTableRowType>()
  const [dispathcesVehicle, setDispathcesVehicle] = useState<VehicleTableRowType>()
  const [mobilizationVehicle, setMobilizationVehicle] = useState<VehicleTableRowType>()
  const [ariivalVehicle, setAriivalVehicle] = useState<VehicleTableRowType>()
  const [homeComingVehicle, setHomeComingVehicle] = useState<VehicleTableRowType>()

  useEffect(() => {
    if (id) {
      const fetchData = async () =>{
        const data = await axios.get<MobilizeData>('/api/disaster_info/seq',{
          params: {
            dsrSeq : id
          }
        });

        if(data.data.responseCode === 200){
          const contingentList = data.data.result[0].dspAggregateDtoList.result?.contingentList?.map(item => {
            return {
                callingName: item.eleType2 || '', // eleType2 값이 없으면 빈 문자열
                status: item.eleType4 || '-', // eleType4 값이 없으면 빈 문자열
                peopleCount: 0 // peopleCount는 항상 0
            };
        });

        const total = {
          vehicleCount : contingentList?.length || 0,
          peopleCount : 0
        }

        const contingentListResult:VehicleStatusTableDataType = {
          rowData : contingentList,
          total : total
        }

        setVehicleData(contingentListResult)

        const taskForceOrganizationAggregationByCenter = organizationTableARowData(data.data.result[0].dspAggregateDtoList?.result?.centerListA)
        const taskForceOrganizationAggregationByVolunteer = organizationTableBRowData(data.data.result[0].dspAggregateDtoList?.result?.centerListB)
        const taskForceOrganizationAggregationByHsaver = organizationTableCRowData(data.data.result[0].dspAggregateDtoList?.result?.centerListC)
        const taskForceOrganizationAggregationByCar = organizationTableDRowData(data.data.result[0].dspAggregateDtoList?.result?.centerListD)

        const dispatchesAggregationByCenter = organizationTableARowData(data.data.result[0].dspAggregateDtoList?.result?.dispatchedA)
        const dispatchesAggregationByVolunteer = organizationTableBRowData(data.data.result[0].dspAggregateDtoList?.result?.dispatchedB)
        const dispatchesAggregationByHSaver = organizationTableCRowData(data.data.result[0].dspAggregateDtoList?.result?.dispatchedC)
        const dispatchesAggregationByCar = organizationTableDRowData(data.data.result[0].dspAggregateDtoList?.result?.dispatchedD)

        const mobilizationAggregationByCenter = organizationTableARowData(data.data.result[0].dspAggregateDtoList?.result?.mobilizeA)
        const mobilizationAggregationByVolunteer = organizationTableBRowData(data.data.result[0].dspAggregateDtoList?.result?.mobilizeB)
        const mobilizationAggregationByHSaver = organizationTableCRowData(data.data.result[0].dspAggregateDtoList?.result?.mobilizeC)
        const mobilizationAggregationByCar = organizationTableDRowData(data.data.result[0].dspAggregateDtoList?.result?.mobilizeD)

        const arrivalAggregationByCenter = organizationTableARowData(data.data.result[0].dspAggregateDtoList?.result?.arrivalA)
        const arrivalAggregationByVolunteer = organizationTableBRowData(data.data.result[0].dspAggregateDtoList?.result?.arrivalB)
        const arrivalAggregationByHSaver = organizationTableCRowData(data.data.result[0].dspAggregateDtoList?.result?.arrivalC)
        const arrivalAggregationByCar = organizationTableDRowData(data.data.result[0].dspAggregateDtoList?.result?.arrivalD)

        const homComingAggregationByCenter = organizationTableARowData(data.data.result[0].dspAggregateDtoList?.result?.homecomingA)
        const homComingAggregationByVolunteer = organizationTableBRowData(data.data.result[0].dspAggregateDtoList?.result?.homecomingB)
        const homComingAggregationByHSaver = organizationTableCRowData(data.data.result[0].dspAggregateDtoList?.result?.homecomingC)
        const homComingAggregationByCar = organizationTableDRowData(data.data.result[0].dspAggregateDtoList?.result?.homecomingD)

        setTaskForceOrganization(combineOrganizationData(taskForceOrganizationAggregationByCenter, taskForceOrganizationAggregationByVolunteer, taskForceOrganizationAggregationByHsaver))
        setTaskForeceVehicle(taskForceOrganizationAggregationByCar)

        setDispathcesOrganization(combineOrganizationData(dispatchesAggregationByCenter, dispatchesAggregationByVolunteer, dispatchesAggregationByHSaver))
        setDispathcesVehicle(dispatchesAggregationByCar)

        setMobilizationOrganization(combineOrganizationData(mobilizationAggregationByCenter, mobilizationAggregationByVolunteer, mobilizationAggregationByHSaver))
        setMobilizationVehicle(mobilizationAggregationByCar)

        setArrivalOrganization(combineOrganizationData(arrivalAggregationByCenter, arrivalAggregationByVolunteer, arrivalAggregationByHSaver))
        setAriivalVehicle(arrivalAggregationByCar)

        setHomeComingOrganization(combineOrganizationData(homComingAggregationByCenter, homComingAggregationByVolunteer, homComingAggregationByHSaver))
        setHomeComingVehicle(homComingAggregationByCar)

        console.log(taskForceOrganizationAggregationByCenter)
        console.log(dispatchesAggregationByCenter)
        }

      }
      fetchData()
      apiIntervalRef.current =  setInterval(() => fetchData(), 60000);
    }
    
    return () => {
      if (apiIntervalRef.current) {
        clearInterval(apiIntervalRef.current);
      }
    };
  }, [id]);

  if (!deviceType ) return null;

  if (!vehicleData || !taskForeceVehicle ) return null;
  return (
    <Layout>
      <Flex direction="column" height="100%" background={theme.colors.gray1}>
        <MenuWrapper deviceType={deviceType}>
          <Menu title="출동대 편성" contentAlign="center" hasBackButton={false} onCloseButton={() => router.back()} />
        </MenuWrapper>
        {deviceType === 'mobile' && (
          <Flex align="center" justify="center" m="16px" gap="8px">
            <IconWrapper width="20px" height="20px" color={theme.colors.gray}>
              <SwiperIcon />
            </IconWrapper>
            <Guide>좌우 스크롤로 확인하실 수 있습니다</Guide>
          </Flex>
        )}
        <Children deviceType={deviceType}>
          {deviceType === 'mobile' && (
            <SwiperWrapper>
              <Swiper className="mySwiper" slidesPerView={1.1} spaceBetween={8} centeredSlides={true}>
                <SwiperSlide>
                  <DetailItemWrapperForTitle>
                    <DetailItem title="출동대 편성 목록 (60초마다 갱신, #1)">
                      <VehicleStatusTable data={vehicleData!!} deviceType={deviceType} />
                    </DetailItem>
                  </DetailItemWrapperForTitle>
                </SwiperSlide>
                <SwiperSlide>
                  <DetailItemWrapperForTitle>
                    <DetailItem title="소방서별 출동대 집계 (60초마다 갱신, #2)">
                      <Stack spacing="12px">
                        <OrganizationTable data={taskForceOrganization} columnNames={['구분', '차량수', '인원수']}  deviceType={deviceType} />
                        <VehicleTable rowData={taskForeceVehicle} deviceType={deviceType} />
                      </Stack>
                    </DetailItem>
                  </DetailItemWrapperForTitle>
                </SwiperSlide>
                <SwiperSlide>
                  <DetailItemWrapperForTitle>
                    <DetailItem title="출동대 편성 집계 (60초마다 갱신, #3)">
                      <OrganizationTable  data={dispathcesOrganization} columnNames={['구분', '차량수', '인원수']} deviceType={deviceType} />
                      <VehicleTable rowData={dispathcesVehicle} deviceType={deviceType} />
                    </DetailItem>
                  </DetailItemWrapperForTitle>
                </SwiperSlide>
                <SwiperSlide>
                  <DetailItemWrapperForTitle minW="343px">
                    <DetailItem title="출동 집계 (60초마다 갱신, #4)">
                      <OrganizationTable  data={mobilizationOrganization} columnNames={['구분', '출동', '인원수']} deviceType={deviceType} />
                      <VehicleTable rowData={mobilizationVehicle} deviceType={deviceType} />
                    </DetailItem>
                  </DetailItemWrapperForTitle>
                </SwiperSlide>
                <SwiperSlide>
                  <DetailItemWrapperForTitle minW={deviceType === 'mobile' && '343px'}>
                    <DetailItem title="현장도착 집계 (60초마다 갱신, #5)">
                      <OrganizationTable  data={arrivalOrganization} columnNames={['구분', '현장도착', '인원수']} deviceType={deviceType} />
                      <VehicleTable rowData={ariivalVehicle} deviceType={deviceType} />
                    </DetailItem>
                  </DetailItemWrapperForTitle>
                </SwiperSlide>
                <SwiperSlide>
                  <DetailItemWrapperForTitle minW={deviceType === 'mobile' && '343px'}>
                    <DetailItem title="귀소 집계 (60초마다 갱신, #6)">
                      <OrganizationTable  data={homeComingOrganization} columnNames={['구분', '귀소', '인원수']} deviceType={deviceType} />
                      <VehicleTable rowData={homeComingVehicle} deviceType={deviceType} />
                    </DetailItem>
                  </DetailItemWrapperForTitle>
                </SwiperSlide>
              </Swiper>
            </SwiperWrapper>
          )}
          {deviceType !== 'mobile' && (
            <SwiperViewWrapper deviceType={deviceType}>
              <SwiperView gap={deviceType === 'tabletVertical' ? 40 : 48}>
                <DetailItemWrapperForTitle>
                  <DetailItemWrapper>
                    <DetailItem title="출동대 편성 목록 (60초마다 갱신, #1)">
                      {deviceType === 'tabletVertical' && (
                        <Stack spacing="12px">
                          <VehicleStatusTable data={vehicleData!!}  deviceType={deviceType} />
                        </Stack>
                      )}
                      {deviceType === 'tabletHorizontal' && (
                        <Flex gap="16px">
                          <Box flex={1}>
                            <VehicleStatusTable data={vehicleData!!}  deviceType={deviceType} />
                          </Box>
                        </Flex>
                      )}
                    </DetailItem>
                  </DetailItemWrapper>
                </DetailItemWrapperForTitle>
                <DetailItemWrapperForTitle>
                  <DetailItemWrapper>
                    <DetailItem title="소방서별 출동대 집계 (60초마다 갱신, #2)">
                      {deviceType === 'tabletVertical' && (
                        <Stack spacing="12px">
                          <OrganizationTable  data={taskForceOrganization} columnNames={['구분', '차량수', '인원수']} deviceType={deviceType} />
                          <VehicleTable rowData={taskForeceVehicle} deviceType={deviceType} />
                        </Stack>
                      )}
                      {deviceType === 'tabletHorizontal' && (
                        <Flex gap="16px">
                          <Box flex={1}>
                            <OrganizationTable  data={taskForceOrganization} columnNames={['구분', '차량수', '인원수']} deviceType={deviceType} />
                          </Box>
                          <Box flex={1}>
                            <VehicleTable rowData={taskForeceVehicle} deviceType={deviceType} />
                          </Box>
                        </Flex>
                      )}
                    </DetailItem>
                  </DetailItemWrapper>
                </DetailItemWrapperForTitle>
                <DetailItemWrapperForTitle>
                  <DetailItemWrapper>
                    <DetailItem title="출동대 편성 집계 (60초마다 갱신, #3)">
                      {deviceType === 'tabletVertical' && (
                        <Stack spacing="12px">
                          <OrganizationTable data={dispathcesOrganization} columnNames={['구분', '차량수', '인원수']} deviceType={deviceType} />
                          <VehicleTable rowData={dispathcesVehicle} deviceType={deviceType} />
                        </Stack>
                      )}
                      {deviceType === 'tabletHorizontal' && (
                        <Flex gap="16px">
                          <Box flex={1}>
                            <OrganizationTable data={dispathcesOrganization} columnNames={['구분', '차량수', '인원수']} deviceType={deviceType} />
                          </Box>
                          <Box flex={1}>
                            <VehicleTable rowData={dispathcesVehicle} deviceType={deviceType} />
                          </Box>
                        </Flex>
                      )}
                    </DetailItem>
                  </DetailItemWrapper>
                </DetailItemWrapperForTitle>
                <DetailItemWrapperForTitle>
                  <DetailItemWrapper>
                    <DetailItem title="출동 집계 (60초마다 갱신, #4)">
                      {deviceType === 'tabletVertical' && (
                        <Stack spacing="12px">
                          <OrganizationTable data={mobilizationOrganization} columnNames={['구분', '출동', '인원수']} deviceType={deviceType} />
                          <VehicleTable rowData={mobilizationVehicle} deviceType={deviceType} />
                        </Stack>
                      )}
                      {deviceType === 'tabletHorizontal' && (
                        <Flex gap="16px">
                          <Box flex={1}>
                            <OrganizationTable data={mobilizationOrganization} columnNames={['구분', '출동', '인원수']} deviceType={deviceType} />
                          </Box>
                          <Box flex={1}>
                            <VehicleTable rowData={mobilizationVehicle} deviceType={deviceType} />
                          </Box>
                        </Flex>
                      )}
                    </DetailItem>
                  </DetailItemWrapper>
                </DetailItemWrapperForTitle>
                <DetailItemWrapperForTitle>
                  <DetailItemWrapper>
                    <DetailItem title="현장도착 집계 (60초마다 갱신, #5)">
                      {deviceType === 'tabletVertical' && (
                        <Stack spacing="12px">
                          <OrganizationTable data={arrivalOrganization} columnNames={['구분', '현장도착', '인원수']} deviceType={deviceType} />
                          <VehicleTable rowData={ariivalVehicle} deviceType={deviceType} />
                        </Stack>
                      )}
                      {deviceType === 'tabletHorizontal' && (
                        <Flex gap="16px">
                          <Box flex={1}>
                            <OrganizationTable data={arrivalOrganization} columnNames={['구분', '현장도착', '인원수']} deviceType={deviceType} />
                          </Box>
                          <Box flex={1}>
                            <VehicleTable rowData={ariivalVehicle} deviceType={deviceType} />
                          </Box>
                        </Flex>
                      )}
                    </DetailItem>
                  </DetailItemWrapper>
                </DetailItemWrapperForTitle>
                <DetailItemWrapperForTitle>
                  <DetailItemWrapper>
                    <DetailItem title="귀소 집계 (60초마다 갱신, #6)">
                      {deviceType === 'tabletVertical' && (
                        <Stack spacing="12px">
                          <OrganizationTable data={homeComingOrganization} columnNames={['구분', '귀소', '인원수']} deviceType={deviceType} />
                          <VehicleTable rowData={homeComingVehicle} deviceType={deviceType} />
                        </Stack>
                      )}
                      {deviceType === 'tabletHorizontal' && (
                        <Flex gap="16px">
                          <Box flex={1}>
                            <OrganizationTable data={homeComingOrganization} columnNames={['구분', '귀소', '인원수']} deviceType={deviceType} />
                          </Box>
                          <Box flex={1}>
                            <VehicleTable rowData={homeComingVehicle} deviceType={deviceType} />
                          </Box>
                        </Flex>
                      )}
                    </DetailItem>
                  </DetailItemWrapper>
                </DetailItemWrapperForTitle>
              </SwiperView>
            </SwiperViewWrapper>
          )}
        </Children>
      </Flex>
    </Layout>
  );
};

export default OrganizationPage;

const Children = styled.div<{ deviceType: DeviceType }>`
  display: flex;
  flex-direction: column;
  // gap: 20px;
  flex: 1;
  background: #f8f9fa;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
  }

  scrollbar-width: none;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        padding: 0;
        // margin: 24px 0;
      }
      `;
    }
  }}
`;

const MenuWrapper = styled.div<{ deviceType: DeviceType }>`
  ${({ deviceType }) => {
    if (deviceType !== 'mobile') {
      return `
          .menu-container {
            padding: 20px 16px;
          }

          .close-button {
            width: 32px;
            height: 32px;
          }

          .title {
            font-family: Pretendard Bold;
            font-size: 24px;
            line-height: 32px; /* 133.333% */
            letter-spacing: -0.48px;
            justify-content: flex-start;
            padding: 0;
          }
      `;
    }
  }}
`;

const DetailItemWrapper = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }

  div:nth-of-type(2) {
    height: 100%;
  }
`;

const DetailItemWrapperForTitle = styled.div<any>`
  // height: 100%;
  width: 100%;
  min-width: ${({ minW }) => minW};
  .title {
    color: #495057;
  }
`;

const SwiperViewWrapper = styled.div<{ deviceType?: DeviceType }>`
  height: 100%;
  ${({ deviceType }) =>
    deviceType === 'tabletHorizontal' &&
    `
    .swiper-slide {
      display: flex;
      width: 100%;
      height: fit-content;
    }
  `};
`;

const Guide = styled.div`
  color: ${theme.colors.gray};
  font-family: Pretendard SemiBold;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
`;

const SwiperWrapper = styled.div`
  height: 100%;
  
  .swiper-wrapper {
    margin-bottom: 8px;
  }
`;
