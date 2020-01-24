import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';


const RegisterScreen = (props) => {
    const [name, setName ] = useState('');
    const [dob, setDob ] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [hub, setHub ] = useState('');
    
    
    return (
        <View style={styles.container}>
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
            
            <Image
            source={require('../../assets/splash.png')}
            style={styles.imageStyle}></Image>
        <View>          
            <Text style={styles.textStyle}> Name </Text>
            <TextInput 
            placeholder='Enter your full name'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            value={name}
            onChangeText={(newValue) => setName(newValue)}
            ></TextInput>

            <Text style={styles.textStyle}> Date of Birth </Text>
            <TextInput 
            placeholder='Enter your date of birth (YYYY-MM-DD)'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            value={dob}
            onChangeText={(newValue) => setDob(newValue)}
            ></TextInput>

            <Text style={styles.textStyle}> Email Address </Text>
            <TextInput 
            placeholder='Enter your Email Address'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            value={email}
            onChangeText={(newValue) => setEmail(newValue)}
            ></TextInput>

            <Text style={styles.textStyle}> Password </Text>
            <TextInput 
            placeholder='Enter your password'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={(newValue) => setPassword(newValue)}
            ></TextInput>

            <Text style={styles.textStyle}> Hub Name </Text>
            <TextInput 
            placeholder='Enter your Hub name'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            value={hub}
            onChangeText={(newValue) => setHub(newValue)}
            ></TextInput>

            <TouchableOpacity
            style={styles.button}
            onPress ={ () => props.navigation.navigate('Confirmation')}>
                <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        color: 'white',
        fontSize: 20
    },
    placeStyle: {
        color: 'gray',
        borderBottomWidth:2,
        borderBottomColor: 'white',
        height:40, 
        bottom:5
    },
    container: {
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#FF9800',
        height:50,
        width:75,
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
        flex: 1   
    },
    imageStyle: {
        height:175,
        width:175
    },
    buttonsLayout: {
        flexDirection: 'row'
    },
    buttons1: {
        right:10,
        borderBottomWidth:1,
        borderBottomColor: '#FF9800'
    },
    buttons2: {
        left:10,
       
    }
});

export default RegisterScreen;