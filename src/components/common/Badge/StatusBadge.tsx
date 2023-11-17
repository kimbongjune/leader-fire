import theme from '@/theme/colors';
import { IncidentType } from '@/types/types';
import styled from '@emotion/styled';
import CheckCircleIcon from '../../../../public/images/icons/check-circle.svg';
import IconWrapper from '../IconWrapper/IconWrapper';

interface Props {
  status: IncidentType;
}

const StatusBadge = (props: Props) => {
  return (
    <Wrapper status={props.status}>
      {props.status === 'progress' && '진행중'}
      {props.status === 'completion' && (
        <>
          종결
          <IconWrapper width="16px" height="16px" color={theme.colors.blue}>
            <CheckCircleIcon />
          </IconWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default StatusBadge;

const Wrapper = styled.div<{ status: IncidentType }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;

  ${({ status }) => {
    if (status === 'progress') {
      return `
        color: ${theme.colors.orange};
        font-family: Pretendard Bold;
        font-size: 14px;
        line-height: 18px; /* 128.571% */
        letter-spacing: -0.28px;

        border-radius: 4px;
        background: rgba(255, 138, 58, 0.20);
      `;
    }

    if (status === 'completion') {
      return `
        color: ${theme.colors.blue};
        font-family: Pretendard Bold;
        font-size: 14px;
        line-height: 18px; /* 128.571% */
        letter-spacing: -0.28px;

        border-radius: 4px;
        background: rgba(121, 158, 255, 0.2);
      `;
    }
  }}
`;
