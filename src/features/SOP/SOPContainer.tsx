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
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import RightArrow from '../../../public/images/icons/arrow-right2.svg';
import theme from '@/theme/colors';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { selectDisasterById } from '../slice/test';
import {Document, Page, pdfjs} from 'react-pdf';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

pdfjs.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.js";

const mapDsrClsCd = (code: string): string => {
  switch (code) {
      case "0040067": return "동물구조";
      case "0790052": return "고층건물(3층이상,아파트)";
      case "0790158": return "기타화재";
      case "1710210": return "대형화재(시장,공장)";
      case "1710211": return "일반화재(주택)";
      case "1710212": return "지하화재";
      case "1710213": return "특수화재(선박,위험물)";
      case "1710665": return "산불";
      case "0040006": return "붕괴사고";
      case "0040007": return "산악사고";
      case "0040008": return "수난사고";
      case "0040009": return "교통사고";
      case "0040010": return "기계사고";
      case "0040011": return "E/V사고";
      case "0040012": return "추락사고";
      case "0040013": return "약물사고";
      case "0040017": return "폭발사고";
      case "0040022": return "항공구조(항공사고)";
      case "0040023": return "항공구조(훈련상황)";
      case "0040024": return "항공구조(수색구조)";
      case "0040031": return "자연재해";
      case "0040044": return "시건개방";
      case "0040045": return "기타안전사고";
      case "3200001": return "벌집제거";
      case "0060039": return "구급예약";
      case "0060078": return "약물중독";
      case "0060079": return "가스중독";
      case "0060081": return "무선페이징";
      case "0060170": return "화상";
      case "0060204": return "부상";
      case "0060205": return "질병";
      case "0060206": return "임산부";
      case "0060211": return "행려병자";
      case "1710595": return "U안심폰대상자";
      case "1710619": return "질병외";
      case "1710620": return "사고부상";
      case "1710621": return "구급기타";
      case "0040032": return "산사태";
      case "0040063": return "지원출동(전기)";
      case "0040064": return "지원출동(가스)";
      case "0040065": return "지원출동(환경)";
      case "0040066": return "민원출동";
      case "0060004": return "훈련출동";
      case "0060005": return "응원출동";
      case "0060012": return "지원출동(재해)";
      case "0060013": return "지원출동(풍수해)";
      case "0060014": return "지원출동(배수)";
      case "0060015": return "지원출동(급수)";
      case "0060016": return "지원출동(청소)";
      case "0060017": return "지원출동(한해)";
      case "0060018": return "지원출동(기타)";
      case "0060019": return "지원출동(경호)";
      case "0060020": return "지원출동(데모시위)";
      case "0060021": return "지원출동(행사지원)";
      case "0060022": return "지원출동(근접배치)";
      case "0060023": return "지원출동(행락철)";
      case "0060024": return "지원출동(추석)";
      case "0060025": return "지원출동(설)";
      case "0060026": return "지원출동(도로세척)";
      case "0060027": return "지원출동(가옥정리)";
      case "0060028": return "순찰출동";
      case "0060029": return "상황출동";
      case "0060037": return "예방경계";
      case "0060044": return "대민지원";
      case "0060200": return "업무운행";
      case "0060212": return "기타출동";
      case "1710676": return "일반화재(차량)";
      case "0060072": return "자살";
      case "0060218": return "실종자";
      case "1712101": return "기타화재(속보설비)";
      case "1712102": return "사회적약자시설(요양원,장애인시설)";
      case "0500026": return "심정지";
      case "0062301": return "구급차소독";
      case "0042301": return "화학사고";
      case "1712301": return "전기차화재";
      case "0060030": return "화재확인출동";
      case "1710677": return "흉통";
      case "1710678": return "아나필락시스";
      case "1710679": return "응급신경증상(뇌졸중)";
      default: return "알 수 없는 코드";
  }
};

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

type OutlineData = {
  title: string;
  subtitles: { subtitle: string; url: string; active: boolean, page:number }[];
};

const SOPContainer = (props: Props) => {
  const { deviceType } = props;
  const router = useRouter();
  const [query, setQuery] = useQueryParams({ index: NumberParam, menu: StringParam, search: StringParam, page:NumberParam, id:StringParam});
  const [tableContents, setTableContents] = useState<OutlineData[]>([]);
  const [numPages, setNumPages] = useState(0); // 총 페이지수
  const [pageScale, setPageScale] = useState(1);
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);
  const [pdfFile, setPdfFile] = useState("/pdf/SOP_bookmark.pdf")

  const [searchOccurrences, setSearchOccurrences] = useState<{ page: number; index: number }[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState<number>(0);

  console.log("pageScale",pageScale)

  function highlightPattern(text:string, pattern:string) {
    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
  }

  const textRenderer = useCallback(
    (textItem: any) => highlightPattern(textItem.str, query?.search!!),
    [query.search]
  );

  const onDocumentLoadSuccess = async (document: PDFDocumentProxy) =>{
    setNumPages(document.numPages);
    setPdfDocument(document);
    const outlineData = await getOutlineEntries(await pdfjs.getDocument(pdfFile).promise)
    setTableContents(outlineData)
  }

  async function getOutlineEntries(pdf: PDFDocumentProxy): Promise<OutlineData[]> {
    const outline = await pdf.getOutline();
    const data: OutlineData[] = [];
  
    if (outline) {
      for (const item of outline) {
        const entry: OutlineData = {
          title: item.title,
          subtitles: []
        };
        for (const subItem of item.items) {
          if (subItem.dest && typeof subItem.dest[0] !== 'string') {
            const subPageIndex = await pdf.getPageIndex(subItem.dest[0]);
            entry.subtitles.push({
              subtitle: subItem.title,
              url: 'example',
              active: false,
              page: subPageIndex + 1
            });
          }
        }

        data.push(entry);
      }
    }
  
    return data;
  }

  const goToSearchResultPage = (pageNum: number) => {
    setQuery({page:pageNum});
  };

  const searchInPdfDocument = async (search: string) => {
    if (!pdfDocument) {
      console.log('PDF 문서가 로드되지 않았습니다.');
      return;
    }
    let newOccurrences: { page: number; index: number }[] = [];

    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      const texts = textContent.items.map((item: any) => item.str || '').join(' ');

      let index = 0;
      while ((index = texts.indexOf(search, index)) !== -1) {
        newOccurrences.push({ page: pageNum, index });
        index += search.length;
      }
    }

    setSearchOccurrences(newOccurrences);
    setCurrentSearchIndex(0);

    if (newOccurrences.length > 0) {
      setQuery({page:newOccurrences[0].page});
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      console.log(query.search)
      if (query.search && pdfDocument) {
        console.log("Search: ", query.search);
        searchInPdfDocument(query.search);
      }else{
        setSearchOccurrences([]);
      }
    }, 500); // 500ms 후에 실행
  
    return () => clearTimeout(debounceTimeout); // 클린업 함수
  }, [query.search, pdfDocument]);


  const goToNextPage = () => {
    if (query.page !== null && query.page !== undefined) {
      const newPageNumber = query.page < numPages ? query.page + 1 : query;
      setQuery({page : newPageNumber as number});
    }
  };

  const goToPreviousPage = () => {
    if (query.page !== null && query.page !== undefined) {
      const newPageNumber = query.page > 1 ? query.page - 1 : query.page;
      setQuery({ page: newPageNumber as number });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickLocation = e.clientX;
    const threshold = window.innerWidth / 2;

    if (clickLocation > threshold && query.page as number < numPages) {
      goToNextPage();
    } else if (clickLocation < threshold && query.page as number > 1) {
      goToPreviousPage();
    }
  };

  const pdfContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateSize() {
      if (pdfContainerRef.current) {
        setContainerSize({
          width: pdfContainerRef.current.offsetWidth,
          height: pdfContainerRef.current.offsetHeight
        });
      }
    }
  
    window.addEventListener('resize', updateSize);
    updateSize();
  
    return () => window.removeEventListener('resize', updateSize);
  }, [pdfContainerRef.current, deviceType]);

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const selectedIndex = Number(router.query.index as string);
  const search = query.search || null;
  let totalIndex = 0; // 목차 항목 인덱스

  const id = router.query.id as string;
  const selectedDisaster = useSelector((state: RootState) => selectDisasterById(state, id), shallowEqual);

  console.log(selectedDisaster)

  console.log(query)
  // 데이터 패칭 임시 코드
  useEffect(() => {
    if (query.menu === 'SOP' && selectedDisaster) {
      setPdfFile("/pdf/SOP_bookmark.pdf")
      const newQuery = { ...query, page: 1, search : mapDsrClsCd(selectedDisaster.dsrClsCd) };
      router.replace({
        pathname: router.pathname,
        query: newQuery,
      }, undefined, { shallow: true });
    };
    if (query.menu === '화학대응메뉴얼' && selectedDisaster) {
      setPdfFile("/pdf/Chemical_bookmark.pdf")
      const newQuery = { ...query, page: 1, search : mapDsrClsCd(selectedDisaster.dsrClsCd) };
      router.replace({
        pathname: router.pathname,
        query: newQuery,
      }, undefined, { shallow: true });
    };
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

  const handleClickTitleItem = (index: number, url: string, page:number) => {
    setQuery({ index, page :page });
  };

  return (
    <>
      {deviceType === 'mobile' && <Menu  status={selectedDisaster?.status} title={selectedDisaster?.eventName} timestamp={selectedDisaster?.created!!} contentAlign="space-between" onClickBackButton={() => router.back()} hasCloseButtonWithoutString={false} />}
      {deviceType !== 'mobile' && (
        <MenuWrapper deviceType={deviceType}>
          <Menu title={selectedDisaster?.eventName} status={selectedDisaster?.status} hasCloseButtonWithoutString={false} onClickBackButton={() => router.back()} onCloseButton={() => router.push('/')} timestamp={selectedDisaster?.created!!} contentAlign="space-between" />
        </MenuWrapper>
      )}
      <AddressTabWrapper deviceType={deviceType}>
        <AddressTab address={selectedDisaster?.lawAddr} />
      </AddressTabWrapper>
      <Box w="100%" h="100%" position="relative">
        {deviceType !== 'mobile' && (
          <Box w="367px" position="absolute" top="16px" right="16px" zIndex={10}>
            <SearchTab goToSearchResultPage={goToSearchResultPage} totalPage={numPages} searchOccurrences={searchOccurrences} search={query.search} indexes={currentSearchIndex} setQuery={setQuery} totalCount={searchOccurrences.length || 0} handleTableContentQuery={() => {}} deviceType={deviceType} />
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
                {deviceType === 'mobile' && <SearchTab goToSearchResultPage={goToSearchResultPage} totalPage={numPages} searchOccurrences={searchOccurrences} search={query.search} indexes={currentSearchIndex} setQuery={setQuery} totalCount={searchOccurrences.length || 0} handleTableContentQuery={() => {}} deviceType={deviceType} />}
              </Stack>
              {tableContents?.map((tableContent, index) => {
                return (
                  <Stack key={index} spacing="8px">
                    <Title>{tableContent.title}</Title>
                    <Stack divider={<Divider />}>
                      {tableContent.subtitles?.map((subtitleObj, index) => {
                        const currentIndex = totalIndex++;
                        return (
                          <TableContentItem id={currentIndex} onClick={() => handleClickTitleItem(currentIndex, subtitleObj.url, subtitleObj.page)} key={currentIndex} isSelected={currentIndex === selectedIndex} isActive={searchResultIndexes.includes(currentIndex)}>
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
          <PDFWrapper ref={pdfContainerRef} onClick={handleClick} >
            <Stack spacing="16px" position="absolute" left="50%" transform="translateX(-50%)" height={containerSize.height}>
              <TransformWrapper>
                <TransformComponent>
                  <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page scale={pageScale} pageNumber={query.page as number} height={containerSize.height} renderTextLayer={true} renderAnnotationLayer={true} customTextRenderer={textRenderer}/>
                  </Document>
                </TransformComponent>
              </TransformWrapper>
              <PdfPage>{query.page as number} / {numPages}</PdfPage>
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
  overflow-y: hidden;
`;

const PdfPage = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  color: black;
  padding: 5px 12px 5px 12px;
  font-size: 15px;
  background-color:${theme.colors.gray5};
  border-radius: 5px;
  margin-bottom: 3px;
  color: white;
`;