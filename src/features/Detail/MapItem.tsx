import styled from '@emotion/styled';
import DetailItem from './DetailItem';
import { Box, Flex } from '@chakra-ui/react';
import ChevronRight from '../../../public/images/icons/chevron-right.svg';

const MapItem = () => {
  return (
    <DetailItem title="지도">
        <StyledButton onClick={() => {}}>
          <Flex gap="4px" justifyContent="center" align="center">
            <Box pt="2px">지도 보기</Box>
            <ChevronRight width="24px" height="24px" color="#6C757D" />
          </Flex>
        </StyledButton>
    </DetailItem>
  );
};

export default MapItem;

const StyledButton = styled.button`
  color: #6c757d;
  text-overflow: ellipsis;
  font-family: NanumSquare;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 125% */
  letter-spacing: -0.32px;

  padding: 8px 0;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  background: #f8f9fa;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;

  color: var(--08, #495057);
  text-overflow: ellipsis;
  whitespace: nowrap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 125% */
  letter-spacing: -0.32px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  background: var(--00, #fff);
`;

const Content = styled.div`
  min-height: 60px;
`;
