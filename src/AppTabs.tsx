/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './components/HomeStack';
import {MyContext} from './providers/AuthProvider';
import {gql, useMutation} from '@apollo/client';
import {ActivityIndicator} from 'react-native';
import CalendarStack from './components/CalendarStack';
import MarksStack from './components/MarksStack';
import {GetTokenProvider} from './providers/TokenProvider';
import {Text, useColorMode, Center, Flex} from 'native-base';
import {
  useAddUserMutation,
  useUserInfoLazyQuery,
  useUserInfoQuery,
} from './AppTabs.codegen';
import {UserInfo} from './generated/graphqlBaseTypes';
import MyCenter from './components/MyCenter';

const Tabs = createBottomTabNavigator();

export default function AppTabs() {
  const {info} = useContext(MyContext);
  const {token} = useContext(GetTokenProvider);

  const {loading, data, error} = useUserInfoQuery({
    variables: {key: info?.key as string},
  });

  const {colorMode} = useColorMode();

  // useEffect(() => {
  //   //  Solve this
  //   //   User should be added and then called userInfo
  //   let mounted = true;
  //   if (token) {
  //     addUser({
  //       variables: {
  //         name: info?.name as string,
  //         key: info?.key as string,
  //         firebaseToken: token,
  //       },
  //     });
  //   }

  //   return function cleanup() {
  //     mounted = false;
  //   };
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [token]);

  // useEffect(() => {
  //   let mounted = true;
  //   if (addUserData) {
  //     getUserInfo({
  //       variables: {key: info?.key as string},
  //     });
  //   }

  //   return function cleanup() {
  //     mounted = false;
  //   };
  // }, [addUserData]);

  if (loading) {
    return (
      <MyCenter>
        <ActivityIndicator size="large" color="blue" />
      </MyCenter>
    );
  }

  if (error) {
    console.log('ERRpr', error);
    return (
      <MyCenter>
        <Text>Nejsi připojený k internetu.</Text>
      </MyCenter>
    );
  }

  return (
    <NavigationContainer
      theme={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs.Navigator
        //initialRouteName={'Home'}
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Marks') {
              iconName = 'document-text-outline';
            } else if (route.name === 'Calendar') {
              iconName = 'calendar-outline';
            }
            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'rgb(0, 141, 255)',
          inactiveTintColor: colorMode === 'dark' ? 'white' : 'black',
          style: {
            backgroundColor: colorMode === 'dark' ? 'black' : 'white',
          },
        }}>
        <Tabs.Screen name="Home" options={{title: 'Domov'}}>
          {props => (
            <HomeStack
              {...props}
              userData={data?.user.info as UserInfo}
              token={token as string}
            />
          )}
        </Tabs.Screen>
        <Tabs.Screen
          name="Calendar"
          options={{title: 'Kalendář'}}
          children={() => (
            <CalendarStack id={data?.user.info.personId as string} />
          )}
        />
        <Tabs.Screen name="Marks" options={{title: 'Hodnocení'}}>
          {props => <MarksStack {...props} id={data?.user.info.id as string} />}
        </Tabs.Screen>
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
