import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Button , Picker, AsyncStorage, Dimensions, ActivityIndicator, Alert} from 'react-native';
import PureChart from 'react-native-pure-chart'; 
import { ScrollView } from 'react-native-gesture-handler';
const api = require("../api").url;
const trueHeight = Dimensions.get('window').height * .92;
const graphHeight = Dimensions.get('window').height * .4;
import { Card } from "react-native-elements"; 
// var popupS = require('popups');

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
      const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#E5FCFF',
            height: trueHeight,
        },
        textStyle: {
            color: 'black',
            fontSize: 20,
            fontWeight:'600',
            textAlign:'center'
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
            // borderColor: 'gray',
            paddingVertical:5,
            borderRadius:10
        },
        tabs: {
            paddingHorizontal:10,
            paddingVertical:10
        },
        tabTextStyle: {
            color:'black',
            fontSize:20,
            fontWeight:'600'
        }
      });
        return ( 
            <ScrollView contentContainerStyle={styles.container}>
               <View style={{flexDirection:'row', alignSelf:'center'}}>
                <TouchableOpacity 
                    style={styles.tabs}
                    onPress={() => this.props.navigation.navigate('UserInfo')}>
                        <Text style={{borderBottomColor:'#41B3A3', borderBottomWidth:2, fontSize:20, color:'black', fontWeight:'600'}}>User Details</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity 
                    style={styles.tabs}
                    onPress={() => this.props.navigation.navigate("ManageUsers")}>
                        <Text style={styles.tabTextStyle}>User Management</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.tabs}
                    onPress={() => this.props.navigation.navigate('Pending')}>
                        <Text style={styles.tabTextStyle}>Requests</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:1}}>
                {
                    this.state.loading && 
                    <ActivityIndicator size="large" />
                    
                }

                {
                    !this.state.loading && 

                    <Card containerStyle={{backgroundColor:'#ccfaff'}}title = {this.state.user.forename + " " + this.state.user.surname}>

                <Card containerStyle={styles.cardStyle} title = "Email Address" titleStyle={{color:'gray'}}><Text style={styles.textStyle}>{this.state.user.emailAddress}</Text></Card>

                <Card containerStyle={styles.cardStyle} title = "Date of Birth" titleStyle={{color:'gray'}}><Text style={styles.textStyle}>{this.state.user.dob}</Text></Card>

                <Card containerStyle={styles.cardStyle} title = "User Type" titleStyle={{color:'gray'}}><Text style={styles.textStyle}>{this.state.user.type}</Text></Card>

                <Card containerStyle={styles.cardStyle} title = "Hub ID" titleStyle={{color:'gray'}}><Text style={styles.textStyle}>{this.state.user.hub}</Text></Card>

                <TouchableOpacity 
                style={{padding:10, borderRadius:10, backgroundColor:'#c34242'}}
                onPress={() => {
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
                }}>
                  <Text style={{color:'white', fontSize:15, fontWeight:'600', textAlign:'center'}}>Remove Recorded Data</Text>
                  </TouchableOpacity>


                <TouchableOpacity 
                style={{padding:10, borderRadius:10, backgroundColor:'#8EE4AF'}}
                onPress={() => {
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
                }}>
                  <Text style={{color:'black', fontSize:15, fontWeight:'600', textAlign:'center'}}>Download Data</Text>
                  </TouchableOpacity>

                </Card>              
                }
            </View>
            </ScrollView>
        )
    }


}