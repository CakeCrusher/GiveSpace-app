import React, { useState, useMemo } from 'react';
import { Modal, Text, Icon, Input, HStack } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { debounce } from '../../utils/helperFunctions';

import AddFriendRow from './AddFriendRow';

const testArr = ['test', 'mike', 'apple', 'potato'];

const testSearch = (search) =>
  new Promise((resolve, reject) => {
    const results = testArr.filter((e) => e.includes(search.toLowerCase()));
    const results2 = [
      ...results,
      ...results,
      ...results,
      ...results,
      ...results,
      ...results,
      ...results,
    ];

    resolve(results2);
  });

const testFriend = {
  id: 444,
  username: 'Test Friend',
};

const AddingModal = ({ isOpen, onClose }) => {
  const [results, setResults] = useState([]);

  const handleInput = (evt) => {
    const { value } = evt.target;

    debounce(() => {
      if (value === '') {
        setResults([]);
      } else {
        testSearch(value).then((res) => {
          setResults(res);
        });
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="85%">
        <Modal.CloseButton />
        <Modal.Header>
          <HStack alignItems="center" space="2">
            <Icon as={<Feather name="search" />} size="xs" />
            <Input onChange={handleInput} />
          </HStack>
        </Modal.Header>
        <Modal.Body>
          {results.map((e, i) => (
            <AddFriendRow key={i} user={testFriend} />
          ))}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default AddingModal;
