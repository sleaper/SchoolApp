/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

if (__DEV__) {
  import('./src/ReactotronConfig.js').then(() =>
    console.log('Reactotron Configured'),
  );
}

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Providers from './src/Providers';
import messaging from '@react-native-firebase/messaging';
import CodePushManager from './src/codePush/CodePushManager';
import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';
import SplashScreen from 'react-native-splash-screen';

export const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();
Sentry.init({
  dsn: Config.SENTRY_DSN,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      tracingOrigins: ['localhost', 'api.skola-offline.tk/graphql', /^\//],
    }),
  ],
});

const App = () => {
  async function requestUserPermission() {
    //const token = await messaging().getToken();
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    SplashScreen.hide();
  }

  useEffect(() => {
    requestUserPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <React.Fragment>
      <Providers />
      {!__DEV__ ? <CodePushManager /> : null}
    </React.Fragment>
  );
};

//export default App;
export default Sentry.wrap(App);
