/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function DayItem({item}) {
  const {colors} = useTheme();
  return (
    <View style={[styles.rowContainer, {backgroundColor: colors.card}]}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text style={[styles.number, {color: colors.text}]}>
            {item.Order}
          </Text>
        </View>
        <View style={styles.subject}>
          <Text style={[{color: colors.text, fontSize: 20}]}>{item.Name}</Text>
          <Text style={[{color: colors.notification}]}>{item.Teacher}</Text>
        </View>
      </View>
      <View style={{justifyContent: 'space-around', alignItems: 'flex-end'}}>
        <Text style={[{color: colors.text, paddingRight: 15}]}>
          {item.From}
        </Text>
        <Text style={[{color: colors.text, paddingRight: 15}]}>
          {item.Class}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#FFFFFF',
  },
  rowContainer: {
    backgroundColor: '#F0F0F0',
    height: 100,
    width: '90%',
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 20,
    paddingLeft: 15,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teacher: {
    marginTop: 2.5,
    fontSize: 14,
    color: '#777',
  },
  rowText: {
    flex: 6,
    paddingTop: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  time: {
    flex: 1,
    textAlign: 'center',
  },
  title: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  arrows: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  number: {
    fontSize: 20,
    paddingTop: 8,
  },
  subject: {
    paddingTop: 5,
    paddingLeft: 25,
  },
});
