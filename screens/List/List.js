import React from 'react';
import { connect } from 'react-redux';
import { Text, VStack, Center } from 'native-base';

import {
  editListDateEvent,
  editListTitle,
  populateListUser,
  removeItems,
} from '../../redux/actions/user';
import { populateListFriends } from '../../redux/actions/friends';
import { fetchGraphQL } from '../../utils/helperFunctions';
import { DELETE_ITEM } from '../../utils/schemas';
import useListSubscription from './useListSubscription';
import ListDisplay from './ListDisplay';

const ListWrapper = ({
  route,
  navigation,
  userState,
  removeItems,
  editListTitle,
  editListDateEvent,
}) => {
  const { listData, userData } = route.params;
  const isUser = userState.id === listData.user_id;

  const { list, error } = useListSubscription(listData);

  if (error) {
    throw new Error(error);
  }

  const handleConfirmDelete = (itemIds, cb) => {
    Promise.all(
      itemIds.map((item_id) =>
        fetchGraphQL(DELETE_ITEM, {
          item_id,
        }),
      ),
    )
      .then((res) => {
        for (let result of res) {
          if (result.errors) {
            throw new Error(result.errors);
          }
        }

        const confirmedIds = res
          .filter((e) => e.data && e.data.delete_item.returning[0].id)
          .map((e) => e.data.delete_item.returning[0].id);
        removeItems({
          deletedIds: confirmedIds,
          listId: displayList.id,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        cb();
      });
  };

  if (error) {
    return (
      <VStack safeArea>
        <Center mt="4">
          <Text fontSize="xl">Uh oh. Something went wrong.</Text>
        </Center>
      </VStack>
    );
  }

  if (list) {
    return (
      <ListDisplay
        navigation={navigation}
        isUser={isUser}
        userData={userData}
        userState={userState}
        list={list}
        handleConfirmDelete={handleConfirmDelete}
        editListTitle={editListTitle}
        editListDateEvent={editListDateEvent}
      />
    );
  }

  return (
    <VStack safeArea>
      <Center mt="4">
        <Text fontSize="xl">Uh oh. It seems we couldn't find the list</Text>
      </Center>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});

const mapDispatchToProps = (dispatch) => ({
  populateListFriends: (list) => dispatch(populateListFriends(list)),
  populateListUser: (list) => dispatch(populateListUser(list)),
  removeItems: (data) => dispatch(removeItems(data)),
  editListTitle: (id, title) => dispatch(editListTitle(id, title)),
  editListDateEvent: (id, dateEvent) =>
    dispatch(editListDateEvent(id, dateEvent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListWrapper);
