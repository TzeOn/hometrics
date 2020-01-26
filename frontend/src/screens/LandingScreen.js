import React, { useState, Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

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
            }
        });

        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>This is the landing screen</Text>
            </View>
        );
    }
}