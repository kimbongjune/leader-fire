import styled from '@emotion/styled';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

interface Props {
  todayDate: string;
}

const DisplayTodayDate = (props: Props) => {
  return <Wrapper>{props.todayDate}</Wrapper>;
};

export default DisplayTodayDate;

DisplayTodayDate.defaultProps = {
  todayDate: dayjs(new Date()).format('YYYY년 MM월 DD일 dddd'),
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  color: var(--06, #909aa4);
  font-family: Pretendard Medium;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;

  padding: 4px 10px;
  border-radius: 12px;
  background: var(--02, #e9ecef);
`;
