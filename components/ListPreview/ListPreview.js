import React from 'react';
import { Text, VStack, Pressable } from 'native-base';

import ShadowBox from '../ShadowBox/ShadowBox';

const ListPreview = (props) => {
  const { title, items } = props.listData;

  const spliced = items && [...items].splice(0, 5);
  const fill = [];
  for (let i = 0; i < 5 - spliced.length; i++) {
    fill.push('');
  }

  const styles = { ...props };
  delete styles.listData;
  return (
    <ShadowBox minH="40" {...styles}>
      <VStack px="4" py="2" bg="#FFF" flex="1" borderRadius="8">
        <Pressable onPress={props.onPress}>
          <Text isTruncated fontSize="lg">
            {title}
          </Text>
          <VStack pl="2">
            {spliced &&
              spliced.map((e, i) => (
                <Text key={i} isTruncated>
                  &#8226;&nbsp;{e.name}
                </Text>
              ))}
            {fill && fill.map((e, i) => <Text key={i}> </Text>)}
          </VStack>
        </Pressable>
      </VStack>
    </ShadowBox>
  );
};

export default ListPreview;
