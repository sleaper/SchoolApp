import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import Schedule from './Calendar/Schedule';
import Day from './Calendar/Day';
import {Text, TouchableOpacity} from 'react-native';
import {getDate} from '../utilz';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

export default function HomeStack({id}) {
  const Date = getDate();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      mode="modal"
      initialRouteName="Day">
      <Stack.Screen
        name="Day"
        options={{
          title: 'Rozvrh',
        }}
        initialParams={{date: Date}}>
        {(props) => <Day {...props} id={id} />}
      </Stack.Screen>
      <Stack.Screen name="Month" options={{title: 'Měsíc'}}>
        {(props) => <Schedule {...props} id={id} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
