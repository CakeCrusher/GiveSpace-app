import React, { useState, useEffect } from 'react';
import { Text, Heading, Button, Avatar, HStack, VStack } from 'native-base';
import { connect } from 'react-redux';

import { ListCard } from '../../components';

const ListScreen = ({ route, navigation }) => {
  return (
    <VStack safeArea>
      <Text>ListScreen</Text>
    </VStack>
  );
};

export default ListScreen;
