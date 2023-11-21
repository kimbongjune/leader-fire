import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { css } from '@emotion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import NeighborhoodModalItem from '../../NeighborhoodModalItem';
import ModalLayout from '@/components/common/Modal/ModalLayout';
import Close from '../../../../../public/images/icons/close.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import { dangerData, evacuationFacilityData, fireFacilityData, fireHistoryData, multiData, planData, tankData } from '../../NeighborhoodModalData';
import useDeviceType from '@/hooks/useDeviceType';
import { DeviceType } from '@/types/types';
import { Box } from '@chakra-ui/react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

interface Props {
  data: {
    title: string;
    data: {
      hasNumber?: boolean;
      data: {
        title: string;
        text: string;
      }[][];
    };
  }[];
  dangerData: any;
  isDangerCategory: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  build_sn?:string;
}

const FacilityModal = (props: Props) => {
  const deviceType = useDeviceType();

  console.log(props.build_sn)

  const [query, setQuery] = useQueryParams({build_sn: StringParam});

  setQuery({build_sn:props?.build_sn})

  return (
    <ModalLayout isOpen={true} onClose={() => props.setIsModalOpen(false)} padding="24px" borderRadius="12px">
      <ModalContent deviceType={deviceType}>
        <ModalClose onClick={() => props.setIsModalOpen(false)}>
          <Close />
        </ModalClose>
        {props.isDangerCategory && (
          <Box h="100%" overflowY="auto">
            <Title>{props.dangerData.title}</Title>
            <Wrapper deviceType={deviceType}>
              <NeighborhoodModalItem data={props.dangerData.data.data} hasNumber={props.dangerData.data.hasNumber} />
            </Wrapper>
          </Box>
        )}

        {!props.isDangerCategory && (
          <CustomSwiper>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper" autoHeight={true}>
              {props.data?.map((item, index) => {
                return (
                  <SwiperSlide key={`swiper-${index}`}>
                    <Title>{item.title}</Title>
                    <Wrapper deviceType={deviceType}>
                      <NeighborhoodModalItem data={item.data?.data} hasNumber={item.data?.hasNumber} />
                    </Wrapper>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </CustomSwiper>
        )}
      </ModalContent>
    </ModalLayout>
  );
};

FacilityModal.defaultProps = {
  data: [
    {
      title: '시설물 내 다중이용업소',
      data: multiData,
    },
    { title: '시설물 내 위험물', data: dangerData },
    { title: '시설물 화재발생이력', data: fireHistoryData },
    { title: '시설물 내 소방시설조사', data: fireFacilityData },
    { title: '경방계획', data: planData },
    { title: '시설물 내 피난대피시설', data: evacuationFacilityData },
  ],
  dangerData: { title: '저장탱크', data: tankData },
};
export default FacilityModal;

const ModalContent = styled.div<{ deviceType: DeviceType }>`
  // padding: 16px;
  width: 80vw;
  height: 80vh;
  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      // width: 100%;
      // max-height: 460px;
      // min-height: 460px;
      width: 80vw;
      height: 80vh;
      overflow-y: scroll;
    `}
`;

const ModalClose = styled.button`
  width: 28px;
  height: 28px;
  color: ${theme.colors.gray};
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 99;
`;

const Title = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 20px;
  font-style: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
  text-align: center;
  width: fit-content;
  margin: 0 auto 26px;
`;

const Wrapper = styled.div<{ deviceType: DeviceType }>`
  // max-height: 300px;
  // height: 100%;
  overflow-y: auto;
  ${props =>
    props.deviceType !== 'mobile' &&
    css`
      max-height: fit-content;
    `}
`;

const CustomSwiper = styled.div`
  height: 100%;
  .mySwiper {
    height: 100%;
    overflow-y: auto;
    /* 이전 버튼 */
    .swiper-button-prev {
      width: 24px;
      height: 24px;
      margin-top: 0;
      top: 0px;
      left: 43px;
      ::after {
        content: url('/images/icons/arrow-left.svg');
        color: ${theme.colors.gray6};
        width: 100%;
        height: 100%;
        font-size: unset;
      }
    }
    /* 다음 버튼 */
    .swiper-button-next {
      width: 24px;
      height: 24px;
      margin-top: 0;
      top: 0px;
      right: 43px;
      ::after {
        content: url('/images/icons/arrow-right.svg');
        color: ${theme.colors.gray6};
        width: 100%;
        height: 100%;
        font-size: unset;
      }
    }

    .swiper-button-disabled {
      ::after {
        color: ${theme.colors.gray4};
      }
    }
  }
`;
