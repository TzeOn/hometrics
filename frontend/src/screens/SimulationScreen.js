import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, TextInput, AsyncStorage } from 'react-native';

const SimulationScreen = (props) => {
    function login(emailAddress, password) { 
        fetch("http://localhost:3000/weather", {
            method: "POST", 
            "headers": {
                Accept: "application/json", 
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                "emailAddress": emailAddress, 
                "password": password
            })
        }).then(response => response.json()).then(response => {
            let credentials = {
                "emailAddress": emailAddress, 
                "password": password
            }
            if (response.message === "ok") {
                AsyncStorage.setItem("credentials", JSON.stringify(credentials));
                props.navigation.navigate("Landing");
            } else if (response.message === "confirmationCode") {
                AsyncStorage.setItem('credentials', JSON.stringify(credentials));
                props.navigation.navigate("Confirmation"); 
            } else {
                setErrorMessage("Invalid credentials");
            }
        }).catch(error => console.error(error))
    }

    const [emailAddress, setEmail ] = useState(''),
          [password, setPassword ] = useState(''),
          [errorMessage, setErrorMessage] = useState("");
          
    return (
        <View style={styles.container}>
            <View style={styles.buttonsLayout}>
                <TouchableOpacity 
                style={styles.buttons1}
                onPress={() => props.navigation.navigate('Register')}>
                    <Text style={styles.textStyle}>This is the SimulationScreen</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.buttons2}
                onPress={() => props.navigation.navigate('Login')}>
                    <Text style={styles.textStyle}>Login</Text>
                </TouchableOpacity>
            </View>
            
            <Image 
            style={styles.imageStyle}
            source={require('../../assets/splash.png')}></Image>

            <Text style={{color: "red"}}>{errorMessage}</Text>

            <Text style={styles.textStyle}>Email Address</Text>
            <TextInput
            placeholder='Email Address'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            value={emailAddress}
            onChangeText={(newValue) => setEmail(newValue)}
            ></TextInput>

            <Text style={styles.textStyle}>Password</Text>
            <TextInput
            placeholder='Password'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={(newValue) => setPassword(newValue)}
            ></TextInput>
            
            <TouchableOpacity
            style={styles.button}
            onPress={() => login(emailAddress, password)}>
                <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
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
        fontSize: 20,
    },
    placeStyle: {
        color:'gray',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        height:50,
        bottom: 5
    },
    imageStyle: {
        height:175,
        width: 175
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
    buttonsLayout: {
        flexDirection: 'row'
    },
    buttons1: {
        right:10
    },
    buttons2: {
        left:10,
        borderBottomWidth:1,
        borderBottomColor: '#FF9800'
    }
});

export default SimulationScreen;