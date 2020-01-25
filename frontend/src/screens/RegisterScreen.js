import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';


const RegisterScreen = (props) => {

    function signup() { 
        fetch("http://localhost:3000/user/signup", {
            method: "POST", 
            "headers": {
                Accept: "application/json", 
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                "forename": forename, 
                "surname": surname, 
                "dob": dob, 
                "emailAddress": emailAddress, 
                "password": password, 
                "hubName": hubName,  
                "hubPassword": hubPassword
            })
        }).then(response => response.json().then(response => {
            
            console.log(response);
            
            if (response.ok) {
                alert("Signed up"); 































               
 
        //save data with asyncstorage
        let credentials = {
            emailAddress: emailAddress,
            password: password
        }
 
       
            AsyncStorage.setItem('credentials', JSON.stringify(credentials));
 
            
            alert("You successfully registered. Email: " + emailAddress + ' password: ' + password);

            props.navigation.navigate('Confirmation')
            





































              
            } else {
            console.log(response.forename);

            if (response.forename) 
                setForenameError(""); 
            else
                setForenameError("Invalid forename");

            if (response.surname)
                setSurnameError(""); 
            else
                setSurnameError("Invalid password"); 

            if (response.emailAddress)
                setEmailAddressError(""); 
            else 
                setEmailAddressError("Email address already taken"); 
            
            if (response.password)
                setPasswordError(""); 
            else
                setPasswordError("Password not strong enough"); 
            
            if (response.hub)
                setHubError(""); 
            else
                setHubError("Incorrect hub credential.");
            }
            

             
        
        }).catch(error => console.log(error)))
    }




    const [forename, setForename] = useState('');
    const [surname, setSurname] = useState(""); 
    const [dob, setDob] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword ] = useState('');
    const [hubName, setHubName] = useState('');
    const [hubPassword, setHubPassword] = useState(""); 

    const [forenameError, setForenameError] = useState(""); 
    const [surnameError, setSurnameError] = useState(""); 
    const [emailAddressError, setEmailAddressError] = useState(""); 
    const [passwordError, setPasswordError] = useState(""); 
    const [hubError, setHubError] = useState("");

    
    
    
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
                    
            <Text style={styles.textStyle}>Forename</Text>
            <Text style={{color: "red"}}>{forenameError}</Text>
            <TextInput 
            placeholder='Forename'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            value={forename}
            onChangeText={(newValue) => setForename(newValue)}
            ></TextInput>

            <Text style={styles.textStyle}> Surname </Text>
            <Text style={{color: "red"}}>{surnameError}</Text>
            <TextInput 
            placeholder='Surname'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            value={surname}
            onChangeText={(newValue) => setSurname(newValue)}
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
            <Text style={{color: "red"}}>{emailAddressError}</Text>
            <TextInput 
            placeholder='Enter your Email Address'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            value={emailAddress}
            onChangeText={(newValue) => setEmailAddress(newValue)}
            ></TextInput>

            <Text style={styles.textStyle}> Password </Text>
            <Text style={{color: "red"}}>{passwordError}</Text>
            <TextInput 
            placeholder='Enter your password'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={(newValue) => setPassword(newValue)}
            ></TextInput>

            <Text style={{color: "red"}}>{hubError}</Text>
            <Text style={styles.textStyle}> Hub Name </Text>
            <TextInput 
            placeholder='Enter your Hub name'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            value={hubName}
            onChangeText={(newValue) => setHubName(newValue)}
            ></TextInput>

            <Text style={styles.textStyle}> Hub Password </Text>
            <TextInput 
            placeholder='Hub Password'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            value={hubPassword}
            onChangeText={(newValue) => setHubPassword(newValue)}
            ></TextInput>

            <TouchableOpacity
            style={styles.button}
            onPress ={() => {console.log("meow");signup()}/*() => props.navigation.navigate('Confirmation')*/}>
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