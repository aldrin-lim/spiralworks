import gql from "graphql-tag";

export default {
  query: {
    users: gql`
      {
        users{
          id
          email
          password
        }
      }
    `,
    
  },
  mutation: {
    register: gql`
      mutation register($email: String!, $password: String!){
        register(email: $email, password: $password)
      }
    `,
    login: gql`
      mutation login($email: String!, $password: String!){
        login(email: $email, password: $password)
      }
    `
  }
}