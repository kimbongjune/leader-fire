import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import CheckIcon from '../../../public/images/icons/check-circle-block.svg';
import theme from '@/theme/colors';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface Props {
  isActive?: boolean;
  activeColor: string;
  icon?: ReactNode;
  hasClickIcon?: boolean;
  title: string;
  subTitle?: ReactNode;
  extraIcon?: ReactNode;
  onlyBackground?: boolean;
  hasBorder?: boolean;
  onClick: () => void;
}

const VehicleStatusPanelItem = (props: Props) => {
  if (props.hasClickIcon) {
    return (
      <Wrapper isActive={props.isActive} activeColor={props.activeColor} onClick={() => props.onClick()} hasBorder={props.hasBorder} hasBackground={true}>
        <Flex w="100%" h="100%" justify="space-between" align="flex-end" direction="column">
          <IconWrapper width="20px" height="20px" color={props.isActive ? props.activeColor : theme.colors.gray9}>
            <CheckIcon />
          </IconWrapper>

          <Stack w="100%" align="flex-start" spacing="2px">
            {!props.subTitle && (
              <>
                <IconWrapper width="20px" height="20px" color={props.isActive ? props.activeColor : theme.colors.gray6}>
                  {props.icon}
                </IconWrapper>
                <Title isActive={props.isActive} activeColor={props.activeColor}>
                  {props.title}
                </Title>
              </>
            )}
            {props.subTitle && (
              <>
                <Title isActive={props.isActive} activeColor={props.activeColor}>
                  {props.title}
                </Title>
                <Flex gap="2px" align="center">
                  <SubTitle isActive={props.isActive} activeColor={props.activeColor} color={theme.colors.gray3}>
                    {props.subTitle}
                  </SubTitle>
                  <IconWrapper width="20px" height="20px" color={props.isActive ? props.activeColor : theme.colors.gray3}>
                    {props.icon}
                  </IconWrapper>
                </Flex>
              </>
            )}
          </Stack>
        </Flex>
      </Wrapper>
    );
  }
  return (
    <Wrapper isActive={props.isActive} activeColor={props.activeColor} hasBorder={props.hasBorder} onlyBackground={props.onlyBackground} onClick={() => props.onClick()}>
      {!props.subTitle && (
        <Stack align="center" spacing="4px">
          {props.icon && (
            <IconWrapper width="24px" height="24px" color={props.isActive ? (props.onlyBackground ? theme.colors.white : props.activeColor) : theme.colors.gray6}>
              {props.icon}
            </IconWrapper>
          )}
          <Title isActive={props.isActive} activeColor={props.activeColor} onlyBackground={props.onlyBackground}>
            {props.title}
          </Title>
        </Stack>
      )}
      {props.subTitle && (
        <Stack align="center" spacing="4px">
          <Stack align="center" spacing="2px">
            {props.icon && (
              <IconWrapper width="20px" height="20px" color={props.isActive ? props.activeColor : theme.colors.gray6}>
                {props.icon}
              </IconWrapper>
            )}
            <Title isActive={props.isActive} activeColor={props.activeColor}>
              {props.title}
            </Title>
          </Stack>
          <Flex>
            <IconWrapper width="16px" height="16px" color={theme.colors.gray5}>
              {props.extraIcon}
            </IconWrapper>
            <SubTitle>{props.subTitle}</SubTitle>
          </Flex>
        </Stack>
      )}
    </Wrapper>
  );
};

export default VehicleStatusPanelItem;

const Wrapper = styled.div<{ isActive?: boolean; activeColor?: string; onlyBackground?: boolean; hasBorder?: boolean; hasBackground?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  min-height: 100px;
  padding: 12px;
  background: ${theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray9};

  ${({ isActive, activeColor, onlyBackground }) =>
    isActive &&
    onlyBackground &&
    `
      background: ${activeColor};
  `}

  ${({ isActive, activeColor, hasBorder }) =>
    isActive &&
    hasBorder &&
    `
    border: 1px solid ${activeColor};
  `}

  ${({ isActive, activeColor, hasBackground }) =>
    isActive &&
    hasBackground &&
    `
    background: linear-gradient(0deg, ${activeColor}26 0%, ${activeColor}26 100%), ${theme.colors.white};
  `}
`;

const Title = styled.div<{ isActive?: boolean; activeColor?: string; onlyBackground?: boolean }>`
  color: ${theme.colors.gray6};
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;

  ${({ isActive, activeColor, onlyBackground }) => {
    if (isActive && onlyBackground) {
      return `
        color: ${theme.colors.white};
      `;
    }

    if (isActive) {
      return `
        color: ${activeColor};
      `;
    }
  }}
`;

const SubTitle = styled.div<{ color?: string; isActive?: boolean; activeColor?: string }>`
  color: ${({ color }) => color ?? theme.colors.gray5};
  text-align: center;
  font-family: Pretendard SemiBold;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;

  ${({ isActive, activeColor }) =>
    isActive &&
    `
  color: ${activeColor};
`}
`;
