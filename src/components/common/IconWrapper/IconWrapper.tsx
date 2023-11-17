import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface Props {
  width: string;
  height: string;
  color: string;
  margin?: string;
  children: ReactNode;
  position?: string;
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
  onClick?: () => void;
}

const IconWrapper = (props: Props) => {
  const { width, height, color, margin, position, top, right, left, bottom, onClick } = props;

  return (
    <Container width={width} height={height} color={color} margin={margin} position={position} top={top} right={right} left={left} bottom={bottom} onClick={onClick}>
      {props.children}
    </Container>
  );
};

export default IconWrapper;

const Container = styled.div<{ width: string; height: string; color: string; margin?: string; position?: string; top?: string; right?: string; left?: string; bottom?: string }>`
  color: ${props => props.color};
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  position: ${props => props.position};
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
`;
