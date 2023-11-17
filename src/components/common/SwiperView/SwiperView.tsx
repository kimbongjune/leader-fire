import { Swiper, SwiperSlide } from 'swiper/react';
import styled from '@emotion/styled';
import 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import IconWrapper from '../IconWrapper/IconWrapper';
import theme from '@/theme/colors';
import LeftArrowIcon from '../../../../public/images/icons/arrow-left.svg';
import RightArrowIcon from '../../../../public/images/icons/arrow-right.svg';

interface Props {
  children: ReactNode[];
  slidesPerView?: number;
  gap?: number;
  hasNavButton?: boolean;
}

const SwiperView = (props: Props) => {
  const [swiper, setSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const PrevEl = useRef(null);
  const NextEl = useRef(null);

  const goToPrevSlide = () => {
    if (!swiperRef.current) return;
    setActiveIndex(activeIndex - 1);
    swiper.slideTo(activeIndex - 1);
  };

  const goToNextSlide = async () => {
    if (activeIndex >= props.children.length) return;
    await setActiveIndex(activeIndex + 1);
    swiper.slideTo(activeIndex + 1);
  };

  return (
    <Wrapper>
      <Swiper
        className="mySwiper"
        ref={swiperRef}
        navigation={{
          prevEl: PrevEl.current,
          nextEl: NextEl.current,
        }}
        onSwiper={s => setSwiper(s)}
        modules={[Navigation]}
        slidesPerView={props.slidesPerView ?? 1.25}
        spaceBetween={props.gap ?? 40}
        centeredSlides={true}
      >
        {Array.isArray(props.children) && props.children?.map((child, index) => <SwiperSlide key={index}>{child}</SwiperSlide>)}
        {!Array.isArray(props.children) && <SwiperSlide>{props.children}</SwiperSlide>}
      </Swiper>
      {props.hasNavButton && (
        <>
          {activeIndex > 0 && (
            <StyledButton left="16px" ref={PrevEl} onClick={goToPrevSlide}>
              <IconWrapper width="32px" height="32px" color={theme.colors.white}>
                <LeftArrowIcon />
              </IconWrapper>
            </StyledButton>
          )}
          {activeIndex < props.children.length - 1 && (
            <StyledButton right="16px" ref={NextEl} onClick={goToNextSlide}>
              <IconWrapper width="32px" height="32px" color={theme.colors.white}>
                <RightArrowIcon />
              </IconWrapper>
            </StyledButton>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default SwiperView;

SwiperView.defaultProps = {
  hasNavButton: true
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;

  .mySwiper {
    width: 100%;
  }

  .swiper-slide {
    height: 100%;
    overflow-y: auto;
    padding: 24px 0;

    ::-webkit-scrollbar {
      display: none;
    }

    .no-scrollbar {
      -ms-overflow-style: none;
    }

    scrollbar-width: none;
  }
`;

const StyledButton = styled.button<{ left?: string; right?: string }>`
  position: absolute;
  height: fit-content;
  border-radius: 8px;
  padding: 16px;
  background: ${theme.colors.gray};
  bottom: 50%;
  right: ${({ right }) => right};
  left: ${({ left }) => left};
  transform: translateY(50%);
  z-index: 10;
`;
