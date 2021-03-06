import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity, View, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../theme/ThemeProvider';
import {themes} from '../theme/Themes';

export default function SettingsTabs({name, navigation}) {
  const {colors} = useTheme();
  const [{text, card, background}, setTheme] = useContext(ThemeContext);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{alignItems: 'center', paddingBottom: 5}}
        onPress={() => {
          setTheme(item.name);
        }}>
        <Text style={{color: text, fontSize: 20}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: background,
      }}>
      <View style={{marginTop: 10, alignItems: 'center', marginBottom: 2}}>
        <Icon name="person-circle-outline" size={70} color={text} />
        <Text style={{fontSize: 25, color: text}}>{name}</Text>
      </View>

      {/* <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60%',
        }}>
        <Icon name="add-outline" size={40} color={text} />
        <Text style={{fontSize: 20, marginLeft: 5, color: text}}>
          Přidat uživatele
        </Text>
      </TouchableOpacity> */}

      <View
        style={{
          backgroundColor: text,
          height: 2,
          width: '90%',
          borderRadius: 10,
          marginTop: 20,
          marginBottom: 20,
        }}
      />

      <FlatList
        data={themes}
        keyExtractor={({name}) => name}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
      />
    </View>
  );
}
