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
        lists: newLists,
      };
    }

    case 'REMOVE_LISTS': {
      const deletedIds = action.payload;

      if (deletedIds.length > 0) {
        const newLists = state.lists.filter(
          (list) => !deletedIds.includes(list.id),
        );
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
    case 'SET_USERNAME': {
      return {
        ...state,
        username: action.payload,
      }
    }
    case 'EDIT_LIST_TITLE': {
      const listToEdit = {...state.lists.find((list) => list.id === action.payload.listId)}
      listToEdit.title = action.payload.title;
      return {
        ...state,
        lists: [...state.lists.map((list) =>
          list.id === action.payload.listId ? listToEdit : list
        )]
      }
    }
    case 'REMOVE_ITEMS': {
      const { listId, deletedIds } = action.payload;
      if (deletedIds.length > 0) {
        const editList = { ...state.lists.find((list) => list.id === listId) };
        const filteredItems = editList.items.filter(
          (item) => !deletedIds.includes(item.id),
        );
        const newLists = state.lists.map((list) =>
          list.id === listId ? { ...editList, items: filteredItems } : list,
        );

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
