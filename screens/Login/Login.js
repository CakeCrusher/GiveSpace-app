import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { VStack, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';

import { signup, signin } from '../../redux/actions/user';

import SignUp from './SignUp';
import SignIn from './SignIn';

//TODO: need to rename post/fetchUser
const Login = ({ postUser, fetchUser }) => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toSignIn = () => setIsSignUp(false);
  const toSignUp = () => setIsSignUp(true);

  return (
    <VStack flex="1" alignItems="center" justifyContent="center">
      {isSignUp ? (
        <SignUp postUser={postUser} toSignIn={toSignIn} />
      ) : (
        <SignIn fetchUser={fetchUser} toSignUp={toSignUp} />
      )}
    </VStack>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  postUser: (user) => dispatch(signup(user)),
  fetchUser: (user) => dispatch(signin(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
