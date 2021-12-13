const initState = {
  list: [
    // {
    //   id: null,
    //   username: null,
    //   profile_pic_url: null,
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
    // MINIMUM OF:
    // {
    //   id: null,
    //   username: null,
    //   profile_pic_url: null,
    // }
  ],
  pendingThem: [
    // MINIMUM OF:
    // {
    //   id: null,
    //   username: null,
    //   profile_pic_url: null,
    // }
  ],
};

const friendFilter = (stateFriends, payloadFriends) => {
  if (!stateFriends) {
    stateFriends = []
  }
  const stateFriendsIds = stateFriends.map((friend) => friend.id);
  const newList = [];
  payloadFriends.forEach((friend) => {
    if (stateFriendsIds.includes(friend.id)) {
      const friendInState = stateFriends.find(
        (stateFriend) => stateFriend.id === friend.id,
      );
      newList.push({ ...friendInState });
    } else {
      newList.push({ ...friend });
    }
  });

  return [...newList];
};

const friends = (state = initState, action) => {
  switch (action.type) {
    case 'SET_FRIENDS':
      console.log('SET_FRIENDS', action.payload);
      return {
        ...action.payload,
      };
    case 'SET_FRIEND_LIST': {
      const userWithList = {
        ...state.list.find((user) =>
          user.lists.find((list) => list.id === action.payload.id),
        ),
      };
      userWithList.lists = userWithList.lists.map((list) =>
        list.id === action.payload.id ? action.payload : list,
      );

      const newFriendsList = [
        ...state.list.map((friend) =>
          friend.id === userWithList.id ? userWithList : friend,
        ),
      ];

      return {
        list: newFriendsList,
      };
    }
    case 'RELOAD_FRIENDS':
      const newList = friendFilter(state.list, action.payload.list);
      const newPendingMe = friendFilter(state.pendingMe, action.payload.pendingMe);
      const newPendingThem = friendFilter(state.pendingThem, action.payload.pendingThem);

      const newState = {
        list: newList,
        pendingMe: newPendingMe,
        pendingThem: newPendingThem,
      };
      console.log('!newState', newState)

      return {
        ...newState,
      };
    case 'ADD_PENDING_THEM':
      return {
        ...state,
        pendingThem: [...state.pendingThem, action.payload],
      };
    case 'ACCEPT_FRIEND':
      console.log('!newState', {
        ...state,
        pendingMe: [
          ...state.pendingMe.filter(
            (friend) => friend.id !== action.payload.id,
          ),
        ],
        list: [...state.list, action.payload],
      });
      return {
        ...state,
        pendingMe: [
          ...state.pendingMe.filter(
            (friend) => friend.id !== action.payload.id,
          ),
        ],
        list: [...state.list, action.payload],
      };
    case 'REMOVE_PENDINGME':
      return {
        ...state,
        pendingMe: [
          ...state.pendingMe.filter((friend) => friend.id !== action.payload),
        ],
      };
    case 'REMOVE_FRIEND':
      return {
        ...state,
        list: [...state.list.filter((friend) => friend.id !== action.payload)],
      };
    case 'REMOVE_PENDINGTHEM':
      return {
        ...state,
        pendingThem: [
          ...state.pendingThem.filter((friend) => friend.id !== action.payload),
        ],
      };
    default:
      return state;
  }
};

export default friends;
