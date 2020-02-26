import React, { useState, Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Button, Dimensions } from 'react-native';
import { Card } from "react-native-elements"; 
import { ScrollView } from 'react-native-gesture-handler';
const api = require('../api').url;
const trueHeight = Dimensions.get('window').height * .92;
const width = Dimensions.get('window').width * .33;

export default class InternalScreen extends Component {
    constructor(props) { 
        super(props); 
        this.state = {
            // Store fetched data here. This shall replace hooks used in functional components.
            // See ConfirmationScreen for how I handled onChangeText, etc. 
            roomTemp: 24 
          };
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
     
    }

    raiseTemp = () => {
        this.setState(prevState => ({ roomTemp : prevState.roomTemp + 1 }));
    }

    lowerTemp = () => {
        this.setState(prevState => ({ roomTemp : prevState.roomTemp - 1 }));
    }


    render() { 
        // Start reusing the same stylesheet object for every screen (and remove the instance below). 
        const styles = StyleSheet.create({
            container: {
                flex:1,
                backgroundColor: '#E5FCFF',
                alignItems: 'center',
                height: trueHeight
            },
            textStyle: {
                color: 'black',
                fontSize:20
            },  
            titleStyle: {
                color: "black",
                textAlign:'center'
            },
            imageStyle: {
                height:175,
                width: 175
            },
            buttonsLayout: {
                flexDirection: 'row',
                alignSelf:'center'
        
            },
            buttons1: {
                right:10,
                borderBottomWidth:1,
                borderBottomColor: '#41B3A3'
            },
            buttons2: {
                left:10,
            }
        });

        return (
            
            <View style={styles.container}>

                <View style={styles.buttonsLayout}>
                <TouchableOpacity 
                style={styles.buttons1}
                onPress={() => this.props.navigation.navigate('Internal')}>
                    <Text style={styles.textStyle}>Temperature</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.buttons2}
                onPress={() => this.props.navigation.navigate('Humidity')}>
                    <Text style={styles.textStyle}>Humidity</Text>
                </TouchableOpacity>
                </View>

                <Card 
                title='Room Temperature'
                titleStyle={styles.titleStyle}
                containerStyle={{flex:1, backgroundColor:'#41B3A3', alignItems: 'center', borderColor:'gray', paddingVertical:5, borderRadius:10, flexDirection: 'row'}}>   
                       
                <View style={{
                     alignItems: "center", 
                     backgroundColor:'#ccfaff',
                     borderColor:'gray',
                     borderWidth:1,
                     borderRadius:10,
                     padding:20
                }}>
                    <Text style={{fontSize:80, color:'black', padding:10}}>
                        {this.state.roomTemp} °C
                    </Text>
                   
                </View>
                </Card> 
                    <View style={{alignItems:'center', padding:20}}>
                    
                    <TouchableOpacity
                        onPress={() => this.raiseTemp()}
                        style={{padding:30, borderRadius:10, backgroundColor:'#8EE4AF', width: width}}>
                    <Text style={{color:'black', fontSize:25, textAlign:'center'}}>   +   </Text>    
                    </TouchableOpacity>
                   
                    
                    <TouchableOpacity
                        onPress={() => this.lowerTemp()}
                        style={{padding:30, borderRadius:10, backgroundColor:'#E27D60', width: width}}>
                    <Text style={{color:'black', fontSize:25, textAlign:'center'}}>   -   </Text>
                    </TouchableOpacity>  
                    </View>            
                    <View style={{flex:1}}></View>  
            </View>
        );
    }
}