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
import {ThemeContext} from '../theme/ThemeProvider';

const getSubjects = gql`
  query($id: String!, $key: String!) {
    AvarageMarks(id: $id, key: $key) {
      AvarageMarks
    }
  }
`;

export default function TabsMarksSubject({id, navigation, upperNavig}) {
  const [{card, text, background}] = useContext(ThemeContext);
  const {info} = useContext(MyContext);

  const {loading, error, data} = useQuery(getSubjects, {
    variables: {id: id, key: info.key},
  });

  //<Icon name={'cog-outline'} size={35} color={text} />

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#0000ff" />
      </Center>
    );
  } else if (error) {
    console.error(error);
  }

  const renderItemSubject = ({item}) => {
    return (
      <TouchableOpacity
        style={[subjects.item]}
        onPress={() => {
          upperNavig.navigate('Subject', {
            name: item.Subject,
          });
        }}>
        <View>
          <Text style={[subjects.subject, {color: text}]}>{item.Subject}</Text>
          <Text style={[subjects.teacher, {color: text}]}>{item.Teacher}</Text>
        </View>
        <View style={subjects.Mark}>
          <Text style={[styles.Mark, {color: text}]}>{item.Marks}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <FlatList
        data={data.AvarageMarks.AvarageMarks}
        renderItem={renderItemSubject}
        initialNumToRender={7}
        keyExtractor={(item) => item.Id}
        ItemSeparatorComponent={() => {
          return <View style={{height: 5, backgroundColor: card}} />;
        }}
      />
    </View>
  );
}

const subjects = StyleSheet.create({
  item: {
    height: 80,
    width: '90%',
    marginLeft: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subject: {
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  teacher: {
    marginTop: 2.5,
    paddingLeft: 10,
    fontSize: 13,
  },
  Mark: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    //backgroundColor: '#F0F0F0',
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
