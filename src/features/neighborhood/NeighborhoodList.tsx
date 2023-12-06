import React, {useState, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import { VStack } from '@chakra-ui/react';
import VulnerablePerson from './components/VulnerablePerson';
import useDeviceType from '@/hooks/useDeviceType';
import Collaboration from './components/Collaboration';
import Residents from './components/Residents/Residents';
import Facility from './components/Facility';
import NeighborhoodFilter from './NeighborhoodFilter';
import { useRouter } from 'next/router';
import { DispatchLists, NeightBorHoodData, ModDispatchLists } from '@/types/types';
import axios from "../../components/common/api/axios"
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { selectDisasterById } from '../slice/test';

export interface CountByType {
  collaboration: number;
  residents: number;
  vulnerablePerson: number;
  facilities: number;
}

interface Props {
  dispatchLists: NeighborhoodType[];
}

export type NeighborhoodType = {
  eventName: string;
  totalCount: number;
  status?: string;
  age?: number;
  type: 'collaboration' | 'residents' | 'vulnerablePerson' | 'facilities';
  description: string;
  created: string;
};

//TODO 연관인근 아이템 리스트
const NeighborhoodList = (props: Props) => {
  const deviceType = useDeviceType();
  const { query } = useRouter();
  const type = query.type;

  const id = query.id as string;
  const selectedDisaster = useSelector((state: RootState) => selectDisasterById(state, id), shallowEqual);

  const [neightborHoodData, setNeightborHoodData] = useState<ModDispatchLists>();
  const apiIntervalRef = useRef<NodeJS.Timer | null>(null);

    useEffect(() => {
      // 컴포넌트가 마운트될 때 첫 번째 API 호출을 수행
        const fetchData = async () =>{
          const neightBorHoodData = await axios.get<NeightBorHoodData>("/api/relate/all",{
            params : {
              callTel: selectedDisaster?.callTell, //selectedDisaster?.callTell
              dsrClsCd: selectedDisaster?.dsrClsCd,  //selectedDisaster?.dsrClsCd
              dsrKndCd: selectedDisaster?.dsrKndCd, //selectedDisaster?.dsrKndCd
              dsrSeq: id,//id
              gisX: selectedDisaster?.gisX,  //selectedDisaster?.gisX
              gisY: selectedDisaster?.gisY, //selectedDisaster?.gisY
              radius: "null"
            }
        });
        if(neightBorHoodData.data.responseCode === 200){
          //협업대응 -> 1:의소전담대, 2:의소일반대, 3:생명지킴이
          const collaborativeResponseList = neightBorHoodData.data.result.collaborativeResponseList?.result?.map(item => ({
            ...item,
            type: 'collaboration' as 'collaboration'
          }));

          //인근주민 ->인근시설물관계자
          const nearbyFacilityPersonnelList = neightBorHoodData.data.result.nearbyFacilityPersonnelList.result?.dataList?.map(item => ({
            ...item,
            type: 'residents' as 'residents'
          }));

          //인근주민 -> 소방등록정보
          const nearbyOfficialsList = neightBorHoodData.data.result.nearbyOfficialsList.result?.dataList?.map(item => ({
            ...item,
            type: 'residents' as 'residents'
          }));

          //인근주민 -> 보호자
          const nearbyResidentsList = neightBorHoodData.data.result.nearbyResidentsList.result?.dataList?.map(item => ({
            ...item,
            type: 'residents' as 'residents'
          }));

          //인근시설 -> 대상물
          const fightingPropertyList = neightBorHoodData.data.result.fightingPropertyList.result?.dataList?.map(item => ({
            ...item,
            type: 'facilities' as 'facilities'
          }));

          //인근시설 -> 위험물
          const hazardousSubstancList = neightBorHoodData.data.result.hazardousSubstancList.result?.dataList?.map(item => ({
            ...item,
            type: 'facilities' as 'facilities'
          }));

          //인근시설 -> 유독물
          const toxicFacilityList = neightBorHoodData.data.result.toxicFacilityList.result?.dataList?.map(item => ({
            ...item,
            type: 'facilities' as 'facilities',
            bild_sn : new Date().getTime().toString()
          }));

          const nearbyBusinessesList = neightBorHoodData.data.result.nearbyBusinessesList.result?.dataList?.map(item => ({
            ...item,
            type: 'facilities' as 'facilities',
          }));
          
          const combinedData:DispatchLists = {
            collaborativeResponseList : collaborativeResponseList,
            nearbyFacilityPersonnelList : nearbyFacilityPersonnelList,
            nearbyOfficialsList : nearbyOfficialsList,
            nearbyResidentsList : nearbyResidentsList,
            fightingPropertyList : fightingPropertyList,
            hazardousSubstancList : hazardousSubstancList,
            toxicFacilityList : toxicFacilityList,
            nearbyBusinessesList: nearbyBusinessesList
          }

          const data = {
            dispatchLists : combinedData
          }
          setNeightborHoodData(data)
          }
        }
        fetchData()
        apiIntervalRef.current =  setInterval(() => fetchData(), 60000);
      return () => {
        if (apiIntervalRef.current) {
          clearInterval(apiIntervalRef.current);
        }
      };
    }, []);
    
  const countItemsByType = (data:ModDispatchLists | undefined) => {
    // 결과 객체 초기화
    const counts = {
      collaboration: 0,
      residents: 0,
      facilities: 0,
      vulnerablePerson:0
    };
  
    if (data && data.dispatchLists) {
      // 각 타입별로 개수 세기
      counts.collaboration = data.dispatchLists.collaborativeResponseList?.length | 0;
      counts.residents = data.dispatchLists.nearbyFacilityPersonnelList?.length | 0
                       + data.dispatchLists.nearbyOfficialsList?.length | 0
                       + data.dispatchLists.nearbyResidentsList?.length | 0
      counts.facilities = data.dispatchLists.fightingPropertyList?.length | 0
                        + data.dispatchLists.hazardousSubstancList?.length | 0
                        + data.dispatchLists.toxicFacilityList?.length | 0
    }
  
    return counts;
  }

  return (
    <Container deviceType={deviceType}>
      <NeighborhoodFilter deviceType={deviceType} countByType={countItemsByType(neightborHoodData)} />
     {type && <VStack gap={deviceType === 'mobile' ? '16px' : '24px'} width="100%">
        {type === 'collaboration' && <Collaboration data={neightborHoodData?.dispatchLists?.collaborativeResponseList!!}/>}
        {type === 'residents' && <Residents 
          nearbyFacilityPersonnelList={neightborHoodData?.dispatchLists?.nearbyFacilityPersonnelList!!} 
          nearbyOfficialsList={neightborHoodData?.dispatchLists?.nearbyOfficialsList!!} 
          nearbyResidentsList={neightborHoodData?.dispatchLists?.nearbyResidentsList!!} 
        />}
        {type === 'vulnerablePerson' && <VulnerablePerson />}
        {type === 'facilities' && <Facility 
          fightingPropertyList={neightborHoodData?.dispatchLists?.fightingPropertyList!!}
          hazardousSubstancList={neightborHoodData?.dispatchLists?.hazardousSubstancList!!}
          toxicFacilityList={neightborHoodData?.dispatchLists?.toxicFacilityList!!}
          nearbyBusinessesList={neightborHoodData?.dispatchLists?.nearbyBusinessesList!!}
        />}
      </VStack>}
    </Container>
  );
};

NeighborhoodList.defaultProps = {
  dispatchLists: [
    {
      eventName: '협업대응',
      type: 'collaboration',
      totalCount: 7,
    },
    {
      eventName: '인근주민',
      type: 'residents',
      totalCount: 17,
    },
    {
      eventName: '인근피난약자',
      type: 'vulnerablePerson',
      totalCount: 9,
    },
    {
      eventName: '인근시설',
      type: 'facilities',
      totalCount: 34,
    },
  ],
};
export default NeighborhoodList;

const Container = styled.div<{ deviceType: string | null }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  padding: 16px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray2};

  ${props =>
    props.deviceType === 'tabletVertical' &&
    css`
      gap: 24px;
    `}

  ${props =>
    props.deviceType === 'tabletHorizontal' &&
    css`
      flex-direction: row;
      gap: 0 24px;
    `}

  .nearFilter {
    ${props =>
      props.deviceType === 'tabletHorizontal' &&
      css`
        display: flex;
        flex-direction: column;
        width: fit-content;
      `}
  }
`;
