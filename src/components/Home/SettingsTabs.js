import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SettingsTabs({name, navigation}) {
  const {colors} = useTheme();
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
      }}>
      <View style={{marginTop: 10, alignItems: 'center', marginBottom: 40}}>
        <Icon name="person-circle-outline" size={70} color={colors.text} />
        <Text style={{fontSize: 25, color: colors.text}}>{name}</Text>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.card,
          width: '60%',
        }}
        onPress={() => navigation.navigate('Themes')}>
        <Icon name="color-palette-outline" size={40} color={colors.text} />
        <Text style={{fontSize: 20, marginLeft: 5, color: colors.text}}>
          barvy
        </Text>
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: colors.text,
          height: 2,
          width: '90%',
          borderRadius: 10,
          marginTop: 40,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60%',
        }}>
        <Icon name="add-outline" size={40} color={colors.text} />
        <Text style={{fontSize: 20, marginLeft: 5, color: colors.text}}>
          Přidat uživatele
        </Text>
      </TouchableOpacity>
    </View>
  );
}
