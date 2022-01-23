import {ApolloClient, InMemoryCache, ApolloLink} from '@apollo/client';
import {createHttpLink} from 'apollo-link-http';
import {onError} from '@apollo/client/link/error';
import RNSInfo from 'react-native-sensitive-info';
import Config from 'react-native-config';

const makeApolloClient = () => {
  const httpLink = createHttpLink({
    uri: __DEV__ ? Config.DEV_API_URL : Config.PROD_API_URL,
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
