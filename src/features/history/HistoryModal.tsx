import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import ModalLayout from '@/components/common/Modal/ModalLayout';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import ArrowDown from '../../../public/images/icons/expand_more.svg';
import Close from '../../../public/images/icons/close.svg';
import { Flex } from '@chakra-ui/react';
import HistoryModalTable from './HistoryModalTable';
import { mobilizeTableData, patientTableData, reportTableData, rescueTableData } from './HistoryTableData';
import useDeviceType from '@/hooks/useDeviceType';

interface Props {
  type: string;
}

const HistoryModal = (props: Props) => {
  const deviceType = useDeviceType();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <IconWrapper width="24px" height="24px" color={theme.colors.gray6}>
          <ArrowDown />
        </IconWrapper>
      </Button>
      {isModalOpen && (
        <ModalLayout padding={deviceType === 'mobile' ? '18px 24px' : '16px 24px'} borderRadius="16px" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalContent deviceType={deviceType}>
            <Flex alignItems="center" justifyContent="space-between" marginBottom="18px">
              <Title>
                {props.type === 'report' && '신고'}
                {props.type === 'rescue' && '구조이력'}
                {props.type === 'patient' && '구급이력'}
                {props.type === 'mobilize' && '출동이력'}
                상세
              </Title>
              <IconWrapper width="28px" height="28px" color={theme.colors.gray} onClick={() => setIsModalOpen(false)}>
                <Close />
              </IconWrapper>
            </Flex>
            <Content deviceType={deviceType}>
              {props.type === 'report' && <HistoryModalTable type={props.type} data={reportTableData} />}
              {props.type === 'rescue' && <HistoryModalTable type={props.type} data={rescueTableData} />}
              {props.type === 'patient' && <HistoryModalTable type={props.type} data={patientTableData} />}
              {props.type === 'mobilize' && <HistoryModalTable type={props.type} data={mobilizeTableData} />}
            </Content>
          </ModalContent>
        </ModalLayout>
      )}
    </>
  );
};

export default HistoryModal;

const Button = styled.button`
  width: 100%;
  height: 32px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.gray2};
  background-color: ${theme.colors.gray1};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div<{ deviceType: string | null }>`
  // max-width: 295px;
  width: 80vw;
  ${props =>
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      // min-width: 703px;
    `}
`;

const Title = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 20px;
  font-style: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
`;

const Content = styled.div<{ deviceType: string | null }>`
  height: 80vh;
  overflow-y: auto;
  ${props =>
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      // max-height: 400px;
    `}
`;
