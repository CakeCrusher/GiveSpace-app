const initState = {
  //user: null,
  user: {
    id: 0,
    username: 'krabs',
    password: 'password',
  },
};

const user = (state = initState, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default user;
