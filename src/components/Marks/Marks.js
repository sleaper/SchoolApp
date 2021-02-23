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
import Icon from 'react-native-vector-icons/Ionicons';
import {getLastWeek, getLastMonth, getLastTwoMonths} from '../../utilz';

const getMarksbyDate = gql`
  query($date: [String]!, $key: String!) {
    Marks(date: $date, key: $key) {
      MarksByDate
    }
  }
`;

const getSubjects = gql`
  query($id: String!, $key: String!) {
    GetSubjects(id: $id, key: $key) {
      Subjects
    }
  }
`;

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export default function Marks({id, navigation}) {
  const forceUpdate = useForceUpdate();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(true);
  const [bySubjects, setBySubjects] = useState(false);

  const {colors} = useTheme();
  const {info} = useContext(MyContext);
  const [date, setDate] = useState(getLastWeek());
  const {
    loading: marksByDateLoading,
    error: marksByDateError,
    data: marksByDate,
    refetch: marksByDateRefetch,
  } = useQuery(getMarksbyDate, {
    variables: {date: date, key: info.key},
    onCompleted: (test) => {
      setData(test.Marks.MarksByDate);
    },
  });

  const {
    loading: subjectsLoading,
    error: subjectsError,
    data: subjectsData,
  } = useQuery(getSubjects, {variables: {id: id, key: info.key}});

  React.useLayoutEffect(() => {
    if (selected) {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{marginLeft: 10}}>
            <Icon name={'cog-outline'} size={35} color={colors.text} />
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({
        headerLeft: null,
      });
    }
  }, [navigation, colors.text, selected]);

  if (marksByDateLoading && subjectsLoading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#0000ff" />
      </Center>
    );
  } else if (marksByDateError || subjectsError) {
    console.error(marksByDateError);
  }

  const renderItemMark = ({item}) => {
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

  const renderItemSubject = ({item}) => {
    return (
      <TouchableOpacity style={[subjects.item, {backgroundColor: colors.card}]}>
        <View style={{maxWidth: '80%'}}>
          <Text style={[subjects.subject, {color: colors.text}]}>
            {item.Subject}
          </Text>
          <Text style={[subjects.time, {color: colors.text}]}>
            {item.Teacher}
          </Text>
        </View>
      </TouchableOpacity>
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
                marksByDateRefetch({variables: {date: date, key: info.key}});
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
                marksByDateRefetch({variables: {date: date, key: info.key}});
                setModalVisible(!modalVisible);
              }}>
              <Text style={{color: colors.text, fontSize: 17}}>
                Poslední měsíc
              </Text>
            </TouchableOpacity>
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginTop: 10,
        }}>
        <TouchableOpacity
          style={{marginRight: 10, marginLeft: 10}}
          onPress={() => {
            setSelected(true);
            setData(marksByDate.Marks.MarksByDate);
          }}>
          <Text
            style={[
              selected
                ? {borderBottomColor: colors.text, borderBottomWidth: 2}
                : null,
              {color: colors.text},
              styles.text,
            ]}>
            Podle data
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected(false);
            setBySubjects(true);
            setData(subjectsData.GetSubjects.Subjects);
          }}>
          <Text
            style={[
              !selected
                ? {borderBottomColor: colors.text, borderBottomWidth: 2}
                : null,
              {color: colors.text},
              styles.text,
            ]}>
            Podle předmětů
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={selected ? renderItemMark : renderItemSubject}
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
  text: {
    fontSize: 18,
  },
});

const subjects = StyleSheet.create({
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
    // shadowOffset: {
    //   width: 3,
    //   height: 3,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    // elevation: 3,
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
