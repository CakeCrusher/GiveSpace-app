import React from 'react';
import { Flex, Image, Text, VStack, HStack, Pressable } from 'native-base';

const ItemCard = ({ item, handlePress }) => {

  // console.log('item', );
  const imageToShow = item.image_url || 'https://via.placeholder.com/150'
  return (
    <VStack borderWidth="1" borderColor="black" p="2">
      <Pressable onPress={handlePress}>
        <Flex alignItems="center" justifyContent="center">
          <Image
            source={{ uri: imageToShow }}
            alt="item"
            size="xl"
          />
        </Flex>
        <VStack mt="2">
          <Text fontSize="md" fontWeight="bold">
            {item.name}
          </Text>
          <Text fonstSize="sm">This is a description</Text>
        </VStack>
      </Pressable>
    </VStack>
  );
};

export default ItemCard;
