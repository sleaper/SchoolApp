import React, {useContext} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {MyContext} from '../../AuthProvider';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator} from 'react-native';
import Center from '../Center';
import {useTheme} from '@react-navigation/native';

const getData = gql`
  query($id: String!, $key: String!) {
    AvarageMarks(id: $id, key: $key) {
      AvarageMarks
    }
  }
`;

export default function AvarageMarks({id}) {
  const {colors} = useTheme();
  const {info} = useContext(MyContext);
  const {loading, error, data} = useQuery(getData, {
    variables: {id: id, key: info.key},
  });

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#0000ff" />
      </Center>
    );
  }

  const renderItem = ({item}) => {
    return (
      <View style={[styles.item, {backgroundColor: colors.card}]}>
        <View>
          <Text style={[styles.subject, {color: colors.text}]}>
            {item.Subject}
          </Text>
          <Text style={[styles.teacher, {color: colors.text}]}>
            {item.Teacher}
          </Text>
        </View>
        <View style={styles.Mark}>
          <Text style={[styles.Mark, {color: colors.text}]}>{item.Marks}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data.AvarageMarks.AvarageMarks}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#FFFFFF',
  },
  item: {
    backgroundColor: '#F0F0F0',
    height: 100,
    width: '90%',
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: {
    paddingTop: 5,
  },

  Mark: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  subject: {
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  teacher: {
    marginTop: 2.5,
    paddingLeft: 10,
    fontSize: 14,
  },
});
