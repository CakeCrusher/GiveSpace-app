import React from "react";
import { Avatar, HStack, Text, Flex, Button } from "native-base";
import { connect } from "react-redux";

const AddFriendRow = ({ user, addFriend, friendState, userState }) => {
  // TODO: Add Friend functionality
  console.log('!friendState', friendState)
  return (
    <HStack justifyContent="space-between">
      {/* Avatar */}
      <Flex flex="1" justifyContent="center">
        <Avatar
          bg="#FAA"
          source={{
            uri: userState.profile_pic_url || "https://via.placeholder.com/50/66071A/FFFFFF?text=GS",
          }}
          size="sm"
        >
          EX
        </Avatar>
      </Flex>
      <Flex flex="3" justifyContent="center">
        <Text fontSize="md">{user.username}</Text>
      </Flex>
      <Flex flex="1" my="2" justifyContent="flex-end">
        <Button disabled={friendState} onPress={() => addFriend()} size="sm">
          Add
        </Button>
      </Flex>
    </HStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
});
const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(AddFriendRow);
