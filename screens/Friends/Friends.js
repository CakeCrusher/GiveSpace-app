import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Button } from 'native-base';
import { connect } from 'react-redux';

import { Layout } from '../../components';

const Home = (props) => {
  const Friend = ({ info }) => {
    try {
      return (
        <View style={styles.friend}>
          <Text fontSize="xl">First name: {info.firstName}</Text>
          <Text fontSize="xl">Last name: {info.lastName}</Text>
          <Text fontSize="xl">Phone number: {info.phoneNumbers[0].number}</Text>
        </View>
      );
    } catch {
      console.log('Failed: ', info);
      return null;
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <ScrollView>
          {props.friends.list.map((friend) => (
            <Friend key={friend.id} info={friend} />
          ))}
        </ScrollView>
        <Button onPress={() => props.navigation.navigate('Home')}>
          Go to home screen
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex: 1,
  },
  friend: {
    margin: 20,
  },
});

const mapStateToProps = (state) => ({
  friends: state.friends,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
