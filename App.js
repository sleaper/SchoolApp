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

export default function App() {
  async function requestUserPermission() {
    const token = await messaging().getToken();
    console.log(token);
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
  }, []);

  return <Providers />;
}
