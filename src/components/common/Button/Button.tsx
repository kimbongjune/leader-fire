import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface Props {
  height: string;
  backgroundColor: string;
  padding: string;
  children: ReactNode;
  margin?: string;
  borderRadius?: string;
  onClick?: () => void;
}

const Button = (props: Props) => {
  const { height, backgroundColor, padding, children, margin, borderRadius } = props;
  return (
    <ButtonContainer onClick={props.onClick} height={height} backgroundColor={backgroundColor} padding={padding} margin={margin} borderRadius={borderRadius}>
      {children}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button<Pick<Props, 'height' | 'backgroundColor' | 'padding' | 'margin' | 'borderRadius'>>`
  width: 100%;
  height: ${props => props.height};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '8px')};
  background: ${props => props.backgroundColor};
  padding: ${props => props.padding};
  margin: ${props => props.margin && props.margin};
`;
