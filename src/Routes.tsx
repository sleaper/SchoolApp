/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import AppTabs from './AppTabs';
import AuthTabs from './AuthTabs';
import {MyContext} from './providers/AuthProvider';
import RNSInfo from 'react-native-sensitive-info';

// YzNCaFl5NXdaWFJ5OmJqSmhORkpXTXpNPQ==
export default function Routes() {
  let {user, setUser, data, setInfo} = useContext(MyContext);

  useEffect(() => {
    console.log('3');
    //check if the user is logged in or not
    if (!data) {
      RNSInfo.getItem('user', {})
        .then(userToken => {
          if (userToken) {
            setInfo(JSON.parse(userToken));
            setUser(true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);
  return <>{user ? <AppTabs /> : <AuthTabs />}</>;
}

/*AsyncStorage.getItem('user')
        .then((userToken) => {
          if (userToken) {
            console.log('userToken ', userToken);
            setInfo(JSON.parse(userToken));
            setUser(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });*/
