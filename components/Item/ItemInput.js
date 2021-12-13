import { Feather } from '@expo/vector-icons';
import { Button, HStack, Icon, Input } from 'native-base';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addListItem } from '../../redux/actions/user';
import { fetchGraphQL, useField } from '../../utils/helperFunctions';
import { SCRAPE_ITEM } from '../../utils/schemas';

const ItemInput = ({ listId, addListItem }) => {
  const itemName = useField('text')
  const [isLoading, setIsLoading] = useState(false);

  const handleItemSubmit = async () => {
    setIsLoading(true);
    // create a promise called that resolves after 2 seconds
    const itemRes = fetchGraphQL(SCRAPE_ITEM, {
      "list_id": listId,
      "item_name": itemName.value,
    })
      .then((res) => {
        if (res.errors || !res.data.scrape_item.itemIdToItem) {
          console.log(err);
          setIsLoading(false)
        } else {
          addListItem(listId, res.data.scrape_item.itemIdToItem)
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      })
    setTimeout(() => {
      setIsLoading(false);
      itemName.onChangeText('');
    }, 500);
  }

  return (
    <HStack>
      <Input
        {...itemName}
        placeholder='item name'
      />
      <Button
        borderRadius="32"
        onPress={handleItemSubmit}
        isLoading={isLoading}
      >
        <Icon as={<Feather name="plus" />} size="sm" color="white" />
      </Button>
    </HStack>
  )
}

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});

const mapDispatchToProps = (dispatch) => ({
  addListItem: (listId, item) => dispatch(addListItem(listId, item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemInput);