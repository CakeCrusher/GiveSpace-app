import React from 'react';
import { Text, VStack } from 'native-base';

const ItemCard = (props) => {
  const { imgUrl, title, subtitle } = props.item;
  delete props.item;

  return (
    <VStack>
      <Text>ItemCard Image</Text>
      <Text>ItemCard Title</Text>
      <Text>ItemCard Sub</Text>
    </VStack>
  );
};

export default ItemCard;
