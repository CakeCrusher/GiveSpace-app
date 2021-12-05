import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { VStack, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';

import { fetchUser, postUser } from '../../redux/actions/user';

import SignUp from './SignUp';
import SignIn from './SignIn';

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
  fetchUser: (user) => dispatch(fetchUser(user)),
  postUser: (user) => dispatch(postUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
