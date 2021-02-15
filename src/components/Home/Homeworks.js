/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {editTime} from '../../utilz';
import {useTheme} from '@react-navigation/native';
import Swipable from 'react-native-gesture-handler/Swipeable';
import {gql, useApolloClient} from '@apollo/client';
import {MyContext} from '../../AuthProvider';

const query = gql`
  query($id: String!, $key: String!) {
    Home(id: $id, key: $key) {
      homeworks
    }
  }
`;

export default function Homeworks({data}) {
  const client = useApolloClient();
  const {info} = useContext(MyContext);
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState('');
  const [items, setItems] = useState(data);

  /*const LeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.leftAction}>
        <Animated.Text
          style={[
            styles.actionText,
            {color: colors.text, transform: [{scale}]},
          ]}>
          Removed
        </Animated.Text>
      </View>
    );
  };

  const deleteItembyId = (id) => {
    const filteredData = items.filter((item) => item.id !== id);
    setItems(filteredData);
    //client.writeQuery({query, data: {homeworks: filteredData}});
  };*/

  const renderItem = ({item}) => {
    return (
      // <Swipable
      //   renderLeftActions={LeftActions}
      //   onSwipeableLeftOpen={() => deleteItembyId(item.id)}>
      <TouchableOpacity
        style={[styles.rowContainer, {backgroundColor: colors.card}]}
        onPress={() => {
          setModalTitle(item.Name);
          setModalData(item.Info);
          setModalVisible(true);
        }}>
        <View style={[styles.itemStripe, {backgroundColor: item.Color}]} />
        <View style={{paddingBottom: 10, paddingLeft: 15, paddingTop: 15}}>
          <Text style={[styles.subject, {color: colors.text}]}>
            {item.Name}
          </Text>
          <Text style={{color: colors.text}}>{editTime(item.TimeTo)}</Text>
        </View>
      </TouchableOpacity>
      // </Swipable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: colors.notification}]}>
        Domácí úkoly
      </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor: colors.card}]}>
            <Text style={[styles.subject, {color: colors.text}]}>
              {modalTitle}
            </Text>
            <ScrollView>
              <HTMLView
                textComponentProps={{style: {color: colors.text}}}
                value={modalData === null ? '' : modalData.replace(/\s+/g, ' ')} // removes spaces between words
                addLineBreaks={false}
              />
            </ScrollView>
            <View style={{alignSelf: 'flex-end'}}>
              <TouchableHighlight
                underlayColor="#2196F3"
                style={{
                  ...styles.openButton,
                  backgroundColor: colors.background,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={[styles.textStyle, {color: colors.text}]}>
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
        keyExtractor={(item) => {
          return item.id;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    /*position: 'absolute',
    right: 2,
    bottom: 2,*/
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
    fontSize: 15,
    padding: 15,
  },
  itemStripe: {
    width: 5,
    height: '100%',
  },
});
