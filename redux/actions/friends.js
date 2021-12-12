export const setFriends = (payload) => ({
  type: 'SET_FRIENDS',
  payload: payload,
});

export const signinFriends = (user) => (dispatch) => {
  const userCopy = { ...user };
  const friendRels = userCopy.friend_rels;
  const friends = friendRels.map((friendRel) => {
    return friendRel.user.id === userCopy.id
      ? friendRel.userByUserSecondId
      : friendRel.user;
  });
  dispatch({ type: 'SET_FRIENDS', payload: friends });
  return;
};

export const populateListFriends = (list) => (dispatch) => {
  console.log('populateListFriends!', list);
  dispatch({ type: 'SET_FRIEND_LIST', payload: list });
  return;
};

export const reloadFriends = (friends) => (dispatch) => {
  console.log('!friends', friends);
  dispatch({ type: 'RELOAD_FRIENDS', payload: friends });
  return;
}
