import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Center from './components/Center';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './HomeStack';
import {MyContext} from './AuthProvider';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator} from 'react-native';
import CalendarStack from './components/CalendarStack';
import MarksStack from './components/MarksStack';
import {ThemeContext} from './components/theme/ThemeProvider';

const Tabs = createBottomTabNavigator();

const GET_USER = gql`
  query($name: String!, $key: String!) {
    UserInfo(name: $name, key: $key) {
      Name
      PersonId
    }
  }
`;

const lightTheme = {
  dark: false,
  colors: {
    text: 'rgb(28, 28, 30)',
    primary: 'rgb(255, 45, 85)',
    card: 'rgb(238, 238, 238)',
    background: 'rgb(255, 255, 255)',
    border: 'rgb(255, 255, 255)',
    notification: '#3d3c3c',
  },
};

const darkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    text: 'rgb(255, 255, 255)',
    notification: 'rgb(204, 204, 204)',
    border: 'rgb(255, 255, 255)',
  },
};

export default function AppTabs() {
  const {theme} = useContext(ThemeContext);
  const {info} = useContext(MyContext);
  const {loading, error, data} = useQuery(GET_USER, {
    variables: info,
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
        initialRouteName={'Calendar'}
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
