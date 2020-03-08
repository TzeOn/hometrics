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
        const styles = StyleSheet.create({
            container: {
                flex:1,
                backgroundColor: '#E5FCFF',
                alignItems: 'center',
                // justifyContent:'flex-start',
                // flexWrap:'wrap',
                height: trueHeight,
            },
            textStyle: {
                color: 'black',
                fontSize: 20,
                fontWeight: '600'
            },  
            titleStyle: {
                color: "black",
                textAlign:'center'
            },
            imageStyle: {
                height:175,
                width: 175
            },
            cardStyle: {
                flex: 1,
                backgroundColor: '#ccfaff',
                alignItems: 'center',
                borderColor: 'gray',
                paddingVertical:5,
                borderRadius:10
            },
            tabs: {
                paddingHorizontal:10,
                paddingVertical:10
            },
            tabTextStyle: {
                fontSize:20,
                fontWeight:'600',
                color:'black'
            }
        });

        return (
            <View style={styles.container}>

                <View style={{flexDirection:'row', alignSelf:'center'}}>
                <TouchableOpacity 
                    style={styles.tabs}
                    onPress={() => this.props.navigation.navigate('Settings')}>
                        <Text style={styles.tabTextStyle}>User Details</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity 
                    style={styles.tabs}
                    onPress={() => this.props.navigation.navigate("ManageUsers")}>
                        <Text style={styles.tabTextStyle}>User Management</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.tabs}
                    onPress={() => this.props.navigation.navigate('Pending')}>
                        <Text style={{borderBottomColor:'#41B3A3', borderBottomWidth:2, fontSize:20, color:'black', fontWeight:'600'}}>Requests</Text>
                    </TouchableOpacity>
                    </View>

                {this.state && this.state.loading && 

                <View style={{flex:1}}>
                    <ActivityIndicator size="large"/>
                    </View>



                
                }

                {
                    this.state && !this.state.loading && 
                    <View style={{flex:1}}>
                        <Text>Pending Users</Text>
                        {this.showUsers()}
                    </View>
                }
                
            </View>
        )
    }

}