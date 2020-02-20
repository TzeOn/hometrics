import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
const topHeight = Dimensions.get('window').height * .40;
const bottomHeight = Dimensions.get('window').height * .52;
const trueHeight = Dimensions.get('window').height * .92;


const HomeScreen = (props) => {
    return (
        
        <ScrollView contentContainerStyle={styles.container} >
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
                    <Text style={styles.textStyle}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.buttons2}
                onPress={() => props.navigation.navigate('Login')}>
                    <Text style={styles.textStyle}>Login</Text>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
   
    );
};  

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        height: trueHeight,
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