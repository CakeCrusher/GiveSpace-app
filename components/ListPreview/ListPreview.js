import React from 'react';
import {
  Text,
  Box,
  Center,
  HStack,
  VStack,
  ZStack,
  Pressable,
  Checkbox,
} from 'native-base';

import InnerTitle from '../InnerTitle/InnerTitle';

const ListPreview = (props) => {
  const { listData, check } = props;
  const { title, items } = listData;

  const spliced = items ? [...items].splice(0, 5) : [];
  const fill = [];
  for (let i = 0; i < 5 - spliced.length; i++) {
    fill.push('');
  }
  const styles = { ...props };
  delete styles.listData;
  delete styles.username;
  delete styles.avatar;

  return (
    <ZStack minH="42" {...styles}>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        h="95%"
        w="95%"
        bg="#DEDEDE"
        borderRadius="8"
      />

      <Box
        position="absolute"
        bottom="2"
        left="2"
        h="95%"
        w="95%"
        bg="#FFF"
        borderRadius="8"
      >
        <VStack px="4" py="2" bg="#FFF" flex="1" borderRadius="8">
          <Pressable onPress={props.onPress}>
            <HStack justifyContent="space-between" alignItems="center">
              <InnerTitle fontSize="2xl" width="98%" isTruncated>
                {title}
              </InnerTitle>
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
      </Box>
      <HStack
        position="absolute"
        h="8"
        right="2"
        justifyContent="flex-end"
        alignItems="center"
      >
        {check && (
          <Center w="6" h="6" alignItems="center" justifyContent="center">
            <Pressable {...check}>
              <Checkbox
                onPress={check.onPress}
                colorScheme="danger"
                accessibilityLabel="Test"
              />
            </Pressable>
          </Center>
        )}
      </HStack>
    </ZStack>
  );
};

export default ListPreview;
