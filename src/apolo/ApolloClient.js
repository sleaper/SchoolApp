import {ApolloClient, InMemoryCache, ApolloLink, from} from '@apollo/client';
import {createHttpLink} from 'apollo-link-http';
import {onError} from '@apollo/client/link/error';
import RNSInfo from 'react-native-sensitive-info';

const makeApolloClient = () => {
  const httpLink = createHttpLink({
    //uri: 'http://api.skola-offline.tk/graphql',
    uri: 'http://localhost:8000/graphql',
  });
  const middlewareLink = new ApolloLink(async (operation, forward) => {
    operation.setContext({
      headers:
        {
          authorization: await RNSInfo.getItem('user', {}),
        } || null,
    });
    return forward(operation);
  });

  const test = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      graphQLErrors.map(({message, locations, path}) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations,
          )}, Path: ${path}`,
        ),
      );
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link: ApolloLink.from([middlewareLink, test, httpLink]),
    cache: cache,
  });

  return client;
};

export const apoloCLient = makeApolloClient();

/*

await AsyncStorage.getItem('user', (err, result) => {
            if (err) {
              console.error(err);
            }
          }),

*/
