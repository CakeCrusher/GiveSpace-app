import React from 'react';
import { Modal, VStack, HStack, Button } from 'native-base';

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
              <Button onPress={handleConfirmDelete} flex="1" variant="outline">
                Yes
              </Button>
              <Button flex="1" onPress={onClose}>
                No
              </Button>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteAccountModal;
