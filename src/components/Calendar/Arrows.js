import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Arrows(leftArr, rightArr, date, {colors}) {
  console.log(leftArr, rightArr, date, colors);
  return (
    <View style={styles.arrows}>
      <TouchableOpacity
        onPress={() => {
          leftArr();
        }}>
        <Icon name="arrow-back-outline" size={30} color="blue" />
      </TouchableOpacity>
      <Text style={[styles.dateText, {color: colors.text}]}>
        {date[2] + '. ' + date[1] + '. ' + date[0]}
      </Text>
      <TouchableOpacity
        onPress={() => {
          rightArr();
        }}>
        <Icon name="arrow-forward-outline" size={30} color="blue" />
      </TouchableOpacity>
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
    alignItems: 'center',
  },
  number: {
    fontSize: 25,
    paddingTop: 8,
  },
  subject: {
    paddingTop: 5,
    paddingLeft: 25,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
