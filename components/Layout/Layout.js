import React from 'react';
import { StyleSheet } from 'react-native';
import { Box } from 'native-base';
import { connect } from 'react-redux';

const Layout = ({ children }) => {
  return <Box style={styles.container}>{children}</Box>;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    width: '100%',
  },
});

export default Layout;
