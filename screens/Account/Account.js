import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, VStack, Center } from 'native-base';

import { LoadingScreen } from '../../components';
import { fetchGraphQL } from '../../utils/helperFunctions';
import { SIGN_IN_USER_BY_ID } from '../../utils/schemas';
import { editAddress, logout } from '../../redux/actions/user';

import AccountDisplay from './AccountDisplay';

const AccountWrapper = ({
  route,
  navigation,
  userState,
  friendsState,
  logout,
  editAddress,
}) => {
  /** DATA_STATE = {
   *   user:
   *   friends:
   *   lists:
   * }
   */
  const [data, setData] = useState(null);
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = route.params;
  const isUser = userId === userState.id;

  useEffect(() => {
    if (isUser) {
      setData({
        user: userState,
        friends: friendsState.list,
        lists: userState.lists,
      });
      setIsLoading(false);
    } else {
      // Fetch
      fetchGraphQL(SIGN_IN_USER_BY_ID, { user_id: userId })
        .then((res) => {
          const user = res.data.user[0];
          setData({
            user: user,
            friends: user.friend_rels.map((e) => e.userByUserSecondId),
            lists: user.lists,
          });
        })
        .catch((err) => setHasError(err))
        .finally(() => setIsLoading(false));
    }
  }, [userState, friendsState]);

  if (hasError) {
    console.log(hasError);
    return (
      <VStack safeArea>
        <Center mt="4">
          <Text fontSize="xl">Uh oh. We ran into a problem.</Text>
        </Center>
      </VStack>
    );
  }

  if (isLoading) {
    return <LoadingScreen isLoading={true} />;
  }

  if (data) {
    return (
      <AccountDisplay
        navigation={navigation}
        isUser={isUser}
        logout={logout}
        editAddress={editAddress}
        user={data.user}
        friends={data.friends}
        lists={data.lists}
      />
    );
  }

  return (
    <VStack safeArea>
      <Center mt="4">
        <Text fontSize="xl">Uh oh. It seems we couldn't find this user.</Text>
      </Center>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  editAddress: (address) => dispatch(editAddress(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountWrapper);
