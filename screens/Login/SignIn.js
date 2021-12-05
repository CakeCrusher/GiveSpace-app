import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  Heading,
  Button,
  Link,
  Input,
  Center,
  HStack,
  VStack,
} from 'native-base';

const SignIn = ({ fetchUser, toSignUp }) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = () => {
    console.log('handleSubmit');
    fetchUser(inputs.username, inputs.password);
  };

  const handleChange = (evt, name) => {
    const { value } = evt.currentTarget;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <VStack space={8}>
      <VStack>
        <Heading mb={4} size="3xl" textAlign="center">
          GiftSpace
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Sign In
        </Text>
        <Center>
          <HStack>
            <Text>or </Text>
            <Link onClick={toSignUp}>create an account</Link>
          </HStack>
        </Center>
      </VStack>

      <VStack space={4}>
        <Input
          placeholder="username"
          value={inputs.username}
          onChange={(evt) => handleChange(evt, 'username')}
        />
        <Input
          type="password"
          placeholder="password"
          value={inputs.password}
          onChange={(evt) => handleChange(evt, 'password')}
        />
        <Button onPress={handleSubmit}>Sign In</Button>
        <VStack alignItems="center">
          <Link>Forgot Your Password?</Link>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default SignIn;
