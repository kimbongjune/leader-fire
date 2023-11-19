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
import { DispatchList } from '@/types/types';

interface Props {
  type: string;
}

const titleMapping: { [key in keyof DispatchList]: string } = {
  type : "타입",
  reg_dtime: "접수일시",
  dsr_knd_cd_nm: "긴급구조종류",
  treat_cls_cd_nm: "처리구분",
  call_content: "신고내역",
  aware_yn: "의식없음",
  breath_yn: "호흡없음",
  cpr_yn: "CPR지도",
  noemer_yn: "비긴급여부",
  age_cd_nm: "연령대",
  acc_place_cd_nm: "사고장소",
  acc_rsn_cd_nm: "사고원인",
  acc_rsn_etc_desc: "사고원인기타내역",
  act_desc: "활동내역",
  guide: "조치사항",
  proc_rslt_cd_nm: "처리결과",
  crime_cd_nm: "범죄의심조치내역",
  dsr_act_trouble_cd_nm: "긴급구조활동장애요인",
  dsr_act_trouble_desc: "긴급구조활동장애기타내역",
  emg_acc_type_cd_nm: "구급사고종류",
  emg_acc_type_etc_desc: "구급사고종별기타내역",
  pat_stat_cd_nm: "환자상태",
  pat_name: "환자명",
  pat_sex_cd_nm: "환자성별",
  pat_age: "환자연령",
  doc_guide: "의사지도및조치사항",
  emger_opinion: "응급구조사평가소견",
  dsr_seq: "긴급구조번호",
  dsr_cls_cd_nm: "긴급구조 분류",
  dsr_bunji_adress: "구주소 전체주소",
  dsr_doro_adress: "도로명 전체주소",
  copertn_cntrmsr_yn: "공동대응여부",
  gis_x_5181: "x좌표_5181",
  gis_y_5181: "y좌표_5181",
  gis_x_4326: "x좌표_4326",
  gis_y_4326: "y좌표_4326",
  dist: "거리",
};

const formatDate = (dateStr: string): string => {
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  const hour = dateStr.substring(8, 10);
  const minute = dateStr.substring(10, 12);
  const second = dateStr.substring(12, 14);

  return `${year}년${month}월${day}일 ${hour}시${minute}분${second}초`;
};

//TODO 과거이력 상세 정보 모달
const HistoryModal = (props: Props) => {
  const deviceType = useDeviceType();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(props)

  const data = Object.entries(props).reduce((acc, [key, value]) => {
    let formattedValue = value;
  
    if (key === 'reg_dtime') {
      formattedValue = formatDate(value as string);
    }
  
    if (key !== 'type' && key !== 'isChecked') {
      acc.push({
        title: titleMapping[key as keyof typeof titleMapping] || key, 
        text: formattedValue
      });
    }
    return acc;
  }, [] as { title: string, text: string }[]);

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
              {props.type === 'report' && <HistoryModalTable type={props.type} data={data} />}
              {props.type === 'rescue' && <HistoryModalTable type={props.type} data={data} />}
              {props.type === 'patient' && <HistoryModalTable type={props.type} data={data} />}
              {props.type === 'mobilize' && <HistoryModalTable type={props.type} data={data} />}
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
