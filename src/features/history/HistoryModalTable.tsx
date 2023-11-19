import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';

type TableType = {
  title: string;
  text: string | null;
};

interface Props {
  data: TableType[];
  type: string;
}

const HistoryModalTable = (props: Props) => {
  return (
    <TableWrapper>
      <Table>
        <THead>
          <THeadTr type={props.type}>
            <THeadTd>항목</THeadTd>
            <THeadTd>내용</THeadTd>
          </THeadTr>
        </THead>

        <TBody>
          {props.data?.map((row, index) => {
            return (
              <TBodyTr key={index}>
                <TBodyTd>{row.title}</TBodyTd>
                {row.text && <TBodyTd dangerouslySetInnerHTML={{ __html: row.text }} />}
                {!row.text && <TBodyTd />}
              </TBodyTr>
            );
          })}
        </TBody>
      </Table>
    </TableWrapper>
  );
};

export default HistoryModalTable;

const TableWrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(33, 37, 41, 0.1);

  > table,
  th,
  td {
    border: 1px solid rgba(33, 37, 41, 0.1);
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const THead = styled.thead``;

const THeadTr = styled.tr<{ type: string }>`
  ${({ type }) => {
    if (type === 'report') {
      return `
        background:rgba(255, 138, 58, 0.15);
        color: ${theme.colors.orange};
        `;
    }
    if (type === 'rescue') {
      return `
        background: rgba(121, 158, 255, 0.15);
        color: ${theme.colors.blue};
        `;
    }
    if (type === 'patient') {
      return `
        background: rgba(151, 71, 255, 0.15);
        color: ${theme.colors.purple};
        `;
    }
    if (type === 'mobilize') {
      return `
        background:rgba(119, 209, 52, 0.15);
        color: ${theme.colors.green};
        `;
    }
  }}
`;

const THeadTd = styled.td`
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
  text-align: center;
  padding: 4px;
`;

const TBody = styled.tbody``;

const TBodyTr = styled.tr``;

const TBodyTd = styled.td`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard SemiBold';
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
  letter-spacing: -0.32px;
  padding: 10px 16px;

  :first-of-type {
    padding: 8px;
    color: ${theme.colors.gray};
    font-family: 'Pretendard SemiBold';
    font-size: 16px;
    font-style: normal;
    line-height: 24px;
    letter-spacing: -0.32px;
    text-align: center;
    background-color: ${theme.colors.gray1};
    white-space: nowrap;
    vertical-align: middle;
  }
`;
