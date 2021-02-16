import React, {useEffect, useState} from 'react';
import Authprovider from './AuthProvider';
import Routes from './Routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApolloProvider} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import {apoloCLient} from './apolo/ApolloClient';
import {persistCache} from 'apollo3-cache-persist';
import {ActivityIndicator} from 'react-native';
import Center from './components/Center';
import {AppearanceProvider} from 'react-native-appearance';
import ThemeProvider from '../src/components/theme/ThemeProvider';

export default function Providers() {
  //const [client, setClient] = useState();

  /*useEffect(() => {
    async function init() {
      await persistCache({
        cache: apoloCLient.cache,
        storage: AsyncStorage,
        trigger: 'background',
        debug: __DEV__,
      });
      setClient(apoloCLient);
    }

    init();
  }, []);

  if (!client) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#0000ff" />
      </Center>
    );
  }*/

  return (
    <SafeAreaProvider forceInset={{top: 'always', bottom: 'always'}}>
      <ApolloProvider client={apoloCLient}>
        <AppearanceProvider>
          <ThemeProvider>
            <Authprovider>
              <Routes />
            </Authprovider>
          </ThemeProvider>
        </AppearanceProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}
