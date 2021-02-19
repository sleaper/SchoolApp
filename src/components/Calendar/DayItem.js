/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../theme/ThemeProvider';
import {TouchableOpacity} from 'react-native-gesture-handler';

function Event({item}) {
  const eventStyle = {
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: `rgb(${item.Events.Color})`,
    borderRadius: 20,
    paddingLeft: 6,
    paddingRight: 5,
  };

  return (
    <View style={eventStyle}>
      <Icon name={'book'} size={15} color={'black'} />
      <Text style={{paddingLeft: 3}}>{item.Events.Event}</Text>
    </View>
  );
}

export default function DayItem({
  item,
  setModalVisible,
  setModalTitle,
  setModalData,
}) {
  const [active, setActive] = useState(item.Notes ? true : false);
  const {colors} = useTheme();

  return (
    // <View style={[styles.rowContainer, {backgroundColor: colors.card}]}>
    <TouchableOpacity
      disabled={!active}
      onPress={() => {
        setModalVisible(true);
        setModalTitle('Poznámka');
        setModalData(item.Notes.Note);
      }}
      style={[styles.rowContainer, {backgroundColor: colors.card}]}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text style={[styles.number, {color: colors.text}]}>
            {item.Order}
          </Text>
        </View>
        <View style={styles.subject}>
          <Text style={[{color: colors.text}, styles.subjectText]}>
            {item.Name}
          </Text>
          <Text style={[{color: colors.notification}]}>{item.Teacher}</Text>
          {item.Events && <Event item={item} />}
          {active && (
            <Icon name={'information-circle'} size={20} color={'#2A64FF'} />
          )}
        </View>
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
        }}>
        <Text style={[{color: colors.text, paddingRight: 15}]}>
          {item.From}
        </Text>
        <Text style={[{color: colors.text, paddingRight: 15}]}>
          {item.Class}
        </Text>
      </View>
    </TouchableOpacity>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#FFFFFF',
  },
  rowContainer: {
    backgroundColor: '#F0F0F0',
    width: '90%',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 20,
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
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
    paddingLeft: 13,
  },
  subjectText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
