import React, { useState, useCallback } from 'react';
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
import { connect } from 'react-redux';
import { signin } from '../../redux/actions/user';
import { useField } from '../../utils/helperFunctions';

const SignIn = ({ toSignUp, fetchUser }) => {
  const username = useField('text', 'Krabs');
  const password = useField('password', 'secret');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    const reuxRes = await fetchUser({
      username: username.value,
      password: password.value,
    });
    setIsLoading(false);
    if (reuxRes.status === 'error') {
      setError(reuxRes.error);
    }
  }, []);

  return (
    <VStack space={8}>
      <VStack>
        <Heading mb={4} size="3xl" textAlign="center">
          GiftSpace
        </Heading>
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

      <VStack space={4}>
        <Input {...username} placeholder="username" />
        <Input {...password} placeholder="password" />
        <Button isLoading={isLoading} onPress={handleSubmit}>
          Sign In
        </Button>
        <VStack alignItems="center">
          <Link>Forgot Your Password?</Link>
        </VStack>
      </VStack>
    </VStack>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  fetchUser: (user) => dispatch(signin(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
