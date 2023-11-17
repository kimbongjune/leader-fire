import theme from '@/theme/colors';
import styled from '@emotion/styled';
import LeftArrow from '../../../../public/images/icons/arrow-left.svg';
import Close from '../../../../public/images/icons/close.svg';
import Clock from '../../../../public/images/icons/clock.svg';
import { Flex, Stack, SystemProps } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { getPassedTime } from '@/utils/getPassedTime';
import { ReactNode } from 'react';
import { IncidentType } from '@/types/types';
import StatusBadge from '../../common/Badge/StatusBadge';

interface Props {
  hasBackButton?: boolean;
  closeButtonText?: string;
  hasCloseButtonWithoutString?: boolean;
  title?: ReactNode;
  subTitle?: string;
  contentGap?: string;
  contentAlign?: SystemProps['justifyContent'];
  timestamp?: string;
  status?: IncidentType;
  onClickBackButton?: () => void;
  onCloseButton?: () => void;
}

//TODO 상부 재난종별, 발생시간, 경과 표시 탭
const Menu = (props: Props) => {
  return (
    <Wrapper className="menu-container">
      {props.hasBackButton && <LeftArrow className="back-button" width="24px" height="24px" onClick={props.onClickBackButton} />}
      <Flex className="title" p="0 8px" flex={1} align="center" gap={props.contentGap} justify={props.contentAlign}>
        <Flex align="center" gap="8px">
          {props.title}
          {props.status && <StatusBadge status={props.status} />}
        </Flex>
        {props.timestamp && (
          <Stack className="timestamp-stack" spacing="2px" align="flex-end">
            <TimeStamp className="timestamp">{dayjs(props.timestamp).format('YYYY.MM.DD HH시 mm분')}</TimeStamp>
            <Flex align="center" gap="2px" className="clock">
              <Clock className="clock-icon" width="14px" height="14px" color={theme.colors.gray5} />
              <PassedTime className="passed-time">{getPassedTime(props.timestamp)} 경과</PassedTime>
            </Flex>
          </Stack>
        )}
        {props.subTitle && <SubTitle>{props.subTitle}</SubTitle>}
      </Flex>
      {!props.closeButtonText && props.hasCloseButtonWithoutString && <Close className="close-button" width="24px" height="24px" color={theme.colors.white} onClick={props.onCloseButton} />}
      {props.closeButtonText && (
        <StyledButton className="button" onClick={props.onCloseButton}>
          {props.closeButtonText}
        </StyledButton>
      )}
    </Wrapper>
  );
};

export default Menu;

Menu.defaultProps = {
  hasBackButton: true,
  hasCloseButtonWithoutString: true,
  title: '타이틀',
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${theme.colors.gray8};
  color: ${theme.colors.white};
  font-family: Pretendard Bold;
  font-size: 20px;
  line-height: 28px; /* 140% */
  letter-spacing: -0.4px;
`;

const StyledButton = styled.button<any>`
  color: ${theme.colors.gray3};
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;

const TimeStamp = styled.div`
  color: ${theme.colors.white};
  font-family: Pretendard SemiBold;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
`;

const PassedTime = styled.div`
  color: ${theme.colors.gray5};
  font-family: Pretendard SemiBold;
  font-size: 12px;
  line-height: 14px; /* 116.667% */
  letter-spacing: -0.24px;
`;

const SubTitle = styled.div`
  color: ${theme.colors.gray4};
  font-family: 'Pretendard Medium';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;
