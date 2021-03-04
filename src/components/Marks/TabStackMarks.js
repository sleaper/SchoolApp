import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import TabsMarks from './TabsMarks';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
import TabsMarksSubject from './TabsMarksSubject';
import {useState} from 'react';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.6)),
        });

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={[{flex: 1, alignItems: 'center', paddingTop: 5}]}>
            <Animated.Text
              style={[
                {opacity},
                isFocused
                  ? {borderBottomWidth: 2, borderBottomColor: 'red'}
                  : null,
              ]}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabStackMarks({id, navigation: upperNavig}) {
  return (
    <Tab.Navigator
      timingConfig={{duration: 1}}
      tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="Podle data">
        {(props) => <TabsMarks {...props} id={id} upperNavig={upperNavig} />}
      </Tab.Screen>
      <Tab.Screen name="Podle předmětů">
        {(props) => (
          <TabsMarksSubject {...props} id={id} upperNavig={upperNavig} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
