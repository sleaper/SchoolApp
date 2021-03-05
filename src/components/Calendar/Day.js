import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import Center from '../Center';
import {ActivityIndicator} from 'react-native';
import {MyContext} from '../../AuthProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import DayItem from './DayItem';
import Arrows from './Arrows';
import HTMLView from 'react-native-htmlview';
import {ThemeContext} from '../theme/ThemeProvider';

const getData = gql`
  query($date: String!, $key: String!) {
    Calendar(date: $date, key: $key) {
      schedule
    }
  }
`;

const week = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// PROBLEM WITH PARAMETR TO FETCH RIGHT DAY
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export default function Day({navigation, route, id}) {
  const [{card, text, background}] = useContext(ThemeContext);
  const forceUpdate = useForceUpdate();
  const {date} = route.params;
  console.log(route.params);
  const {info} = useContext(MyContext);
  const {loading, error, data, refetch} = useQuery(getData, {
    variables: {date: date[0] + '-' + date[1] + '-' + date[2], key: info.key},
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState('');

  const leftArrow = () => {
    date[2] -= 1;
    if (date[2] >= 1) {
      refetch({
        variables: {
          date: date[0] + '-' + date[1] + '-' + date[2],
          key: info.key,
        },
      });
      forceUpdate();
    } else {
      date[1] -= 1;
      date[2] = week[date[1] - 1];
      if (date[1] === 0) {
        date[0] = date[0] - 1;
        date[1] = week.length;
        date[2] = week[week.length - 1];
      }
      refetch({
        variables: {
          date: date[0] + '-' + date[1] + '-' + date[2],
          key: info.key,
        },
      });
      forceUpdate();
    }
    console.log('left');
  };

  const rightArrow = () => {
    date[2] += 1;
    if (date[2] <= week[date[1] - 1]) {
      refetch({
        variables: {
          date: date[0] + '-' + date[1] + '-' + date[2],
          key: info.key,
        },
      });
      forceUpdate();
    } else {
      date[1] += 1;
      date[2] = 1;
      if (date[1] > 12) {
        date[0] += 1;
        date[1] = 1;
        date[2] = 1;
      }
      refetch({
        variables: {
          date: date[0] + '-' + date[1] + '-' + date[2],
          key: info.key,
        },
      });
      forceUpdate();
    }
  };

  /*React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{paddingRight: 10}}
          onPress={() => navigation.navigate('Month')}>
          <Icon name="calendar-outline" size={30} color={text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);*/

  if (loading) {
    return (
      <View style={[styles.container, {backgroundColor: background}]}>
        <View style={styles.arrows}>
          <TouchableOpacity
            onPress={() => {
              leftArrow();
            }}>
            <Icon name="arrow-back-outline" size={30} color="blue" />
          </TouchableOpacity>
          <Text style={[styles.dateText, {color: text}]}>
            {date[2] + '. ' + date[1] + '. ' + date[0]}
          </Text>
          <TouchableOpacity
            onPress={() => {
              rightArrow();
            }}>
            <Icon name="arrow-forward-outline" size={30} color="blue" />
          </TouchableOpacity>
        </View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else if (error) {
    console.error(error);
  }

  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <View style={styles.arrows}>
        <TouchableOpacity
          onPress={() => {
            leftArrow();
          }}>
          <Icon name="arrow-back-outline" size={30} color="blue" />
        </TouchableOpacity>
        <Text style={[styles.dateText, {color: text}]}>
          {date[2] + '. ' + date[1] + '. ' + date[0]}
        </Text>
        <TouchableOpacity
          onPress={() => {
            rightArrow();
          }}>
          <Icon name="arrow-forward-outline" size={30} color="blue" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor: card}]}>
            <Text style={[styles.subject, {color: text}]}>{modalTitle}</Text>
            <ScrollView>
              <HTMLView
                textComponentProps={{style: {color: text}}}
                //value={modalData === null ? '' : modalData.replace(/\s+/g, ' ')} // removes spaces between words
                value={modalData}
                addLineBreaks={false}
              />
            </ScrollView>

            <TouchableHighlight
              underlayColor="#2196F3"
              style={{
                ...styles.openButton,
                backgroundColor: background,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={[styles.textStyle, {color: text}]}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <FlatList
        data={data.Calendar.schedule}
        renderItem={({item}) => (
          <DayItem
            item={item}
            setModalVisible={setModalVisible}
            setModalTitle={setModalTitle}
            setModalData={setModalData}
          />
        )}
        keyExtractor={(item) => item.Id + item.Order}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    //backgroundColor: '#F0F0F0',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 50,
  },
  modalView: {
    width: '90%',
    height: 250,
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFF',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
