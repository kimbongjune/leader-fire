import { Box, Flex, HStack, Input, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { NumberParam, StringParam, useQueryParam, withDefault } from 'use-query-params';
import SearchIcon from '../../../public/images/icons/search.svg';
import ArrowDownIcon from '../../../public/images/icons/arrow-drop-down.svg';
import ArrowUpIcon from '../../../public/images/icons/arrow-drop-up.svg';
import XIcon from '../../../public/images/icons/close.svg';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import theme from '@/theme/colors';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { DeviceType } from '@/types/types';
import { Link } from 'react-scroll';
import { useRouter } from 'next/router';

interface Props {
  search?: string | null;
  setQuery: (query: { index?: number; menu?: string; search?: string }) => void;
  indexes: number;
  totalCount: number;
  searchOccurrences : { page: number; index: number }[];
  handleTableContentQuery: (index?: number | null, url?: string) => void;
  deviceType?: DeviceType;
  totalPage: number;
  goToSearchResultPage :(page:number) => void;
}

const SearchTab = (props: Props) => {
  const route = useRouter();
  const { searchOccurrences, deviceType } = props;
  const [index, setIndex] = useQueryParam('index', withDefault(NumberParam, -1));

  const [currentIndex, setCurrentIndex] = useState(0)

  const [inputValue, setInputValue] = useState(props.search || '');

  useEffect(() => {
    setInputValue(props.search || '');
  }, [props.search]);

  // 화살표 인덱스
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    props.setQuery({ search: newValue || undefined, index: undefined });
  };

  const handleIncreaseIndex = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < props.totalCount) {
      setCurrentIndex(nextIndex);
      const nextPage = searchOccurrences[nextIndex].page;
      props.goToSearchResultPage(nextPage);
    }
  };

  const handleDescreaseIndex = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      const prevPage = searchOccurrences[prevIndex].page;
      props.goToSearchResultPage(prevPage);
    }
  };

  console.log(props.totalCount)

  return (
    <Wrapper deviceType={deviceType}>
      <Stack spacing="8px">
        <TextInputWrapper deviceType={deviceType}>
          <Flex align="center" overflow="hidden">
            <TextInput value={inputValue} type="text" onChange={handleSearchChange} deviceType={deviceType}  />
            <Flex align="center" gap="4px">
              <Box onClick={() => props.setQuery({search : undefined, index: undefined})}>
                <IconWrapper width={deviceType === 'mobile' ? '20px' : '24px'} height={deviceType === 'mobile' ? '20px' : '24px'} color={theme.colors.gray5}>
                  <XIcon />
                </IconWrapper>
              </Box>
              <Box>
                <IconWrapper width={deviceType === 'mobile' ? '20px' : '24px'} height={deviceType === 'mobile' ? '20px' : '24px'} color={theme.colors.orange}>
                  <SearchIcon />
                </IconWrapper>
              </Box>
            </Flex>
          </Flex>
        </TextInputWrapper>
        <SearchResult deviceType={deviceType}>
          <HStack spacing="0" divider={<Divider deviceType={deviceType} />} height="20px">
            <Flex justify="space-between" flex={1} height="fit-content">
              <Text>검색 결과</Text>
              <Text>
                {props.totalCount <= 0 ? currentIndex : currentIndex + 1 }/{props.totalCount}
              </Text>
            </Flex>
            <Flex gap="8px">
              <Button to={`${index - 1}`} spy={true} smooth={true} onClick={handleIncreaseIndex} containerId="scroll-container" offset={-200}>
                <IconWrapper width={deviceType === 'mobile' ? '20px' : '24px'} height={deviceType === 'mobile' ? '20px' : '24px'} color={currentIndex >= 0 ? theme.colors.gray7 : theme.colors.gray5}>
                  <ArrowDownIcon />
                </IconWrapper>
              </Button>
              <Button to={`${index + 1}`} spy={true} smooth={true} onClick={handleDescreaseIndex} containerId="scroll-container" offset={-200}>
                <IconWrapper width={deviceType === 'mobile' ? '20px' : '24px'} height={deviceType === 'mobile' ? '20px' : '24px'} color={currentIndex < props.totalCount - 1 ? theme.colors.gray7 : theme.colors.gray5}>
                  <ArrowUpIcon />
                </IconWrapper>
              </Button>
            </Flex>
          </HStack>
        </SearchResult>
      </Stack>
    </Wrapper>
  );
};

export default SearchTab;

const Wrapper = styled.div<{ deviceType?: DeviceType }>`
  padding: 8px;
  border-radius: 12px;
  border: 1px solid ${theme.colors.gray2};
  background: ${theme.colors.gray1};

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        background: ${theme.colors.gray2};
      `;
    }
  }}
`;

const TextInputWrapper = styled.div<{ deviceType?: DeviceType }>`
  color: ${theme.colors.gray5};
  font-family: Pretendard SemiBold;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;

  border-radius: 8px;
  border: 1px solid ${theme.colors.gray2};
  background: #fff;
  padding: 14px 16px;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        padding: 12px 16px;
      `;
    }
  }}
`;

const TextInput = styled.input<{ deviceType?: DeviceType }>`
  width: 100%;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        font-size: 16px;
        line-height: 20px; /* 125% */
        letter-spacing: -0.32px;
      `;
    }
  }}
`;

const SearchResult = styled.div<{ deviceType?: DeviceType }>`
  padding: 8px;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        padding: 8px 16px;
      `;
    }
  }}
`;

const Text = styled.div`
  color: ${theme.colors.gray7};
  font-family: Pretendard SemiBold;
  font-size: 14px;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.28px;
`;

const Divider = styled.div<{ deviceType?: DeviceType }>`
  border-right: 1px solid ${theme.colors.gray9};
  height: 16px;
  margin: 8px;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        border-color: ${theme.colors.gray5};
        margin: 0 24px;
      `;
    }
  }}
`;

const Button = styled(Link)``;
