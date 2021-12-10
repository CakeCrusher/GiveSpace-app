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
import { connect } from 'react-redux';
import { signinFriends } from '../../redux/actions/friends';
import { signinUser } from '../../redux/actions/user';
import { fetchGraphQL, useField } from '../../utils/helperFunctions';
import { SIGN_IN_USER } from '../../utils/schemas';

const SignIn = ({ toSignUp, signinDispatch }) => {
  const username = useField('text', 'Krabs');
  const password = useField('password', 'secret');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);

    const userRes = await fetchGraphQL(SIGN_IN_USER, { username: username.value, password: password.value });
    
    console.log('userRes', userRes);
    if (userRes.errors || !userRes.data.user[0]) {
      setError('Invalid username or password')
    } else {
      signinDispatch(userRes.data.user[0]);
    }
    setIsLoading(false);
    return
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
        <Input
          {...username}
          placeholder="username"
        />
        <Input
          {...password}
          placeholder="password"
        />
        <Button isLoading={isLoading} onPress={handleSubmit}>Sign In</Button>
        <VStack alignItems="center">
          <Link>Forgot Your Password?</Link>
        </VStack>
      </VStack>
    </VStack>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  signinDispatch: (userRes) => {
    dispatch(signinUser(userRes))
    dispatch(signinFriends(userRes))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
