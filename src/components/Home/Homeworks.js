/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Modal,
  Animated,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {editTime} from '../../utilz';
import Swipable from 'react-native-gesture-handler/Swipeable';
import {gql, useMutation} from '@apollo/client';
import {ThemeContext} from '../theme/ThemeProvider';
import {GetTokenProvider} from '../../TokenProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import {MyContext} from '../../AuthProvider';

const getData = gql`
  query($id: String!, $key: String!, $token: String!) {
    Home(id: $id, key: $key, token: $token) {
      homeworks
    }
  }
`;

const UPDATE_DATA = gql`
  mutation($data: String!, $token: String!, $key: String!) {
    UpdateHomeworks(data: $data, token: $token, key: $key) {
      Data
    }
  }
`;

export default function Homeworks({data}) {
  const [updateData] = useMutation(UPDATE_DATA, {
    ignoreResults: true,
  });
  const {token} = useContext(GetTokenProvider);
  const [{card, text, background, notification}] = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState('');
  const [items, setItems] = useState(data);
  const [swiped, setSwiped] = useState(false);
  const [showDeleted, setShowDeleted] = useState(true); // True for items to remove, False for items to add
  const {info} = useContext(MyContext);

  // Rename showed
  useEffect(() => {
    async function update() {
      updateData({
        variables: {data: JSON.stringify(items), token: token, key: info.key},
      });
      setSwiped(false);
    }
    if (swiped) {
      //Performance check for updating user JUST swiped
      update();
    }
  });

  //[items, swiped, updateData, token, info]
  const LeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <View
        style={[
          styles.leftAction,
          showDeleted
            ? {backgroundColor: '#dd2c00'}
            : {backgroundColor: 'green'},
        ]}>
        <Animated.Text
          style={[styles.actionText, {color: text, transform: [{scale}]}]}>
          {showDeleted ? 'Remove' : 'Add'}
        </Animated.Text>
      </View>
    );
  };

  const deleteItembyId = id => {
    setItems(() =>
      items.map(el => (el.id === id ? {...el, Active: false} : el)),
    );
    setSwiped(true);
  };

  const unDeleteItembyId = id => {
    setItems(() =>
      items.map(el => (el.id === id ? {...el, Active: true} : el)),
    );
    setSwiped(true);
  };

  const renderItem = ({item}) => {
    if (item.Active === showDeleted) {
      return (
        <Swipable
          renderLeftActions={LeftActions}
          onSwipeableLeftOpen={
            showDeleted
              ? () => deleteItembyId(item.id)
              : () => unDeleteItembyId(item.id)
          }>
          <TouchableOpacity
            style={[
              styles.rowContainer,
              {
                backgroundColor: card,
              },
            ]}
            onPress={() => {
              setModalTitle(item.Name);
              setModalData(item.Info);
              setModalVisible(!modalVisible);
            }}>
            <View style={[styles.itemStripe, {backgroundColor: item.Color}]} />
            <View style={{paddingBottom: 10, paddingLeft: 15, paddingTop: 15}}>
              <Text style={[styles.subject, {color: text}]}>{item.Name}</Text>
              <Text style={{color: text}}>{editTime(item.TimeTo)}</Text>
            </View>
          </TouchableOpacity>
        </Swipable>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.title, {color: notification}]}>Domácí úkoly</Text>
        <TouchableOpacity
          onPress={() => setShowDeleted(!showDeleted)}
          style={{marginRight: 20}}>
          <Icon
            name={'trash-bin-outline'}
            size={30}
            color={showDeleted ? 'grey' : 'red'}
          />
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
                value={modalData === null ? '' : modalData.replace(/\s+/g, ' ')} // removes spaces between words
                addLineBreaks={false}
              />
            </ScrollView>
            <View style={{alignSelf: 'flex-end'}}>
              <TouchableHighlight
                underlayColor="#2196F3"
                style={{
                  ...styles.openButton,
                  backgroundColor: background,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={[styles.textStyle, {color: text}]}>
                  Hide Modal
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => {
          return item.id;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
  },
  title: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  rowContainer: {
    width: '90%',
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 20,
    paddingLeft: 15,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  subject: {
    fontSize: 16,
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
  removeButton: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  leftAction: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    width: '90%',
    marginLeft: 20,
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },
  actionText: {
    fontWeight: '600',
    fontSize: 18,
    padding: 15,
  },
  itemStripe: {
    width: 13,
    height: '100%',
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
