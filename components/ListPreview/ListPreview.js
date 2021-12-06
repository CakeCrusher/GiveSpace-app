import React from 'react';
import { Text, VStack } from 'native-base';

const ListPreview = ({ styleProps, listData }) => {
  const { name, items } = listData;
  const spliced = listData.items.splice(0, 5);
  return (
    <VStack bg="#fff" p="2" {...styleProps}>
      <Text isTruncated fontSize="xl">
        {listData.name}
      </Text>
      {spliced.map((e, i) => (
        <Text isTruncated>{e.name}</Text>
      ))}
    </VStack>
  );
};

export default ListPreview;
