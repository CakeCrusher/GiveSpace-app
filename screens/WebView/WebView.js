import React, { Component } from 'react';
import { VStack, Button, Box, Icon, HStack, Text } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

const MyWebView = ({ route, navigation }) => {
  console.log(route.params);
  return (
    <VStack flex="1" safeArea>
      <HStack h="10%" alignItems="flex-end" justifyContent="space-between">
        <Box>
          <Button onPress={() => navigation.goBack()} rounded="0">
            <Icon as={<Feather name="chevron-left" />} color="#FFF" />
          </Button>
        </Box>
      </HStack>
      <VStack h="90%">
        <WebView source={{ uri: route.params.uri }} />
      </VStack>
    </VStack>
  );
};

export default MyWebView;
