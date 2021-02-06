import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {MyContext} from '../AuthProvider';
import Home from './Home/Home';
import {useTheme} from '@react-navigation/native';

const Stack = createStackNavigator();

export default function HomeStack({id, name}) {
  const {LogOut} = useContext(MyContext);
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{headerStatusBarHeight: 0}}
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => LogOut()}>
                <Text style={{paddingRight: 8, color: colors.text}}>
                  LOGOUT
                </Text>
              </TouchableOpacity>
            );
          },
          title: name,
        }}>
        {(props) => <Home {...props} id={id} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
