import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Register from './RegisterScreen';

const HomeScreen = (props) => {
    return (
        <View style={styles.container}>
            <View>
                <Image 
                source={require('../../assets/splash.png')}
                style={styles.imageStyle}/>
            </View>
            <View style={styles.buttonsLayout}>
            <TouchableOpacity 
            style={styles.buttons1}
            onPress={() => props.navigation.navigate('Register')}>
                <Text style={styles.textStyle}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.buttons2}
            onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.textStyle}>Log In</Text>
            </TouchableOpacity>
            </View>
        </View>

    );
};  

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      
        
    },
    textStyle: {
        color: '#FF9800',
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
    imageStyle: {
        height: 300,
        width: 300,
        
    }
});

export default HomeScreen;