import React, { useState, useCallback } from 'react';
import {
  Text,
  Button,
  Pressable,
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
  const username = useField('text');
  const password = useField('password');
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
      <VStack flex="5" alignItems="center" justifyContent="flex-end">
        <Text
          fontFamily="wordmark"
          fontWeight={600}
          color="black"
          fontSize="5xl"
          textAlign="center"
        >
          Welcome back
        </Text>
        <Center maxH="64" maxW="64">
          <PresentsSvg />
        </Center>
        <VStack my={8} justifyContent="center" alignItems="center">
          <Text fontSize="xl">Log in</Text>
          <HStack>
            <Text fontSize="xl" lineHeight="xs">
              or{' '}
            </Text>
            <Pressable onPress={toSignUp}>
              <Text fontSize="xl" lineHeight="xs" underline>
                create an account
              </Text>
            </Pressable>
          </HStack>
        </VStack>
        {error && (
          <Center>
            <HStack>
              <Text>{error}</Text>
            </HStack>
          </Center>
        )}
      </VStack>

      <VStack w="64" flex="5" space={2} justifyContent="flex-start">
        <Flex h="10">
          <Input {...username} placeholder="username" fontSize="md" />
        </Flex>
        <Flex h="10">
          <Input {...password} placeholder="password" fontSize="md" />
        </Flex>
        <Button mt="4" isLoading={isLoading} onPress={handleSubmit}>
          <Text fontSize="lg" color="white">
            Sign in
          </Text>
        </Button>
        {/*
        <VStack alignItems="center">
          <Link>forgot your password?</Link>
        </VStack>
        */}
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
