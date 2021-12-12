import React from 'react';
import { Flex, Box, ZStack } from 'native-base';

const ShadowBox = (props) => {
  const styles = { ...props };
  delete styles.children;

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
    </ZStack>
  );
};

export default ShadowBox;
