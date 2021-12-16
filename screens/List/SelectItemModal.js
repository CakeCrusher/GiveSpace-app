import React, { useState } from 'react';
import { Modal, Text, Image, Flex, VStack, Button } from 'native-base';

const SelectItemModal = ({
  navigation,
  isOpen,
  onClose,
  handlePurchaseItem,
  handleCancelPurchase,
  userState,
  isUser,
  item,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = () => {
    setIsLoading(true);
    handlePurchaseItem(item.id, () => setIsLoading(false));
  };

  const handleCancel = () => {
    setIsLoading(true);
    handleCancelPurchase(item.id, () => setIsLoading(false));
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
      uri: `https://www.walmart.com/search?q=${formatted}`,
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
            {!isUser &&
              (!item.status ? (
                <Button
                  onPress={handlePurchase}
                  mr="auto"
                  isLoading={isLoading}
                  colorScheme={'primary'}
                >
                  {item.status === userState.id
                    ? 'Cancel'
                    : 'Mark for Purchase'}
                </Button>
              ) : (
                <Button
                  onPress={handleCancel}
                  mr="auto"
                  isLoading={isLoading}
                  colorScheme={
                    item.status !== userState.id ? 'gray' : 'primary'
                  }
                  disabled={item.status !== userState.id}
                >
                  {item.status === userState.id ? 'Cancel' : 'Reserved'}
                </Button>
              ))}
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
