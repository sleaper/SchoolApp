import React, {useContext, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import Center from '../Center';
import {ActivityIndicator} from 'react-native';
import {MyContext} from '../../AuthProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import DayItem from './DayItem';

const getData = gql`
  query($date: String!, $key: String!) {
    Calendar(date: $date, key: $key) {
      schedule
    }
  }
`;
// PROBLEM WITH PARAMETR TO FETCH RIGHT DAY
export default function Day({navigation, route, id}) {
  const {colors} = useTheme();
  const {date} = route.params;
  const {info} = useContext(MyContext);
  const {loading, error, data, refetch} = useQuery(getData, {
    variables: {date: date, key: info.key},
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate('Month')} title="Cal" />
      ),
    });
  }, [navigation]);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#0000ff" />
      </Center>
    );
  } else if (error) {
    console.error(error);
  }

  return (
    <View style={[styles.container, colors.background]}>
      <View style={styles.arrows}>
        <TouchableOpacity onPress={() => console.log('left')}>
          <Icon name="arrow-back-outline" size={30} color="blue" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('right')}>
          <Icon name="arrow-forward-outline" size={30} color="blue" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data.Calendar.schedule}
        renderItem={({item}) => <DayItem item={item} />}
        keyExtractor={(item) => item.Id + item.Order}
      />
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
    fontSize: 25,
    paddingTop: 8,
  },
  subject: {
    paddingTop: 5,
    paddingLeft: 25,
  },
});
