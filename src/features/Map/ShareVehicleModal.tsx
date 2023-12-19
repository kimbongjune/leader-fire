import React, { useState } from 'react';
import styled from '@emotion/styled';
import ModalLayout from '@/components/common/Modal/ModalLayout';
import { Checkbox, Flex } from '@chakra-ui/react';
import theme from '@/theme/colors';
import { DispatchVehicleDataType, DispatchVehicleDataType2 } from './VehicleStatus';
import proj4 from 'proj4';
import axios from "../../components/common/api/axios"
import Axios from 'axios';
import { CommanderAppintResponseDto, KakaoRestApiResponse } from '@/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface Props {
  vehicleData: DispatchVehicleDataType2[];
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  position: { La: number; Ma: number };
  dsrSeq : string
}


const epsg5181: string = '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs';

const convertCoordinateSystem = (x:number, y:number):[number, number] => {
  return proj4('EPSG:4326', epsg5181, [x,y]);
}

const ShareVehicleModal = (props: Props) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const checkboxItemStatus = props.vehicleData?.map(item => false);
  const [checkItemList, setCheckItemList] = useState(checkboxItemStatus);
  const [checkedCarIds, setCheckedCarIds] = useState<string[]>([]);
  
  const useInfo = useSelector((state: RootState) => state.userReducer.userInfo);
  
  const onClickCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // 모든 차량의 carId를 checkedCarIds에 추가
      setCheckedCarIds(props.vehicleData.map(item => item.carId!!));
    } else {
      // checkedCarIds를 비움
      setCheckedCarIds([]);
    }
  };

  const onClickCheckItem = (carId: string) => {
    if (checkedCarIds.includes(carId)) {
      // 이미 체크된 차량의 경우 목록에서 제거
      setCheckedCarIds(checkedCarIds.filter(id => id !== carId));
    } else {
      // 체크되지 않은 차량의 경우 목록에 추가
      setCheckedCarIds([...checkedCarIds, carId]);
    }
  };

  const onClickSendingButton = async () => {
    if (checkedCarIds.length > 0) {
      console.log(checkedCarIds); // 선택된 차량의 carId를 콘솔에 출력

      const apiKey = process.env.NEXT_PUBLIC_KAKAOMAP_RESTAPI_KEY;
      console.log(props.position.La, props.position.Ma)

      const address = await Axios.get<KakaoRestApiResponse>("https://dapi.kakao.com/v2/local/geo/coord2address.json",{
        params:{
          x : props.position.La,
          y : props.position.Ma
        },
        headers:{
          Authorization : `KakaoAK ${apiKey}`
        },
      })

      console.log(address)
      if(address.status === 200){
        if(address.data.meta.total_count > 0){
          const bunjiAddress = address.data.documents[0].address.address_name
          const roadAddress = address.data.documents[0].road_address?.address_name || ""

          const convertCoordinate = convertCoordinateSystem(props.position.La, props.position.Ma)
          console.log(convertCoordinate)
          console.log(bunjiAddress)
          console.log(roadAddress)

          const data = {
            dsrSeq : props.dsrSeq,
            targetCarList : checkedCarIds.map(id => ({ targetlocDspcarId: Number(id) })),
            targetlocBunziAddr: bunjiAddress,
            targetlocRoadAddr: roadAddress,
            targetlocUserid: useInfo.userId,
            targetlocX: convertCoordinate[0],
            targetlocY: convertCoordinate[1]
          }
          const result = await axios.post<CommanderAppintResponseDto>("/api/commander_appoint/seq",data)

          if(result.data.responseCode === 200){
            alert('전송에 성공하였습니다.');
            props.onCloseModal(false);
          }else{
            alert('전송에 실패하였습니다.');
            props.onCloseModal(false);
          }
        }else{
          alert("주소를 찾을 수 없습니다.")
          props.onCloseModal(false);
        }
      }
    } else {
      alert('전송할 차량을 선택하세요');
    }
  };

  return (
    <ModalLayout isOpen={true} onClose={() => {}}>
      <Wrapper>
        <Title>{props.vehicleData.length > 0 ? "도착지를 공유할 차량을 선택하세요" : "출동차량이 없습니다."}</Title>
        {props.vehicleData.length > 0 && <Content>
          <Header>
            <Checkbox variant="orangeCheckbox" isChecked={isCheckAll} onChange={e => onClickCheckAll(e)}>
              모두선택
            </Checkbox>
          </Header>
          <Divider />
          {props.vehicleData?.map((item, index) => {
            const isChecked = checkedCarIds.includes(item.carId!!);
            return (
              <Body key={index}>
                <Checkbox variant="orangeCheckbox" isChecked={isChecked} onChange={() => onClickCheckItem(item.carId!!)}>
                  {item.name}
                </Checkbox>
              </Body>
            );
          })}
        </Content>}
        <Flex gap="16px">
          <Button onClick={() => props.onCloseModal(false)}>취소하기</Button>
          {props.vehicleData.length > 0 &&
          <Button onClick={onClickSendingButton}>전송하기</Button>}
        </Flex>
      </Wrapper>
    </ModalLayout>
  );
};

export default ShareVehicleModal;

const Wrapper = styled.div`
  padding: 24px;
`;

const Title = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 20px;
  font-style: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
`;

const Content = styled.div`
  padding: 12px;
  border-radius: 8px;
  background: ${theme.colors.gray1};
  margin: 16px 0;
`;

const Button = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 8px;
  color: ${theme.colors.white};
  background: ${theme.colors.gray5};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  line-height: 24px;
  letter-spacing: -0.36px;
  :last-of-type {
    background: ${theme.colors.orange};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  .chakra-checkbox__label {
    color: ${theme.colors.gray7};
    font-family: 'Pretendard Bold';
    font-size: 16px;
    font-style: normal;
    line-height: 20px;
    letter-spacing: -0.32px;
  }
`;

const Divider = styled.hr`
  margin: 8px 0;
  border-color: ${theme.colors.gray9};
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  height: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .chakra-checkbox__label {
    color: ${theme.colors.gray7};
    font-family: 'Pretendard Medium';
    font-size: 16px;
    font-style: normal;
    line-height: 20px;
    letter-spacing: -0.32px;
  }
`;
