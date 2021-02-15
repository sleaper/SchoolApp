import React, {useState, useEffect, createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {gql, useLazyQuery} from '@apollo/client';
import base64 from 'react-native-base64';
import {ActivityIndicator, View} from 'react-native';
import Center from './components/Center';
import {useApolloClient} from '@apollo/client';
import SInfo from 'react-native-sensitive-info';

export const MyContext = createContext({});

const AUTH_USER = gql`
  query($name: String!, $key: String!) {
    UserAuth(name: $name, key: $key) {
      AuthStatus
    }
  }
`;

export default function AuthProvider({children}) {
  const client = useApolloClient();
  const [callData, {called, loading, data, error}] = useLazyQuery(AUTH_USER);
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState(null);

  /*const resetStorage = async () => {
    await AsyncStorage.removeItem('user', (err) => {
      if (err) {
        console.log(err);
      }
    });
    console.log('cleared');
  };*/

  const resetStorage = async () => {
    await SInfo.deleteItem('user', {});
    console.log('cleared');
  };

  useEffect(() => {
    console.log('1');
    if (data) {
      if (data.UserAuth.AuthStatus === true) {
        setUser(true);
      } else {
        console.log('spatne');
        resetStorage();
        setUser(false);
      }
    }
  }, [data]);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#0000ff" />
      </Center>
    );
  }

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        data,
        info,
        setInfo,
        LogIn: async (name, passw) => {
          console.log('clicked');
          //Hashing logic
          let HashedName = base64.encode(name);
          let HashedPassw = base64.encode(passw);
          let connect = HashedName + ':' + HashedPassw;

          //getting a key
          let key = base64.encode(connect);
          const info = {name: HashedName, key: key};
          setInfo(info);
          // storing UserInfo, because of authorization
          /*await AsyncStorage.setItem('user', JSON.stringify(info), (err) => {
            if (err) {
              console.error(err);
            }
          });*/

          await SInfo.setItem('user', JSON.stringify(info), {});

          callData({
            variables: {name: HashedName, key: key},
            fetchPolicy: 'no-cache',
          });
        },
        LogOut: async () => {
          await client.clearStore();
          setUser(null);
          /*await AsyncStorage.removeItem('user', (err) => {
            if (err) {
              console.error(err);
            }
          });*/
          await SInfo.deleteItem('user', {});
        },
      }}>
      {children}
    </MyContext.Provider>
  );
}

// const {data} = await apoloCLient.query({
//   query: GET_USER,
//   variables: {name: HashedName, key: key},
// });
