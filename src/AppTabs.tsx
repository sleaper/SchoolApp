import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './components/HomeStack';
import {MyContext} from './providers/AuthProvider';
import CalendarStack from './components/CalendarStack';
import MarksStack from './components/MarksStack';
import {GetTokenProvider} from './providers/TokenProvider';
import {useColorMode} from 'native-base';
import {useUserInfoQuery} from './AppTabs.codegen';
import {UserInfo} from './generated/graphqlBaseTypes';
import {routingInstrumentation} from '../App';
import SplashScreen from 'react-native-splash-screen';

const Tabs = createBottomTabNavigator();

export default function AppTabs() {
  const {info} = useContext(MyContext);
  const {token} = useContext(GetTokenProvider);
  const navigation = React.useRef();

  const {loading, data} = useUserInfoQuery({
    variables: {key: info?.key as string},
  });

  const {colorMode} = useColorMode();

  if (!loading) {
    SplashScreen.hide();
  }

  return (
    <NavigationContainer
      //@ts-expect-error
      ref={navigation}
      onReady={() => {
        // Register the navigation container with the instrumentation
        routingInstrumentation.registerNavigationContainer(navigation);
      }}
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
