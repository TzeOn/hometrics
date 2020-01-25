import React, { useState, Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, TextInput, Text, AsyncStorage } from 'react-native';

export default class App extends React.Component  {


    confirm() { 
        fetch("http://localhost:3000/user/confirmationCode", {
            method: "POST", 
            "headers": {
                Accept: "application/json", 
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                "emailAddress": this.state.emailAddress,
                "confirmationCode": this.state.confirmationCode
            })
        }).then(response => response.json()).then(response => {
            console.log(response);
            if (response.ok) {
                props.navigation.navigate('Landing');
            } else {
                this.setState({errorMessage: "Incorrect confirmation code"});
            }
            
        }).catch(error => console.log(error))
    }










    constructor(props) {
      super(props);

      this.state = {
        emailAddress: null,  
        confirmationCode: null, 
        errorMessage: ""
      };
    }

    componentWillMount() {
        this.renderMyData();
    }

    renderMyData(){
        AsyncStorage.getItem("credentials").then(credentials => {
            credentials = JSON.parse(credentials); 
            this.setState({emailAddress: credentials.emailAddress}); 
        })
    }

    render() {
        

        


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




        return(
            
            <View style={styles.container}>
            <Image 
            source={require('../../assets/splash.png')}
            style={styles.imageStyle}/>

            <Text style={{color: "white"}}>A confirmation code was sent to {this.state.emailAddress}</Text>

        <Text style={{color: "red"}}>{this.state.errorMessage}</Text>
            <TextInput
            placeholder='Confirmation Code'
            style={styles.placeStyle}
            autoCapitalize='none'
            autoCorrect={false}
            
            onChangeText={(newValue) => this.setState({confirmationCode: newValue})}
            ></TextInput>

            <TouchableOpacity
            style={styles.button}
            onPress={() => this.confirm()}>
                <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
            

        </View>
            
        );



        
    }
}