import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {MyContext} from '../../AuthProvider';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator} from 'react-native';
import Center from '../Center';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const getMarksBuSubject = gql`
  query($id: String!, $key: String!) {
    GetSubjects(id: $id, key: $key) {
      Subjects
    }
  }
`;

export default function Subject({route, navigation}) {
  const {colors} = useTheme();
  const {info} = useContext(MyContext);
  const {name} = route.params;

  return (
    <View>
      <View
        style={{
          backgroundColor: colors.card,
          height: 125,
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 25, fontWeight: '600', paddingLeft: 15}}>
          {name}
        </Text>
      </View>
      <FlatList />
    </View>
  );
}
