import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import HistoryModal from './HistoryModal';
import useDeviceType from '@/hooks/useDeviceType';
import Time from '../../../public/images/icons/time.svg';
import Check from '../../../public/images/icons/check.svg';
import { DispatchList } from '@/types/types';

export type HistoryType = {
  reportCount?: number;
  eventName: string;
  status?: string;
  age?: number;
  type: 'report' | 'rescue' | 'patient' | 'mobilize';
  description: string;
  created: string;
};

interface Props extends DispatchList {
  isChecked: boolean;
}

//TODO 과거이력 요약 페이지
const HistoryListItem = (props: Props) => {
  const deviceType = useDeviceType();

  const headerTag = () =>{
    switch (props.type) {
      case 'report':
        return props.dsr_knd_cd_nm;
      case 'rescue':
        return props.acc_place_cd_nm;
      case 'patient':
        return props.pat_stat_cd_nm;
      case 'mobilize':
        return props.dsr_knd_cd_nm;
      default:
        return '';
    }
  }

  const headerTitle = () =>{
    switch (props.type) {
      case 'report':
        return "";
      case 'rescue':
        return props.acc_rsn_cd_nm;
      case 'patient':
        return props.pat_stat_cd_nm;
      case 'mobilize':
        return props.dsr_cls_cd_nm;
      default:
        return '';
    }
  }

  const discription = () :string=>{
    switch (props.type) {
      case 'report':
        return props.call_content as string;
      case 'rescue':
        return props.act_desc as string;
      case 'patient':
        return props.emger_opinion as string;
      case 'mobilize':
        return props.call_content as string;
      default:
        return '';
    }
  }

  const parseDateString = (dateStr: string): Date => {
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10) - 1; // JavaScript의 월은 0에서 시작합니다.
    const day = parseInt(dateStr.substring(6, 8), 10);
    const hour = parseInt(dateStr.substring(8, 10), 10);
    const minute = parseInt(dateStr.substring(10, 12), 10);
    const second = parseInt(dateStr.substring(12, 14), 10);
  
    return new Date(year, month, day, hour, minute, second);
  };

  const timeSince = (date: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    let interval = seconds / 31536000; // 연도 단위
  
    if (interval > 1) {
      return Math.floor(interval) + "년 전";
    }
    interval = seconds / 2592000; // 월 단위
    if (interval > 1) {
      return Math.floor(interval) + "달 전";
    }
    interval = seconds / 604800; // 주 단위
    if (interval > 1) {
      return Math.floor(interval) + "주 전";
    }
    interval = seconds / 86400; // 일 단위
    if (interval > 1) {
      return Math.floor(interval) + "일 전";
    }
    interval = seconds / 3600; // 시간 단위
    if (interval > 1) {
      return Math.floor(interval) + "시간 전";
    }
    interval = seconds / 60; // 분 단위
    if (interval > 1) {
      return Math.floor(interval) + "분 전";
    }
    return Math.floor(seconds) + "초 전";
  };

  return (
    <Container deviceType={deviceType}>
      <Flex justifyContent="space-between" alignItems="center">
        <Header>
          <HeaderTag type={props.type}>{headerTag()}</HeaderTag>
          {<HeaderTitle>{headerTitle()}</HeaderTitle>}
          {props.pat_age && <HeaderInfo>{props.pat_age}세</HeaderInfo>}
        </Header>
        <TimeWrapper>
          <IconWrapper width="14px" height="14px" color={theme.colors.gray5}>
            <Time />
          </IconWrapper>
          {timeSince(parseDateString(props.reg_dtime))}
        </TimeWrapper>
      </Flex>
      <Discription isChecked={props.isChecked} deviceType={deviceType} dangerouslySetInnerHTML={{ __html: discription() }}></Discription>
      <HistoryModal {...props} />
    </Container>
  );
};

HistoryListItem.defaultProps = {
  isChecked: true,
};
export default HistoryListItem;

const Container = styled.div<{ deviceType: string | null }>`
  margin-bottom: 16px;
  :last-of-type {
    margin-bottom: 0;
  }
  ${props =>
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      margin-bottom: 24px;
    `}
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.gray8};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.28px;
  max-width: 70%;
`;

const HeaderTag = styled.div<{ type: string }>`
  padding: 4px 12px;
  border-radius: 4px;
  white-space: nowrap;
  font-weight: 700;
  color: ${theme.colors.white};
  ${({ type }) => {
    if (type === 'report') {
      return `
          background:${theme.colors.orange};
        `;
    }

    if (type === 'rescue') {
      return `
          background:${theme.colors.blue};
        `;
    }

    if (type === 'patient') {
      return `
          background:${theme.colors.purple};
        `;
    }

    if (type === 'mobilize') {
      return `
          background: ${theme.colors.green};
        `;
    }
  }}
`;

const IsCheckWrapper = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
  color: ${theme.colors.gray6};
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const HeaderTitle = styled.div`
  margin-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-grow: 1;
`;

const HeaderInfo = styled.div`
  white-space: nowrap;
  ::before {
    content: '|';
    margin: 0 8px;
    color: ${theme.colors.gray4};
  }
`;

const TimeWrapper = styled.div`
  display: flex;
  gap: 2px;
  color: ${theme.colors.gray5};
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.24px;
  white-space: nowrap;
`;

const Discription = styled.div<{ deviceType: string | null; isChecked: boolean }>`
  width: 100%;
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Medium';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 18px;
  letter-spacing: -0.28px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 8px 0 13px;
  ${props =>
    (props.deviceType === 'tabletVertical' || props.deviceType === 'tabletHorizontal') &&
    css`
      margin: 8px 0 24px;
      font-size: 16px;
      letter-spacing: -0.32px;
    `}

  ${props =>
    props.isChecked &&
    css`
      color: ${theme.colors.gray3};
    `}
`;
