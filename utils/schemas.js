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
    password
    id
    date_last_accessed
    date_created
    birthday
    address
    phone_number
    profile_pic_url
    username
  }
}
`
// {
//   "password": "secret",
//   "username": "Krabs",
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

