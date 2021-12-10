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

    default: {
      return state;
    }
  }
};

export default user;
