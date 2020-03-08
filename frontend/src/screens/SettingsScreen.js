import React, { useState, Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Button, Dimensions } from 'react-native';
import { Card } from "react-native-elements"; 
import { ScrollView } from 'react-native-gesture-handler';
const trueHeight = Dimensions.get('window').height *.92;

export default class SettingsScreen extends Component {
    constructor(props) { 
        super(props); 
    }

    render() {  
        const styles = StyleSheet.create({
            container: {
                flex:1,
                backgroundColor: '#E5FCFF',
                alignItems: 'center',
                // justifyContent:'flex-start',
                // flexWrap:'wrap',
                height: trueHeight,
            },
            textStyle: {
                color: 'black',
                fontSize: 20,
                fontWeight: '600'
            },  
            titleStyle: {
                color: "black",
                textAlign:'center'
            },
            imageStyle: {
                height:175,
                width: 175
            },
            cardStyle: {
                flex: 1,
                backgroundColor: '#ccfaff',
                alignItems: 'center',
                borderColor: 'gray',
                paddingVertical:5,
                borderRadius:10
            },
            tabs: {
                paddingHorizontal:10,
                paddingVertical:10
            }
        });

        return (
            <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity 
                    style={styles.tabs}
                    onPress={() => this.props.navigation.navigate('Settings')}>
                        <Text style={{borderBottomColor:'#41B3A3', borderBottomWidth:2, fontSize:20, color:'black', fontWeight:'600'}}>User Details</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity 
                    style={styles.tabs}
                    onPress={() => this.props.navigation.navigate("ManageUsers")}>
                        <Text style={styles.textStyle}>User Management</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.tabs}
                    onPress={() => this.props.navigation.navigate('Pending')}>
                        <Text style={styles.textStyle}>Requests</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        );
    }
}