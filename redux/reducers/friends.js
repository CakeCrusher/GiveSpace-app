const initState = {
  list: [
    // {
    //   id: null,
    //   username: null,
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
  ]
};
const friends = (state = initState, action) => {
  switch (action.type) {
    case 'SET_FRIENDS':
      return {
        list: action.payload,
      };

    default:
      return state;
  }
};

export default friends;
