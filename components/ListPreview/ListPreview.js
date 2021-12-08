import React from 'react';
import { Text, VStack, Pressable } from 'native-base';

const ListPreview = (props) => {
  const { title, list_items } = props.listData;
  const spliced = list_items && [...list_items].splice(0, 5);
  console.log(props.listData);

  const styles = { ...props };
  delete styles.listData;

  return (
    <VStack bg="#fff" p="2" {...styles}>
      <Pressable onPress={props.onPress}>
        <Text isTruncated fontSize="xl">
          {title}
        </Text>
        {spliced &&
          spliced.map((e, i) => (
            <Text key={i} isTruncated>
              {e.item.name}
            </Text>
          ))}
      </Pressable>
    </VStack>
  );
};

export default ListPreview;
