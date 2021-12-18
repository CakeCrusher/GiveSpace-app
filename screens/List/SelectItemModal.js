import React, { useState } from 'react';
import { Share, Linking } from 'react-native';
import {
  Modal,
  Text,
  Image,
  Flex,
  VStack,
  HStack,
  Button,
  Pressable,
  Icon,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

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
  console.log(item.image_url);

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
    Linking.openURL(`https://www.amazon.com/s?k=${formatted}&ref=nb_sb_noss_2`);
    //navigation.navigate('WebView', {
    //  uri: `https://www.amazon.com/s?k=${formatted}`,
    //});
  };

  const handleWalmartLink = () => {
    onClose();
    const formatted = item.name.split(' ').join('+');
    Linking.openURL(`https://www.walmart.com/search?q=${formatted}`);
  };

  const handleTargetLink = () => {
    onClose();
    const formatted = item.name.split(' ').join('+');
    Linking.openURL(`https://www.target.com/s?searchTerm=${formatted}`);
  };

  const copyAmazonLink = () => {
    const formatted = item.name.split(' ').join('+');
    Share.share({
      message: `https://www.amazon.com/s?k=${formatted}`,
    }).catch((err) => console.log('Could not create Link', err));
  };

  const copyWalmartLink = () => {
    const formatted = item.name.split(' ').join('+');
    Share.share({
      message: `https://www.walmart.com/search?q=${formatted}`,
    }).catch((err) => console.log('Could not create Link', err));
  };

  const copyTargetLink = () => {
    const formatted = item.name.split(' ').join('+');
    Share.share({
      message: `https://www.target.com/s?searchTerm=${formatted}`,
    }).catch((err) => console.log('Could not create Link', err));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content w="90%">
        <Modal.CloseButton />
        <Modal.Body px="8" py="4">
          {/* Image */}
          <Flex flex="3" alignItems="center">
            <Image
              size="48"
              src={item.image_url}
              alt={item.name}
              resizeMode="contain"
            />
          </Flex>

          {/* Name, Price, Mark Button*/}
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

          {/* Buttons */}
          <VStack mt="6" space="4">
            <HStack alignItems="center" space="4">
              <Pressable
                onPress={handleAmazonLink}
                bg="secondary.500"
                rounded="full"
                py="2"
                pl="20"
                flex="4"
              >
                <HStack flex="1" alignItems="center">
                  <Icon
                    as={<Feather name="shopping-cart" />}
                    size="sm"
                    color="white"
                  />
                  <Text fontSize="md" ml="4" color="white">
                    Amazon
                  </Text>
                </HStack>
              </Pressable>
              <Pressable onPress={copyAmazonLink}>
                <Icon as={<Feather name="link" />} size="sm" />
              </Pressable>
            </HStack>
            <HStack alignItems="center" space="4">
              <Pressable
                onPress={handleWalmartLink}
                bg="secondary.500"
                rounded="full"
                py="2"
                pl="20"
                flex="4"
              >
                <HStack flex="1" alignItems="center">
                  <Icon
                    as={<Feather name="shopping-cart" />}
                    size="sm"
                    color="white"
                  />
                  <Text fontSize="md" ml="4" color="white">
                    Walmart
                  </Text>
                </HStack>
              </Pressable>
              <Pressable onPress={copyWalmartLink}>
                <Icon as={<Feather name="link" />} size="sm" />
              </Pressable>
            </HStack>
            <HStack alignItems="center" space="4">
              <Pressable
                onPress={handleTargetLink}
                bg="secondary.500"
                rounded="full"
                py="2"
                pl="20"
                flex="4"
              >
                <HStack flex="1" alignItems="center">
                  <Icon
                    as={<Feather name="shopping-cart" />}
                    size="sm"
                    color="white"
                  />
                  <Text fontSize="md" ml="4" color="white">
                    Target
                  </Text>
                </HStack>
              </Pressable>
              <Pressable onPress={copyTargetLink}>
                <Icon as={<Feather name="link" />} size="sm" />
              </Pressable>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default SelectItemModal;
