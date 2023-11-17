import AddressTab from '@/components/common/Menu/AddressTab';
import Menu from '@/components/common/Menu/Menu';
import { DeviceType, IncidentType } from '@/types/types';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import SOPFilter from './SOPFilter';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import SearchTab from './SearchTab';
import { useEffect, useMemo, useState } from 'react';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import RightArrow from '../../../public/images/icons/arrow-right2.svg';
import PDFIcon from '../../../public/images/icons/pdf.svg';
import theme from '@/theme/colors';

type ContentDataType = {
  title: string;
  subtitles: { subtitle: string; url: string; active: boolean }[];
};

interface Props {
  deviceType: DeviceType;
  SOP?: ContentDataType[];
  화학대응메뉴얼?: ContentDataType[];
  status?: IncidentType;
}

const SOPContainer = (props: Props) => {
  const { deviceType } = props;
  const router = useRouter();
  const [query, setQuery] = useQueryParams({ index: NumberParam, menu: StringParam, search: StringParam });
  const [tableContents, setTableContents] = useState<ContentDataType[]>([]);
  const selectedIndex = Number(router.query.index as string);
  const search = query.search || null;
  let totalIndex = 0; // 목차 항목 인덱스

  // 데이터 패칭 임시 코드
  useEffect(() => {
    if (query.menu === 'SOP') setTableContents(props.SOP ?? []);
    if (query.menu === '화학대응메뉴얼') setTableContents(props.화학대응메뉴얼 ?? []);
  }, [query.menu]);

  // 검색어 포함하는 인덱스 모음
  const searchResultIndexes = useMemo(() => {
    let currentIndex = 0;

    return tableContents.reduce<{ indexes: number[] }>(
      (result, tableContent) => {
        const subtitleIndexes = tableContent.subtitles.reduce<number[]>((subResult, subtitleObj) => {
          if (search !== null && subtitleObj.subtitle.includes(search)) {
            subResult.push(currentIndex);
          }
          currentIndex = currentIndex + 1;
          return subResult;
        }, []);

        return { indexes: [...result.indexes, ...subtitleIndexes] };
      },
      { indexes: [] },
    ).indexes;
  }, [search, tableContents]);

  const handleClickTitleItem = (index: number, url: string) => {
    setQuery({ index });
  };

  return (
    <>
      {deviceType === 'mobile' && <Menu title="공장화재" timestamp="2023 10 21 23:09" contentAlign="space-between" onClickBackButton={() => router.back()} hasCloseButtonWithoutString={false} />}
      {deviceType !== 'mobile' && (
        <MenuWrapper deviceType={deviceType}>
          <Menu title="공장화재" status={props.status} hasCloseButtonWithoutString={false} onClickBackButton={() => router.back()} onCloseButton={() => router.push('/')} timestamp={'2023 10 20 23:09'} contentAlign="space-between" />
        </MenuWrapper>
      )}
      <AddressTabWrapper deviceType={deviceType}>
        <AddressTab />
      </AddressTabWrapper>
      <Box w="100%" h="100%" position="relative">
        {deviceType !== 'mobile' && (
          <Box w="367px" position="absolute" top="16px" right="16px" zIndex={10}>
            <SearchTab search={query.search} indexes={searchResultIndexes} setQuery={setQuery} totalCount={searchResultIndexes.length || 0} handleTableContentQuery={() => {}} deviceType={deviceType} />
          </Box>
        )}
        <Sidebar width={deviceType === 'mobile' ? '240px' : deviceType === 'tabletVertical' ? '327px' : '382px'}>
          <SidebarContent id="scroll-container">
            <Stack spacing="24px">
              <Stack spacing="12px" position="sticky" top="0" zIndex={10} background="#fff">
                <SOPFilter
                  deviceType={deviceType}
                  onClick={name => {
                    setQuery({ menu: name, index: null });
                  }}
                />
                {deviceType === 'mobile' && <SearchTab search={query.search} indexes={searchResultIndexes} setQuery={setQuery} totalCount={searchResultIndexes.length || 0} handleTableContentQuery={() => {}} deviceType={deviceType} />}
              </Stack>
              {tableContents?.map((tableContent, index) => {
                return (
                  <Stack key={index} spacing="8px">
                    <Title>{tableContent.title}</Title>
                    <Stack divider={<Divider />}>
                      {tableContent.subtitles?.map((subtitleObj, index) => {
                        const currentIndex = totalIndex++;
                        return (
                          <TableContentItem id={currentIndex} onClick={() => handleClickTitleItem(currentIndex, subtitleObj.url)} key={currentIndex} isSelected={currentIndex === selectedIndex} isActive={searchResultIndexes.includes(currentIndex)}>
                            {currentIndex === selectedIndex && (
                              <Box position="absolute" left="0">
                                <IconWrapper width="16px" height="16px" color={theme.colors.orange}>
                                  <RightArrow />
                                </IconWrapper>
                              </Box>
                            )}
                            {subtitleObj.subtitle}
                          </TableContentItem>
                        );
                      })}
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </SidebarContent>
        </Sidebar>
        <PDFWrapper>
          <Stack spacing="16px" top={deviceType === 'mobile' ? '180px' : '204px'} position="absolute" left="50%" transform="translateX(-50%)">
            <IconWrapper width={deviceType === 'mobile' ? '114px' : '148px'} height={deviceType === 'mobile' ? '114px' : '148px'} color="#DEE2E6">
              <PDFIcon />
            </IconWrapper>
            <Text deviceType={deviceType}>PDF 이미지 삽입</Text>
          </Stack>
        </PDFWrapper>
      </Box>
    </>
  );
};

export default SOPContainer;

SOPContainer.defaultProps = {
  SOP: [
    {
      title: '지휘통제절차',
      subtitles: [
        { subtitle: 'SOP 100 현장지휘 절차', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치1', url: 'example', active: false },
        { subtitle: 'SOP 102 지휘 위치선정', url: 'example', active: false },
        { subtitle: 'SOP 103 지휘활동기준 및 통합지휘', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치2', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치3', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치4', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치5', url: 'example', active: false },
      ],
    },
    {
      title: '화재유형별 표준작전절차',
      subtitles: [
        { subtitle: 'SOP 100 현장지휘 절차', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치1', url: 'example', active: false },
        { subtitle: 'SOP 102 지휘 위치선정', url: 'example', active: false },
        { subtitle: 'SOP 103 지휘활동기준 및 통합지휘', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치2', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치3', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치4', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치5', url: 'example', active: false },
      ],
    },
  ],
  화학대응메뉴얼: [
    {
      title: '화학대응절차',
      subtitles: [
        { subtitle: 'SOP 100 현장지휘 절차', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치1', url: 'example', active: false },
        { subtitle: 'SOP 102 지휘 위치선정', url: 'example', active: false },
        { subtitle: 'SOP 103 지휘활동기준 및 통합지휘', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치2', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치3', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치4', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치5', url: 'example', active: false },
      ],
    },
    {
      title: '화재유형별 표준작전절차',
      subtitles: [
        { subtitle: 'SOP 100 현장지휘 절차', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치1', url: 'example', active: false },
        { subtitle: 'SOP 102 지휘 위치선정', url: 'example', active: false },
        { subtitle: 'SOP 103 지휘활동기준 및 통합지휘', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치2', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치3', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치4', url: 'example', active: false },
        { subtitle: 'SOP 101 현장지휘소(통제단) 설치5', url: 'example', active: false },
      ],
    },
  ],
  status: 'progress',
};

const MenuWrapper = styled.div<{ deviceType: DeviceType }>`
  .button {
    color: #909aa4;
  }

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        .menu-container {
          padding: 20px 16px;
        }

        .back-button {
          width: 32px;
          height: 32px;
        }

        .title {
          font-family: Pretendard Bold;
          font-size: 24px;
          line-height: 32px; /* 133.333% */
          letter-spacing: -0.48px;
          padding: 0 0 0 8px;
        }

        .timestamp-stack {
          flex-direction: row;
          align-items: center;
          gap: 8px;
        }

        .timestamp {
          font-family: Pretendard SemiBold;
          font-size: 20px;
          line-height: 32px; /* 160% */
          letter-spacing: -0.4px;
        }

        .clock-icon {
          width: 16px;
          height: 16px;
        }

        .passed-time {
          color: ${theme.colors.gray5};
          font-family: Pretendard SemiBold;
          font-size: 16px;
          line-height: 24px; /* 150% */
          letter-spacing: -0.32px;
        }
      `;
    }
  }}
`;

const AddressTabWrapper = styled.div<{ deviceType: DeviceType }>`
  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        .address-tab-container {
          padding: 16px;
        }

        .address-tab-flex {
          gap: 8px;
          justify-content: flex-start;
        }

        .copy-icon-box {
          margin-left: 0;
        }
      `;
    }
  }}
`;

const SidebarContent = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const Divider = styled.div`
  border-bottom: 1px solid #e9ecef;
  margin: 12px 0;
`;

const TableContentItem = styled.div<any>`
  color: ${theme.colors.gray6};
  font-family: Pretendard SemiBold;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
  padding: 12px 0 12px 24px;
  position: relative;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${({ isSelected, isActive }) =>
    (isSelected || isActive) &&
    `
    overflow: hidden;
    color: ${theme.colors.orange};
    text-overflow: ellipsis;
    font-family: Pretendard SemiBold;
    font-size: 14px;
    line-height: 16px; /* 114.286% */
    letter-spacing: -0.28px;
  `}
`;

const Title = styled.div`
  color: ${theme.colors.darkBlue};
  font-family: Pretendard Bold;
  font-size: 18px;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.36px;
`;

const PDFWrapper = styled.div`
  background: ${theme.colors.gray1};
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
`;

const Text = styled.div<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray4};
  font-family: Pretendard Bold;
  font-size: 20px;
  line-height: 24px; /* 120% */
  letter-spacing: -0.4px;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        font-family: Pretendard Bold;
        font-size: 24px;
        line-height: 24px; /* 100% */
        letter-spacing: -0.48px;
      `;
    }
  }}
`;
