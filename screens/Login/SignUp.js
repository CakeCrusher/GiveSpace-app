import React, { useState, useRef } from 'react';
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
import { connect } from 'react-redux';
import { fetchGraphQL, useField } from '../../utils/helperFunctions';
import { signinUser } from '../../redux/actions/user';
import { signinFriends } from '../../redux/actions/friends';
import * as Contacts from 'expo-contacts';
import parsePhoneNumber from 'libphonenumber-js'
import PhoneInput from 'react-native-phone-number-input';
import { REGISTER_USER } from '../../utils/schemas';

// TODO: Need to do a 2nd pass and implement validation
const Signup = ({ signinDispatch, toSignIn }) => {
  const username = useField('text', 'DELETE')
  const password = useField('password', 'secret')
  const passwordConfirm = useField('password', 'secret')
  const phoneNumber = useField('text')
  const phoneInput = useRef(null)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const [signUpStep, setSignUpStep] = useState(0)


  const handleForewardStep = () => {
    if (password.value !== passwordConfirm.value) {
      setError('Passwords do not match')
    } else {
      setError(null)
      
      setSignUpStep(signUpStep + 1)
    }
  }
  const stepOneStack = (
    <VStack space={4}>
      <Input
        {...username}
        placeholder="username"
      />
      <Input
        {...password}
        placeholder="password"
      />
      <Input
        {...passwordConfirm}
        placeholder="confirm password"
      />
      <VStack space={4}>
        <Button onPress={handleForewardStep}>Next</Button>
      </VStack>
    </VStack>
  )
  const handleBackStep = () => setSignUpStep(signUpStep - 1)
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const {data} = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.FirstName,
          Contacts.Fields.LastName,
          Contacts.Fields.PhoneNumbers,
        ]
      });
      // data.list[0].phoneNumbers[0].number
      const numbers = []
      const failedContacts = []
      data.forEach(contact => {
        try {
          const parsedNumber = parsePhoneNumber(contact.phoneNumbers[0].number).number
          if (parsedNumber) {
            numbers.push(parsedNumber)
          } else {
            failedContacts.push(contact)
          }
        } catch (e) {
          failedContacts.push(contact)
        }
      })
      return numbers.concat(["+14235557297"])
      
    } 
    return []
  }
  const handleSubmit = async () => {
    if (!phoneInput.current.isValidNumber(phoneNumber.value)) {
      setError('Invalid Phone Number')
      return
    }

    setError(null)
    setIsLoading(true)
    const contactsPhoneNumbers = await getContacts()
    const userRes = await fetchGraphQL(REGISTER_USER, {
      username: username.value,
      password: password.value,
      phone_number: phoneNumber.value,
      contacts_phone_numbers: [...contactsPhoneNumbers, '+17865557297']
    });
    console.log('userRes',userRes)
    if (userRes.errors || !userRes.data.register.userIdToUser) {
      setError('Username or phone number already exist')
    } else {
      signinDispatch(userRes.data.register.userIdToUser)
    }
    setIsLoading(false);
    return
  }
  const stepTwoStack =  (
    <VStack space={4}>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber.value}
        defaultCode="US"
        layout="second"
        onChangeFormattedText={phoneNumber.onChangeText}
      />
      <HStack space={4}>
        <Button variant="subtle" onPress={handleBackStep}>Back</Button>
        <Button isLoading={isLoading} onPress={handleSubmit}>Sign Up</Button>
      </HStack>
    </VStack>
  )

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
          <HStack mb={4}>
            <Text>or </Text>
            <Link onPress={toSignIn}>sign in</Link>
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
      
      {signUpStep === 0 ? 
        stepOneStack
      : 
        stepTwoStack
      }
      
      
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
