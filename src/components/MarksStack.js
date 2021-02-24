import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Marks from './Marks/Marks';
import AvarageMarks from './Marks/AvarageMarks';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import Subject from './Marks/Subject';

const Stack = createStackNavigator();

export default function HomeStack({id, name}) {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      mode="modal"
      initialRouteName="Marks"
      screenOptions={{
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}>
      <Stack.Screen
        options={{
          title: 'Průměrné známky',
        }}
        name="AvarageMarks">
        {(props) => <AvarageMarks {...props} id={id} />}
      </Stack.Screen>
      <Stack.Screen
        options={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => navigation.navigate('AvarageMarks')}>
              <Icon name={'school-outline'} size={35} color={colors.text} />
            </TouchableOpacity>
          ),
          headerTitle: 'Známky',
        })}
        name="Marks">
        {(props) => <Marks {...props} id={id} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          title: 'Předmět',
        }}
        name="Subject">
        {(props) => <Subject {...props} id={id} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
