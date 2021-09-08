import React, {useContext} from 'react';
import Login from './components/login';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeContext} from './components/theme/ThemeProvider';
import {lightTheme, darkTheme} from './components/theme/Themes';

const Stack = createStackNavigator();

export default function AuthTabs() {
  const {theme} = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Stack.Navigator
        screenOptions={{headerStatusBarHeight: 0, headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
