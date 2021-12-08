const initState = {
  user: null,
  // user: {
  //   "phone_number": "+17865557297",
  //   "username": "Krabs",
  //   "id": "9f42db74-b38e-47f7-afa6-638773ae0c23",
  //   "lists": [],
  //   "friendRelsByUserSecondId": [],
  //   "friend_rels": [
  //     {
  //       "user": {
  //         "username": "Krabs",
  //         "phone_number": "+17865557297",
  //         "lists": [],
  //         "id": "9f42db74-b38e-47f7-afa6-638773ae0c23"
  //       },
  //       "userByUserSecondId": {
  //         "username": "Squid",
  //         "phone_number": "+14325557297",
  //         "lists": [
  //           {
  //             "title": "Christmas",
  //             "list_items": [],
  //             "date_modified": "2021-12-08T16:03:14.392219+00:00"
  //           }
  //         ],
  //         "id": "c347eed6-3b00-4308-a49b-f21ac0ac2a52"
  //       }
  //     }
  //   ]
  // },
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
