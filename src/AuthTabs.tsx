import React from 'react';
import Login from './components/login';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export default function AuthTabs() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerStatusBarHeight: 0, headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
