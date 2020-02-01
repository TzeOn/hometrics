import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, FlatList, Button } from 'react-native';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { FlatGrid } from 'react-native-super-grid';
const data = [
    { key: 'Room 1' }, { key: 'Room 2' }, { key: 'Room 3' }, { key: 'Room 4' }, { key: 'Room 5' }, { key: 'Room 6' }, { key: 'Room 7' }, { key: 'Room 8' }, { key: 'Room 9' } ];
  const numColumns = 3;
const bottomHeight = Dimensions.get('window').height * 0.3;
const topHeight = Dimensions.get('window').height * 0.6;
var temperature = 23.23434;
var airQuality = 535;
var humidity = 51.23434;
var lightLevel = -1.536885246;

export default class Simulation extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        isModalVisible: false,
        roomText: "",
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
    
    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={styles.top}>

                <FlatList
                data={data}
                style={styles.container}
                renderItem={this.renderItem}
                numColumns={numColumns}/>

                </View>

                <View style={styles.bottom}>

                    <View style={styles.bottomItem}>
                        <View style={styles.internalEnviroment}>
                            <Text style={styles.itemName}>Temperature</Text>
                            <Text style={styles.itemValue}>{temperature}c</Text>
                        </View>
                    </View>

                    <View style={styles.bottomItem}>
                        <View style={styles.internalEnviroment}>
                            <Text style={styles.itemName}>Air Quality</Text>
                            <Text style={styles.itemValue}>{airQuality}ppm</Text>
                        </View>
                    </View>

                    <View style={styles.bottomItem}>
                        <View style={styles.internalEnviroment}>
                            <Text style={styles.itemName}>Humidity</Text>
                            <Text style={styles.itemValue}>{humidity}%</Text>
                        </View>
                    </View>

                    <View style={styles.bottomItem}>
                        <View style={styles.internalEnviroment}>
                            <Text style={styles.itemName}>Light Levels</Text>
                            <Text style={styles.itemValue}>{lightLevel}</Text>
                        </View>
                    </View>

                    <Modal
                    isVisible={this.state.isModalVisible}
                    onRequestClose={() => this.setModalVisible(false)}
                    transparent={true}
                    animationIn={'zoomIn'}
                    animationOut={'zoomOut'}
                    animationInTiming={750}
                    animationOutTiming={750}
                    backdropTransitionInTiming={750}
                    backdropTransitionOutTiming={750}>
                        
                        <View style={styles.modalContent}>
                            <Text>Devices:</Text>
                            <Text>Lights: On</Text>
                            <Text>AC: On</Text>
                            <Text>IOT: Onf</Text>
                            <Button
                            color="#FF9800"
                            title="Close"
                            onPress={() => this.setModalVisible(false)}/>
                        </View>
                    </Modal>

                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        height: topHeight,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#292929',
    },
    bottom: {
        height: bottomHeight,
        backgroundColor: '#292929',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        alignItems: "center",
        justifyContent: "center",        
    },
    bottomItem: {
        height: bottomHeight * 0.5,
        width: Dimensions.get('window').width * 0.45,
        padding: 5,
    },
    internalEnviroment: {
        flex: 1,
        backgroundColor: '#FF9800',
        alignItems: "center",
        justifyContent: "center",
    },
    item: {
        backgroundColor: '#FF9800',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,
        width: Dimensions.get('window').width / numColumns,
        height: topHeight / 3,
      },
    itemText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
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
      modalContent: {
        backgroundColor: '#fff',
        padding: 22,
        alignItems: 'center',
        borderRadius: 10,
        shadowRadius:10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
})