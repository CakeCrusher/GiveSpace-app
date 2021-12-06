const initState = {
  //user: null,
  user: {
    id: 1,
    username: 'krabs',
    password: 'secret',
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
