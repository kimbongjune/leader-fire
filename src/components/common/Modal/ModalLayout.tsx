import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  padding?: string;
  margin?: string;
  borderRadius?: string;
}

const ModalLayout = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent width="fit-content" maxW="fit-content" h="fit-content" maxH="fit-content" padding={props.padding} margin={props.margin} borderRadius={props.borderRadius} position="relative">
        <ModalBody p="0">{props.children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalLayout;
