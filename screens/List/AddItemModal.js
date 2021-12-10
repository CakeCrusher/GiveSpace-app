import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Modal, Text, Icon, Input, HStack } from 'native-base';

import { ItemCard } from '../../components';

const AddItemModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="85%">
        <Modal.CloseButton />
        <Modal.Header></Modal.Header>

        <Modal.Body></Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default AddItemModal;
