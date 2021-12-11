import React, { Component } from 'react';
import { VStack, HStack, Text } from 'native-base';
import { WebView } from 'react-native-webview';

const MyWebView = ({ route, navigation }) => {
  console.log(route.params);
  return (
    <VStack flex="1" safeArea>
      <HStack h="10%" alignItems="center" justifyContent="center" bg="#C9042C">
        <Text color="#FFF">We're in React bay-bee</Text>
      </HStack>
      <VStack h="90%">
        <WebView source={{ uri: route.params.uri }} />
      </VStack>
    </VStack>
  );
};

export default MyWebView;
