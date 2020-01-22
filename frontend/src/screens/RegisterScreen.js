import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';


const RegisterScreen = (props) => {
    const [name, setName ] = useState('');
    const [dob, setDob ] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [hub, setHub ] = useState('');
    
    
    return (
        <View style={styles.container}>
        <View>
            <Text style={styles.titleStyle}> Name </Text>
            <TextInput 
            placeholder='Enter your full name'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            value={name}
            onChangeText={(newValue) => setName(newValue)}
            ></TextInput>

            <Text style={styles.titleStyle}> Date of Birth </Text>
            <TextInput 
            placeholder='Enter your date of birth (YYYY-MM-DD)'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            value={dob}
            onChangeText={(newValue) => setDob(newValue)}
            ></TextInput>

            <Text style={styles.titleStyle}> Email Address </Text>
            <TextInput 
            placeholder='Enter your Email Address'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            value={email}
            onChangeText={(newValue) => setEmail(newValue)}
            ></TextInput>

            <Text style={styles.titleStyle}> Password </Text>
            <TextInput 
            placeholder='Enter your password'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={(newValue) => setPassword(newValue)}
            ></TextInput>

            <Text style={styles.titleStyle}> Hub Name </Text>
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
            onPress ={ () => props.navigation.navigate('LoginScreen')}>
                <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleStyle: {
        color: 'white',
        marginTop: 20,
        marginLeft:10
    },
    placeStyle: {
        color: 'gray',
        marginLeft: 15,
        
    },
    container: {
        backgroundColor: 'black',
        flex: 1
    },
    button: {
        backgroundColor: '#FF9800',
        height:50,
        width:75,
        alignSelf: 'center',
        alignContent: 'center',
        marginTop: 30
    },
    submit: {
        color: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        flex: 1
    
    }
});

export default RegisterScreen;