import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Modal, Text, Icon, Image, Input, HStack } from 'native-base';

const AddItemModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxH="85%" maxW="85%">
        <Modal.CloseButton />
        <Modal.Body>
          <Flex flex="4">
            <Image src={}/>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default AddItemModal;
