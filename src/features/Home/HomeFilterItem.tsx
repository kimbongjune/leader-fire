import Fires from '../../../public/images/icons/fire.svg';
import Rescue from '../../../public/images/icons/ambulance.svg';
import FirstAid from '../../../public/images/icons/medicalService.svg';
import Others from '../../../public/images/icons/omit.svg';
import styled from '@emotion/styled';
import { Stack } from '@chakra-ui/react';
import { DeviceType } from '@/types/types';
import { FilterItemProps } from '@/components/common/Filter/Filter';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import theme from '@/theme/colors';
import { useRouter } from 'next/router';
import useDeviceType from '@/hooks/useDeviceType';

export interface CountByType {
  fires: number;
  rescue: number;
  firstAid: number;
  others: number;
}

interface Props extends FilterItemProps {
  countByType: any; // 필터링된 데이터 개수
  onClick?: () => void;
  deviceType?: DeviceType;
}

//TODO 홈 화면 왼쪽 종별 버튼
const HomeFilterItem = (props: Props) => {
  const router = useRouter();
  const selectedType = router.query.type;
  const { deviceType } = props;

  const getColor = (type?: string) => {
    if (type === 'fires') return theme.colors.orange;
    if (type === 'rescue') return theme.colors.blue;
    if (type === 'firstAid') return theme.colors.green;
    if (type === 'others') return theme.colors.gray6;
    return '';
  };

  const handleClick = () => {
    // 현재 선택된 타입과 클릭된 타입이 같은 경우, URL에서 타입 제거
    if (selectedType === props.filterName) {
      const newQuery = { ...router.query };
      delete newQuery.type; // 타입 제거
      router.push({
        pathname: router.pathname,
        query: newQuery
      });
    } else {
      // 다른 타입이 선택된 경우, URL에 타입 추가
      router.push({
        pathname: router.pathname,
        query: { ...router.query, type: props?.filterName }
      });
    }
  };

  return (
    <Wrapper onClick={handleClick} isSelected={selectedType === props?.filterName} type={props?.filterName} deviceType={deviceType}>
      {/* {(deviceType === 'mobile' || deviceType === 'tabletVertical') && ( */}
      <Stack align="center" justify="center" spacing={deviceType === 'mobile' ? '8px' : '16px'} direction={deviceType === 'mobile' ? 'column' : 'row'}>
        <Stack align="center" spacing="4px" direction={deviceType === 'mobile' ? 'column' : 'row'}>
          <IconWrapper width={deviceType === 'mobile' ? '20px' : '32px'} height={deviceType === 'mobile' ? '20px' : '32px'} color={getColor(props?.filterName)}>
            {props?.filterName === 'fires' && <Fires />}
            {props?.filterName === 'rescue' && <Rescue />}
            {props?.filterName === 'firstAid' && <FirstAid />}
            {props?.filterName === 'others' && <Others />}
          </IconWrapper>
          <Text deviceType={deviceType}>
            {props?.filterName === 'fires' && '화재'}
            {props?.filterName === 'rescue' && '구조'}
            {props?.filterName === 'firstAid' && '구급'}
            {props?.filterName === 'others' && '기타'}
          </Text>
        </Stack>
        <NumberOfItems isZero={!props.countByType || props.countByType[`${props?.filterName}`] === 0} deviceType={deviceType}>
          {props?.filterName === 'fires' && props?.countByType && props.countByType['fires']}
          {props?.filterName === 'rescue' && props?.countByType && props.countByType['rescue']}
          {props?.filterName === 'firstAid' && props?.countByType && props.countByType['firstAid']}
          {props?.filterName === 'others' && props?.countByType && props.countByType['others']}
        </NumberOfItems>
      </Stack>
      {/* )} */}
    </Wrapper>
  );
};

export default HomeFilterItem;

const Wrapper = styled.div<any>`
  padding: 8px 24px;
  flex: 1;
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--02, #e9ecef);
  background: var(--01, #f8f9fa);

  ${({ isSelected, type }) => {
    if (isSelected) {
      if (type === 'fires') {
        return `
        background: #FF8A3A26;
        border: 1px solid #FF8A3A;
      `;
      }

      if (type === 'rescue') {
        return `
        border: 1px solid #799EFF;
        background: rgba(121, 158, 255, 0.15);
      `;
      }

      if (type === 'firstAid') {
        return `
        border: 1px solid #77D134;
        background: rgba(29, 206, 0, 0.15);
      `;
      }

      if (type === 'others') {
        return `
        border: 1px solid ${theme.colors.purple};
        background: rgba(164, 101, 227, 0.15);
      `;
      }
    }
  }}

  ${({ deviceType }) => {
    if (deviceType === 'tabletHorizontal') {
      return `
          display: flex;
          
       `;
    }
  }}
`;

const Text = styled.div<{ deviceType?: DeviceType }>`
  color: ${theme.colors.gray6};
  font-family: Pretendard Bold;
  font-size: 14px;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
  white-space: nowrap;

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
        font-family: Pretendard Bold;
        font-size: 20px;
        line-height: 32px; /* 160% */
        letter-spacing: -0.4px;
      `;
    }
  }}
`;

const NumberOfItems = styled.div<{ isZero?: boolean; deviceType?: DeviceType }>`
  color: var(--10, #212529);
  font-family: Pretendard Bold;
  font-size: 20px;
  line-height: 20px; /* 100% */
  letter-spacing: -0.4px;
  text-align: center;

  ${({ isZero }) =>
    isZero &&
    `
  color: var(--04, #CED4DA);
  font-family: Pretendard Bold;
  font-size: 20px;
  line-height: 20px; /* 100% */
  letter-spacing: -0.4px;
  `}

  ${({ deviceType }) => {
    if (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') {
      return `
      font-family: Pretendard Bold;
      font-size: 24px;
      line-height: 32px; /* 133.333% */
      letter-spacing: -0.48px;
      `;
    }
  }}
`;
