import React, {useState, useEffect, createContext, useContext} from 'react';
import base64 from 'react-native-base64';
import {ActivityIndicator} from 'react-native';
import {useApolloClient} from '@apollo/client';
import RNSInfo from 'react-native-sensitive-info';
//import messaging from '@react-native-firebase/messaging';
import {GetTokenProvider} from './TokenProvider';
import {
  useAuthUserLazyQuery,
  useRemoveUserMutation,
} from './AuthProvider.codegen';
import {Button, Text} from 'native-base';
import MyCenter from '../components/MyCenter';

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

export default function AuthProvider({children}) {
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

  const resetStorage = async () => {
    try {
      await RNSInfo.deleteItem('user', {});
    } catch (err) {
      console.error('resetError', err);
    }
  };

  useEffect(() => {
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
  }, [data, data?.UserAuth]);

  if (loading) {
    return (
      <MyCenter>
        <ActivityIndicator size="large" color="#0000ff" />
      </MyCenter>
    );
  }

  if (error) {
    return (
      <MyCenter>
        <Text>Nejsi připojený k internetu.</Text>
        <Button
          colorScheme="blue"
          onPress={() =>
            RNSInfo.getItem('user', {})
              .then(userToken => {
                console.log('userToken', userToken);
                if (userToken) {
                  let tmp: {name: string; key: string} = JSON.parse(userToken);

                  authUser({variables: {key: tmp.key}});
                }
              })
              .catch(err => {
                console.log('routeError', err);
              })
          }>
          opakovat
        </Button>
      </MyCenter>
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
          //Hashing logic
          let HashedName = base64.encode(name);
          let HashedPassw = base64.encode(passw);
          let connect = HashedName + ':' + HashedPassw;

          //getting a key
          let key = base64.encode(connect);
          const info = {name: HashedName, key: key};

          setInfo(info);

          try {
            await RNSInfo.setItem('user', JSON.stringify(info), {});
          } catch (err) {
            console.error('settingError', err);
          }

          authUser({
            variables: {key: key},
          });
        },
        LogOut: async () => {
          await client.clearStore();
          setUser(null);

          removeData({variables: {firebaseToken: token as string}});

          await RNSInfo.deleteItem('user', {});
        },
        resetStorage: resetStorage,
      }}>
      {children}
    </MyContext.Provider>
  );
}
