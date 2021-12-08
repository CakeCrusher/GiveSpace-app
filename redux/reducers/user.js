const initState = {
  id: 0,
  username: 'Krabs',
  friends: [],
};

//const initState = null;

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
