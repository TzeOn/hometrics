import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const LandingScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>This is the landing screen</Text>

        </View>
    );
};

const styles=StyleSheet.create({
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

export default LandingScreen;