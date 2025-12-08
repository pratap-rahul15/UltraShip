import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

console.log(" Loaded Backend URL:", BACKEND_URL); 


const httpLink = createHttpLink({
  uri: `${BACKEND_URL}/graphql`,
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

e
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
