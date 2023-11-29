import styled from '@emotion/styled';
import MapIcon from '../../../../public/images/icons/map.svg';
import CopyIcon from '../../../../public/images/icons/contentCopy.svg';
import { Box, Flex, SystemProps } from '@chakra-ui/react';
import IconWrapper from '../IconWrapper/IconWrapper';
import theme from '@/theme/colors';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

interface Props {
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  address?: string;
  children?: ReactNode;
  contentJustify?: SystemProps['justifyContent'];
  marginLeft?: string;
}

//TODO 상부 주소 관련 탭, 안드로이드 복사
const AddressTab = (props: Props) => {
  const router = useRouter();
  const id = router.query.id;
  const handleClickCopyIcon = async (address?: string) => {
    if (window.fireAgency && window.fireAgency.copyClipboard && address) {
      window.fireAgency.copyClipboard(address);
    }else{
      alert("재난 주소 정보가 올바르지 않습니다.")
    }
  };
  return (
    <Wrapper className="address-tab-container">
      <Flex className="address-tab-flex" justify={props.contentJustify ? props.contentJustify : 'space-between'} align="center" w="100%">
        <Flex gap="12px" align="center">
          <Box onClick={() => router.push(`/detail/map?id=${id}`)}>
            {!props.leftComponent && (
              <IconWrapper width="24px" height="24px" color={theme.colors.gray5}>
                <MapIcon className="map-icon" />
              </IconWrapper>
            )}
            {props.leftComponent}
          </Box>
          <Address className="address">{props.address}</Address>
        </Flex>
        <Box className="copy-icon-box" ml={props.marginLeft ? props.marginLeft : '70px'} onClick={() => handleClickCopyIcon(props.address)}>
          {!props.rightComponent && (
            <IconWrapper width="24px" height="24px" color={theme.colors.gray2}>
              <CopyIcon className="copy-icon" />
            </IconWrapper>
          )}
          {props.rightComponent}
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default AddressTab;

AddressTab.defaultProps = {
  address: '경남 진주시 진주대로 345-13, 203호',
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid var(--08, #495057);
  background: var(--09, #343a40);
`;

const Address = styled.div`
  color: var(--00, #fff);
  font-family: Pretendard SemiBold;
  font-size: 18px;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.36px;
  text-overflow: ellipsis;
`;

const Content = styled.div`
  flex: 1;
`;
