import styled from '@emotion/styled';
import { StringParam, useQueryParam } from 'use-query-params';
import dayjs from 'dayjs';
import IconWrapper from '../IconWrapper/IconWrapper';
import ArrowDropDownIcon from '../../../../public/images/icons/arrow-drop-down.svg';

interface Props {
  height?: string;
}

const Calendar = (props: Props) => {
  const [date, setDate] = useQueryParam('date', StringParam);
  return (
    <CalendarWrapper className="calendar-container" height={props.height}>
      <DateDisplay className="calendar-date">{date !== '' && dayjs(date).format('YYYY년 MM월 DD일')}</DateDisplay>
      <IconWrapper width="20px" height="20px" color="#343A40">
        <ArrowDropDownIcon />
      </IconWrapper>
      <input id="calendar-input" type="date" onChange={e => setDate(e.target.value)} />
    </CalendarWrapper>
  );
};

export default Calendar;

const CalendarWrapper = styled.div<{ height?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ height }) => height};
  position: relative;
  padding: 12px 8px;
  border-radius: 4px;
  border: 1px solid var(--02, #e9ecef);
  input {
    position: absolute;
    background: transparent;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ::-webkit-datetime-edit {
      width: 100%;
    }

    ::-webkit-calendar-picker-indicator {
      opacity: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

const DateDisplay = styled.div`
  display: flex;
  align-items: center;
  // position: absolute;
  // top: 50%;
  // transform: translateY(-50%);
  color: var(--09, #343a40);
  font-family: Pretendard SemiBold;
  font-size: 14px;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.28px;
`;
