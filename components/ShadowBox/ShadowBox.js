import React from 'react';
import { Flex, Box, Pressable, Checkbox, ZStack } from 'native-base';

const ShadowBox = (props) => {
  const { check, onPress } = props;
  console.log(check);
  const styles = { ...props };
  delete styles.children;
  delete styles.check;
  delete styles.onPress;

  return (
    <ZStack {...styles}>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        h="95%"
        w="95%"
        bg="#DEDEDE"
        borderRadius="8"
      ></Box>
      <Box
        position="absolute"
        bottom="2"
        left="2"
        h="95%"
        w="95%"
        bg="#FFF"
        borderRadius="8"
      >
        {props.children}
      </Box>
      {check && (
        <Pressable position="absolute" {...check} onPress={onPress}>
          <Checkbox colorScheme="danger" />
        </Pressable>
      )}
    </ZStack>
  );
};

export default ShadowBox;
