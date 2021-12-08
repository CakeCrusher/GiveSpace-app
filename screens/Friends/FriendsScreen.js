import React from 'react';
import { VStack, Text, Button } from 'native-base';
import { connect } from 'react-redux';

import FriendRow from './FriendRow';

const f_test = [
  {
    id: 0,
    username: 'a',
    profile_pic_url: '',
  },
  {
    id: 1,
    username: 'b',
    profile_pic_url: '',
  },
  {
    id: 2,
    username: 'c',
    profile_pic_url: '',
  },
  {
    id: 3,
    username: 'd',
    profile_pic_url: '',
  },
];

const FriendsScreen = ({ navigation }) => {
  return (
    <VStack safeArea>
      {/* TODO: change f_test*/}
      {f_test.map((friend) => (
        <FriendRow
          key={friend.id}
          username={friend.username}
          profile_pic_url={friend.profile_pic_url}
          navigation={navigation}
        />
      ))}
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  friends: state.friends,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen);
