import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Center from './components/Center';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './components/HomeStack';
import {MyContext} from './AuthProvider';
import {gql, useQuery, useMutation} from '@apollo/client';
import {ActivityIndicator} from 'react-native';
import CalendarStack from './components/CalendarStack';
import MarksStack from './components/MarksStack';
import {ThemeContext} from './components/theme/ThemeProvider';
import {lightTheme, darkTheme} from './components/theme/Themes';
import messaging from '@react-native-firebase/messaging';

const Tabs = createBottomTabNavigator();

const GET_USER = gql`
  query($name: String!, $key: String!) {
    UserInfo(name: $name, key: $key) {
      Name
      PersonId
    }
  }
`;

const GET_DEVICE = gql`
  mutation($name: String!, $key: String!, $token: String!) {
    AddUser(name: $name, key: $key, token: $token) {
      Result
    }
  }
`;

export default function AppTabs() {
  const {theme} = useContext(ThemeContext);
  const {info} = useContext(MyContext);
  const {loading, data} = useQuery(GET_USER, {
    variables: info,
  });
  const [addToken] = useMutation(GET_DEVICE, {ignoreResults: true});

  useEffect(() => {
    async function geToken() {
      const token = await messaging().getToken();
      //console.log(info.name, info.key, token);
      addToken({variables: {name: info.name, key: info.key, token: token}});
    }

    geToken();
  });

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#0000ff" />
      </Center>
    );
  }

  return (
    <NavigationContainer theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Tabs.Navigator
        initialRouteName={'Home'}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
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
          activeTintColor: theme === 'dark' ? 'white' : 'black',
          inactiveTintColor: 'gray',
        }}>
        <Tabs.Screen name="Home" options={{title: 'Domov'}}>
          {(props) => (
            <HomeStack
              {...props}
              name={data.UserInfo.Name}
              id={data.UserInfo.PersonId}
            />
          )}
        </Tabs.Screen>
        <Tabs.Screen
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
          {(props) => <MarksStack {...props} id={data.UserInfo.PersonId} />}
        </Tabs.Screen>
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

/*
 background: 'rgb(43, 42, 42)',
    card: 'rgb(0, 0, 0)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',*/
