// FUTURE:
// add date_last_accessed functionality
const initState = {
  id: null,
  username: null,
  phone_number: null,
  address: null,
  profile_pic_url: null,
  birthday: null,
  lists: [
    // {
    //   id: null,
    //   title: null,
    //   date_modified: null,
    //   items: [
    //     {
    //       id: null,
    //       name: null,
    //     }
    //   ]
    // }
  ],
};

const user = (state = initState, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...action.payload,
      };
    }
    case 'SET_USER_LIST': {
      const newLists = [
        ...state.lists.map((list) =>
          list.id === action.payload.id ? action.payload : list,
        ),
      ];
      return {
        ...state,
        lists: newLists,
      };
    }
    case 'ADD_USER_LIST': {
      const newLists = [action.payload, ...state.lists];
      return {
        ...state,
        lists: newLists,
      };
    }
    case 'ADD_LIST_ITEM': {
      const listToAddItem = {
        ...state.lists.find((list) => list.id === action.payload.listId),
      };
      listToAddItem.items.push(action.payload.item);
      const newLists = state.lists.map((list) =>
        list.id === action.payload.listId ? listToAddItem : list,
      );
      return {
        ...state,
        lists: [...newLists],
      };
    }

    case 'REMOVE_LISTS': {
      const deletedIds = action.payload;
      if (deletedIds.length > 0) {
        console.log('DELETE IDS');
        console.log(deletedIds);
        const newLists = [...state.lists].filter(
          (list) => !deletedIds.includes(list.id),
        );
        console.log('DELETE IDS');
        console.log(newLists);
        return {
          ...state,
          lists: newLists,
        };
      }

      return {
        ...state,
        lists: [...state.lists],
      };
    }

    default: {
      return state;
    }
  }
};

export default user;
