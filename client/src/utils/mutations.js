export const LOGIN_USER = gql`
    mutation Login($username: String, $email: String, $password: String) {
  login(username: $username, email: $email, password: $password) {
    token
  }
}
`