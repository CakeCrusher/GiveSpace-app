const initState = {
  list: [],
  // id: '2fa81068-baa8-4d41-a091-77a31f1ee0aa',
  // username: 'secret',
  // password: 'Homer',
};
const friends = (state = initState, action) => {
  switch (action.type) {
    case 'SET_FRIENDS':
      return {
        ...state,
        list: action.payload,
      };

    default:
      console.warn(
        'fallthrough case in state/reducers/friends with action.type:' +
          action.type,
      );
      return state;
  }
};

export default friends;
