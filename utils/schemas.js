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
    lists {
      id
      date_modified
      date_created
      title
      user {
        username
      }
      items {
        item_url
        image_url
        name
        price
      }
    }
    friendRelsByUserSecondId(where: {type: {_eq: "friends"}}) {
      user {
        username
        phone_number
        lists {
          title
          list_items {
            item {
              name
            }
          }
          date_modified
        }
        id
      }
      userByUserSecondId {
        username
        phone_number
        lists {
          title
          list_items {
            item {
              name
            }
          }
          date_modified
        }
        id
      }
    }
    friend_rels(where: {type: {_eq: "friends"}}) {
      user {
        username
        phone_number
        lists {
          title
          list_items {
            item {
              name
            }
          }
          date_modified
        }
        id
      }
      userByUserSecondId {
        username
        phone_number
        lists {
          title
          list_items {
            item {
              name
            }
          }
          date_modified
        }
        id
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
//   "user_id": "9f42db74-b38e-47f7-afa6-638773ae0c23"
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
mutation MyMutation($title: String = "", $user_id: uuid = "") {
  insert_list(objects: {title: $title, user_id: $user_id}) {
    returning {
      id
      title
      date_modified
      list_items {
        item {
          name
          item_url
          image_url
          price
        }
      }
    }
  }
}
`;
// {
//   "title": "Christmas",
//   "user_id": "c347eed6-3b00-4308-a49b-f21ac0ac2a52"
// }

export const GET_LISTS = `
query MyQuery($user_id: uuid = "") {
  list(where: {user_id: {_eq: $user_id}}) {
        id
        date_modified
        date_created
        title
        user {
                username
              }
        items {
                item_url
                image_url
                name
                price
              }
      }
}
`;
// {
//   "user_id": "c347eed6-3b00-4308-a49b-f21ac0ac2a52"
// }
