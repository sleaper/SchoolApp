import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Marks from './Marks/Marks';
import {useTheme} from '@react-navigation/native';
import AvarageMarks from './Marks/AvarageMarks';

const Stack = createStackNavigator();

export default function HomeStack({id, name}) {
  return (
    <Stack.Navigator
      screenOptions={{headerStatusBarHeight: 0}}
      initialRouteName="Marks">
      <Stack.Screen options={{title: 'Průměrné známky'}} name="AvarageMarks">
        {(props) => <AvarageMarks {...props} id={id} />}
      </Stack.Screen>
      <Stack.Screen options={{title: 'Známky'}} name="Marks">
        {(props) => <Marks {...props} id={id} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
