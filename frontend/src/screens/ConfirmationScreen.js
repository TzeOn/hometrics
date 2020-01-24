import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';

const ConfirmationScreen = (props) => {
    const [confirm, setConfirm ] = useState('');
    
    return (
        <View style={styles.container}>
            <Image 
            source={require('../../assets/splash.png')}
            style={styles.imageStyle}/>

            <Text style={styles.textStyle}>Confirmation code</Text>
            <TextInput
            placeholder='Enter the confirmation code'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            value={confirm}
            onChangeText={(newValue) => setConfirm(newValue)}
            ></TextInput>

            <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center'
    },
    imageStyle: {
        height:175,
        width:175
    },
    placeStyle: {
        color:'gray',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        height:50,
        bottom: 5
    },
    button: {
        backgroundColor: '#FF9800',
        height: 50,
        width: 75,
        alignSelf: 'center',
        alignContent: 'center',
        marginTop: 20
    },
    submit: {
        color: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        flex:1
    },
});

export default ConfirmationScreen;