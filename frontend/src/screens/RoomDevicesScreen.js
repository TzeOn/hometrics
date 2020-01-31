import { Card } from "react-native-elements"; 
import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity, ScrollView, Switch } from "react-native-gesture-handler";
const api = require("../api").url; 

export default class RoomDevicesScreen extends Component {


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
        }).then(response => response.json()).then(response => this.setState({data: response.roomDevices}))
    }

    componentDidMount() {
        this.getData(); 
    }

    showDevices() { 

        const styles = StyleSheet.create({
            container: {
                
                backgroundColor: 'black',
                alignItems: 'center',
            },
            textStyle: {
                color: 'white',
                fontSize: 20
            },  
            titleStyle: {
                color: "white"
            }
        });
       

       let devices = [];
       let device; 
       
       for (let i=0; i<this.state.data.length; i++) {
           device = this.state.data[i]; 

        if (device.deviceName) {

            devices.push(
                <Card 
                containerStyle={{backgroundColor:'black'}}
                titleStyle={{color:'white'}}
                title={device.deviceName}>
                    <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
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
                    

                    
                    ></Switch>
                    </View>
                    <Button title="-" color={"red"}></Button>

                </Card>
            )
                } else {

            devices.push(
                <View>
                    <Card containerStyle={{backgroundColor: "green"}}>
                    <Text style={{fontSize: 20, color: "white"}}>+</Text>
                </Card>
                </View>
            )
                }


       }
       return devices; 
    }

    //This render is begin called even before props getting updated
    render() {

        const styles=StyleSheet.create({
            container: {
                backgroundColor:'black',
                flex:1
                
            },
            textStyle: {
                color: 'white',
                fontSize:20
            },
            headerStyle: {
                fontSize: 40,
                color: '#FF9800',
                textAlign:'center'
            }

        });
        return (
            <View style={styles.container}>
            <Text style={styles.headerStyle}>Devices</Text>
            { !!this.state && this.state.data &&
                <View>
                    
                {this.showDevices()}

                </View>
            }
            </View>
        )
    }
}