/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import AppTabs from './AppTabs';
import AuthTabs from './AuthTabs';
import {MyContext} from './providers/AuthProvider';
import RNSInfo from 'react-native-sensitive-info';
import {useAddUserMutation} from './AppTabs.codegen';
import {GetTokenProvider} from './providers/TokenProvider';
import SplashScreen from 'react-native-splash-screen';

export default function Routes() {
  let {user, setUser, data, setInfo, info} = useContext(MyContext);
  const [addUser, {data: addUserData, error}] = useAddUserMutation({});
  const {token} = useContext(GetTokenProvider);

  useEffect(() => {
    //check if the user is logged in or not
    if (!data) {
      RNSInfo.getItem('user', {})
        .then(userToken => {
          if (userToken) {
            setInfo(JSON.parse(userToken));
            setUser(true);
          } else {
            SplashScreen.hide();
          }
        })
        .catch(err => {
          console.error('routeError', err);
        });
    }
  }, []);

  useEffect(() => {
    if (user && token) {
      addUser({
        variables: {
          name: info?.name as string,
          key: info?.key as string,
          firebaseToken: token as string,
        },
      });
    }
  }, [user, token]);

  if (error) {
    console.error('addUserError', error);
    SplashScreen.hide();
  }

  return <>{addUserData && user ? <AppTabs /> : <AuthTabs />}</>;
}
