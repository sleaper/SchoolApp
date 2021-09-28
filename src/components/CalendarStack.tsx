import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Schedule from './Calendar/Schedule';
import Day from './Calendar/Day';
import {getDate} from '../util/utilz';
import Icon from 'react-native-vector-icons/Ionicons';
import {useHeaderOptions} from '../hooks/useHeaderOptions';
import {Pressable, useColorModeValue} from 'native-base';

const Stack = createStackNavigator();

export default function HomeStack({id}: {id: string}) {
  const Date = getDate();
  return (
    <Stack.Navigator
      screenOptions={
        // ({
        //   headerShown: true,
        //   gestureEnabled: true,
        //   cardOverlayEnabled: true,
        //   ...TransitionPresets.ModalPresentationIOS,
        // },
        (useHeaderOptions(),
        {
          cardStyle: {backgroundColor: useColorModeValue('#e5e5e5', 'black')},
          headerStyle: {backgroundColor: useColorModeValue('white', 'black')},
          headerTintColor: useColorModeValue('black', 'white'),
        })
      }
      mode="modal"
      initialRouteName="Day">
      <Stack.Screen
        name="Day"
        options={({navigation}) => ({
          title: 'Rozvrh',
          headerRight: () => (
            <Pressable pr={5} onPress={() => navigation.navigate('Month')}>
              <Icon
                name="calendar-outline"
                size={30}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                color={useColorModeValue('black', 'white')}
              />
            </Pressable>
          ),
        })}
        initialParams={{date: Date}}>
        {props => <Day {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Month" options={{title: 'Měsíc'}}>
        {props => <Schedule {...props} id={id} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
