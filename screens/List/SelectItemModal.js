import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import {
  Modal,
  Text,
  Image,
  Flex,
  Center,
  HStack,
  VStack,
  Button,
} from 'native-base';

const SelectItemModal = ({ navigation, isOpen, onClose, item }) => {
  // TODO: Handle Web View
  console.log(item);

  const handleLinkPress = () => {
    onClose();
    navigation.navigate('WebView', {
      uri: item.item_url,
    });
  };

  const handleAmazonLink = () => {
    onClose();
    const formatted = item.name.split(' ').join('+');
    navigation.navigate('WebView', {
      uri: `https://www.amazon.com/s?k=${formatted}`,
    });
  };

  const handleWalmartLink = () => {
    onClose();
    const formatted = item.name.split(' ').join('+');
    navigation.navigate('WebView', {
      uri: `https://www.target.com/s?searchTerm=${formatted}`,
    });
  };
  const handleTargetLink = () => {
    onClose();
    const formatted = item.name.split(' ').join('+');
    navigation.navigate('WebView', {
      uri: `https://www.target.com/s?searchTerm=${formatted}`,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxW="85%">
        <Modal.CloseButton />
        <Modal.Body px="8" py="4">
          <Flex flex="3" alignItems="center">
            <Image size="48" src={item.image_url} alt={item.name} />
          </Flex>
          <Flex mt="6" flex="1" justifyContent="center">
            <Text fontSize="xl" fontWeight="bold">
              {item.name}
            </Text>
            <Text fontSize="md">{'$' + item.price}</Text>
          </Flex>
          <VStack mt="6" space="4">
            <Button onPress={handleAmazonLink}>Amazon Link</Button>
            <Button onPress={handleWalmartLink}>Walmart Link</Button>
            <Button onPress={handleTargetLink}>Target Link</Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default SelectItemModal;
