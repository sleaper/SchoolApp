import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {MyContext} from '../../providers/AuthProvider';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator} from 'react-native';
import Center from '../Center';
import {useTheme, useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getLastWeek, getLastMonth, getLastTwoMonths} from '../../util/utilz';
import {ThemeContext} from '../theme/ThemeProvider';

const getMarksbyDate = gql`
  query($date: [String]!, $key: String!) {
    Marks(date: $date, key: $key) {
      MarksByDate
    }
  }
`;

export default function Marks({id, navigation, upperNavig}) {
  const [{card, text, background}] = useContext(ThemeContext);
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const {info} = useContext(MyContext);
  const [date, setDate] = useState(getLastWeek());
  const {loading, error, data, refetch} = useQuery(getMarksbyDate, {
    variables: {date: date, key: info.key},
  });

  React.useLayoutEffect(() => {
    if (isFocused) {
      upperNavig.setOptions({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{marginLeft: 10}}>
            <Icon name={'cog-outline'} size={35} color={text} />
          </TouchableOpacity>
        ),
      });
    } else {
      upperNavig.setOptions({
        headerLeft: () => null,
      });
    }
  }, [upperNavig, text, isFocused]);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#0000ff" />
      </Center>
    );
  } else if (error) {
    console.error(error);
  }

  const renderItemMark = ({item}) => {
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
    <View style={[styles.container, {backgroundColor: background}]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={modal.centeredView}>
          <View style={[modal.modalView, {backgroundColor: card}]}>
            <Text style={[modal.modalHeader, {color: text}]}>
              Změnit období
            </Text>
            <TouchableOpacity
              style={modal.modalTime}
              onPress={() => {
                setDate(getLastWeek());
                refetch({variables: {date: date, key: info.key}});
                setModalVisible(!modalVisible);
              }}>
              <Text style={{color: text, fontSize: 17}}>Poslední týden</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modal.modalTime}
              onPress={() => {
                setDate(getLastMonth());
                refetch({variables: {date: date, key: info.key}});
                setModalVisible(!modalVisible);
              }}>
              <Text style={{color: text, fontSize: 17}}>Poslední měsíc</Text>
            </TouchableOpacity>
            <View style={{alignSelf: 'flex-end', marginTop: 15}}>
              <TouchableOpacity
                style={[modal.button, modal.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={[modal.textStyle, {color: text}]}>Zavřít</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={data.Marks.MarksByDate}
        renderItem={renderItemMark}
        initialNumToRender={7}
        keyExtractor={item => item.Id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#F0F0F0',
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

const modal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    alignItems: 'flex-start',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#FFFF',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
  modalHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTime: {
    margin: 5,
  },
});
