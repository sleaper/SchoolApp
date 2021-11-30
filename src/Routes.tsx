/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import AppTabs from './AppTabs';
import AuthTabs from './AuthTabs';
import {MyContext} from './providers/AuthProvider';
import RNSInfo from 'react-native-sensitive-info';
import {useAddUserMutation} from './AppTabs.codegen';
import {GetTokenProvider} from './providers/TokenProvider';

// YzNCaFl5NXdaWFJ5OmJqSmhORkpXTXpNPQ==
export default function Routes() {
  let {user, setUser, data, setInfo, info} = useContext(MyContext);
  const [addUser, {data: addUserData, error}] = useAddUserMutation({});
  const {token} = useContext(GetTokenProvider);

  useEffect(() => {
    //check if the user is logged in or not
    if (!data) {
      RNSInfo.getItem('user', {})
        .then(userToken => {
          console.log('userToken', userToken);
          if (userToken) {
            setInfo(JSON.parse(userToken));
            setUser(true);
          }
        })
        .catch(err => {
          console.log('routeError', err);
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
    console.log('addUserError', error);
  }

  return <>{addUserData && user ? <AppTabs /> : <AuthTabs />}</>;
}
