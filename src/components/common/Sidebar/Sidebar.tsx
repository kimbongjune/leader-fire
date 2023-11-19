import theme from '@/theme/colors';
import { Stack, useOutsideClick } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ReactNode, useRef, useState } from 'react';
import ListIcon from '../../../../public/images/icons/list.svg';
import CloseIcon from '../../../../public/images/icons/close.svg';
import IconWrapper from '../IconWrapper/IconWrapper';

interface Props {
  width: string;
  children?: ReactNode;
}

const Sidebar = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef(null);
  return (
    <SidebarWrapper width={props.width} isOpen={isOpen}>
      <SidebarBody isOpen={isOpen} >
        <SidebarButton isOpen={isOpen} onClick={() => setIsOpen(prev => !prev)}>
          <Stack spacing="0" align="center" flexWrap="nowrap">
            <IconWrapper width="24px" height="24px" color="#495057">
              {isOpen ? <CloseIcon /> : <ListIcon />}
            </IconWrapper>
            <Text>{isOpen ? '접기' : '목차'}</Text>
          </Stack>
        </SidebarButton>
        {props.children}
      </SidebarBody>
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled.div<any>`
  width: ${({ width }) => width};
  height: 100%;
  z-index: 100;
  position: relative;
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
`;

const SidebarBody = styled.div<any>`
  padding: 16px;
  position: absolute;
  width: 100%;
  left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  transition: left 1s ease;
  height: 100%;
  z-index: 1;
  background-color: ${theme.colors.white};
  border-right: 1px solid var(--02, #e9ecef);
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
`;

const SidebarButton = styled.div<any>`
  position: absolute;
  top: 16px;
  left: 100%;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 0 8px 8px 0;
  border-top: 1px solid var(--02, #e9ecef);
  border-right: 1px solid var(--02, #e9ecef);
  border-bottom: 1px solid var(--02, #e9ecef);
  background: #fff;
  z-index: 10;
`;

const Text = styled.div`
  color: var(--08, #495057);
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  min-width: 28px;
`;
