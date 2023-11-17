import theme from '@/theme/colors';
import { getPassedTime } from '@/utils/getPassedTime';
import { Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';

interface Props {
  rows: {
    time: string;
    description: string;
  }[];
}

const HistoryTable = (props: Props) => {
  return (
    <Wrapper>
      <TableBody>
        {props.rows?.map((row, index) => {
          return (
            <TableRow key={index}>
              <TableData>
                <Stack spacing="0" align="center" w="fit-content">
                  <Time>{dayjs(row.time).format('HH:mm')}</Time>
                  <PassedTime>({getPassedTime(row.time)} 경과)</PassedTime>
                </Stack>
              </TableData>
              <TableData>
                <Description>{row.description}</Description>
              </TableData>
            </TableRow>
          );
        })}
      </TableBody>
    </Wrapper>
  );
};

export default HistoryTable;

const Wrapper = styled.table`
  border-radius: 8px;
  border: 1px solid var(--02, #e9ecef);
  background: var(--00, #fff);
  border-collapse: collapse;
`;

const TableBody = styled.tbody`
  tr:nth-of-type(even) td {
    background: #f8f9fa;
  }
`;

const TableRow = styled.tr`
  display: flex;

  td:nth-of-type(1) {
    max-width: 96px;
  }

  td:nth-of-type(2) {
    flex: 1;
    display: flex;
    align-items: center;
  }
`;

const TableData = styled.td`
  padding: 8px 16px;
  border: 1px solid #2125291a;
`;

const Time = styled.div`
  width: fit-content;
  color: ${theme.colors.gray8}; // #343a40;
  font-family: NanumSquare;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;

const PassedTime = styled.div`
  color: var(--06, #909aa4);
  font-family: Pretendard Medium;
  font-size: 14px;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.28px;
`;

const Description = styled.div`
  color: var(--08, #495057);
  font-family: NanumSquare;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;
