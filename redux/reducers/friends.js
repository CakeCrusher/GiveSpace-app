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
  ]
};
const friends = (state = initState, action) => {
  switch (action.type) {
    case 'SET_FRIENDS':
      return {
        list: action.payload,
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
      const stateFriendsIds = state.list.map(friend => friend.id);  
      const newList = []
      action.payload.forEach(friend => {
        if (stateFriendsIds.includes(friend.id)) {
          const friendInState = state.list.find(stateFriend => stateFriend.id === friend.id);
          newList.push({...friendInState})
        } else {
          newList.push({...friend})
        }
      })
      
      console.log('!newList', newList)
      return {
        list: newList,
      };
    default:
      return state;
  }
};

export default friends;
