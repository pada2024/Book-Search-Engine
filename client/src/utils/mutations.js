import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($username: String, $email: String, $password: String) {
  login(username: $username, email: $email, password: $password) {
    token
  }
}
`
export const ADD_USER = gql`
mutation CreateUser($username: String, $email: String, $password: String) {
  createUser(username: $username, email: $email, password: $password) {
    token
  }
}
`;

export const SAVE_BOOK = gql`
mutation SaveBook($authors: [String], $description: String, $bookId: String, $image: String, $link: String, $title: String) {
  saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
    email
    username
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;

export const REMOVE_BOOK = gql`
mutation DeleteBook($bookId: String) {
  deleteBook(bookId: $bookId) {
    email
    username
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;