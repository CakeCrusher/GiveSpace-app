import React from 'react';
import { Flex, Image, Text, VStack, HStack, Pressable } from 'native-base';

const ItemCard = ({ item, handlePress }) => {
  const { img_url, name } = item;

  return (
    <VStack borderWidth="1" borderColor="black" p="2">
      <Pressable onPress={handlePress}>
        <Flex alignItems="center" justifyContent="center">
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            alt="item"
            size="xl"
          />
        </Flex>
        <VStack mt="2">
          <Text fontSize="md" fontWeight="bold">
            {name}
          </Text>
          <Text fonstSize="sm">This is a description</Text>
        </VStack>
      </Pressable>
    </VStack>
  );
};

export default ItemCard;
