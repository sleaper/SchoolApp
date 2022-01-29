import React, {createContext, useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

export const GetTokenProvider = createContext<{
  token: string | null;
}>({} as any);

export default function TokenProvider({children}) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function getToken() {
      messaging().onTokenRefresh(async fcm => {
        setToken(fcm);
        return;
      });
      const Token = await messaging().getToken();
      setToken(Token);
    }

    getToken();
  }, []);

  return (
    <GetTokenProvider.Provider value={{token}}>
      {children}
    </GetTokenProvider.Provider>
  );
}
