import React, { HTMLProps } from 'react';
import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import Navbar from '../Navbar/Navbar';
import Div100vh from 'react-div-100vh';

type LayoutProps = HTMLProps<HTMLElement>;

const Layout = (props: LayoutProps) => {
  return (
    <Div100vh>
      <Flex direction="column" h="100%">
        <Container>{props.children}</Container>
        <Navbar />
      </Flex>
    </Div100vh>
  );
};

export default Layout;

const Container = styled.div`
  height: 100%;
  padding-bottom: 81px;
`;
