export const setFriends = (payload) => ({
  type: 'SET_FRIENDS',
  payload: payload,
})

export const signinByIdFriends = 
  (userRes) =>
    async (dispatch) => {
      const user = userRes.data.user[0]
      const friendRels = user.friend_rels
      const friends = friendRels.map((friendRel) => {
        return friendRel.user.id === user.id ? friendRel.userByUserSecondId : friendRel.user
      })
      dispatch({ type: 'SET_FRIENDS', payload: friends })
    }