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
import {MyContext} from './AuthProvider';
import {gql, useMutation} from '@apollo/client';
import {ActivityIndicator} from 'react-native';
import CalendarStack from './components/CalendarStack';
import MarksStack from './components/MarksStack';
import {GetTokenProvider} from './TokenProvider';
import {Text, useColorMode, Center, Flex} from 'native-base';
import {useAddUserMutation, useUserInfoQuery} from './AppTabs.codegen';
import {UserInfo} from './generated/graphqlBaseTypes';

const Tabs = createBottomTabNavigator();

export default function AppTabs() {
  //const [{card, text, primary, background}] = useContext(ThemeContext);
  const {info} = useContext(MyContext);
  const {token} = useContext(GetTokenProvider);

  const {loading, data, error} = useUserInfoQuery({
    variables: {
      key: info?.key as string,
    },
  });

  const [addUser] = useAddUserMutation({
    ignoreResults: true,
  });

  const {colorMode} = useColorMode();

  useEffect(() => {
    // async function getToken() {
    //   const Token = await messaging().getToken();
    //   setToken(Token);
    //   addToken({variables: {name: info.name, key: info.key, token: Token}});
    // }

    // getToken();
    if (token) {
      addUser({
        variables: {
          name: info?.name as string,
          key: info?.key as string,
          firebaseToken: token,
        },
      });
    }
  }, [token, addUser, info]);
  console.log(data);
  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="blue" />
      </Center>
    );
  }

  if (error) {
    console.log(error);
    return (
      <Center>
        <Text>Nejsi připojený k internetu.</Text>
      </Center>
    );
  }

  return (
    <NavigationContainer
      theme={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs.Navigator
        initialRouteName={'Home'}
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
            backgroundColor:
              colorMode === 'dark' ? 'black' : 'rgb(230, 230, 230)',
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
        {/* <Tabs.Screen
          name="Calendar"
          options={{title: 'Kalendář'}}
          children={() => (
            <CalendarStack
              name={data.UserInfo.Name}
              id={data.UserInfo.PersonId}
            />
          )}
        />
        <Tabs.Screen name="Marks" options={{title: 'Hodnocení'}}>
          {props => <MarksStack {...props} id={data.UserInfo.PersonId} />}
        </Tabs.Screen> */}
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
