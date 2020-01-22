import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Register from './RegisterScreen';

const HomeScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonsLayout}>
            <TouchableOpacity 
            style={styles.buttons1}
            onPress={() => props.navigation.navigate('Register')}
            >
                <Text style={styles.textStyle}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons2}>
                <Text style={styles.textStyle}>Log In</Text>
            </TouchableOpacity>
            </View>
        </View>

    );
};  

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1
    },
    textStyle: {
        color: '#FF9800',
        fontSize: 25
    },
    buttonsLayout: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons1: {
        right:10
     
    },
    buttons2: {
        left:10

    }
});

export default HomeScreen;