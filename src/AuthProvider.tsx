/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect, createContext, useContext} from 'react';
import {gql, useLazyQuery, useMutation} from '@apollo/client';
import base64 from 'react-native-base64';
import {ActivityIndicator, Text} from 'react-native';
import Center from './components/Center';
import {useApolloClient} from '@apollo/client';
import SInfo from 'react-native-sensitive-info';
//import messaging from '@react-native-firebase/messaging';
import {GetTokenProvider} from './TokenProvider';
import {
  useAuthUserLazyQuery,
  useRemoveUserMutation,
} from './AuthProvider.codegen';

interface Info {
  name: string;
  key: string;
}

export const MyContext = createContext<{
  wrongPass: boolean;
  user: boolean | null;
  setUser: React.Dispatch<React.SetStateAction<boolean | null>>;
  data: any;
  info: Info | null;
  setInfo: React.Dispatch<React.SetStateAction<Info | null>>;
  LogIn: (name: any, passw: any) => Promise<void>;
  LogOut: () => void;
  resetStorage: () => void;
}>({} as any);

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
  // const [callData, {loading, data, error}] = useLazyQuery(AUTH_USER, {
  //   fetchPolicy: 'no-cache',
  // });
  // const [removeData] = useMutation(REMOVE_DATA, {
  //   ignoreResults: true,
  // });

  //Why no cache
  const [authUser, {loading, data, error}] = useAuthUserLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const [removeData] = useRemoveUserMutation({
    ignoreResults: true,
  });

  const client = useApolloClient();
  const {token} = useContext(GetTokenProvider);
  const [user, setUser] = useState<boolean | null>(null);
  const [info, setInfo] = useState<Info | null>(null);
  const [wrongPass, setWrongPass] = useState(false);

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
    console.log('1', data);
    if (data) {
      if (data.UserAuth === true) {
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

          authUser({
            variables: {key: key},
          });
          console.log(data);
        },
        LogOut: async () => {
          await client.clearStore();
          setUser(null);
          removeData({variables: {firebaseToken: token as string}});
          /*await AsyncStorage.removeItem('user', (err) => {
            if (err) {
              console.error(err);
            }
          });*/
          await SInfo.deleteItem('user', {});
        },
        resetStorage: resetStorage,
      }}>
      {children}
    </MyContext.Provider>
  );
}

// const {data} = await apoloCLient.query({
//   query: GET_USER,
//   variables: {name: HashedName, key: key},
// });
