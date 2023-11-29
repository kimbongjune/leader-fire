import useDeviceType from '@/hooks/useDeviceType';
import theme from '@/theme/colors';
import { DeviceType } from '@/types/types';
import styled from '@emotion/styled';
import { VehicleTableRows } from './TableData';
import { Flex } from '@chakra-ui/react';

export interface VehicleTableRowType {
  rowData: {
    vehicleType?: string; // 차량 타입
    vehicleColor?: string; // 차량 셀 컬러
    data: {
      type?: string; // 데이터 타입
      vehicleCount?: number; // 차량 수
      peopleCount?: number; // 인원 수
    }[];
  }[];
  total: {
    vehicleCount: number;
    peopleCount: number;
  };
}

interface Props {
  rowData: VehicleTableRowType;
  deviceType: DeviceType;
}

const VehicleTable = (props: Props) => {
  const { deviceType } = props;
  return (
    <Table deviceType={deviceType}>
      <TableHead>
        <TableHeadRow deviceType={deviceType}>
          <TableData>구분</TableData>
          <TableData>차량수</TableData>
          {/* <TableData>인원수</TableData> */}
        </TableHeadRow>
      </TableHead>
      <TableBody>
        {props.rowData.rowData?.map((rowData, index) => {
          return (
            <TableRow key={index} typeColor={rowData.vehicleColor} count={rowData.data.length} deviceType={deviceType}>
              <TableData flex="0 0 1">{rowData.vehicleType}</TableData>
              <Flex direction="column" flex={1}>
                {rowData.data?.map((item, index) => {
                  return (
                    <Flex w="100%" key={index}>
                      <TableDataWrapper deviceType={deviceType}>
                        <TableData>{item.type}</TableData>
                        <TableData flex={1} color={!item.type && !item.vehicleCount && theme.colors.gray5}>
                          {item.vehicleCount || '-'}
                          {item.vehicleCount && '대'}
                        </TableData>
                        {/* <TableData flex={1} color={!item.type && !item.peopleCount && theme.colors.gray5}>
                          {item.peopleCount || '-'}
                          {item.peopleCount && '명'}
                        </TableData> */}
                      </TableDataWrapper>
                    </Flex>
                  );
                })}
              </Flex>
            </TableRow>
          );
        })}
        <TotalRow deviceType={deviceType}>
          <>
            <TableData>소계</TableData>
            <TableData flex={1}>{props.rowData.total.vehicleCount}대</TableData>
            {/* <TableData flex={1}>{props.rowData.total.peopleCount}명</TableData> */}
          </>
        </TotalRow>
      </TableBody>
    </Table>
  );
};

export default VehicleTable;

VehicleTable.defaultProps = {
  rowData: VehicleTableRows,
};

const Table = styled.table<{ deviceType: DeviceType }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;

  color: #495057;
  font-family: Pretendard SemiBold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  overflow: hidden;

  border-collapse: collapse;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical') {
      return `
        td {
          padding: 4px 13px;
          height: 32px;
        }
      `;
    }
    return `
      height: 40px;
    `;
  }}
`;

const TableHead = styled.thead`
  background: ${theme.colors.gray5};
  outline: 1px solid #2125291a;

  color: var(--00, #fff);
  font-family: Pretendard Medium;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;

const TableHeadRow = styled.tr<any>`
  display: flex;

  td {
    background: ${theme.colors.gray5};
    color: ${theme.colors.white};
  }

  td:nth-of-type(1) {
    width: 200px;
  }

  td:nth-of-type(2),
  td:nth-of-type(3) {
    flex: 1;
  }
`;

const TableData = styled.td<any>`
  display: flex;
  // height: 40px;
  justify-content: center;
  align-items: center;
  // padding: 4px 13px;
  border: 0.5px solid #2125291a;
  text-align: center;
  vertical-align: middle;
  box-sizing: border-box;

  color: ${theme.colors.gray};
  font-family: Pretendard SemiBold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  background: ${theme.colors.gray1};

  width: ${({ width }) => width};
  color: ${({ color }) => color} !important;
  flex: ${({ flex }) => flex};

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical') {
      return `
        height: 32px;
      `;
    }
    return `
      height: 40px;
    `;
  }}
`;

const TableBody = styled.tbody`
  display: flex;
  flex-direction: column;
  td {
    background: ${theme.colors.white};
  }
`;

const TableRow = styled.tr<any>`
  display: flex;

  background: ${theme.colors.white};

  & > td:first-of-type {
    width: 96px;
    color: ${theme.colors.gray};
    background: ${({ typeColor }) => `${typeColor}`};

    ${({ deviceType, count }) => {
      if (deviceType === 'tabletVertical') {
        return `
        height: ${count * 32}px;
        `;
      }

      return `
      height: ${count * 40}px;
      `;
    }}
  }
`;

const TotalRow = styled.tr<any>`
  display: flex;

  td {
    color: ${theme.colors.gray7};
    font-family: Pretendard Medium;
    font-size: 16px;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
    background: rgba(33, 37, 41, 0.1);
  }

  td:nth-of-type(1) {
    width: 200px;
  }

  td:nth-of-type(2) {
    width: 104px;
  }

  td:nth-of-type(3) {
    flex: 1;
  }

  td:first-of-type {
    border-radius: 0 0 0 8px;
  }

  td:last-of-type {
    color: ${theme.colors.gray8};
    font-family: Pretendard Bold;
    font-size: 16px;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
    border-radius: 0 0 8px 0;
  }

  td:nth-last-of-type(2) {
    color: ${theme.colors.gray8};
    font-family: Pretendard Bold;
    font-size: 16px;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
  }
`;

const TableDataWrapper = styled.div<any>`
  width: 100%;
  display: flex;
  td {
    color: ${theme.colors.gray7};
  }

  td:first-of-type {
    ${({ deviceType }) => {
      return `
        width: 104px;
      `;
    }}
  }
`;
