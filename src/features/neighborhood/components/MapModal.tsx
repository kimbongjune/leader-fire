import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import ModalLayout from '@/components/common/Modal/ModalLayout';
import styled from '@emotion/styled';
import React from 'react';
import Map from '../../../../public/images/icons/map.svg';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface Props {
  setIsMapModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  gis_x_4326:string | number;
  gis_y_4326:string | number;
}

const MapModal = (props: Props) => {
  const router = useRouter();
  return (
    <ModalLayout isOpen={true} onClose={() => props.setIsMapModalOpen(false)} padding="32px 16px 16px" borderRadius="12px">
      <ModalContent>
        <IconWrapper width="48px" height="48px" color="#D9D9D9">
          <Map />
        </IconWrapper>
        <Text>지도 화면으로 이동하시겠습니까?</Text>
        <Flex gap="16px" width="100%">
          <Button color={theme.colors.gray5} onClick={() => props.setIsMapModalOpen(false)}>
            취소
          </Button>
          <Button color={theme.colors.orange} onClick={() => router.push(`/detail/map?gis_x=${props.gis_x_4326}&gis_y=${props.gis_y_4326}`)}>
            확인
          </Button>
        </Flex>
      </ModalContent>
    </ModalLayout>
  );
};

export default MapModal;

const ModalContent = styled.div`
  width: 331px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
  margin-bottom: 16px;
  margin-top: 8px;
`;

const Button = styled.button<{ color: string }>`
  flex: 1;
  border-radius: 8px;
  padding: 16px;
  background-color: ${props => props.color};
  color: ${theme.colors.white};
  font-family: 'Pretendard Bold';
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.36px;
`;
