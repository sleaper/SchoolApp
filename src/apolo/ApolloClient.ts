import {ApolloClient, InMemoryCache, ApolloLink} from '@apollo/client';
import {createHttpLink} from 'apollo-link-http';
import {onError} from '@apollo/client/link/error';
import RNSInfo from 'react-native-sensitive-info';

const makeApolloClient = () => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
  });
  //@ts-expect-error
  const middlewareLink = new ApolloLink(async (operation, forward) => {
    operation.setContext({
      headers:
        {
          authorization: await RNSInfo.getItem('user', {}),
        } || null,
    });
    return forward(operation);
  });

  const error = onError(({graphQLErrors, networkError}) => {
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

  const cache = new InMemoryCache({});

  const client = new ApolloClient({
    //@ts-expect-error
    link: ApolloLink.from([middlewareLink, error, httpLink]),
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
