import React from 'react';
import { Feather } from '@expo/vector-icons';
import {
  Flex,
  Icon,
  Image,
  Text,
  Center,
  Box,
  VStack,
  HStack,
  ZStack,
  Pressable,
  Checkbox,
  Spinner,
} from 'native-base';

const ItemCard = (props) => {
  const { item, handlePress, check } = props;

  const styles = { ...props };
  delete styles.item;
  delete styles.handlePress;
  delete styles.check;

  return (
    <ZStack minH="48" {...styles}>
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
        <Pressable onPress={handlePress}>
          <VStack p="2">
            <Flex alignItems="center" justifyContent="center">
              {item.image_url ? (
                <Image
                  opacity={item.status ? 0.4 : 1}
                  source={{
                    uri: item.image_url,
                  }}
                  alt="item"
                  size="xl"
                />
              ) : (
                <Center h="32" w="100%" bg="#484848" opacity="60">
                  <Spinner color="white" />
                </Center>
              )}
            </Flex>
            <VStack mt="2">
              <Text fontSize="md" fontWeight="bold" textAlign="center">
                {item.name}
              </Text>
            </VStack>
          </VStack>
        </Pressable>
      </Box>
      <HStack
        position="absolute"
        h="8"
        right="2"
        justifyContent="flex-end"
        alignItems="center"
      >
        {item.status && (
          <Center
            rounded="full"
            bg="primary.500"
            w="6"
            h="6"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              ml="auto"
              as={<Feather name="check" />}
              size="sm"
              color="white"
            />
          </Center>
        )}
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

export default ItemCard;
