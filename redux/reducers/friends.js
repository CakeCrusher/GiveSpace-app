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
      console.log('userWithList!', userWithList);

      const newFriendsList = [...state.list.map(
        friend => friend.id === userWithList.id ? userWithList : friend
      )]
      console.log('newFriendsList!', newFriendsList);
      return {
        list: newFriendsList,
      };
    }
    default:
      return state;
  }
};

export default friends;
