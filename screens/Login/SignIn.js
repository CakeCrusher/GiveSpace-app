import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  Heading,
  Button,
  Link,
  Input,
  Center,
  Flex,
  HStack,
  VStack,
} from 'native-base';
import { connect } from 'react-redux';
import { signinFriends } from '../../redux/actions/friends';
import { signinUser } from '../../redux/actions/user';
import { fetchGraphQL, useField } from '../../utils/helperFunctions';
import { SIGN_IN_USER } from '../../utils/schemas';
import { PresentsSvg } from '../../resources';

const SignIn = ({ toSignUp, signinDispatch }) => {
  const username = useField('text', 'Krabs');
  const password = useField('password', 'secret');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    const userRes = await fetchGraphQL(SIGN_IN_USER, {
      username: username.value,
      password: password.value,
    });
    console.log('userRes', userRes);
    if (userRes.errors || !userRes.data.login.loginUserIdToUser) {
      setError('Invalid username or password');
    } else {
      signinDispatch(userRes.data.login.loginUserIdToUser);
    }
    setIsLoading(false);
    return;
  });

  return (
    <Center flex="1" safeArea>
      <VStack flex="5" justifyContent="flex-end">
        <Heading mb={4} size="3xl" textAlign="center">
          GiftSpace
        </Heading>
        <Flex maxH="64" maxW="64">
          <PresentsSvg />
        </Flex>
        <Text fontSize="xl" textAlign="center">
          Sign In
        </Text>
        <Center mb={4}>
          <HStack>
            <Text>or </Text>
            <Link onPress={toSignUp}>create an account</Link>
          </HStack>
        </Center>
        {error && (
          <Center>
            <HStack>
              <Text>{error}</Text>
            </HStack>
          </Center>
        )}
      </VStack>

      <VStack w="48" flex="4" space={4} justifyContent="flex-start">
        <Flex h="8">
          <Input {...username} placeholder="username" />
        </Flex>
        <Flex h="8">
          <Input {...password} placeholder="password" />
        </Flex>
        <Button isLoading={isLoading} onPress={handleSubmit}>
          Sign In
        </Button>
        <VStack alignItems="center">
          <Link>Forgot Your Password?</Link>
        </VStack>
      </VStack>
    </Center>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  signinDispatch: (userRes) => {
    dispatch(signinUser(userRes));
    dispatch(signinFriends(userRes));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
