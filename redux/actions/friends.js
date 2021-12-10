export const setFriends = (payload) => ({
  type: 'SET_FRIENDS',
  payload: payload,
})

export const signinFriends = 
  (user) =>
    (dispatch) => {
      const userCopy = {...user}
      const friendRels = userCopy.friend_rels
      const friends = friendRels.map((friendRel) => {
        return friendRel.user.id === userCopy.id ? friendRel.userByUserSecondId : friendRel.user
      })
      dispatch({ type: 'SET_FRIENDS', payload: friends })
      return
    }