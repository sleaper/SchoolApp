import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import codePush from 'react-native-code-push';
import AsyncStorage from '@react-native-community/async-storage';

const checkIfBetaTester = async () => {
  const res = await AsyncStorage.getItem('MyApp:IS_BETA_TESTER');
  return res === 'true';
};

const codePushKeys = {
  staging: Platform.select({
    ios: 'ZRVFZTcTP5QLBq22OZ0F-RQvjWI3awFgqlvzc',
    android: 'ty8Xzr1RJxI71ssNgNiMihbYsIDHRKBa_pVLu',
  }),
  production: Platform.select({
    ios: 'BLMZHANsTMuCaDOoKO6neXkzM56dIUv3HBCUf',
    android: 'LmnDpd7zkgvnyR7AMFzywFKvbK9NHfV4TgUPa',
  }),
};

const CodePushManager = () => {
  useEffect(() => {
    codePush
      .notifyAppReady()
      .then(() => {
        return checkIfBetaTester();
      })
      .then((isBetaTester) => {
        if (isBetaTester) {
          codePush.sync({
            deploymentKey: codePushKeys.staging,
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE,
          });
        } else {
          codePush.sync({
            deploymentKey: codePushKeys.production,
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE,
          });
        }
      })
      .catch((err) => {
        console.log('Error occured with codePush', err);
      });
  }, []);

  return null;
};

export default codePush({checkFrequency: codePush.CheckFrequency.MANUAL})(
  CodePushManager,
);
