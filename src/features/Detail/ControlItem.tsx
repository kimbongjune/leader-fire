import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import ChevronRight from '../../../public/images/icons/chevron-right.svg';
import { useRouter } from 'next/router';
import theme from '@/theme/colors';
import { DeviceType } from '@/types/types';

interface Props {
  deviceType: DeviceType;
  controlContent:string;
}

//TODO 관제내용 탭
const ControlItem = (props: Props) => {
  const { deviceType } = props;
  const router = useRouter();
  return (
    <Stack spacing="8px">
      <Title>관제내용</Title>
      <ContentWrapper>
        <Content>{props?.controlContent || "관제내용 상세보기"}</Content>
        <StyledButton onClick={() => router.push(`/detail/${router.query.id}/control`)} deviceType={deviceType}>
          <Flex gap="4px" justify={deviceType === 'mobile' ? 'center' : 'flex-end'}  align="center">
            <Box pt="2px">더보기</Box>
            <ChevronRight width="24px" height="24px" color="#6C757D" />
          </Flex>
        </StyledButton>
      </ContentWrapper>
    </Stack>
  );
};

export default ControlItem;

const Title = styled.div`
  color: ${theme.colors.gray6};
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;

const StyledButton = styled.button<{ deviceType: DeviceType }>`
  color: ${theme.colors.gray6};
  text-overflow: ellipsis;
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: -0.32px;

  padding: 8px 0;
  border-radius: 4px;
  outline: 1px solid #e9ecef;
  background: #f8f9fa;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        padding: 0;
        outline: unset;
        background: ${theme.colors.white};
      `;
    }
  }}
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
