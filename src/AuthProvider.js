import React, {useState, useEffect, createContext, useContext} from 'react';
import {gql, useLazyQuery, useMutation} from '@apollo/client';
import base64 from 'react-native-base64';
import {ActivityIndicator, Text} from 'react-native';
import Center from './components/Center';
import {useApolloClient} from '@apollo/client';
import SInfo from 'react-native-sensitive-info';
import messaging from '@react-native-firebase/messaging';
import {GetTokenProvider} from '../src/TokenProvider';

export const MyContext = createContext({});

const AUTH_USER = gql`
  query($name: String!, $key: String!) {
    UserAuth(name: $name, key: $key) {
      AuthStatus
    }
  }
`;

const REMOVE_DATA = gql`
  mutation($id: String!, $token: String!) {
    RemoveData(id: $id, token: $token) {
      Data
    }
  }
`;

export default function AuthProvider({children}) {
  const client = useApolloClient();
  const {token} = useContext(GetTokenProvider);
  const [callData, {called, loading, data, error}] = useLazyQuery(AUTH_USER);
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState(null);
  const [wrongPass, setWrongPass] = useState(false);
  const [removeData] = useMutation(REMOVE_DATA, {
    ignoreResults: true,
  });
  /*const resetStorage = async () => {
    await AsyncStorage.removeItem('user', (err) => {
      if (err) {
        console.log(err);
      }
    });
    console.log('cleared');
  };*/

  const resetStorage = async () => {
    try {
      await SInfo.deleteItem('user', {});
    } catch (err) {
      console.error(err);
    }
    console.log('cleared');
  };

  useEffect(() => {
    console.log('1');
    if (data) {
      if (data.UserAuth.AuthStatus === true) {
        setUser(true);
        setWrongPass(false);
      } else {
        setWrongPass(true);
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

  if (error) {
    return (
      <Center>
        <Text>Nejsi připojený k internetu.</Text>
      </Center>
    );
  }

  return (
    <MyContext.Provider
      value={{
        wrongPass,
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
          try {
            await SInfo.setItem('user', JSON.stringify(info), {});
          } catch (error) {
            console.error(error);
          }

          callData({
            variables: {name: HashedName, key: key},
            fetchPolicy: 'no-cache',
          });
        },
        LogOut: async () => {
          await client.clearStore();
          setUser(null);
          removeData({variables: {id: info.name, token: token}});
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
