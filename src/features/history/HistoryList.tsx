import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import HistoryListItem, { HistoryType } from './HistoryListItem';
import useDeviceType from '@/hooks/useDeviceType';
import HistoryFilter from './HistoryFilter';
import { useRouter } from 'next/router';
import { DeviceType } from '@/types/types';

export interface CountByType {
  report: number;
  rescue: number;
  patient: number;
  mobilize: number;
}

interface Props {
  dispatchLists: HistoryType[];
  reportNumber: number;
}

//TODO 과거이력 아이템 클릭시 표출 페이지
const HistoryList = (props: Props) => {
  const deviceType = useDeviceType();
  const router = useRouter();
  const type = router.query.type;

  // 이벤트 타입별 카운팅
  const countByType = props.dispatchLists.reduce(
    (res, dispatch) => {
      res[dispatch.type] = (res[dispatch.type] || 0) + 1;
      return res;
    },
    { report: 0, rescue: 0, patient: 0, mobilize: 0 },
  );

  // 리스트 필터링
  const filteredList = useMemo(() => {
    if (type === null) return props.dispatchLists;
    return props.dispatchLists.filter(dispatch => dispatch.type === type);
  }, [type, props.dispatchLists]);

  return (
    <Container deviceType={deviceType}>
      <HistoryFilter deviceType={deviceType} countByType={countByType} />
      {deviceType === 'mobile' && type && (
        <HistoryCount>
          <HistoryCountTitle>신고이력</HistoryCountTitle>
          <HistoryCountNumber>{`(최근 1년간 ${props.reportNumber}건)`}</HistoryCountNumber>
        </HistoryCount>
      )}
      {type && (
        <HistoryListItemWrapper deviceType={deviceType}>
          {filteredList?.map((item, index) => {
            return <HistoryListItem key={index} {...item} />;
          })}
        </HistoryListItemWrapper>
      )}
    </Container>
  );
};

HistoryList.defaultProps = {
  reportNumber: 10,
  dispatchLists: [
    {
      eventName: '구급',
      type: 'report',
      description: '할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급 할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급 할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급 할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급',
      created: '3개월 전',
      count: 100,
    },
    {
      eventName: '구급',
      type: 'report',
      description: '할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급 할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급 할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급 할머니 의식 호흡 없음 80대 여 / CPR 동보 대동구급',
      created: '3개월 전',
      count: 100,
    },
    {
      eventName: '고속도로(기타)',
      status: '차량내 가스중독 차량내 가스중독',
      type: 'rescue',
      description: '신고 내용 표시합니다. <br/> 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
      created: '3개월 전',
    },
    {
      eventName: '잠재응급상황',
      status: '잠재응급상황',
      age: 84,
      type: 'patient',
      description:
        '화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장 화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장,화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장 화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장 화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장,화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장 화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장 화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장,화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장 화재출동 귀소 중 사고 목격하여 조치한 건으로, 3중 추돌 교통사고 현장',
      created: '3개월 전',
    },
    {
      eventName: '질병외',
      type: 'mobilize',
      description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
      created: '3개월 전',
    },
  ],
};
export default HistoryList;

const Container = styled.div<{ deviceType: string | null }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  padding: 16px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray2};

  ${props =>
    props.deviceType === 'tabletVertical' &&
    css`
      gap: 0 24px;
    `}

  ${props =>
    props.deviceType === 'tabletHorizontal' &&
    css`
      flex-direction: row;
      gap: 0 24px;
    `}

  .historyFilter {
    ${props =>
      props.deviceType === 'tabletHorizontal' &&
      css`
        display: flex;
        flex-direction: column;
        width: fit-content;
      `}
  }
`;

const HistoryCount = styled.div`
  display: flex;
  gap: 2px;
  margin: 16px 0;
`;

const HistoryCountTitle = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.28px;
`;

const HistoryCountNumber = styled.div`
  color: ${theme.colors.gray3};
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
`;

const HistoryListItemWrapper = styled.div<{ deviceType: DeviceType }>`
  width: 100%;
  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      margin-top: 24px;
    `}
`;
