export const REGISTER_USER = `
mutation MyMutation($password: String = "", $phone_number: String = "", $username: String = "") {
  insert_user(objects: {password: $password, phone_number: $phone_number, username: $username}) {
    returning {
      password
      phone_number
      username
    }
  }
}
`
// {
//   "password": "secret",
//   "phone_number": "555-123-1234",
//   "username": "Krabs"
// }

export const SIGN_IN_USER = `
query MyQuery($username: String = "", $password: String = "") {
  user(where: {username: {_eq: $username}, _and: {password: {_eq: $password}}}) {
    password
    phone_number
    username
  }
}
`
// {
  // "password": "secret",
  // "username": "Krabs"
// }