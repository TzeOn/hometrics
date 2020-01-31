import React, { useState, Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Button } from 'react-native';
import { Card } from "react-native-elements"; 
import { ScrollView } from 'react-native-gesture-handler';

export default class LandingScreen extends Component {
    constructor(props) { 
        super(props); 
        this.state = {
            // Store fetched data here. This shall replace hooks used in functional components.
            // See ConfirmationScreen for how I handled onChangeText, etc.  
          };
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        // Fetch data here, and store as state objects. 
    }

    render() { 
        // Start reusing the same stylesheet object for every screen (and remove the instance below). 
        const styles = StyleSheet.create({
            container: {
                flex:1,
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

        return (
            <View style={styles.container}>

<TouchableOpacity onPress={() => this.props.navigation.navigate("DeviceManagement")}>
                <Card 
                title={<Text style={styles.titleStyle}>Device Management </Text>}
                containerStyle={{flex:1, backgroundColor:'black', alignItems: 'center', borderColor:'gray', paddingVertical:5}}>           
                </Card>
                </TouchableOpacity>
                
               <TouchableOpacity onPress={() => this.props.navigation.navigate("Energy")}>
                <Card 
                title={<Text style={styles.titleStyle}>Energy Output </Text>}
                containerStyle={{flex:1, backgroundColor:'black', alignItems: 'center', borderColor:'gray', paddingVertical:5}}>           
                </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("DeviceActivity")}>
                <Card 
                title={<Text style={styles.titleStyle}>Device Activity </Text>}
                containerStyle={{flex:1, backgroundColor:'black', alignItems: 'center', borderColor:'gray', paddingVertical:5}}>           
                </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("DeviceManagement")}>
                <Card 
                title={<Text style={styles.titleStyle}>Internal Conditions </Text>}
                containerStyle={{flex:1, backgroundColor:'black', alignItems: 'center', borderColor:'gray', paddingVertical:5}}>           
                </Card>
                </TouchableOpacity>
            </View>
        );
    }
}