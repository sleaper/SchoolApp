import React from 'react';
import Authprovider from './providers/AuthProvider';
import Routes from './Routes';
import {ApolloProvider} from '@apollo/client';
import {apoloCLient} from './apolo/ApolloClient';
import {AppearanceProvider} from 'react-native-appearance';
import TokenProvider from './providers/TokenProvider';
import {NativeBaseProvider, ColorMode, extendTheme} from 'native-base';
import type {StorageManager} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@my-app-color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      console.log('themError', e);
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@my-app-color-mode', value as string);
    } catch (e) {
      console.log('themError', e);
    }
  },
};

export default function Providers() {
  const theme = extendTheme({
    config: {
      initialColorMode: 'dark',
    },
  });

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
        <ApolloProvider client={apoloCLient}>
          <TokenProvider>
            <AppearanceProvider>
              <Authprovider>
                <Routes />
              </Authprovider>
            </AppearanceProvider>
          </TokenProvider>
        </ApolloProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
