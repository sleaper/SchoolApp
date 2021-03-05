import React, {useContext, useState} from 'react';
import {Text, View, FlatList, StyleSheet, Modal} from 'react-native';
import {MyContext} from '../../AuthProvider';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator} from 'react-native';
import Center from '../Center';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from 'react-native-reanimated';
import {ThemeContext} from '../theme/ThemeProvider';

const getMarksBuSubject = gql`
  query($subject: String!, $key: String!) {
    SubjectMarks(subject: $subject, key: $key) {
      SubjectMarks
    }
  }
`;

export default function Subject({route, navigation}) {
  const [{card, text, background}] = useContext(ThemeContext);
  const {info} = useContext(MyContext);
  const {name} = route.params;
  const {loading, error, data} = useQuery(getMarksBuSubject, {
    variables: {subject: name, key: info.key},
  });

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#0000ff" />
      </Center>
    );
  } else if (error) {
    console.error(error);
  }

  const renderItem = ({item}) => {
    return (
      <View style={[styles.item, {backgroundColor: card}]}>
        <View style={{maxWidth: '80%'}}>
          <Text style={[styles.subject, {color: text}]}>{item.Name}</Text>
          <Text style={[styles.time, {color: text}]}>{item.Value.NAZEV}</Text>
          <Text style={[styles.time, {color: text}]}>{item.Date}</Text>
        </View>
        <View style={styles.Mark}>
          <Text style={[styles.Mark, {color: text}]}>
            {item.Mark ? item.Mark : '-'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: background}}>
      <View style={[styles.header, {backgroundColor: card}]}>
        <Text style={[styles.headerText, {color: text}]}>{name}:</Text>
      </View>
      <FlatList
        data={data.SubjectMarks.SubjectMarks}
        keyExtractor={(item) => item.Id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  header: {
    height: 80,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    marginBottom: 15,
    justifyContent: 'center',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    shadowColor: 'rgb(0, 0, 0)',
  },
  headerText: {
    fontSize: 25,
    fontWeight: '600',
    paddingLeft: 25,
  },
  item: {
    height: 100,
    width: '90%',
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
  rowText: {
    paddingTop: 5,
  },
  Mark: {
    paddingTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 18,
  },
  subject: {
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  time: {
    marginTop: 2.5,
    paddingLeft: 10,
    fontSize: 14,
  },
  text: {
    fontSize: 18,
  },
});
