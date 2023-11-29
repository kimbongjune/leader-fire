import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { type } from 'os';
import { OrganizationTableData } from './TableData';
import { DeviceType } from '@/types/types';

export interface OrganizationTotalType {
  vehicleCount: number;
  peopleCount: number;
}

export interface OrganizationTableDataType {
  rowData: {
    dispatcherType?: string; // 출동대 타입
    dispatcherColor?: string; // 출동대 컬러
    data: {
      type?: string; // 데이터 타입
      vehicleCount: number; // 차량 수
      peopleCount: number; // 인원 수
    }[];
  }[];
  total: OrganizationTotalType;
}

interface Props {
  data: OrganizationTableDataType;
  deviceType: DeviceType;
  columnNames?: [string, string, string];
  rowDataValueFormat?: [string, string];
}

const OrganizationTable = (props: Props) => {
  
  return (
    <Table deviceType={props.deviceType}>
      <TableHead>
        <TableHeadRow>
          {props.columnNames?.map((column, index) => {
            return <TableData key={index}>{column}</TableData>;
          })}
        </TableHeadRow>
      </TableHead>
      <TableBody>
        {props.data?.rowData?.map((rowData, index) => {
          return (
            <TableRow deviceType={props.deviceType} key={index} typeColor={rowData.dispatcherColor} count={rowData.data.length}>
              <TableData isSingle={rowData.data.length === 1 && rowData.data[0].type === undefined} flex="0 0 1">
                {rowData.dispatcherType}
              </TableData>
              <Flex direction="column" flex={1}>
                {rowData.data?.map((item, index) => {
                  return (
                    <Flex w="100%" key={index}>
                      {item.type !== '소계' && (
                        <TableDataWrapper>
                        {item.type && (
                          <TableData color={item.type && rowData.data.length === 0 && theme.colors.gray5} width="104px">
                            {item.type ? item.type : '-'}
                          </TableData>
                        )}
                        <TableData flex={1}>
                          {item.vehicleCount > 0 ? item.vehicleCount : '-'}
                          {item.vehicleCount > 0 && props.rowDataValueFormat?.[0]}
                        </TableData>
                        <TableData flex={1}>
                          {item.peopleCount > 0 ? item.peopleCount : '-'}
                          {item.peopleCount > 0 && props.rowDataValueFormat?.[1]}
                        </TableData>
                      </TableDataWrapper>
                    )}
                    {item.type === '소계' && (
                      <TableDataWrapper type={item.type}>
                        <TableData width="104px">{item.type}</TableData>
                        <TableData flex={1}>
                          {item.vehicleCount > 0 ? item.vehicleCount : '-'}
                          {item.vehicleCount > 0 && props.rowDataValueFormat?.[0]}
                        </TableData>
                        <TableData flex={1}>
                          {item.peopleCount > 0 ? item.peopleCount : '-'}
                          {item.peopleCount > 0 && props.rowDataValueFormat?.[1]}
                        </TableData>
                      </TableDataWrapper>
                      )}
                    </Flex>
                  );
                })}
              </Flex>
            </TableRow>
          );
        })}
        <TotalRow>
          <TableData>소계</TableData>
          {'vehicleCount' in props.data.total && <TableData>{props.data.total.vehicleCount}{props.rowDataValueFormat?.[0]}</TableData>}
          {'peopleCount' in props.data.total && <TableData>{props.data.total.peopleCount}{props.rowDataValueFormat?.[1]}</TableData>}
          {'vehicleInUseCount' in props.data.total && <TableData>{props.data.total.vehicleInUseCount}{props.rowDataValueFormat?.[0]}</TableData>}
          {'vehicleOrganizationCount' in props.data.total && <TableData>{props.data.total.vehicleOrganizationCount}{props.rowDataValueFormat?.[1]}</TableData>}
        </TotalRow>
      </TableBody>
    </Table>
  );
};

export default OrganizationTable;

OrganizationTable.defaultProps = {
  data: OrganizationTableData,
  columnNames: ['구분', '차량수', '인원수'],
  rowDataValueFormat: ['대', '명'],
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
          height: 32px;
        }
      `;
    }
    return `
      td {
        height: 40px;
      }
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

const TableHeadRow = styled.tr`
  display: flex;

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
  padding: 4px 0;
  border: 0.5px solid #2125291a;
  text-align: center;
  vertical-align: middle;
  box-sizing: border-box;
  width: ${({ width }) => width};
  color: ${({ color }) => color};
  flex: ${({ flex }) => flex};

  ${({ isSingle }) =>
    isSingle &&
    `
    color: ${theme.colors.gray};
    width: 200px !important;
  `}
`;

const TableBody = styled.tbody`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.tr<any>`
  display: flex;

  background: ${theme.colors.white};

  & > td:first-of-type {
    width: 96px;

    ${({ deviceType, count, typeColor }) => {
      if (deviceType === 'tabletVertical') {
        return `
        height: ${count * 32}px;
        background: ${`${typeColor}26`};
        color: ${typeColor};
        `;
      }

      return `
      height: ${count * 40}px;
      background: ${`${typeColor}26`};
      color: ${typeColor};
      `;
    }}
  }
`;

const TotalRow = styled.tr<any>`
  display: flex;
  td {
    background: #2125291a;
  }

  td:nth-of-type(1) {
    width: 200px;
  }

  td:nth-of-type(2),
  td:nth-of-type(3) {
    flex: 1;
  }

  td:first-of-type {
    border-radius: 0 0 0 8px;
  }

  td:last-of-type {
    border-radius: 0 0 8px 0;
  }
`;

const TableDataWrapper = styled.div<any>`
  width: 100%;
  display: flex;
  ${({ type }) => {
    if (type === '소계') {
      return `
        td {
          background: ${theme.colors.gray1};
        }

        td:not(:nth-of-type(1)) {
          color: ${theme.colors.gray8};
          font-family: Pretendard Bold;
          font-size: 16px;
          line-height: 24px; /* 150% */
          letter-spacing: -0.32px;
        }
      `;
    }
  }}
`;
