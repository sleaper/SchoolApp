import React, {useContext} from 'react';
import {Text, View, FlatList, StyleSheet, Button} from 'react-native';
import {MyContext} from '../../AuthProvider';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator} from 'react-native';
import Center from '../Center';
import {useTheme} from '@react-navigation/native';

const getData = gql`
  query($key: String!) {
    Marks(key: $key) {
      Marks
    }
  }
`;

export default function Marks({navigation, route}) {
  const {colors} = useTheme();
  const {info} = useContext(MyContext);
  const {loading, error, data} = useQuery(getData, {
    variables: {key: info.key},
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('AvarageMarks')}
          title="Průměry"
        />
      ),
    });
  }, [navigation]);

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
            {item.Name}
          </Text>
          <Text style={[styles.time, {color: colors.text}]}>
            {item.Value.NAZEV}
          </Text>
          <Text style={[styles.time, {color: colors.text}]}>{item.Date}</Text>
        </View>
        <View style={styles.Mark}>
          <Text style={[styles.Mark, {color: colors.text}]}>{item.Mark}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data.Marks.Marks}
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
});
