export const REGISTER_USER = `
mutation MyMutation($password: String = "", $phone_number: String = "", $username: String = "") {
  insert_user(objects: {password: $password, username: $username, phone_number: $phone_number}) {
    returning {
      id
      password
      username
      phone_number
      date_last_accessed
      date_created
      birthday
      address
      profile_pic_url
    }
  }
}
`
// {
//   "password": "secret",
//   "username": "Krabs",
//   "phone_number": "+17865557297"
// }

export const SIGN_IN_USER = `
query MyQuery($username: String = "", $password: String = "") {
  user(where: {username: {_eq: $username}, password: {_eq: $password}}) {
    phone_number
    username
    lists {
      title
      list_items {
        itemByItem {
          name
        }
      }
    }
    friend_rels {
      user {
        username
        phone_number
        lists {
          title
          list_items {
            itemByItem {
              name
            }
          }
        }
      }
      userByUserSecond {
        username
        phone_number
        lists {
          title
          list_items {
            itemByItem {
              name
            }
          }
        }
      }
    }
  }
}
`
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
`
// {
//   "text": "Bob wants a bat to use his car with a bat for weels"
// }

export const ADD_CONTACTS_AS_FRIENDS = `
mutation MyMutation($user_phone_number: String = "", $contacts_phone_numbers: [String!] = "") {
  contacts_to_friends(contacts_phone_numbers: $contacts_phone_numbers, user_phone_number: $user_phone_number) {
    new_friend_rels
  }
}
`
// {
//   "user_phone_number": "+17865557297",
//   "contacts_phone_numbers": ["+19545557297"]
// }

export const CREATE_FRIEND_REL = `
mutation MyMutation($user_first: String! = "", $user_second: String! = "", $type: String = "friends") {
  insert_friend_rel(objects: {user_second: $user_second, type: $type, user_first: $user_first}) {
    returning {
      id
    }
  }
}
`
// {
//   "user_first": "+17865557297",
//   "user_second": "+19545557297",
//   "type": "friends"
// }

export const FIND_FRIEND_RELS = `
query MyQuery($id: [uuid!] = "") {
  friend_rel(where: {id: {_in: $id}}) {
    type
    id
    user {
      phone_number
      profile_pic_url
      username
    }
    userByUserSecond {
      phone_number
      profile_pic_url
      username
    }
  }
}
`
// {
//   "id": ["8229bff3-314d-40b6-aa11-6856f563123c"]
// }