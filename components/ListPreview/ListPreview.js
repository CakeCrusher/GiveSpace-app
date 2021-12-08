import React from 'react';
import { Text, VStack } from 'native-base';

const ListPreview = (props) => {
  const { title, items } = props.listData;
  const spliced = [...items].splice(0, 5);

  const styles = { ...props };
  delete styles.listData;

  return (
    <VStack bg="#fff" p="2" {...styles}>
      <Text isTruncated fontSize="xl">
        {title}
      </Text>
      {spliced.map((e, i) => (
        <Text key={i} isTruncated>
          {e.name}
        </Text>
      ))}
    </VStack>
  );
};

export default ListPreview;
