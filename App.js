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
import codePush from 'react-native-code-push';
import CodePushManager from './src/codePush/CodePushManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  async function requestUserPermission() {
    const token = await messaging().getToken();
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
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

export default App;
