import React from 'react';
import { VStack, Text, Button } from 'native-base';
import { connect } from 'react-redux';

import FriendRow from './FriendRow';

const FriendsScreen = ({ navigation, user }) => {
  console.log(user);
  return (
    <VStack safeArea>
      {/* TODO: change f_test*/}
      {user.friends.map((friend) => (
        <FriendRow
          key={friend.id}
          username={friend.username}
          navigation={navigation}
        />
      ))}
      {/*user.friends.map((friend) => (
        <FriendRow
          key={friend.id}
          username={friend.username}
          profile_pic_url={friend.profile_pic_url}
          navigation={navigation}
        />
      ))*/}
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen);
