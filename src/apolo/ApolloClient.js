import React from 'react';
import {ApolloClient, InMemoryCache, ApolloLink, from} from '@apollo/client';
import {createHttpLink} from 'apollo-link-http';
import AsyncStorage from '@react-native-community/async-storage';

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

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link: from([middlewareLink, httpLink]),
    cache: cache,
  });

  return client;
};

export const apoloCLient = makeApolloClient();

//export default makeApolloClient;
