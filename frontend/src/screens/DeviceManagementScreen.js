import { Card } from "react-native-elements"; 
import React, { Component } from "react";
import { ActivityIndicator, Button, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
const api = require("../api").url; 

export default class DeviceManagement extends Component { 
    constructor(props) { 
        super(props); 
        this.state = {
            rooms: [],
            loading: true
        }
    }

    componentWillMount() { 
        this.getData()
    }

    getData() { 
        fetch(`${api}/deviceManagement/room`).then(response => response.json()).then(response => {
            this.setState({rooms: response, loading: false}) 
        }) 
    }

    showRooms() { 
        let rooms = []; 
        let i = 0; 
        for (i=0; i<this.state.rooms.length; i++) {
            let roomName = this.state.rooms[i].name; 
            rooms.push(
                <TouchableOpacity 
                style={{backgroundColor:'black', borderRadius:10}}
                onPress={() => {this.props.navigation.navigate("RoomDevices",{roomName})}}>
                    <Card 
                    containerStyle={{backgroundColor:'#ccfaff', borderRadius:10}}
                    titleStyle={{color:'black', borderBottomWidth:.7, borderBottomColor:'#41B3A3'}}
                    title={roomName}>
                            <View style={{  
                                alignItems: "center", 
                                justifyContent: "center",
                                backgroundColor:'#ccfaff',
                                borderColor:'gray',
                                borderWidth:1,
                                borderRadius:10
                            }}>
                                <Text style={{
                                    fontSize: 40,
                                    color:'black',
                                }}>{this.state.rooms[i].numberOfDevices}</Text>
                                <Text style={{fontSize:40, color:'black', textAlign:'center', textShadowColor: 'gray'}}>devices</Text>
                            </View>
                    </Card>
                </TouchableOpacity>
            )
        }
        return rooms; 
    }

    render() { 
        return (
            <ScrollView contentContainerStyle={{backgroundColor:'#E5FCFF'}}>

                {this.state.loading && 
                    <ActivityIndicator size="large"/>
                }

                <View style={{flex: 1}}><Text 
                style={{fontSize: 40,
                color: 'black',
                textAlign: 'center'}}>Rooms</Text></View>
                <View style={{
                    flexDirection: "row",  
                    flex: 0.33, 
                    flexWrap: "wrap", 
                    alignItems:'center',
                    justifyContent:'space-evenly' 
                }}>
                    {this.showRooms()}
                </View>
            </ScrollView> 
        )
    }
}