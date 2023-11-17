import React, { ReactEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { useRouter } from 'next/router';
import { Box, Flex, VStack } from '@chakra-ui/react';
import Home from '../../../../public/images/icons/home.svg';
import Map from '../../../../public/images/icons/map.svg';
import Imagesmode from '../../../../public/images/icons/imagesmode.svg';
import History from '../../../../public/images/icons/history.svg';
import Rader from '../../../../public/images/icons/radar.svg';
import Group from '../../../../public/images/icons/groups.svg';
import Video from '../../../../public/images/icons/video.svg';
import SOP from '../../../../public/images/icons/sop.svg';
import IconWrapper from '../IconWrapper/IconWrapper';
import Link from 'next/link';

type DataType = {
  icon?: ReactNode;
  text?: string;
  route: string;
  disabled?: boolean;
  active: string;
};

//TODO 하단 네비게이션 바
const Navbar = () => {
  const router = useRouter();
  const detailId = router.query.id;
  const isDetailPage = router.route.includes('detail');

  // console.log("isDetailPage",isDetailPage)
  // console.log("detailId",detailId)

  const datas: DataType[] = [
    { icon: <Home />, text: '홈', route: isDetailPage? `/detail/${detailId}` : '/home', active: '/home' },
    { icon: <History />, text: '과거이력', route: `/detail/history?id=${detailId}`, disabled: !isDetailPage, active: '/history' },
    { icon: <Rader />, text: '연관인근', route: `/detail/neighborhood?id=${detailId}`, disabled: !isDetailPage, active: '/neighborhood' },
    { icon: <Group />, text: '채팅', route: `/detail/chat?filter=채팅 대상?id=${detailId}`, disabled: !isDetailPage, active: '/chat' },
    { icon: <Video />, text: '영상', route: `/detail/video?id=${detailId}`, disabled: !isDetailPage, active: '/video' },
    { icon: <SOP />, text: 'SOP', route: `/detail/sop?menu=SOP&id=${detailId}`, disabled: !isDetailPage, active: '/sop' },
  ];

  const handleNavigation = (data: DataType) => {
    if (!data.disabled) {
      router.push(data.route);
    }
  };

  return (
    <Container>
      <Flex justifyContent="space-between">
        {datas.map((data, index) => {
          const isDetailOrMap = router.route.includes('/detail/[id]') || router.route === '/detail/map';
          const isSelected = router.route.includes(data.active) || (isDetailOrMap && data.active === '/home');
          const isInDetail = router.route.includes('/detail');

          return (
            <div key={index} onClick={() => handleNavigation(data)}>
              <VStack w="52px" gap="4px">
                <IconWrapper height="24px" width="24px" color={isSelected ? theme.colors.orange : isInDetail ? theme.colors.gray5 : theme.colors.gray2}>
                  {data.icon}
                </IconWrapper>
                <Text isSelected={isSelected} isClickable={isInDetail}>
                  {data.text}
                </Text>
              </VStack>
            </div>
          );
        })}
      </Flex>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  padding: 16px 20px;
  border-top: 1px solid ${theme.colors.gray2};
  background: ${theme.colors.white};
  width: 100%;
  z-index: 10;
`;

const Text = styled.div<{ isSelected: boolean; isClickable: boolean }>`
  color: ${props => (props.isSelected ? theme.colors.orange : props.isClickable ? theme.colors.gray5 :  theme.colors.gray2)};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.28px;
`;
