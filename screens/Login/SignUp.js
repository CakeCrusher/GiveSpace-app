import React, { useState } from 'react';
import {
  Text,
  Heading,
  Link,
  Button,
  Input,
  HStack,
  VStack,
  Center,
} from 'native-base';

// TODO: Need to do a 2nd pass and implement validation
const Signup = ({ postUser, toSignIn }) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    confirm: '',
    phone: '',
  });

  const handleSubmit = () => {
    // TODO: Should handle password !==
    console.log('handleSubmit');
    const { username, password, confirm, phone } = inputs;
    if (password === confirm) {
      postUser(username, password, phone);
    } else {
      console.warn("Your passwords don't match!");
    }
  };

  const handleChange = (evt, name) => {
    // TODO: Could maybe have some kind of "pull phone number from device"
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
          Create an account
        </Text>
        <Center>
          <HStack>
            <Text>or </Text>
            <Link onClick={toSignIn}>sign in</Link>
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
        <Input
          type="password"
          placeholder="confirm password"
          value={inputs.confirm}
          onChange={(evt) => handleChange(evt, 'confirm')}
        />
        <Input
          placeholder="phone"
          value={inputs.phone}
          onChange={(evt) => handleChange(evt, 'phone')}
        />
        <Button onPress={handleSubmit}>Sign Up</Button>
      </VStack>
    </VStack>
  );
};

export default Signup;
