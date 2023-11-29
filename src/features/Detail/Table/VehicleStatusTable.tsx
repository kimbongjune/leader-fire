import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { useMemo } from 'react';
import { VehicleStatusTableDefaultData } from './TableData';
import { DeviceType } from '@/types/types';

export type VehicleStatusTableDataType = {
  rowData: {
    callingName: string; // 무선 호출명
    status?: string; // 출동대 동태
    peopleCount?: number; // 인원 수
  }[];
  total: {
    // 합계 데이터
    vehicleCount: number; // 차량 수
    peopleCount?: number; // 인원 수
  };
};

interface Props {
  deviceType: DeviceType;
  data: VehicleStatusTableDataType;
}

// 출동대 편성 목록 테이블
const VehicleStatusTable = (props: Props) => {
  return (
    <Table deviceType={props.deviceType}>
      <TableHead>
        <TableHeadRow>
          <TableData>구분</TableData>
          <TableData>동태</TableData>
          {/* <TableData>인원</TableData> */}
        </TableHeadRow>
      </TableHead>
      <TableBody>
        {props?.data?.rowData?.map((row, index) => {
          return (
            <TableRow key={index} deviceType={props.deviceType}>
              <TableData>{index + 1}</TableData>
              <TableData>{row.callingName}</TableData>
              <TableData color={!row.status && theme.colors.gray5}>{row.status ?? '-'}</TableData>
              {/* <TableData>{row.peopleCount}명</TableData> */}
            </TableRow>
          );
        })}
        <TotalRow>
          <TableData>소계</TableData>
          <TableData>{props?.data?.total.vehicleCount}대</TableData>
          <TableData color={theme.colors.gray5}>-</TableData>
          {/* <TableData>{props.data.total.peopleCount}명</TableData> */}
        </TotalRow>
      </TableBody>
    </Table>
  );
};

export default VehicleStatusTable;

VehicleStatusTable.defaultProps = {
  data: VehicleStatusTableDefaultData,
};

const Table = styled.table<{ deviceType: DeviceType }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;

  color: ${theme.colors.gray7};
  font-family: Pretendard SemiBold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;

  overflow: hidden;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: ${theme.colors.gray};
  outline-bottom: 1px solid ${theme.colors.red};
`;

const TableHeadRow = styled.tr`
  display: flex;

  td:nth-of-type(1) {
    width: 200px;
  }

  td:nth-of-type(2),
  td:nth-of-type(3) {
    flex: 1;
  }

  td {
    color: ${theme.colors.white};
    font-family: Pretendard Medium;
    font-size: 16px;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
  }
`;

const TableData = styled.td<any>`
  display: flex;
  padding: 8px 13px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 0.5px solid rgba(33, 37, 41, 0.1);
  max-height: 40px;
  color: ${({ color }) => color};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TableBody = styled.tbody`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.tr<any>`
  display: flex;

  background: ${theme.colors.white};

  td:nth-of-type(1) {
    width: 96px;
    background: ${theme.colors.gray1};
    color: ${theme.colors.gray};
    font-family: Pretendard SemiBold;
    font-size: 16px;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
  }

  td:nth-of-type(2) {
    width: 104px;
  }

  td:nth-of-type(3),
  td:nth-of-type(4) {
    flex: 1;
  }
`;

const TotalRow = styled.tr<any>`
  display: flex;
  td {
    background: ${theme.colors.gray9};
  }

  td:first-of-type {
    width: 96px;
    border-radius: 0 0 0 8px;
  }

  td:last-of-type {
    border-radius: 0 0 8px 0;
  }

  td:nth-of-type(2) {
    width: 104px;
    color: ${theme.colors.gray8};
    font-family: Pretendard Bold;
    font-size: 16px;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
  }

  td:nth-of-type(3) {
    flex: 1;
  }

  td:nth-of-type(4) {
    flex: 1;
    color: ${theme.colors.gray8};
    font-family: Pretendard Bold;
    font-size: 16px;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
  }
`;
