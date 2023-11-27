import styled from '@emotion/styled';
import { DispatchItemType } from '../../types/types';
import { Box, Flex, Stack } from '@chakra-ui/react';
import DispatchItem from './DispatchItem';
import { useMemo, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import theme from '@/theme/colors';
import { DeviceType } from '@/types/types';
import HomeFilter from './HomeFilter';
import { CountByType } from './HomeFilterItem';
import { useRouter } from 'next/router';
import AlertModal from '@/components/common/Modal/AlertModal';
import axios from "../../components/common/api/axios"
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

interface Props {
  dispatchLists: DispatchItemType[];
  deviceType?: DeviceType;
}

//TODO: 재난정보 조회(폴링)
const DispatchList = (props: Props) => {
  const { deviceType } = props;
  // 보여줄 리스트
  const router = useRouter();
  const type = router.query.type;

  // 리스트 필터링
  const filteredList = useMemo(() => {
    if (type === undefined) return props.dispatchLists;
    return props.dispatchLists?.filter(dispatch => dispatch.type === type);
  }, [type, props.dispatchLists]);

  const unreadDsrSeqs = useMemo(() => {
    return props.dispatchLists?.filter(dispatch => !dispatch.hasRead)
      .map(dispatch => dispatch.dsrSeq);
  }, [props.dispatchLists]);

  const hasUnread = useMemo(() => unreadDsrSeqs?.length > 0, [unreadDsrSeqs]);
  
  const [hasRead, setHasRead] = useState(hasUnread);

  // 이벤트 타입별 카운팅
  const countByType: CountByType = props.dispatchLists?.reduce(
    (res, dispatch) => {
      res[dispatch.type] = (res[dispatch.type] || 0) + 1;
      return res;
    },
    { fires: 0, rescue: 0, firstAid: 0, others: 0 },
  );

  return (
    <>
      <Wrapper deviceType={deviceType}>
        <HomeFilter deviceType={deviceType} countByType={countByType} />
        {!isEmpty(filteredList) && (
          <Stack divider={<Divider deviceType={deviceType} />} flex={1} overflowY="auto">
            {filteredList?.map((dispatch, index) => {
              return <DispatchItem key={index} {...dispatch} deviceType={deviceType} />;
            })}
          </Stack>
        )}
      </Wrapper>
      {hasRead && <AlertModal hasRead={hasUnread} setHasRead={setHasRead} disasterNumber={unreadDsrSeqs} />}
    </>
  );
};

export default DispatchList;

const Wrapper = styled.div<{ deviceType?: DeviceType }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray2};

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical') {
      return `
        height: 100%;
        gap: 24px;
        // .dispatch-item:not(:last-of-type) {
        //   :hover {
        //     border-bottom: 0;
        //   }
        //   border-bottom: 1px solid ${theme.colors.gray2};
        // }
      `;
    }

    if (deviceType === 'tabletHorizontal') {
      return `
        gap: 24px;
        height: 100%;
        flex-direction: row;
      `;
    }
  }}
`;

const Divider = styled.div<{ deviceType?: DeviceType }>`
  width: 100%;
  height: 0;
  border-bottom: 1px solid #e9ecef;
  margin: 16px 0;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        margin: 0;
      `;
    }
  }}
`;
