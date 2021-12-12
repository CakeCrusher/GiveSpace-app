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
      <VStack p="2" bg="#FFF" flex="1" borderRadius="8">
        <Pressable onPress={props.onPress}>
          <Text isTruncated fontSize="xl">
            {title}
          </Text>
          {spliced &&
            spliced.map((e, i) => (
              <Text key={i} isTruncated>
                {e.name}
              </Text>
            ))}
          {fill && fill.map((e, i) => <Text key={i}> </Text>)}
        </Pressable>
      </VStack>
    </ShadowBox>
  );
};

export default ListPreview;
