import gql from 'graphql-tag';
export const SUBSCRIBE_LIST = gql`
  subscription getItems($list_id: uuid = "") {
    list(where: { id: { _eq: $list_id } }) {
      title
      date_created
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
        status
      }
    }
  }
`;

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
  date_created
  title
  items {
    id
    name
  }
}
friend_rels {
  user {
    id
    username
    profile_pic_url
    lists(order_by: {date_modified: desc}) {
      id
      user_id
      title
      date_created
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
    profile_pic_url
    lists(order_by: {date_modified: desc}) {
      id
      user_id
      title
      date_created
      date_modified
      items {
        id
        name
      }
    }
  }
  type
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

export const SIGN_IN_USER_BY_USERNAME = `
query MyQuery($username: String = "") {
  user(where: {username: {_eq: $username}}) {
    ${USER_DATA}
  }
}
`;
// {
//   "username": "Sebas"
// }

export const SIGN_IN_USER = `
mutation MyMutation($password: String = "", $username: String = "") {
  login(password: $password, username: $username) {
    loginUserIdToUser {
      ${USER_DATA}
    }
  }
}
`;
// {
//   "username": "DELETE",
//   "password": "secret"
// }

export const UPDATE_LIST_TITLE = `
mutation MyMutation($list_id: uuid = "", $title: String = "") {
  update_list(where: {id: {_eq: $list_id}}, _set: {title: $title}) {
    returning {
      title
      id
    }
  }
}
`;
// {
//   "list_id": "b6450dfd-d0f0-4799-9449-13c3f8b74a9e",
//   "title": "wishlist"
// }

export const UPDATE_USER_ADDRESS = `
mutation MyMutation($user_id: uuid = "", $address: String = "") {
  update_user(where: {id: {_eq: $user_id}}, _set: {address: $address}) {
    returning {
      id
      address
    }
  }
}
`;
// {
//   "user_id": "676b788a-8350-488b-8e49-08c6c40b5c78",
//   "address": "wishlist"
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

export const GET_FRIEND_RELS = `
query MyQuery($user_id: uuid = "") {
  friend_rel(where: {user: {id: {_eq: $user_id}}}) {
    userByUserSecondId {
      id
      username
      profile_pic_url
      lists(order_by: {date_modified: desc}) {
        id
        user_id
        title
        date_created
        date_modified
        items {
          id
          name
        }
      }
    }
    type
  }
}
`;
// {
//   "user_id": "7c55600d-e5f1-48f3-83d6-3c16ec918693"
// }

export const CREATE_FRIEND_REL = `
mutation MyMutation($friend_rels: [friend_rel_insert_input!] = []) {
  insert_friend_rel(objects: $friend_rels) {
    returning {
      id
    }
  }
}
`;
// {
//   "friend_rels": [
//     {"user_first_id": "8549a167-e221-49c6-a87e-272a042d54ee", "user_second_id": "9f42db74-b38e-47f7-afa6-638773ae0c23", "type": "friends"},
//     {"user_first_id": "9f42db74-b38e-47f7-afa6-638773ae0c23", "user_second_id": "c43952b9-d92c-459a-b3b5-86d9f864abfc", "type": "friends"}
//   ]
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
//   "username": "DELETE",
//   "phone_number": "+14325557297",
//   "contacts_phone_numbers": ["+17865557297","+13335557297","+12345557297", "donkey number"]
// }

export const CREATE_LIST = `
mutation MyMutation($user_id: uuid = "") {
  insert_list(objects: {user_id: $user_id}) {
    returning {
      id
      user_id
      title
      date_created
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
    date_created
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
      status
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

export const PROFILE_PAGE_FOR_ID = `
query MyQuery($user_id: uuid = "") {
  user(where: {id: {_eq: $user_id}}) {
    address
    birthday
    date_last_accessed
    phone_number
    profile_pic_url
    username
    friend_rels {
      user {
        id
        username
        profile_pic_url
      }
      userByUserSecondId {
        id
        username
        profile_pic_url
      }
    }
  }
}
`;

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
//   "user_id": "7c55600d-e5f1-48f3-83d6-3c16ec918693"
// }

export const DELETE_ITEM = `
mutation MyMutation($item_id: uuid = "") {
  delete_item(where: {id: {_eq: $item_id}}) {
    returning {
      id
    }
  }
}
`;
// {
//   "item_id": "d6b2f6c2-0b2e-43a7-9fc3-df7879ff336e"
// }

export const DELETE_LIST = `
mutation MyMutation($list_id: uuid = "", $_eq: uuid = "") {
  delete_list(where: {id: {_eq: $list_id}}) {
    returning {
      id
    }
  }
}
`;
// {
//   "list_id": "ec8e03f0-754c-4b2e-b367-236ef1916b13"
// }

export const DELETE_USER = `
mutation MyMutation($user_id: uuid = "") {
  delete_user(where: {id: {_eq: $user_id}}) {
    returning {
      id
    }
  }
}
`;
// {
//   "user_id": "535d6804-b9a6-43cb-b9fa-76192292193c"
// }

export const DELETE_FRIEND_REL = `
mutation MyMutation($user_first_id: uuid = "", $user_second_id: uuid = "") {
  delete_friend_rel(where: {user: {id: {_eq: $user_first_id}}, userByUserSecondId: {id: {_eq: $user_second_id}}}) {
    returning {
      id
    }
  }
}
`;
// {
//   "user_first_id": "7c55600d-e5f1-48f3-83d6-3c16ec918693",
//   "user_second_id": "6539bd82-b610-4049-a03b-6898a5cd1d8b"
// }

export const ACCEPT_FRIEND_REL = `
mutation MyMutation($user_first_id: uuid = "", $user_second_id: uuid = "") {
  update_friend_rel(where: {user_first_id: {_eq: $user_first_id}, user_second_id: {_eq: $user_second_id}}, _set: {type: "friends"}) {
    returning {
      user {
        id
        username
        profile_pic_url
        lists(order_by: {date_modified: desc}) {
          id
          user_id
          title
          date_created
          date_modified
          items {
            id
            name
          }
        }
      }
    }
  }
}

`;
// {
//   "user_first_id": "6539bd82-b610-4049-a03b-6898a5cd1d8b",
//   "user_second_id": "7c55600d-e5f1-48f3-83d6-3c16ec918693"
// }

export const MARK_ITEM_FOR_PURCHASE = `
mutation MyMutation($item_id: uuid = "", $user_id: uuid = "", $list_id: uuid = "") {
  update_item(where: {id: {_eq: $item_id}}, _set: {status: $user_id}) {
    returning {
      id
    }
  }
  update_list(where: {id: {_eq: $list_id}}, _set: {date_modified: "now()"}) {
    returning {
      id
    }
  }
}
`;

export const UPDATE_USER_IMAGE = `
mutation MyMutation($image_base64: String = "", $image_type: String = "", $old_image_url: String = "", $user_id: String = "") {
  update_user_image(image_base64: $image_base64, image_type: $image_type, old_image_url: $old_image_url, user_id: $user_id) {
    updateUserImageUserIdToUser {
      id
      profile_pic_url

    }
  }
}
`;

// {
//   "image_type": "jpeg",
//   "user_id": "cec88518-0a56-4c92-b7ab-97d3b01ad2d9",
//   "old_image_url": "https://storage.cloud.google.com/givespace-pictures/faa86d2a-339b-46be-a4b4-99a2558b26ec.jpeg",
//   "image_base64": "..."
// }
