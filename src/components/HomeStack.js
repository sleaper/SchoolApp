import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {MyContext} from '../AuthProvider';
import Home from './Home/Home';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsTabs from './Home/SettingsTabs';
import ChangeTheme from './Home/ChangeTheme';
import {ThemeContext} from './theme/ThemeProvider';
import {useHeaderOptions} from '../hooks/useHeaderOptions';

const Stack = createStackNavigator();

export default function HomeStack({id, name, token}) {
  const {LogOut} = useContext(MyContext);
  const [modal, setModal] = useState(false);
  const [{background, text, primary, card}] = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={
        (useHeaderOptions(),
        {
          cardStyle: {backgroundColor: background},
          headerStyle: {backgroundColor: card},
          headerTintColor: text,
        })
      }
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={({navigation, route}) => ({
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => LogOut()}>
                <Text style={{paddingRight: 8, color: text}}>LOGOUT</Text>
              </TouchableOpacity>
            );
          },
          headerLeft: () => {
            return (
              //<TouchableOpacity onPress={() => setModal(!modal)}>
              <TouchableOpacity
                style={{marginLeft: 20}}
                onPress={() => navigation.navigate('Settings')}>
                {/* <Text style={{color: colors.text, fontSize: 23}}>{name}</Text> */}
                <Icon name="menu-outline" size={30} color={primary} />
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
            token={token}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Settings">
        {(props) => <SettingsTabs {...props} name={name} />}
      </Stack.Screen>
      <Stack.Screen name="Themes">
        {(props) => <ChangeTheme {...props} name={name} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
