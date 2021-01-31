import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Schedule from './Calendar/Schedule';
import Day from './Calendar/Day';
import {Text, TouchableOpacity} from 'react-native';
import {getDate} from '../utilz';

const Stack = createStackNavigator();

export default function HomeStack({id}) {
  const Date = getDate();

  return (
    <Stack.Navigator
      screenOptions={{headerStatusBarHeight: 0}}
      initialRouteName="Day">
      <Stack.Screen
        name="Day"
        options={{title: 'Rozvrh'}}
        initialParams={{date: Date}}>
        {(props) => <Day {...props} id={id} />}
      </Stack.Screen>
      <Stack.Screen name="Month" options={{title: 'Měsíc'}}>
        {(props) => <Schedule {...props} id={id} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
