import React, {useState, useContext, useEffect} from 'react';
import {MyContext} from '../../AuthProvider';
import {
  Text,
  FlatList,
  Button,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  ScrollView,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {editTime} from '../../utilz';
import {useTheme} from '@react-navigation/native';
import {color} from 'react-native-reanimated';

export default function Homeworks({data}) {
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState('');

  //Add room
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.rowContainer, {backgroundColor: colors.card}]}
        onPress={() => {
          setModalTitle(item.Name);
          setModalData(item.Info);
          setModalVisible(true);
        }}>
        <Text style={[styles.subject, {color: colors.text}]}>{item.Name}</Text>
        <Text style={[styles.time, {color: colors.text}]}>
          {editTime(item.TimeTo)}
        </Text>
      </TouchableOpacity>
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
                value={modalData}
                addLineBreaks={false}
              />
            </ScrollView>

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: colors.background}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <FlatList
        data={data}
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
    //backgroundColor: '#FFFFFF',
  },
  title: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  rowContainer: {
    //backgroundColor: '#F0F0F0',
    height: 80,
    width: '90%',
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 20,
    paddingTop: 15,
    paddingLeft: 20,
    alignItems: 'flex-start',
  },
  subject: {
    fontSize: 17,
    fontWeight: 'bold',
    //color: '#3d3c3c',
  },
  time: {
    textAlign: 'center',
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
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
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
  },
  openButton: {
    //backgroundColor: '#F194FF',
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
});
