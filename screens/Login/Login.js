import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { VStack, Text, Button } from 'native-base';
import { connect } from 'react-redux';


import SignUp from './SignUp';
import SignIn from './SignIn';

//TODO: need to rename post/fetchUser
const Login = ({ postUser }) => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toSignIn = () => setIsSignUp(false);
  const toSignUp = () => setIsSignUp(true);

  return (
    <VStack flex="1" alignItems="center" justifyContent="center">
      {isSignUp ? (
        <SignUp toSignIn={toSignIn} />
      ) : (
        <SignIn toSignUp={toSignUp} />
      )}
    </VStack>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
