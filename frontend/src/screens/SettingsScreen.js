import React, { useState, Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Button, Dimensions } from 'react-native';
import { Card } from "react-native-elements"; 
import { ScrollView } from 'react-native-gesture-handler';
const trueHeight = Dimensions.get('window').height *1.5;

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
                flexDirection:'row',
                justifyContent:'flex-start',
                flexWrap:'wrap',
                height: trueHeight,
            },
            textStyle: {
                color: 'black'
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
            }
        });

        return (
            <View style={styles.container}>
                <ScrollView>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("DeviceManagement")}>
                <Card 
                image={require('../../assets/user.png')}
                imageStyle={styles.imageStyle}
                title='Profile'
                titleStyle={styles.titleStyle}
                containerStyle={styles.cardStyle}>   
                       
                </Card>
                </TouchableOpacity>
                
               <TouchableOpacity onPress={() => this.props.navigation.navigate("Energy")}>
                <Card 
                image={require('../../assets/folder.png')}
                imageStyle={styles.imageStyle}
                title='Energy Output'
                titleStyle={styles.titleStyle}
                containerStyle={styles.cardStyle}>           
                </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("DeviceActivity")}>
                <Card 
                image={require('../../assets/deviceActivity.png')}
                imageStyle={styles.imageStyle}
                title='Device Activity'
                titleStyle={styles.titleStyle}
                containerStyle={styles.cardStyle}>           
                </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Internal")}>
                <Card 
                image={require('../../assets/internal.png')}
                imageStyle={styles.imageStyle}
                title='Internal Conditions'
                titleStyle={styles.titleStyle}
                containerStyle={styles.cardStyle}>           
                </Card>
                </TouchableOpacity>

                </ScrollView>
            </View>
        );
    }
}