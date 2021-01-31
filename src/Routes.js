/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import AppTabs from './AppTabs';
import AuthTabs from './components/AuthTabs';
import {MyContext} from './AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';

// YzNCaFl5NXdaWFJ5OmJqSmhORkpXTXpNPQ==
export default function Routes() {
  let {user, setUser, data, setInfo} = useContext(MyContext);

  useEffect(() => {
    console.log('3');
    //check if the user is logged in or not
    if (!data) {
      AsyncStorage.getItem('user')
        .then((userToken) => {
          if (userToken) {
            console.log('userToken ', userToken);
            setInfo(JSON.parse(userToken));
            setUser(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return <>{user ? <AppTabs /> : <AuthTabs />}</>;
}

//JSON.parse(userToken)
