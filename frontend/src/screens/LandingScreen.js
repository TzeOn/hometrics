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
                flexDirection:'row',
                justifyContent:'flex-start',
                flexWrap:'wrap'
            },
            textStyle: {
                color: 'white'
            },  
            titleStyle: {
                color: "white",
                textAlign:'center'
            },
            imageStyle: {
                height:175,
                width: 175
            },
        });

        return (
            <View style={styles.container}>
                <ScrollView>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("DeviceManagement")}>
                <Card 
                image={require('../../assets/deviceManagement.png')}
                imageStyle={styles.imageStyle}
                title='Device Management'
                titleStyle={styles.titleStyle}
                containerStyle={{flex:1, backgroundColor:'black', alignItems: 'center', borderColor:'gray', paddingVertical:5, borderRadius:10}}>   
                       
                </Card>
                </TouchableOpacity>
                
               <TouchableOpacity onPress={() => this.props.navigation.navigate("Energy")}>
                <Card 
                image={require('../../assets/energy.png')}
                imageStyle={styles.imageStyle}
                title='Energy Output'
                titleStyle={styles.titleStyle}
                containerStyle={{flex:1, backgroundColor:'black', alignItems: 'center', borderColor:'gray', paddingVertical:5, borderRadius:10}}>           
                </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("DeviceActivity")}>
                <Card 
                image={require('../../assets/deviceActivity.png')}
                imageStyle={styles.imageStyle}
                title='Device Activity'
                titleStyle={styles.titleStyle}
                containerStyle={{flex:1, backgroundColor:'black', alignItems: 'center', borderColor:'gray', paddingVertical:5, borderRadius:10}}>           
                </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Internal")}>
                <Card 
                image={require('../../assets/internal.png')}
                imageStyle={styles.imageStyle}
                title='Internal Conditions'
                titleStyle={styles.titleStyle}
                containerStyle={{flex:1, backgroundColor:'black', alignItems: 'center', borderColor:'gray', paddingVertical:5, borderRadius:10}}>           
                </Card>
                </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}