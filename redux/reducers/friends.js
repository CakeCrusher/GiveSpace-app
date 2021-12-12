const initState = {
  list: [
    // {
    //   id: null,
    //   username: null,
    //   lists: [
    //     {
    //       id: null,
    //       title: null,
    //       date_modified: null,
    //       items: [
    //         {
    //           id: null,
    //           name: null,
    //         }
    //       ]
    //     }
    //   ],
    // }
  ],
  pendingMe: [
    // same
  ],
  pendingThem: [
    // same
  ]
};

const friendFilter = (statFriends, payloadFriends) => {
  const stateFriendsIds = statFriends.map(friend => friend.id);  
  const newList = []
  payloadFriends.forEach(friend => {
    if (stateFriendsIds.includes(friend.id)) {
      const friendInState = statFriends.find(stateFriend => stateFriend.id === friend.id);
      newList.push({...friendInState})
    } else {
      newList.push({...friend})
    }
  })

  return [...newList]
}

const friends = (state = initState, action) => {
  switch (action.type) {
    case 'SET_FRIENDS':
      console.log('SET_FRIENDS', action.payload)
      return {
        ...action.payload,
      };
    case 'SET_FRIEND_LIST': {
      const userWithList = {...state.list.find(
        user => user.lists.find(
          list => list.id === action.payload.id
        )
      )}
      userWithList.lists = userWithList.lists.map(
        list => list.id === action.payload.id ? action.payload : list
      )

      const newFriendsList = [...state.list.map(
        friend => friend.id === userWithList.id ? userWithList : friend
      )]

      return {
        list: newFriendsList,
      };
    }
    case 'RELOAD_FRIENDS':
      const newState = {
        list: friendFilter(state.list, action.payload.list),
        pendingMe: friendFilter(state.pendingMe, action.payload.pendingMe),
        pendingThem: friendFilter(state.pendingThem, action.payload.pendingThem),
      }

      console.log('!newState', newState)
      return {
        ...newState
      };
    case 'ADD_PENDING_THEM':
      return {
        ...state,
        pendingThem: [...state.pendingThem, action.payload]
      }
    default:
      return state;
  }
};

export default friends;
