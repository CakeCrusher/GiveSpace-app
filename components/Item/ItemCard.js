import React from 'react';
import {
  Flex,
  Image,
  Text,
  VStack,
  HStack,
  Pressable,
  Checkbox,
} from 'native-base';

import ShadowBox from '../ShadowBox/ShadowBox';

const ItemCard = (props) => {
  const { item, handlePress } = props;
  const styles = { ...props };
  delete styles.item;
  delete styles.handlePress;
  // console.log('item', );
  const imageToShow = item.image_url || 'https://via.placeholder.com/150';
  return (
    <ShadowBox minH="48" {...styles}>
      <Pressable onPress={handlePress}>
        <VStack p="2">
          <Flex alignItems="center" justifyContent="center">
            <Image source={{ uri: imageToShow }} alt="item" size="xl" />
          </Flex>
          <VStack mt="2">
            <Text fontSize="md" fontWeight="bold" textAlign="center">
              {item.name}
            </Text>
          </VStack>
        </VStack>
      </Pressable>
    </ShadowBox>
  );
};

export default ItemCard;
