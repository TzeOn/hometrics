import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, FlatList, Image, Button } from 'react-native';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { setWorldAlignment } from 'expo/build/AR';
const api = require("../api").url; 
const topHeight = Dimensions.get('window').height *0.92;

export default class HomeScreen2 extends React.Component {
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
        devices: 'livingRoom',
      };
    }
    
   
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.top}>
                <Image source={require('../../assets/splash.png')}
                style={styles.imageStyle}/>
                <TouchableOpacity 
                style={styles.buttonStyle}
                onPress={() => props.navigation.navigate('Register')}>
                    <Text style={styles.textStyle}>Register</Text>
                </TouchableOpacity>

                <Button style={styles.button}
                onPress={() => props.navigation.navigate('Login')}
                title='LOGIN'
                titleStyle={{padding:10}}
               color='#FF9800'
               width={Dimensions.get('window').width}
                
                ></Button>
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
        backgroundColor: '#fafafa',
    },
    textStyle: {
        color: '#fff',
        fontSize: 25
    },
    buttonsLayout: {
        flexDirection: 'row',
    },
    buttons1: {
        right:10
    },
    buttons2: {
        left:10
    },
    button: {
        color: '#FF9800',
        
    },
      imageStyle: {
        height: 300,
        width: 300,
    }
})