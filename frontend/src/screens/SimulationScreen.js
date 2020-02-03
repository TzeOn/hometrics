import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, FlatList, Button } from 'react-native';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { Card } from "react-native-elements"; 
const api = require("../api").url; 
const data = [
    { key: 'bedroom' }, { key: 'livingRoom' }, { key: 'otherBedroom' }, { key: 'kitchen' }, { key: 'bathroom' }, { key: 'garage' }, { key: 'collonade' }, { key: 'corridor' }];
  const numColumns = 3;
const bottomHeight = Dimensions.get('window').height * 0.32;
const topHeight = Dimensions.get('window').height * 0.6;
var intTemperature = 23.23434;
var intAirQuality = 535;
var intHumidity = 51.23434;

export default class Simulation extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        isModalVisible: false,
        roomText: "",
        date: '',
        extTemperature: null,   
        extAirQuality: null,  
        extHumidity: null,  
        extLightLevel: null,
        deviceRoom: '',
        devices: [],
      };
    }
    
    componentDidMount(){
        this.getWeather();
        this.getRoomDevices();
        this.timer = setInterval(()=> this.getWeather(), 60000)
        this.timer = setInterval(()=> this.getRoomDevices(), 60000)
       }
       async getWeather(){
      
        fetch(`${api}/weather`, {method: "GET"})
         .then((response) => response.json())
         .then((response) =>
         {
            console.log(response);
            console.log("meow"); 
             this.setState({
                 "extTemperature": response.temperature,   
                 "extAirQuality": response.airQuality,  
                 "extHumidity": response.humidity,  
                 "extLightLevel": response.lighting
             })
              
           //set your data here
            
         })
         .catch((error) => {
             console.error(error);
         });

        


         
       
       }

       getRoomDevices(roomName) { 
           fetch(`${api}/deviceManagement/roomDevices`, {
               method: "POST", 
               headers: {
                   Accept: "application/json", 
                   "Content-Type": "application/json"
               }, 
               body: JSON.stringify({
                   roomName: roomName
                 // roomName: "livingRoom"
               })
           }).then(response => response.json()).then(response => {
            var roomDevices = response.roomDevices; 
            console.log(roomDevices); 
            this.setState({
                "devices": roomDevices
            })

           })
       }


       showDevices() { 

       let devices = [];
       let device; 
       
       for (let i=0; i<this.state.devices.length; i++) {
           device = this.state.devices[i]; 

        if (device.deviceName) {

            devices.push(
                <Card 
                containerStyle={{backgroundColor:'black'}}
                titleStyle={{color:'white'}}
                title={device.deviceName}>
                    <View style={{alignItems:'center', justifyContent:'center', flex:1, paddingBottom:20}}>
                    <Switch
                    value={device.onOff}                    
                    ></Switch>
                    </View>

                </Card>
            )
                } else {
                }


       }
       return devices; 
    }



       getTime() {
        var that = this;

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
    
        that.setState({
          //Setting the value of the date time
          date:
            date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });
       }

    setModalVisible = (bool, roomName) => {
        this.setState({isModalVisible: bool})
        this.setState({roomText: roomName})
        {this.getRoomDevices(roomName)}
    }
    renderItem = ({ item, onPress }) => {
        return (
            <TouchableOpacity onPress= {() => this.setModalVisible(true, item.key)} style={styles.item} > 
            <Text style={styles.itemText}>{item.key}</Text>
          </TouchableOpacity>
        );
      };
    
    render() {
        return (
            <View style={styles.container}>

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
                            <Text style={styles.itemValue}>{this.state.extTemperature}c</Text>
                        </View>
                    </View>

                    <View style={styles.bottomItem}>
                        <View style={styles.internalEnviroment}>
                            <Text style={styles.itemName}>Air Quality</Text>
                            <Text style={styles.itemValue}>{this.state.extAirQuality} ppm</Text>
                        </View>
                    </View>

                    <View style={styles.bottomItem}>
                        <View style={styles.internalEnviroment}>
                            <Text style={styles.itemName}>Humidity</Text>
                            <Text style={styles.itemValue}>{this.state.extHumidity}%</Text>
                        </View>
                    </View>

                    <View style={styles.bottomItem}>
                        <View style={styles.internalEnviroment}>
                            <Text style={styles.itemName}>Light Levels</Text>
                            <Text style={styles.itemValue}>{this.state.extLightLevel} W/m2</Text>
                        </View>
                    </View>

                    <Modal
                    isVisible={this.state.isModalVisible}
                    onRequestClose={() => this.setModalVisible(false, '')}
                    transparent={true}
                    animationIn={'zoomIn'}
                    animationOut={'zoomOut'}
                    animationInTiming={750}
                    animationOutTiming={750}
                    backdropTransitionInTiming={750}
                    backdropTransitionOutTiming={750}>
                        
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeader}>{this.state.roomText}</Text>
                            {this.showDevices()}
                            <Text>Temperature:</Text>
                            <Text>{this.state.extTemperature}c</Text>
                            <Text>Air Quality</Text>
                            <Text>{this.state.extAirQuality} ppm</Text>
                            <Text>Humidity</Text>
                            <Text>{this.state.extHumidity}%</Text>
                            <Button
                            color="#FF9800"
                            title="Close"
                            onPress={() => this.setModalVisible(false, '')}/>
                        </View>
                    </Modal>

                </View>

            </View>
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
      modalHeader: {
        paddingBottom: 5,
        fontSize: 18,
        fontWeight: '600',
      },
})