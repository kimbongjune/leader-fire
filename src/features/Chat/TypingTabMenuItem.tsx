import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  onClick?: () => void;
}

const TypingTabMenuItem = (props: Props) => {
  return (
    <Wrapper onClick={props.onClick}>
      <Flex gap="8px">
        <IconWrapper width="24px" height="24px" color="#495057">
          {props.icon}
        </IconWrapper>
        <Title>{props.title}</Title>
      </Flex>
    </Wrapper>
  );
};

export default TypingTabMenuItem;

const Wrapper = styled.div`
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid var(--02, #e9ecef);
  background: var(--00, #fff);
`;

const Title = styled.div`
  color: var(--08, #495057);
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;
