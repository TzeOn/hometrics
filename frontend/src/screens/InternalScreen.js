import React, { useState, Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Button } from 'react-native';
import { Card } from "react-native-elements"; 
import { ScrollView } from 'react-native-gesture-handler';
const api = require('../api').url;

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
                <Card 
                title='Room Temperature'
                titleStyle={styles.titleStyle}
                containerStyle={{flex:1, backgroundColor:'black', alignItems: 'center', borderColor:'gray', paddingVertical:5, borderRadius:10}}>   
                       
                <View style={{
                     alignItems: "center", 
                     justifyContent: "center",
                     backgroundColor:'black',
                     borderColor:'gray',
                     borderWidth:1,
                     borderRadius:10,
                     padding:20
                }}>
                    <Text style={{fontSize:80, color:'white', padding:10}}>
                        {this.state.roomTemp} °C
                    </Text>
                   
                </View>

                </Card> 
                    <View style={{alignItems:'center', padding:10}}>
                    
                    <TouchableOpacity
                        onPress={() => this.raiseTemp()}
                        style={{padding:30, borderRadius:10, backgroundColor:'green', width:'50%'}}>
                    <Text style={{color:'white', fontSize:25, textAlign:'center'}}>   +   </Text>    
                    </TouchableOpacity>
                   
                    
                    <TouchableOpacity
                        onPress={() => this.lowerTemp()}
                        style={{padding:30, borderRadius:10, backgroundColor:'red', width:'50%'}}>
                    <Text style={{color:'white', fontSize:25, textAlign:'center'}}>   -   </Text>
                    </TouchableOpacity>  
                    </View>              
                </ScrollView>
            </View>
        );
    }
}