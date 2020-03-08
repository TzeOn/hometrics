import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, TextInput, Text, AsyncStorage, Dimensions, ActivityIndicator, Button } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from "react-native-elements";
const api = require("../api").url; 
const trueHeight = Dimensions.get('window').height * .92;

export default class PendingUsers extends React.Component { 
    constructor(props) { 
        super(props); 
        this.state = {
            loading: true
        }
    }


    getData() { 
        AsyncStorage.getItem("credentials").then(credentials => {
            var credentials = JSON.parse(credentials); 
           var emailAddress = credentials.emailAddress; 

           fetch(`${api}/admin/getPendingUsers`, {
            method: "POST", 
            "headers": {
              Accept: "application/json", 
              "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
              "emailAddress": emailAddress
            })
          }).then(response => response.json()).then(response => {console.log(response); 

            
            this.setState({
                users: response.users,   
                loading: false
            })





        })


           
        })
    }

    componentWillMount() { 
        this.getData(); 
    }

    showUsers() { 
        var list = []; 
        console.log(this.state.users.length); 
        

        for (var i=0; i<this.state.users.length; i++) { 

            if (this.state.users[i] === undefined) { 
                continue; 
            }
            

            const emailAddress = this.state.users[i].emailAddress;
            var person = this.state.users[i]; 

       

            list.push(
                <Card title = {person.forename + " " + person.surname}>

            <Text>{person.emailAddress}</Text>
            <Text>{person.dob}</Text>

            <Button 
            title = "Approve"
            onPress = {() => {


                fetch(`${api}/admin/approveUser`, {
                    method: "POST", 
                    "headers": {
                      Accept: "application/json", 
                      "Content-Type": "application/json"
                    }, 
                    body: JSON.stringify({
                      "emailAddress": emailAddress
                    })
                  }).then((result) => {
                      this.getData(); 
                  })










            }}
            />





<Button 
            title = "Reject"
            onPress = {() => {


                fetch(`${api}/admin/deleteUser`, {
                    method: "POST", 
                    "headers": {
                      Accept: "application/json", 
                      "Content-Type": "application/json"
                    }, 
                    body: JSON.stringify({
                      "emailAddress": emailAddress
                    })
                  }).then((result) => {
                      this.getData(); 
                  })










            }}
            />


















            
                    
                </Card>
            )

            
        }
        return list; 

      
        
        
    }

    render() { 
        return (
            <View>

                {this.state && this.state.loading && 

                <View>
                    <ActivityIndicator size="large"/>
                    </View>



                
                }

                {
                    this.state && !this.state.loading && 
                    <View>
                        <Text>Pending Users</Text>
                        {this.showUsers()}
                    </View>
                }
                
            </View>
        )
    }

}