/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import TabsMarks from './TabsMarks';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
import {Pressable, useColorModeValue, View} from 'native-base';
import TabsSubjectAvarege from './TabsSubjectAvarege';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, descriptors, navigation, position}) {
  const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('black', 'white');
  return (
    <View flexDirection="row" backgroundColor={bgColor}>
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
          outputRange: inputRange.map(i => (i === index ? 1 : 0.6)),
        });

        return (
          <Pressable
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            flex={1}
            alignItems={'center'}
            pt="5"
            pb="1">
            <Animated.Text
              style={[
                {opacity},
                isFocused
                  ? {borderBottomWidth: 2, borderBottomColor: 'red'}
                  : null,

                {color: textColor},
              ]}>
              {label}
            </Animated.Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabStackMarks({navigation: upperNavig}) {
  return (
    <Tab.Navigator
      //tabBarOptions={useHeaderOptions()}
      //sceneContainerStyle={{backgroundColor: background}}
      timingConfig={{duration: 1}}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Podle data">
        {props => <TabsMarks {...props} upperNavig={upperNavig} />}
      </Tab.Screen>
      <Tab.Screen name="Podle předmětů">
        {props => <TabsSubjectAvarege {...props} upperNavig={upperNavig} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
