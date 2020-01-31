import { Card } from "react-native-elements"; 
import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
const api = require("../api").url; 

export default class DeviceManagement extends Component { 
    constructor(props) { 
        super(props); 
        this.state = {
            rooms: []
        }
    }

    componentWillMount() { 
        this.getData()
    }

    getData() { 
        fetch(`${api}/deviceManagement/room`).then(response => response.json()).then(response => {
            this.setState({rooms: response}) 
        }) 
    }

    showRooms() { 
        let rooms = []; 
        let i = 0; 
        for (i=0; i<this.state.rooms.length; i++) {
            let roomName = this.state.rooms[i].name; 
            rooms.push(
                <TouchableOpacity onPress={() => {this.props.navigation.navigate("RoomDevices",{roomName})}}>
                    <Card title={roomName}>
                            <View style={{  
                                alignItems: "center", 
                                justifyContent: "center"
                            }}>
                                <Text style={{
                                    fontSize: 40
                                }}>{this.state.rooms[i].numberOfDevices}</Text>
                                <Text>devices</Text>
                            </View>
                    </Card>
                </TouchableOpacity>
            )
        }
        return rooms; 
    }

    render() { 
        return (
            <ScrollView>
                <View><Text>Rooms</Text></View>
                <View style={{
                    flexDirection: "row",  
                    flex: 0.33, 
                    flexWrap: "wrap", 
                    alignItems:'center',
                    justifyContent:'space-between' 
                }}>
                    {this.showRooms()}
                </View>
            </ScrollView> 
        )
    }
}