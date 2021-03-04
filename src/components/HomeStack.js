import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {MyContext} from '../AuthProvider';
import Home from './Home/Home';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsTabs from './Home/SettingsTabs';

const Stack = createStackNavigator();

export default function HomeStack({id, name}) {
  const {LogOut} = useContext(MyContext);
  const {colors} = useTheme();
  const [modal, setModal] = useState(false);

  return (
    <Stack.Navigator
      screenOptions={{headerStatusBarHeight: 0}}
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={({navigation, route}) => ({
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => LogOut()}>
                <Text style={{paddingRight: 8, color: colors.text}}>
                  LOGOUT
                </Text>
              </TouchableOpacity>
            );
          },
          headerTitle: () => {
            return (
              //<TouchableOpacity onPress={() => setModal(!modal)}>
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                {/* <Text style={{color: colors.text, fontSize: 23}}>{name}</Text> */}
                <Icon name="menu-outline" size={30} color="blue" />
              </TouchableOpacity>
            );
          },
        })}>
        {(props) => (
          <Home
            {...props}
            id={id}
            name={name}
            modal={modal}
            setModal={setModal}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Settings">
        {(props) => <SettingsTabs {...props} name={name} />}
      </Stack.Screen>
      {/* <Stack.Screen name="Themes">
        {(props) => <SettingsTabs {...props} name={name} />}
      </Stack.Screen> */}
    </Stack.Navigator>
  );
}
