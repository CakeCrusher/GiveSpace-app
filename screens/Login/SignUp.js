import React, { useState, useRef } from 'react';
import {
  Text,
  Heading,
  Link,
  Button,
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
import { PresentsSvg } from '../../resources';

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
    <VStack w="48" flex="5" space={4} justifyContent="flex-start">
      <Flex h="8">
        <Input {...username} placeholder="username" />
      </Flex>
      <Flex h="8">
        <Input {...password} placeholder="password" />
      </Flex>
      <Flex h="8">
        <Input {...passwordConfirm} placeholder="confirm password" />
      </Flex>
      <VStack space={4}>
        <Button onPress={handleForewardStep}>Next</Button>
      </VStack>
    </VStack>
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
      return numbers;
    }
    return [];
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
      contacts_phone_numbers: [...contactsPhoneNumbers, '0'],
    });
    console.log('userRes', userRes);
    if (userRes.errors || !userRes.data.register.userIdToUser) {
      setError('Username or phone number already exist');
    } else {
      signinDispatch(userRes.data.register.userIdToUser);
    }
    setIsLoading(false);
    return;
  };
  const stepTwoStack = (
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
      <HStack space={4}>
        <Button variant="subtle" onPress={handleBackStep}>
          Back
        </Button>
        <Button isLoading={isLoading} onPress={handleSubmit}>
          Sign Up
        </Button>
      </HStack>
    </VStack>
  );

  return (
    <Center flex="1" safeArea>
      <VStack flex="5" justifyContent="flex-end">
        <Text fontSize="3xl" textAlign="center">
          Welcome To
        </Text>
        <Text fontSize="3xl" textAlign="center">
          GiftSpace
        </Text>
        <Flex maxH="64" maxW="64">
          <PresentsSvg />
        </Flex>
        <Center mt="4">
          <Text>Create an account</Text>
          <HStack mb={4}>
            <Text>or </Text>
            <Link onPress={toSignIn}>log in</Link>
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
