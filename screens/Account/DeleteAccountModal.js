import React from "react";
import { Modal, VStack, HStack, Button } from "native-base";

const DeleteAccountModal = ({ isOpen, onClose, handleConfirmDelete }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>
          Are you sure you want to delete your account?
        </Modal.Header>
        <Modal.Body>
          <VStack space="4">
            <HStack space="4">
              <Button onPress={onClose} flex="1" colorScheme="info">
                No
              </Button>
              <Button
                onPress={handleConfirmDelete}
                flex="1"
                colorScheme="danger"
              >
                Yes
              </Button>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteAccountModal;
