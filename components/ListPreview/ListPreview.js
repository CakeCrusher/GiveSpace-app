import React from 'react';
import { Avatar, Text, HStack, VStack, Pressable, Checkbox } from 'native-base';

import ShadowBox from '../ShadowBox/ShadowBox';
import InnerTitle from '../InnerTitle/InnerTitle';

const ListPreview = (props) => {
  const { avatar, username, listData, onCheck } = props;
  const { title, items } = listData;

  const date = new Date(listData.date_modified);
  const dateString = date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const spliced = items ? [...items].splice(0, 5) : [];
  const fill = [];
  for (let i = 0; i < 5 - spliced.length; i++) {
    fill.push('');
  }
  const styles = { ...props };
  delete styles.listData;
  delete styles.username;
  delete styles.avatar;

  if (onCheck !== undefined) {
  }

  return (
    <ShadowBox minH="42" {...styles}>
      <VStack px="4" py="2" bg="#FFF" flex="1" borderRadius="8">
        <Pressable onPress={props.onPress}>
          {avatar && (
            <HStack alignItems="center" space="2" mb="2">
              <Avatar size="xs" bg="#FAA" source={{ uri: avatar }} />
              <Text fontSize="xs">
                {username} updated &#8226; {dateString}
              </Text>
            </HStack>
          )}
          <HStack justifyContent="space-between" alignItems="center">
            <InnerTitle fontSize="2xl" isTruncated>
              {title}
            </InnerTitle>
            {onCheck !== undefined && (
              <Pressable onPress={onCheck}>
                <Checkbox onPress={onCheck} colorScheme="danger" />
              </Pressable>
            )}
          </HStack>
          <VStack pl="2">
            {spliced &&
              spliced.map((e, i) => (
                <Text key={i} isTruncated>
                  &#8226;&nbsp;&nbsp;{e.name}
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
