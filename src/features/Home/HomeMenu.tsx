import theme from '@/theme/colors';
import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import styled from '@emotion/styled';
import HamburgerIcon from '../../../public/images/icons/hamburger.svg';
import FireStation from '../../../public/images/icons/fire station.svg';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import Person from '../../../public/images/icons/person.svg';
import Restart from '../../../public/images/icons/restart.svg';
import Logout from '../../../public/images/icons/logout.svg';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import Button from '@/components/common/Button/Button';
import { useQueryParam } from 'use-query-params';
import UserSettingModal from '@/components/common/Modal/UserSettingModal';
import TokenRefreshModal from '@/components/common/Modal/TokenRefreshModal';
import SearchDispatch from './SearchDispatch';
import { DeviceType, DispatchItemType, UserInformation } from '@/types/types';
import { useRouter } from 'next/router';
import { CountByType } from './HomeFilterItem';
import { useDispatch } from 'react-redux';
import { saveLogedInStatus, saveUserInformation } from '../slice/UserinfoSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface Props {
  profileUrl?: string;
  name: string;
  workspace: string;
  phoneNumber: string;
  menus: { icon: ReactNode; name: string; query: string }[];
  deviceType?: DeviceType;
  testData:DispatchItemType[]
}

const HomeMenu = (props: Props) => {
  const { deviceType } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useQueryParam('option');
  const router = useRouter();
  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);

  const countByType: CountByType = props.testData?.reduce(
    (res, dispatch) => {
      res[dispatch.type] = (res[dispatch.type] || 0) + 1;
      return res;
    },
    { fires: 0, rescue: 0, firstAid: 0, others: 0 },
  );

  // 홈 메뉴 선택 시 호출
  const handleClickMenu = (query: string) => {
    setQuery(query);
    onClose();
  };

  // 홈 메뉴 닫을 때 호출
  const handleClose = () => {
    setQuery(undefined);
    onClose();
  };

  // 모달 닫기 버튼 클릭 시 호출
  const handleCloseModal = () => {
    setQuery(undefined);
  };

  // 설정 모달 확인 버튼 클릭 시 호출
  const handleSettingClickOkButton = () => {
    setQuery(undefined);
  };

  // fcm 모달 확인버튼
  const handleFcmTokenClickOkButton = () => {
    setQuery(undefined);
  };

  // 로그아웃 버튼 클릭 시 호출
  const handleLogoutButton = () => {
    onClose();
    router.replace('/logIn');
    dispatch(saveLogedInStatus(false))
    const emptyUserInfo:UserInformation = {
      userId: '',
      userName: '',
      classCd: '',
      wardId: '',
      wardName: '',
      deviceTel: '',
      fcmToken: '',
      authUserPw: ''
    };
    dispatch(saveUserInformation(emptyUserInfo))

    if (window.fireAgency && window.fireAgency.logout) {
      window.fireAgency.logout();
    }
    if (window.fireAgency && window.fireAgency.stopLocationService) {
      window.fireAgency.stopLocationService();
    }
  };

  return (
    <Wrapper>
      <Container deviceType={deviceType}>
        {/* 상단 메뉴 */}
        <Flex w="100%" align="center" justify="space-between" height="fit-content">
          {deviceType === 'mobile' && <Title>지휘관앱</Title>}
          {deviceType !== 'mobile' && <Title deviceType={deviceType}>정보지원 전용서비스</Title>}
          <Flex align="center" gap="16px" w="fit-content">
            <Flex gap="4px">
              <FireStation width={20} height={20} color={theme.colors.orange} />
              <Text>{userInfo?.wardName}</Text>
            </Flex>
            <Hamburger onClick={onOpen}>
              <HamburgerIcon width={24} height={24} color="#fff" />
            </Hamburger>
          </Flex>
        </Flex>
        <Drawer variant="default" placement="left" onClose={handleClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader p="16px" bgColor={theme.colors.darkBlue}>
              <Flex gap="16px" p="34px 0 16px 0" borderBottom="1px solid #495057">
                <Profile profileUrl={props.profileUrl ?? ''} />
                <Stack spacing="4px">
                  <Role>지휘관</Role>
                  <Name>{userInfo?.userName}</Name>
                </Stack>
              </Flex>
              <Flex justify="space-between" pt="16px">
                <Flex gap="4px">
                  <FireStation width={20} height={20} color={theme.colors.orange} />
                  <Workspace>{userInfo?.wardName}</Workspace>
                </Flex>
                <PhoneNumber>{userInfo?.deviceTel}</PhoneNumber>
              </Flex>
            </DrawerHeader>
            <DrawerBody p="20px 16px">
              <Flex h="100%" direction="column" justify="space-between">
                <Stack spacing="0" divider={<Divider />}>
                  {props.menus?.map((menu, index) => {
                    return (
                      <Flex key={index} gap="8px" align="center" onClick={() => handleClickMenu(menu.query)}>
                        <IconWrapper height="24px" width="24px" color={theme.colors.orange}>
                          {menu.icon}
                        </IconWrapper>
                        <MenuName>{menu.name}</MenuName>
                      </Flex>
                    );
                  })}
                </Stack>
                <StyledButton onClick={handleLogoutButton}>
                  <IconWrapper height="24px" width="24px" color={theme.colors.white}>
                    <Logout />
                  </IconWrapper>
                  로그아웃
                </StyledButton>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <SearchDispatch deviceType={deviceType} countByType={countByType} NumberOfEmergencyDispatches={props.testData?.length} />
      </Container>
      {query === 'setting' && <UserSettingModal phoneNumber={userInfo?.deviceTel} isOpen={query === 'setting'} onClose={() => handleCloseModal()} onClick={() => handleSettingClickOkButton()} />}
      {query === 'token' && <TokenRefreshModal existingToken={userInfo?.fcmToken} isOpen={query === 'token'} onClose={() => handleCloseModal()} onClick={() => handleFcmTokenClickOkButton()} />}
    </Wrapper>
  );
};

export default HomeMenu;

HomeMenu.defaultProps = {
  name: '홍길동',
  workspace: '진주소방서',
  phoneNumber: '010-0000-0000',
  menus: [
    { icon: <Person />, name: '전화번호, 위치정보 설정 변경', query: 'setting' },
    { icon: <Restart />, name: '푸시 토큰 재발급', query: 'token' },
  ],
};

const Wrapper = styled.div`
  position: sticky;
  z-index: 10;
  top: 0;
`;

const Container = styled.div<{ deviceType?: DeviceType }>`
  position: relative;
  width: 100%;
  height: 200px;
  background: ${theme.colors.darkBlue};
  padding: 12px 16px;

  ${({ deviceType }) =>
    (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') &&
    `
    padding: 20px 16px;
    height: 128px;
  `};
`;

const Title = styled.div<{ deviceType?: DeviceType }>`
  color: ${theme.colors.gray};
  font-family: Pretendard Bold;
  font-size: 24px;
  font-style: normal;
  line-height: 32px; /* 133.333% */
  letter-spacing: -0.48px;

  ${({ deviceType }) =>
    (deviceType === 'tabletVertical' || deviceType === 'tabletHorizontal') &&
    `
    color: ${theme.colors.white};
  `}
`;

const Hamburger = styled.button``;

const Text = styled.div`
  color: var(--00, #fff);
  font-family: Pretendard Bold;
  font-size: 16px;
  font-style: normal;
  line-height: 20px; /* 125% */
  letter-spacing: -0.32px;
`;

const Profile = styled.div<any>`
  width: 56px;
  height: 56px;
  border-radius: 58px;
  background: #6c757d;
  overflow: hidden;
  background-image: ${({ profileUrl }) => `url('${profileUrl}')`};
  background-size: cover;
`;

const Role = styled.div`
  color: var(--05, #adb5bd);
  font-family: Pretendard Bold;
  font-size: 16px;
  font-style: normal;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;

const Name = styled.div`
  color: #fff;
  font-family: Pretendard Bold;
  font-size: 20px;
  font-style: normal;
  line-height: 24px; /* 120% */
  letter-spacing: -0.4px;
`;

const Workspace = styled.div`
  color: var(--00, #fff);
  font-family: Pretendard Bold;
  font-size: 16px;
  font-style: normal;
  line-height: 20px; /* 125% */
  letter-spacing: -0.32px;
`;

const PhoneNumber = styled.div`
  color: #e9ecef;
  font-family: Pretendard Medium;
  font-size: 14px;
  font-style: normal;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.28px;
`;

const Divider = styled.div`
  width: 100%;
  height: 0px;
  border-bottom: 1px solid #e9ecef;
  margin: 20px 0;
`;

const MenuName = styled.div`
  color: #343a40;
  font-family: Pretendard SemiBold;
  font-size: 16px;
  font-style: normal;
  line-height: 20px; /* 125% */
  letter-spacing: -0.32px;
`;

const StyledButton = styled.button`
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  color: #fff;
  font-family: Pretendard Bold;
  font-size: 18px;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.36px;

  border-radius: 8px;
  background: var(--06, #909aa4);
`;
