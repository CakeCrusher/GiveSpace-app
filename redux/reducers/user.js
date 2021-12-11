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
      console.log(action.payload);
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };
    }

    default: {
      return state;
    }
  }
};

export default user;
