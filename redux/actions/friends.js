const separateFriendRels = (oldFriendRels) => {
  const friendRels = [...oldFriendRels];
  const list = [...friendRels.filter((friend) => friend.type === 'friends')];
  const pendingMe = [
    ...friendRels.filter((friend) => friend.type === 'pending_first'),
  ];
  const pendingThem = [
    ...friendRels.filter((friend) => friend.type === 'pending_second'),
  ];
  return {
    list,
    pendingMe,
    pendingThem,
  };
};

// export const setFriends = (payload) => ({
//   type: 'SET_FRIENDS',
//   payload: payload,
// });

export const signinFriends = (user) => (dispatch) => {
  const userCopy = { ...user };
  const friendRels = userCopy.friend_rels;
  const separatedFriends = separateFriendRels(friendRels);
  const findWhoIsFriend = (userId, list) => {
    const friends = [];
    list.forEach((friend) => {
      if (friend.user.id === userId) {
        friends.push({ ...friend.userByUserSecondId });
      } else {
        friends.push({ ...friend.user });
      }
    });
    return [...friends];
  };
  const list = findWhoIsFriend(user.id, separatedFriends.list);
  const pendingMe = findWhoIsFriend(user.id, separatedFriends.pendingMe);
  const pendingThem = findWhoIsFriend(user.id, separatedFriends.pendingThem);

  dispatch({
    type: 'SET_FRIENDS',
    payload: {
      list,
      pendingMe,
      pendingThem,
    },
  });
  return;
};

export const populateListFriends = (list) => (dispatch) => {
  console.log('populateListFriends!', list);
  dispatch({ type: 'SET_FRIEND_LIST', payload: list });
  return;
};

export const reloadFriends = (friends) => (dispatch) => {
  const separatedFriends = separateFriendRels(friends)
  const onlyFriend = {
    list: separatedFriends.list.map((f) => f.userByUserSecondId),
    pendingMe: separatedFriends.pendingMe.map((f) => f.userByUserSecondId),
    pendingThem: separatedFriends.pendingThem.map((f) => f.userByUserSecondId),
  };
  dispatch({ type: 'RELOAD_FRIENDS', payload: onlyFriend });
  return;
};

export const addPendingThem = (friend) => (dispatch) => {
  dispatch({ type: 'ADD_PENDING_THEM', payload: friend });
  return;
}

export const acceptFriend = (friend) => (dispatch) => {
  dispatch({ type: 'ACCEPT_FRIEND', payload: friend });
  return;
}

export const removeFriend = (friendId, type) => (dispatch) => {
  console.log('!type', type);
  if (type === 'pendingMe') {
    dispatch({ type: 'REMOVE_PENDINGME', payload: friendId });
  } 
  if (type === 'pendingThem') {
    console.log('!dispatch')
    dispatch({ type: 'REMOVE_PENDINGTHEM', payload: friendId });
  }
  if (type === 'friends') {
    dispatch({ type: 'REMOVE_FRIEND', payload: friendId });
  }
  return;
}

// export const removeFriend = (friend, type)
