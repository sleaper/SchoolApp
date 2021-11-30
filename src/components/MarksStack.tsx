import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AvarageMarks from './Marks/AvarageMarks';
import Icon from 'react-native-vector-icons/Ionicons';
import Subject from './Marks/Subject';
import TabStackMarks from './Marks/TabStackMarks';
import {Button, useColorModeValue} from 'native-base';

const Stack = createStackNavigator();

export default function HomeStack({id}: {id: string}) {
  const iconColor = useColorModeValue('black', 'white');
  return (
    <Stack.Navigator
      mode="modal"
      initialRouteName="Marks"
      screenOptions={{
        cardStyle: {
          backgroundColor: useColorModeValue('white', 'black'),
        },
        headerStyle: {
          backgroundColor: useColorModeValue('white', 'black'),
          height: 60,
          shadowColor: useColorModeValue('black', 'white'),
        },
        headerTintColor: useColorModeValue('black', 'white'),
      }}>
      <Stack.Screen
        options={({navigation}) => ({
          headerRight: () => (
            <Button
              backgroundColor="transparent"
              ml={2}
              onPress={() => navigation.navigate('Settings')}>
              <Icon name={'school-outline'} size={35} color={iconColor} />
            </Button>
          ),
          headerTitle: 'Známky',
        })}
        name="Marks">
        {props => <TabStackMarks {...props} />}
      </Stack.Screen>

      <Stack.Screen
        options={{
          title: 'Předmět',
        }}
        name="Subject">
        {props => <Subject {...props} />}
      </Stack.Screen>

      <Stack.Screen
        options={{
          title: 'Vysvědčení',
        }}
        name="AvarageMarks">
        {props => <AvarageMarks {...props} id={id} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
