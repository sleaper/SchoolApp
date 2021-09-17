import React from 'react';
import Authprovider from './AuthProvider';
import Routes from './Routes';
import {ApolloProvider} from '@apollo/client';
import {apoloCLient} from './apolo/ApolloClient';
import {AppearanceProvider} from 'react-native-appearance';
import TokenProvider from './TokenProvider';
import {NativeBaseProvider, ColorMode, extendTheme} from 'native-base';
import type {StorageManager} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@my-app-color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      console.log(e);
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@my-app-color-mode', value as string);
    } catch (e) {
      console.log(e);
    }
  },
};

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
  //forceInset={{top: 'always', bottom: 'always'}}

  const theme = extendTheme({
    config: {
      initialColorMode: 'light',
    },
  });

  return (
    // <SafeAreaProvider>
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
    // </SafeAreaProvider>
  );
}
