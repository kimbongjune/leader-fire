import React, { useState } from 'react';
import styled from '@emotion/styled';
import ModalLayout from '@/components/common/Modal/ModalLayout';
import { Checkbox, Flex } from '@chakra-ui/react';
import theme from '@/theme/colors';
import { DispatchVehicleDataType } from './VehicleStatus';

interface Props {
  vehicleData: DispatchVehicleDataType[];
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareVehicleModal = (props: Props) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const checkboxItemStatus = props.vehicleData?.map(item => false);
  const [checkItemList, setCheckItemList] = useState(checkboxItemStatus);

  const onClickCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arrayLength = props.vehicleData?.length;
    if (e.target.checked) {
      setCheckItemList(Array(arrayLength).fill(true));
    } else {
      setCheckItemList(Array(arrayLength).fill(false));
    }
    setIsCheckAll(e.target.checked);
  };

  const toggleItem = (index: number) => {
    const updatedCheckItems = [...checkItemList];
    updatedCheckItems[index] = !updatedCheckItems[index];
    setCheckItemList(updatedCheckItems);
    return updatedCheckItems;
  };

  const onClickCheckItem = (index: number) => {
    const toggleItemList = toggleItem(index);
    const allChecked = toggleItemList.every(item => item === true);
    setIsCheckAll(allChecked);
  };

  const onClickSendingButton = async () => {
    if (checkItemList.filter(item => item === true).length > 0) {
      await alert('전송에 성공하였습니다.');
      props.onCloseModal(false);
      return;
    }
    alert('전송할 차량을 선택하세요')

  };

  return (
    <ModalLayout isOpen={true} onClose={() => {}}>
      <Wrapper>
        <Title>도착지를 공유할 차량을 선택하세요</Title>
        <Content>
          <Header>
            <Checkbox variant="orangeCheckbox" isChecked={isCheckAll} onChange={e => onClickCheckAll(e)}>
              모두선택
            </Checkbox>
          </Header>
          <Divider />
          {props.vehicleData?.map((item, index) => {
            return (
              <Body key={index}>
                <Checkbox variant="orangeCheckbox" isChecked={checkItemList[index]} onChange={() => onClickCheckItem(index)}>
                  {item.name}
                </Checkbox>
              </Body>
            );
          })}
        </Content>
        <Flex gap="16px">
          <Button onClick={() => props.onCloseModal(false)}>취소하기</Button>
          <Button onClick={onClickSendingButton}>전송하기</Button>
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
