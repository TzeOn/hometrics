import { Card } from "react-native-elements"; 
import React, { Component } from "react";
import { TextInput, ActivityIndicator, Button, Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { ScrollView, Switch } from "react-native-gesture-handler";
const api = require("../api").url; 

export default class RoomDevicesScreen extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            loading: true
        }
    }

    getData() {
        fetch(`${api}/deviceManagement/roomDevices`, {
            method: "POST", 
            "headers": {
                Accept: "application/json", 
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                "roomName": this.props.navigation.state.params.roomName
            })
        }).then(response => response.json()).then(response => this.setState({data: response.roomDevices, loading: false}))
    }

    componentDidMount() {
        this.getData(); 
    }

    showDevices() { 
        const styles = StyleSheet.create({
            container: {
                backgroundColor: '#E5FCFF',
                alignItems: 'center',
            },
            textStyle: {
                color: 'black',
                fontSize: 20
            },  
            titleStyle: {
                color: "black"
            }
        });
       let devices = [], device;
       for (let i=0; i<this.state.data.length; i++) {
           
           
           device = this.state.data[i]; 
           console.log(device); 
            if (device && device.deviceName) {
                devices.push (
                    <Card 
                        containerStyle={{backgroundColor:'#ccfaff', borderColor: 'gray', paddingBottom:5}}
                        titleStyle={{color:'black'}}
                        title={device.deviceName}>
                            <View style={{alignItems:'center', justifyContent:'center', flex:1, paddingBottom:20}}>
                                <Switch
                                    value={device.onOff}
                                    onValueChange = {() => {
                                        var copy = this.state.data; 
                                        fetch(`${api}/deviceManagement/toggle`, {
                                            method: "POST", 
                                            "headers": {
                                                Accept: "application/json", 
                                                "Content-Type": "application/json"
                                            }, 
                                            body: JSON.stringify({
                                                "deviceId": copy[i].deviceId,
                                                "onOff": (!copy[i].onOff) ? 1:0
                                            })
                                        }).then(response => response.json()).then(response => {
                                            copy[i].onOff = !copy[i].onOff;
                                            this.setState({data: copy});
                                            
                                        }).catch(error => console.error(error)); 
                                    }}
                                />
                            </View>
                        <Button 
                            title="-" 
                            color={"#E27D60"}
                            onPress={() => {
                                var copy = this.state.data; 
                                fetch(`${api}/deviceManagement/remove`, {
                                    method: "POST", 
                                    "headers": {
                                        Accept: "application/json", 
                                        "Content-Type": "application/json"
                                    }, 
                                    body: JSON.stringify({
                                        "deviceId": copy[i].deviceId,
                                    })
                                }).then(response => response.json()).then(response => {
                                    delete copy[i]; 
                                    this.setState({data: copy}); 
                                }).catch(error => console.error(error)); 
                            }}></Button>
                    </Card>
                )   
            } else {
                devices.push(
                    <View style={{}}>
                        <Card title='Add another device' titleStyle={{color:'black'}} containerStyle={{backgroundColor: "#ccfaff", borderColor:'gray', }}>
                            
                        <TextInput style={{ padding:5, color:'black', fontSize:15, fontWeight:'400', alignSelf: 'center', textAlign:'center'}}
       
        placeholder="Enter Device Name"
                    
        onChangeText={(value) => {
       
            if (this.state.data[i] != undefined)
            this.state.data[i].addDeviceName = value;
            



            }}
        //value={this.state.data[i].addDeviceName}
    />
    <Button
        title='Add Device'
        color='#41B3A3'
        onPress={() => {
        // console.log(this.state.data[i].addDeviceName);

        fetch(`${api}/deviceManagement/add`, {
            method: "POST", 
            "headers": {
                Accept: "application/json", 
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                "device": {
                    "name": this.state.data[i].addDeviceName
                }, 
                "plugId": this.state.data[i].plugId

               
            })
        }).then(response => response.json()).then(response => {
           
            var copy = this.state.data; 

            copy[i]  = response; 

            this.setState({data: copy});
            
        }).catch(error => console.error(error)); 

        }}/>          
                        </Card>
                    </View>
                )   
            }
       }
       return devices; 
    }

    render() {
        const styles=StyleSheet.create({
            container: {
                backgroundColor:'#E5FCFF',
                flex:1  
            },
            textStyle: {
                color: 'black',
                fontSize:20
            },
            headerStyle: {
                fontSize: 40,
                color: 'black',
                textAlign:'center'
            }
        });
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.headerStyle}>Devices</Text>
                
                    {
                        this.state.loading &&
                        <View>
                            <ActivityIndicator size="large" />
                        </View>
                    }

                    { 
                        !!this.state && this.state.data &&
                        <View>  
                            {this.showDevices()}
                        </View>
                    }
                </View>
            </ScrollView>
        )
    }
}