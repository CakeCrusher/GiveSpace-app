const initState = {
  //user: null,
  user: {
    username: 'krabs',
    password: 'secret',
  },
};

const user = (state = initState, action) => {
  switch (action.type) {
    case 'SET_USER': {
      console.log('set-user');
      return {
        ...state,
        user: action.payload,
      };
    }

    default:
      console.warn(
        'fallthrough case in state/reducers/user with action.type:' +
          action.type,
      );
      return state;
  }
};

export default user;
