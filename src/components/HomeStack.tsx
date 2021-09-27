/* eslint-disable @typescript-eslint/no-unused-vars */
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {MyContext} from '../AuthProvider';
import Home from './Home/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsTabs from './Home/SettingsTabs';
import {Button, Flex, Text, useColorMode} from 'native-base';
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
      screenOptions={{
        cardStyle: {
          backgroundColor: colorMode === 'dark' ? 'black' : 'white',
        },
        headerStyle: {
          backgroundColor: colorMode === 'dark' ? 'black' : 'white',
          height: 60,
          shadowColor: colorMode === 'dark' ? 'white' : 'black',
        },
        headerTintColor: colorMode === 'dark' ? 'white' : 'black',
        headerTitle: '',
      }}
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
              <Flex flexDirection="row" alignItems="center">
                <Button
                  backgroundColor="transparent"
                  ml={2}
                  onPress={() => navigation.navigate('Settings')}>
                  <Icon
                    name="menu-outline"
                    size={30}
                    color={'rgb(255, 255, 255)'}
                  />
                </Button>
                <Text fontSize="lg">{userData.name}</Text>
              </Flex>
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
