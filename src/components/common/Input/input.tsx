import { Input as ChakraInput } from '@chakra-ui/react';
import React from 'react';

interface Props {
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing: string;
  color: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
}

const Input = (props: Props) => {
  return (
    <ChakraInput
      w="100%"
      h="100%"
      border="1px solid #E9ECEF"
      padding="14px 16px"
      borderRadius={8}
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      color={props.color}
      placeholder={props.placeholder}
      backgroundColor="#fff"
      value={props.value}
      disabled={props.disabled}
    />
  );
};

export default Input;
