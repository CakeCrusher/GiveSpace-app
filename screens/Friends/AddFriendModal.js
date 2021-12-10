import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { Modal, Text, Icon, Input, HStack } from 'native-base';
import { Feather } from '@expo/vector-icons';

import AddFriendRow from './AddFriendRow';

import { debounce } from '../../utils/helperFunctions';
import { fetchGraphQL } from '../../utils/helperFunctions';
import { SEARCH_FOR_USERS, CREATE_FRIEND_REL } from '../../utils/schemas';

const AddingModal = ({ isOpen, onClose, userState }) => {
  const [results, setResults] = useState([]);
  const { user } = userState;

  const handleInput = debounce((evt) => {
    const { value } = evt.target;

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
          user.friends.forEach((e) => {
            set.delete(e.id);
          });

          const resultData = data.filter((e) => set.has(e.id));

          setResults(resultData);
        })
        .catch((err) => console.log(err));
    }
  }, 250);

  const handleAddFriend = (recieverId) => {
    fetchGraphQL(CREATE_FRIEND_REL, {
      user_first_id: user.id,
      user_second_id: recieverId,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="85%">
        <Modal.CloseButton />
        <Modal.Header>
          <HStack alignItems="center" space="2">
            <Icon as={<Feather name="search" />} size="xs" />
            <Input onChange={handleInput} minW="35" />
          </HStack>
        </Modal.Header>
        <Modal.Body>
          {results.map((friend) => (
            <AddFriendRow
              key={friend.id}
              user={friend}
              addFriend={handleAddFriend}
            />
          ))}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddingModal);
