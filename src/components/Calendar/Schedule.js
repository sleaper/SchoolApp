/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import Center from '../Center';
import {Text, View, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator} from 'react-native';
import {MyContext} from '../../AuthProvider';
import AddButton from '../Calendar/AddButton';

const getData = gql`
  query($id: String!, $key: String!) {
    Calendar(id: $id, key: $key) {
      schedule
    }
  }
`;

export default function Schedule({id, navigation}) {
  const {info} = useContext(MyContext);
  const {loading, error, data} = useQuery(getData, {
    variables: {id: id, key: info.key},
  });

  return (
    <View style={styles.container}>
      <Calendar
        enableSwipeMonths={true}
        onDayPress={(day) => {
          navigation.navigate('Day', {date: day.dateString});
        }}
      />
      <AddButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    height: 300,
  },
  day: {},
});
