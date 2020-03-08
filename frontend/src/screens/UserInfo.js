import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Button , Picker, AsyncStorage, Dimensions, ActivityIndicator, Alert} from 'react-native';
import PureChart from 'react-native-pure-chart'; 
import { ScrollView } from 'react-native-gesture-handler';
const api = require("../api").url;
const trueHeight = Dimensions.get('window').height * 1.5;
const graphHeight = Dimensions.get('window').height * .4;
import { Card } from "react-native-elements"; 
var popupS = require('popups');

export default class UserInfo extends React.Component { 
    constructor(props) { 
        super(props);
        this.state = {
            loading: true


        }
        
    
    }

    getData() { 
        var emailAddress; 
        AsyncStorage.getItem("credentials").then(credentials => {
          emailAddress = JSON.parse(credentials).emailAddress; 
          fetch(`${api}/user/getInfo`, {
            method: "POST", 
            "headers": {
              Accept: "application/json", 
              "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
              "emailAddress": emailAddress
            })
          }).then(response => response.json()).then(response => {console.log(response); this.setState({user: response.info, loading: false}); }); 
        })
    }

    componentWillMount() { 
        this.getData(); 
    }

    render() { 
        return ( 
            <View>
                <Text>Your Information</Text>
                {
                    this.state.loading && 
                    <ActivityIndicator size="large" />
                    
                }

                {
                    !this.state.loading && 

                    <Card title = {this.state.user.forename + " " + this.state.user.surname}>

                <Card title = "Email Address"><Text>{this.state.user.emailAddress}</Text></Card>

                <Card title = "Date of Birth"><Text>{this.state.user.dob}</Text></Card>

                <Card title = "User Type"><Text>{this.state.user.type}</Text></Card>

                <Card title = "Hub ID"><Text>{this.state.user.hub}</Text></Card>




                <Button title = "Remove Recorded Data" onPress={() => {
                    AsyncStorage.getItem("credentials").then(credentials => {
                        var emailAddress = JSON.parse(credentials).emailAddress; 
                        fetch(`${api}/user/delete`, {
                          method: "POST", 
                          "headers": {
                            Accept: "application/json", 
                            "Content-Type": "application/json"
                          }, 
                          body: JSON.stringify({
                            "emailAddress": emailAddress
                          })
                        }).then(response => response.json()).then(response => {
                            
                            //
                            /// vincent
                            // put popup here. 
                            // "recorded data deleted"
                    
                        }); 
                      })
                }}/>


<Button title = "Download data" onPress={() => {
                    AsyncStorage.getItem("credentials").then(credentials => {
                        var emailAddress = JSON.parse(credentials).emailAddress; 
                        fetch(`${api}/user/download`, {
                          method: "POST", 
                          "headers": {
                            Accept: "application/json", 
                            "Content-Type": "application/json"
                          }, 
                          body: JSON.stringify({
                            "emailAddress": emailAddress
                          })
                        }).then(response => response.json()).then(response => {
                            
                            //
                            /// vincent
                            // put popup here. 
                            // data emailed to "whatever their email address is"
                        }); 
                      })
                }}/>







                </Card>


               
                }
            </View>
        )
    }


}