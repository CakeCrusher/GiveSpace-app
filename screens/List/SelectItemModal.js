import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {
  Modal,
  Text,
  Image,
  Flex,
  Center,
  HStack,
  Pressable,
} from 'native-base';

const SelectItemModal = ({ isOpen, onClose, item }) => {
  // TODO: Handle Web View
  console.log(item);

  const handleLinkPress = () => {
    console.log('Take this to Web View');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxW="85%">
        <Modal.CloseButton />
        <Modal.Header alignItems="center" justifyContent="center">
          <Flex flex="1">
            <Image size="xl" src={item.image_url} alt={item.name} />
          </Flex>
        </Modal.Header>
        <Modal.Body px="8" py="4">
          <Flex flex="1">
            <Text fontSize="xl">{item.name}</Text>
            <Text fontSize="md">{item.price}</Text>
          </Flex>
          <Center mt="12">
            <HStack>
              <Pressable onPress={handleLinkPress}>
                <Text p="4">Amazon Link</Text>
              </Pressable>
            </HStack>
          </Center>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default SelectItemModal;
