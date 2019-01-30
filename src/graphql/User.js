import gql from "graphql-tag";

export default {
  query: {
    users: gql`
      {
        users{
          id
          email
          password
          profile
        }
      }
    `,
    user: gql`
      query user($id: ID!){
        user(id: $id){
          id
          email
          password
          profile
        }
      }
    `
    
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
    `,
    updateUser: gql`
      mutation updateUser($id: ID!, $input: UserInput) {
        updateUser(id: $id, input: $input){
          id
          profile
        }
      }
    `
  }
}