import { Input as ChakraInput } from '@chakra-ui/react';
import React, {forwardRef} from 'react';

interface Props {
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing: string;
  color: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; //onChange 함수를 정의
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <ChakraInput
      ref={ref}
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
      onChange={props.onChange}
    />
  );
});

export default Input;
