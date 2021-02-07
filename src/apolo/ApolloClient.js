import React from 'react';
import {ApolloClient, InMemoryCache, ApolloLink, from} from '@apollo/client';
import {createHttpLink} from 'apollo-link-http';
import AsyncStorage from '@react-native-community/async-storage';
import {onError} from '@apollo/client/link/error';

const makeApolloClient = () => {
  const httpLink = createHttpLink({uri: 'http://localhost:3000/graphql'});
  const middlewareLink = new ApolloLink(async (operation, forward) => {
    operation.setContext({
      headers:
        {
          authorization: await AsyncStorage.getItem('user', (err, result) => {
            if (err) {
              console.error(err);
            }
          }),
        } || null,
    });
    return forward(operation);
  });

  const test = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      graphQLErrors.map(({message, locations, path}) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
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

//export default makeApolloClient;
/*onError(({graphQLErrors, networkError}) => {
        if (graphQLErrors) {
          graphQLErrors.map(({message, locations, path}) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        }

        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }),*/

/*const client = new ApolloClient({
        link: from([middlewareLink, httpLink, test]),
        cache: cache,
      });*/
