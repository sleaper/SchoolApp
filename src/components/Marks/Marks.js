import React, {useContext, useState, PureComponent} from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import {getLastWeek, getLastMonth, getLastTwoMonths} from '../../utilz';

const getData = gql`
  query($date: [String]!, $key: String!) {
    Marks(date: $date, key: $key) {
      Marks
    }
  }
`;

export default function Marks({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const {colors} = useTheme();
  const {info} = useContext(MyContext);
  const [date, setDate] = useState(getLastWeek());
  const {loading, error, data, refetch} = useQuery(getData, {
    variables: {date: date, key: info.key},
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{marginLeft: 10}}>
          <Icon name={'cog-outline'} size={35} color={colors.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors.text]);

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
      <View style={[styles.item, {backgroundColor: colors.card}]}>
        <View style={{maxWidth: '80%'}}>
          <Text style={[styles.subject, {color: colors.text}]}>
            {item.Name}
          </Text>
          <Text style={[styles.time, {color: colors.text}]}>
            {item.Value.NAZEV}
          </Text>
          <Text style={[styles.time, {color: colors.text}]}>{item.Date}</Text>
        </View>
        <View style={styles.Mark}>
          <Text style={[styles.Mark, {color: colors.text}]}>
            {item.Mark ? item.Mark : '-'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={modal.centeredView}>
          <View style={[modal.modalView, {backgroundColor: colors.card}]}>
            <Text style={[modal.modalHeader, {color: colors.text}]}>
              Změnit období
            </Text>
            <TouchableOpacity
              style={modal.modalTime}
              onPress={() => {
                setDate(getLastWeek());
                refetch({variables: {date: date, key: info.key}});
                setModalVisible(!modalVisible);
              }}>
              <Text style={{color: colors.text, fontSize: 17}}>
                Poslední týden
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modal.modalTime}
              onPress={() => {
                setDate(getLastMonth());
                refetch({variables: {date: date, key: info.key}});
                setModalVisible(!modalVisible);
              }}>
              <Text style={{color: colors.text, fontSize: 17}}>
                Poslední měsíc
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={modal.modalTime}
              onPress={() => {
                setDate(getLastTwoMonths());
                refetch({
                  variables: {date: date, key: info.key},
                });
                setModalVisible(!modalVisible);
              }}>
              <Text style={{color: colors.text, fontSize: 17}}>Dva měsíce</Text>
            </TouchableOpacity> */}
            <View style={{alignSelf: 'flex-end', marginTop: 15}}>
              <TouchableOpacity
                style={[modal.button, modal.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={[modal.textStyle, {color: colors.text}]}>
                  Zavřít
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={data.Marks.Marks}
        renderItem={renderItem}
        initialNumToRender={7}
        keyExtractor={(item) => item.Id}
      />
    </View>
  );
}

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
});
