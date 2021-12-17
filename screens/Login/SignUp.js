import React, { useState, useRef } from 'react';
import {
  Text,
  Heading,
  Link,
  Button,
  Pressable,
  Input,
  HStack,
  Flex,
  VStack,
  Center,
} from 'native-base';
import { connect } from 'react-redux';
import { fetchGraphQL, useField } from '../../utils/helperFunctions';
import { signinUser } from '../../redux/actions/user';
import { signinFriends } from '../../redux/actions/friends';
import * as Contacts from 'expo-contacts';
import parsePhoneNumber from 'libphonenumber-js';
import PhoneInput from 'react-native-phone-number-input';
import { REGISTER_USER } from '../../utils/schemas';
import { FriendsSvg, PresentsSvg } from '../../resources';

// TODO: Need to do a 2nd pass and implement validation
const Signup = ({ signinDispatch, toSignIn }) => {
  const username = useField('text');
  const password = useField('password');
  const passwordConfirm = useField('password');
  const phoneNumber = useField('text');
  const phoneInput = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [signUpStep, setSignUpStep] = useState(0);

  const handleForewardStep = () => {
    if (password.value !== passwordConfirm.value) {
      setError('Passwords do not match');
    } else {
      setError(null);

      setSignUpStep(signUpStep + 1);
    }
  };
  const stepOneStack = (
    <>
      <VStack my={8} justifyContent="center" alignItems="center">
        <Text fontSize="2xl">Create an account</Text>
        <HStack>
          <Text fontSize="2xl">or </Text>
          <Pressable onPress={toSignIn}>
            <Text fontSize="2xl" underline>
              log in
            </Text>
          </Pressable>
        </HStack>
      </VStack>
      <VStack w="64" flex="5" space={2} justifyContent="flex-start">
        <Flex h="10">
          <Input {...username} placeholder="username" fontSize="md" />
        </Flex>
        <Flex h="10">
          <Input {...password} placeholder="password" fontSize="md" />
        </Flex>
        <Flex h="10">
          <Input
            {...passwordConfirm}
            placeholder="confirm password"
            fontSize="md"
          />
        </Flex>
        <VStack space={4} mt="4">
          <Button onPress={handleForewardStep} fontSize="md">
            <Text fontSize="lg" color="white">
              Sign Up
            </Text>
          </Button>
        </VStack>
      </VStack>
    </>
  );
  const handleBackStep = () => setSignUpStep(signUpStep - 1);
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.FirstName,
          Contacts.Fields.LastName,
          Contacts.Fields.PhoneNumbers,
        ],
      });
      // data.list[0].phoneNumbers[0].number
      const numbers = [];
      const failedContacts = [];
      data.forEach((contact) => {
        try {
          const parsedNumber = parsePhoneNumber(
            contact.phoneNumbers[0].number,
          ).number;
          if (parsedNumber) {
            numbers.push(parsedNumber);
          } else {
            failedContacts.push(contact);
          }
        } catch (e) {
          failedContacts.push(contact);
        }
      });
      return ['0'].concat(numbers);
    }
    return ['0'].concat([]);
  };
  const handleSubmit = async () => {
    if (!phoneInput.current.isValidNumber(phoneNumber.value)) {
      setError('Invalid Phone Number');
      return;
    }

    setError(null);
    setIsLoading(true);
    const contactsPhoneNumbers = await getContacts();
    const userRes = await fetchGraphQL(REGISTER_USER, {
      username: username.value,
      password: password.value,
      phone_number: '+' + phoneInput.current.state.code + phoneNumber.value,
      contacts_phone_numbers: ['0', ...contactsPhoneNumbers],
    });
    console.log('!userRes', userRes);
    if (userRes.errors || !userRes.data.register.userIdToUser) {
      setError('Username or phone number already exist');
    } else {
      signinDispatch(userRes.data.register.userIdToUser);
    }
    setIsLoading(false);
    return;
  };
  const stepTwoStack = (
    <>
      <VStack my={8} justifyContent="center" alignItems="center">
        <Text fontSize="2xl" textAlign="center">
          Add your phone number to get connected with contacts{' '}
        </Text>
      </VStack>
      <VStack w="48" flex="3" space={4} justifyContent="flex-start">
        <Center>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber.value}
            defaultCode="US"
            layout="second"
            onChangeText={phoneNumber.onChangeText}
          />
        </Center>
        <Flex>
          <Button isLoading={isLoading} onPress={handleSubmit}>
            <Text fontSize="lg" color="white">
              Let's Go
            </Text>
          </Button>
        </Flex>
      </VStack>
      <Pressable
        position="absolute"
        bottom="8"
        left="0"
        onPress={handleBackStep}
      >
        <Text fontSize="lg" underline>
          back
        </Text>
      </Pressable>
    </>
  );

  return (
    <Center flex="1" safeArea>
      <VStack flex={4} justifyContent="flex-end" alignItems="center">
        {signUpStep === 0 ? (
          <Center>
            <Text fontSize="5xl">Welcome To</Text>
            <HStack alignItems="center" justifyContent="center">
              <Text color="primary.500" fontSize="5xl">
                Give
              </Text>
              <Text fontSize="5xl">Space</Text>
            </HStack>
          </Center>
        ) : (
          <Center>
            <Text fontSize="5xl">Let's find your</Text>
            <Text fontSize="5xl">friends</Text>
          </Center>
        )}
        <Center maxH="64" maxW="64">
          {signUpStep === 0 ? <PresentsSvg /> : <FriendsSvg />}
        </Center>
        {error && (
          <Center>
            <HStack>
              <Text>{error}</Text>
            </HStack>
          </Center>
        )}
      </VStack>

      {signUpStep === 0 ? stepOneStack : stepTwoStack}
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
