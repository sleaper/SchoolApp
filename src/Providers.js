import React from 'react';
import Authprovider from './AuthProvider';
import Routes from './Routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApolloProvider} from '@apollo/client';
import {apoloCLient} from './apolo/ApolloClient';
import {AppearanceProvider} from 'react-native-appearance';
import ThemeProvider from '../src/components/theme/ThemeProvider';
import TokenProvider from '../src/TokenProvider';

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
        <TokenProvider>
          <AppearanceProvider>
            <ThemeProvider>
              <Authprovider>
                <Routes />
              </Authprovider>
            </ThemeProvider>
          </AppearanceProvider>
        </TokenProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}
