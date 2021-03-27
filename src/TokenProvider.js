import React, {createContext, useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

export const GetTokenProvider = createContext({});

export default function ThemeProvider({children}) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function getToken() {
      const Refreshed = await messaging().onTokenRefresh(async fcm => {
        console.log('test');
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
//{theme, toggleTheme}
