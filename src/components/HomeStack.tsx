/* eslint-disable @typescript-eslint/no-unused-vars */
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {MyContext} from '../AuthProvider';
import Home from './Home/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsTabs from './Home/SettingsTabs';
import ChangeTheme from './Home/ChangeTheme';
import {useHeaderOptions} from '../hooks/useHeaderOptions';
import {useToken, useColorModeValue, Text, useColorMode} from 'native-base';
import {UserInfo} from '../generated/graphqlBaseTypes';

const Stack = createStackNavigator();

export interface homeStackTmp {
  userData: UserInfo;
  token: string;
}

export default function HomeStack({userData, token}: homeStackTmp) {
  const {LogOut} = useContext(MyContext);
  const {colorMode} = useColorMode();

  return (
    <Stack.Navigator
      screenOptions={
        (useHeaderOptions(),
        {
          cardStyle: {
            backgroundColor:
              colorMode === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
          },
          headerStyle: {
            backgroundColor:
              colorMode === 'dark' ? 'rgb(30, 30, 30)' : 'rgb(230, 230, 230)',
            height: 150,
          },
          headerTintColor: colorMode === 'dark' ? 'white' : 'black',
        })
      }
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={({navigation}) => ({
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => LogOut()}>
                <Text pr={8}>LOGOUT</Text>
              </TouchableOpacity>
            );
          },
          headerLeft: () => {
            return (
              //<TouchableOpacity onPress={() => setModal(!modal)}>
              <TouchableOpacity
                style={{marginLeft: 20}}
                onPress={() => navigation.navigate('Settings')}>
                {/* <Text style={{color: colors.text, fontSize: 23}}>{name}</Text> */}
                <Icon
                  name="menu-outline"
                  size={30}
                  color={'rgb(255, 255, 255)'}
                />
              </TouchableOpacity>
            );
          },
        })}>
        {props => <Home {...props} userData={userData} token={token} />}
      </Stack.Screen>
      <Stack.Screen name="Settings">
        {props => <SettingsTabs {...props} name={userData.name} />}
      </Stack.Screen>
      {/* <Stack.Screen name="Themes">
        {props => <ChangeTheme {...props} />}
      </Stack.Screen> */}
    </Stack.Navigator>
  );
}
