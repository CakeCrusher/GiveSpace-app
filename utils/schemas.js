export const CREATE_USER = `
mutation MyMutation($password: String = "", $phone_number: String = "", $username: String = "") {
  insert_user(objects: {password: $password, username: $username, phone_number: $phone_number}) {
    returning {
      id
    }
  }
}
`;
// {
//   "password": "secret",
//   "username": "Krabs",
//   "phone_number": "+17865557297"
// }

const USER_DATA = `
phone_number
username
id
address
profile_pic_url
birthday
lists(order_by: {date_modified: desc}) {
  id
  user_id
  date_modified
  title
  items {
    id
    name
  }
}
friend_rels(where: {type: {_eq: "friends"}}) {
  user {
    id
    username
    lists(order_by: {date_modified: desc}) {
      id
      user_id
      title
      date_modified
      items {
        id
        name
      }
    }
  }
  userByUserSecondId {
    id
    username
    lists(order_by: {date_modified: desc}) {
      id
      user_id
      title
      date_modified
      items {
        id
        name
      }
    }
  }
}
`;

export const SIGN_IN_USER_BY_ID = `
query MyQuery($user_id: uuid = "") {
  user(where: {id: {_eq: $user_id}}) {
    ${USER_DATA}
  }
}
`;
// {
//   "user_id": "7c55600d-e5f1-48f3-83d6-3c16ec918693"
// }

export const SIGN_IN_USER = `
query MyQuery($username: String = "", $password: String = "") {
  user(where: {username: {_eq: $username}, password: {_eq: $password}}) {
    ${USER_DATA}
  }
}
`;
// {
//   "username": "Krabs",
//   "password": "secret"
// }

export const INSPECT_TEXT = `
mutation MyMutation($text: String = "") {
  inspect_text(text: $text) {
    inspected_text
  }
}
`;
// {
//   "text": "Bob wants a bat to use his car with a bat for weels"
// }

// NOT USABLE YET
// export const ADD_CONTACTS_AS_FRIENDS = `
// mutation MyMutation($user_phone_number: String = "", $contacts_phone_numbers: [String!] = "") {
//   contacts_to_friends(contacts_phone_numbers: $contacts_phone_numbers, user_phone_number: $user_phone_number) {
//     new_friend_rels
//   }
// }
// `
// // {
// //   "user_phone_number": "+17865557297",
// //   "contacts_phone_numbers": ["+19545557297"]
// // }

export const CREATE_FRIEND_REL = `
mutation MyMutation($user_first_id: uuid = "", $user_second_id: uuid = "", $type: String = "") {
  insert_friend_rel(objects: {type: $type, user_first_id: $user_first_id, user_second_id: $user_second_id}) {
    returning {
      id
    }
  }
}
`;
// {
//   "user_first_id": "8549a167-e221-49c6-a87e-272a042d54ee",
//   "user_second_id": "9f42db74-b38e-47f7-afa6-638773ae0c23",
//   "type": "friends"
// }

export const REGISTER_USER = `
mutation MyMutation($contacts_phone_numbers: [String!] = "", $password: String = "", $phone_number: String = "", $username: String = "") {
  register(contacts_phone_numbers: $contacts_phone_numbers, password: $password, phone_number: $phone_number, username: $username) {
    userIdToUser {
      ${USER_DATA}
    }
  }
}

`;
// {
//   "password": "secret",
//   "username": "Squid",
//   "phone_number": "+14325557297",
//   "contacts_phone_numbers": ["+17865557297","+13335557297","+12345557297"]
// }

export const CREATE_LIST = `
mutation MyMutation($user_id: uuid = "") {
  insert_list(objects: {user_id: $user_id}) {
    returning {
      id
      user_id
      title
      date_modified
      items {
        name
        item_url
        image_url
        price
      }
    }
  }
}
`;

// {
//   "title": "Christmas",
//   "user_id": "c347eed6-3b00-4308-a49b-f21ac0ac2a52"
// }

export const GET_LIST = `
query MyQuery($list_id: uuid = "") {
  list(where: {id: {_eq: $list_id}}) {
    title
    date_modified
    id
    user_id
    items {
      image_url
      item_url
      name
      price
      date_created
      id
    }
  }
}
`;
// {
//   "list_id": "3cfb100a-c924-4286-b6e2-87d598c1d7df"
// }

export const SCRAPE_ITEM = `
mutation MyMutation($item_name: String = "", $list_id: String = "") {
  scrape_item(item_name: $item_name, list_id: $list_id) {
    itemIdToItem {
      image_url
      item_url
      name
      price
      date_created
      id
    }
  }
}
`;
// {
//   "list_id": "3cfb100a-c924-4286-b6e2-87d598c1d7df",
//   "item_name": "television toshiba"
// }

export const SEARCH_FOR_USERS = `
query MyQuery($search: String = "") {
  user(where: {username: {_like: $search}}) {
    id
    username
    profile_pic_url
  }
}
`;

// {
//   "search": "%Kr%"
// }
