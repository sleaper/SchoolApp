import React, {useContext} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {MyContext} from '../../AuthProvider';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator} from 'react-native';
import Center from '../Center';

const getData = gql`
  query($id: String!, $key: String!) {
    AvarageMarks(id: $id, key: $key) {
      AvarageMarks
    }
  }
`;

export default function AvarageMarks({id}) {
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
      <View style={styles.item}>
        <View>
          <Text style={styles.subject}>{item.Subject}</Text>
          <Text style={styles.teacher}>{item.Teacher}</Text>
        </View>
        <View style={styles.Mark}>
          <Text style={styles.Mark}>{item.Marks}</Text>
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
    backgroundColor: '#FFFFFF',
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
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  teacher: {
    marginTop: 2.5,
    paddingLeft: 10,
    fontSize: 14,
  },
});
