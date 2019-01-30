import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context'
export const cache = new InMemoryCache({
  logger: console.log,
  loggerEnabled: true,
});


export const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

// Link for authorization and headers
export const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
