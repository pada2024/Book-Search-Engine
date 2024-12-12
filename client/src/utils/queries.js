import { gql } from '@apollo/client';

export const GET_ME = gql`
query GetSingleUser {
  getSingleUser {
    username
    email
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