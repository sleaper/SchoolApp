import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Center from './components/Center';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './components/HomeStack';
import {MyContext} from './AuthProvider';
import {gql, useQuery, useMutation} from '@apollo/client';
import {ActivityIndicator, Text} from 'react-native';
import CalendarStack from './components/CalendarStack';
import MarksStack from './components/MarksStack';
import {ThemeContext} from './components/theme/ThemeProvider';
import {GetTokenProvider} from './TokenProvider';

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
  const [{card, text, primary, background}] = useContext(ThemeContext);
  const {info} = useContext(MyContext);
  const {token} = useContext(GetTokenProvider);
  //const [token, setToken] = useState('');
  const {loading, data, error} = useQuery(GET_USER, {
    variables: info,
  });
  const [addToken] = useMutation(GET_DEVICE, {
    ignoreResults: true,
  });

  useEffect(() => {
    // async function getToken() {
    //   const Token = await messaging().getToken();
    //   setToken(Token);
    //   addToken({variables: {name: info.name, key: info.key, token: Token}});
    // }

    // getToken();
    if (token) {
      addToken({variables: {name: info.name, key: info.key, token: token}});
    }
  }, [token, addToken, info]);

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
        <Text style={{color: text}}>Nejsi připojený k internetu.</Text>
      </Center>
    );
  }

  return (
    <NavigationContainer theme={{colors: {background: background}}}>
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
          activeTintColor: primary,
          inactiveTintColor: text,
          style: {
            backgroundColor: card,
          },
        }}>
        <Tabs.Screen name="Home" options={{title: 'Domov'}}>
          {(props) => (
            <HomeStack
              {...props}
              name={data.UserInfo.Name}
              id={data.UserInfo.PersonId}
              token={token}
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
