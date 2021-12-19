import { Feather } from '@expo/vector-icons';
import { Button, HStack, Icon, Input } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import { addListItem } from '../../redux/actions/user';

const ItemInput = ({ itemName, isSubmitting, handleItemSubmit }) => {
  return (
    <HStack>
      <Input {...itemName} placeholder="item name" borderRightRadius="0" />
      <Button
        onPress={handleItemSubmit}
        isLoading={isSubmitting}
        borderRadius="3"
        borderLeftRadius="0"
      >
        <Icon as={<Feather name="plus" />} size="sm" color="white" />
      </Button>
    </HStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});

const mapDispatchToProps = (dispatch) => ({
  addListItem: (listId, item) => dispatch(addListItem(listId, item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemInput);
