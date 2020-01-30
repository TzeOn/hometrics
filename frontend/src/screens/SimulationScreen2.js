import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, AppRegistry, Button, Alert, SafeAreaView  } from 'react-native';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { FlatGrid } from 'react-native-super-grid';
const data = [
  { key: 'Room 1' }, { key: 'Room 2' }, { key: 'Room 3' }, { key: 'Room 4' }, { key: 'Room 5' }, { key: 'Room 6' }, { key: 'Room 7' }, { key: 'Room 8' }, { key: 'Room 9' } ];
const numColumns = 3;



export default class Simulation extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        isModalVisible: false,
        roomText: ""
      };
    }
setModalVisible = (bool) => {
    this.setState({isModalVisible: bool})
}
setModalText = (text) => {
    this.setState({roomText: text})
}
  renderItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={() => this.setModalVisible(true)} style={styles.item} > 
        <Text style={styles.itemText}>{item.key}</Text>
      </TouchableOpacity>
    );
  };

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={data}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
    

      <Modal
          isVisible={this.state.isModalVisible}
          onRequestClose={() => this.setModalVisible(false)}
          transparent={false}
          backdropColor={'gray'}
          backdropOpacity={1}
          animationIn={'zoomIn'}
          animationOut={'zoomOut'}
          animationInTiming={750}
          animationOutTiming={750}
          backdropTransitionInTiming={750}
          backdropTransitionOutTiming={750}
        >
        <View style={styles.modalContent}>
            
        <Text>Devices:</Text>
        <Text>Lights: On</Text>
        <Text>AC: On</Text>
        <Text>IOT: Onf</Text>

        {this._renderButton('Close', () => this.setModalVisible(false))}
        </View>
        </Modal>

        <FlatGrid
        itemDimension={130}
        items={[
            {name: 'Temperature', value: '31c'} ,{name: 'Air Quality', value: '227ppm'} ,{name: 'Humidity', value: '14%'},{name:'Usage', value: '14kwh'}
        ]}
        style={styles.gridView}
        renderItem={({ item, index }) => (
        <View style={[styles.itemContainer, { backgroundColor: '#FF9800' }]}> 
         <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemValue}>{item.value}</Text>
        </View>
        )}
        
/>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    margin: 5,
        
  },
  itemName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  itemValue: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  gridView: {
    flex: 4,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    height: 125,
    width: 125,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    alignItems: 'center',
    borderRadius: 10,
    shadowRadius:10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: '#FF9800',
    padding: 12,
    margin: 16,
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  item: {
    backgroundColor: '#FF9800',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    width: Dimensions.get('window').width / numColumns-20, // approximate a square
    height: Dimensions.get('window').width / numColumns-20,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  closeText: {
      backgroundColor: "#aaa",
      color:"#FF9800",
      padding: 5
  },
  itemText: {
    color: '#fff',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
