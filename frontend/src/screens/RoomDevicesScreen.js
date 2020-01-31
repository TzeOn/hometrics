import { Card } from "react-native-elements"; 
import React, { Component } from "react";
import { Button, Text, View } from "react-native";
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
        //server.getSomeData(data => this.setState({ data: data }));
        this.getData(); 
    }

    example() { 
       console.log(this.state.data)
       console.log(this.state.data[0].deviceName)

       let devices = [];
       let device; 
       
       for (let i=0; i<this.state.data.length; i++) {
           device = this.state.data[i]; 

            devices.push(
                <Card title={device.deviceName}>
                    <Switch
                    value={device.onOff}
                    onValueChange = {() => {

                        let copy = this.state.data; 
                        copy[i].onOff = !copy[i].onOff;
                        this.setState({data: copy}); 
                        
                    }}

                    
                    ></Switch>

                </Card>
            )


       }
       return devices; 
    }

    //This render is begin called even before props getting updated
    render() {
        return (
            <View>
            <Text>This will always render</Text>
            { this.state && this.state.data &&
                <Text>{this.example()}</Text>
            }
            </View>
        )
    }
}