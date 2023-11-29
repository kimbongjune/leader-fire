import styled from '@emotion/styled';
import DetailItem from './DetailItem';
import theme from '@/theme/colors';
import { Flex, Stack } from '@chakra-ui/react';
import { MarkerType } from '../Map/ObjectPosition';

interface Props {
  data :MarkerType[]
}

//TODO 핸드폰 모드일 떄 표시되는 주변 정보/ 미터 제거
const Neighborhood = (props: Props) => {

  return (
    <DetailItem title="재난위치 인근">
      <ContentWrapper>
        <Stack spacing="0" divider={<Divider />}>
          {props.data?.map((position, index) => {
            return (
              <Flex key={index} justify="space-between" align="center">
                <Name>{position.label}</Name>
                <Count>{position.count} 건</Count>
              </Flex>
            );
          })}
        </Stack>
      </ContentWrapper>
    </DetailItem>
  );
};

export default Neighborhood;

Neighborhood.defaultProps = {
  positions: [
    {
      name: '소화전',
      disasterCount: 3,
    },
    {
      name: '대상물',
      disasterCount: 13,
    },
    {
      name: '소방용수',
      disasterCount: 3,
    },
    {
      name: '비상소화장치',
      disasterCount: 3,
    },
    // {
    //   name: '위험물',
    //   disasterCount: 3,
    // },
    // {
    //   name: '피난약자',
    //   disasterCount: 3,
    // },
  ],
};

const ContentWrapper = styled.div`
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray2}; // #e9ecef;
  background: ${theme.colors.white};
  padding: 16px;
`;

const Divider = styled.div`
  border-bottom: 1px solid ${theme.colors.gray2};
  margin: 16px 0;
`;

const Name = styled.div`
  color: ${theme.colors.gray7}; // #495057;
  font-family: Pretendard SemiBold;
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: -0.32px;
`;

const Count = styled.div`
  color: ${theme.colors.gray8}; // #343a40;
  font-family: NanumSquare;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.36px;
`;
