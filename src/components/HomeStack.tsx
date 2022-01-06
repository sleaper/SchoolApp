import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {MyContext} from '../providers/AuthProvider';
import Home from './Home/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsTabs from './Home/SettingsTabs';
import {Button, Flex, Text, useColorModeValue} from 'native-base';
import {UserInfo} from '../generated/graphqlBaseTypes';

const Stack = createStackNavigator();

export interface homeStackTmp {
  userData: UserInfo | undefined;
  token: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HomeStack({userData, token}: homeStackTmp) {
  const {LogOut} = useContext(MyContext);

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: useColorModeValue('white', 'black'),
        },
        headerStyle: {
          backgroundColor: useColorModeValue('white', 'black'),
          //height: 60,
          shadowColor: useColorModeValue('black', 'white'),
        },
        headerTintColor: useColorModeValue('black', 'white'),
        headerTitle: '',
      }}
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={({navigation}) => ({
          headerRight: () => {
            return (
              <Button mr={4} onPress={() => LogOut()}>
                <Text fontWeight={800}>Odhlásit se</Text>
              </Button>
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
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    color={useColorModeValue('black', 'white')}
                  />
                </Button>
                <Text fontSize="lg">{userData?.name}</Text>
              </Flex>
            );
          },
        })}>
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          props => <Home />
        }
      </Stack.Screen>
      <Stack.Screen name="Settings">
        {props => <SettingsTabs {...props} name={userData?.name} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// userData={userData} token={token}
