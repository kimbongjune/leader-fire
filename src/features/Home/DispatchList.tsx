import styled from '@emotion/styled';
import type { DispatchItemType } from './DispatchItem';
import { Box, Flex, Stack } from '@chakra-ui/react';
import DispatchItem from './DispatchItem';
import { useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import theme from '@/theme/colors';
import { DeviceType } from '@/types/types';
import HomeFilter from './HomeFilter';
import { CountByType } from './HomeFilterItem';
import { useRouter } from 'next/router';
import AlertModal from '@/components/common/Modal/AlertModal';

interface Props {
  dispatchLists: DispatchItemType[];
  deviceType?: DeviceType;
}

const DispatchList = (props: Props) => {
  const { deviceType } = props;
  // 보여줄 리스트
  const router = useRouter();
  const type = router.query.type;
  const [isAlert, setIsAlert] = useState(true);

  // 리스트 필터링
  const filteredList = useMemo(() => {
    if (type === undefined) return props.dispatchLists;
    return props.dispatchLists.filter(dispatch => dispatch.type === type);
  }, [type, props.dispatchLists]);

  // 이벤트 타입별 카운팅
  const countByType: CountByType = props.dispatchLists.reduce(
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
      {isAlert && <AlertModal isAlert={isAlert} setIsAlert={setIsAlert} />}
    </>
  );
};

DispatchList.defaultProps = {
  dispatchLists: [
    {
      id: '1',
      status: 'progress',
      reportCount: 5,
      eventName: '기타화재',
      type: 'fires',
      address: '경남 진주시 진주대로 234-13',
      description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
      isNew: true,
      created: '2023.10.11 09:00',
    },
    {
      id: '2',
      status: 'progress',
      reportCount: 1,
      eventName: '기타화재',
      type: 'fires',
      address: '경남 진주시 진주대로 234-13',
      description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
      created: '2023.10.11 08:00',
    },
    {
      id: '3',
      status: 'completion',
      reportCount: 1,
      eventName: '기타화재',
      type: 'fires',
      address: '경남 진주시 진주대로 234-13',
      description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
      created: '2023.10.11 08:00',
    },
    {
      id: '4',
      status: 'progress',
      reportCount: 3,
      eventName: '기타구조',
      type: 'rescue',
      address: '경남 진주시 진주대로 234-13',
      description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
      created: '2023.10.11 08:00',
    },
    {
      id: '5',
      status: 'progress',
      reportCount: 10,
      eventName: '기타구급',
      type: 'firstAid',
      address: '경남 진주시 진주대로 234-13',
      description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
      created: '2023.10.11 08:00',
    },
    {
      id: '6',
      status: 'completion',
      reportCount: 10,
      eventName: '기타구급',
      type: 'firstAid',
      address: '경남 진주시 진주대로 234-13',
      description: '신고 내용 표시합니다. 마그네슘 공장화재 / 검은 연기가 엄청나다 / 사람들이 대피중이다',
      created: '2023.10.11 08:00',
    },
  ],
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
