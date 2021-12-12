import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { Modal, Text, Icon, Input, HStack } from 'native-base';
import { Feather } from '@expo/vector-icons';

import AddFriendRow from './AddFriendRow';

import { debounce } from '../../utils/helperFunctions';
import { fetchGraphQL } from '../../utils/helperFunctions';
import { SEARCH_FOR_USERS, CREATE_FRIEND_REL } from '../../utils/schemas';

const AddingModal = ({ isOpen, onClose, friendsState, userState }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = debounce((value) => {
    setIsLoading(true);

    if (value === '') {
      setResults([]);
    } else {
      fetchGraphQL(SEARCH_FOR_USERS, { search: `%${value}%` })
        .then((res) => {
          // Filtering function to make sure anyone in user.friends
          // doesn't show up in search results
          const data = res.data.user;
          const set = new Set();

          data.forEach((e) => {
            set.add(e.id);
          });
          friendsState.list.forEach((e) => {
            set.delete(e.id);
          });

          const resultData = data.filter((e) => set.has(e.id));

          setResults(resultData);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, 200);

  const handleAddFriend = (recieverId) => {
    fetchGraphQL(CREATE_FRIEND_REL, {
      "friend_rels": [
        {"user_first_id": userState.id, "user_second_id": recieverId, "type": "pending_second"},
        {"user_first_id": recieverId, "user_second_id": userState.id, "type": "pending_first"}
      ]
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      console.log('!vars', {      "friend_rels": [
        {"user_first_id": userState.id, "user_second_id": recieverId, "type": "pending_second"},
        {"user_first_id": recieverId, "user_second_id": userState.id, "type": "pending_first"}
      ]})
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="85%">
        <Modal.CloseButton />
        <Modal.Header>
          <HStack alignItems="center" w="80%" space="2">
            <Icon as={<Feather name="search" />} size="xs" />
            <Input onChangeText={handleInput} minW="35" />
          </HStack>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <Text>Searching...</Text>
          ) : results.length === 0 ? (
            <Text>No results</Text>
          ) : (
            results.map((friend) => (
              <AddFriendRow
                key={friend.id}
                user={friend}
                addFriend={handleAddFriend}
              />
            ))
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddingModal);
