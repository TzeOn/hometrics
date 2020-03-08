import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, TextInput, Text, AsyncStorage, Dimensions, ActivityIndicator, Button } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from "react-native-elements";
const api = require("../api").url; 
const trueHeight = Dimensions.get('window').height * .92;
const trueWidth = Dimensions.get('window').width * 1;
const but = trueWidth * .25;


export default class ManageUsersScreen extends React.Component { 

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

           fetch(`${api}/admin/getUsers`, {
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
        var alright= []; 
        var current;
            for (let i=0; i<this.state.users.length; i++) {

    
                current = this.state.users[i]; 
               

                if (current !== undefined) { 
                var what; 
                if (this.state.users[i].type === "admin") { 
                    what = (
                        <TouchableOpacity
                            // title="Demote to dweller"
                            style={{padding:10, borderRadius:10, backgroundColor:'#E27D60'}}
                            onPress={() => {
                                console.log(this.state.users[i].emailAddress); 
                                fetch(`${api}/admin/changeUser`, {
                                    method: "POST", 
                                    "headers": {
                                      Accept: "application/json", 
                                      "Content-Type": "application/json"
                                    }, 
                                    body: JSON.stringify({
                                      "emailAddress": this.state.users[i].emailAddress,
                                      "type": "dweller"
                                    })
                                  }).then(response => JSON.stringify(response)).then(response => {
                                      console.log("HIHIHIHIHIHI"); 
                                     
                                      this.state.users[i].type = "dweller";
                                      this.setState({users: this.state.users})
                                      console.log(response);
    
                                 
                                  })
                            }}
                        >
                        <Text style={{color:'black', fontSize:25, textAlign:'center'}}>Demote to Dweller</Text>
                        </TouchableOpacity>
                    )

                }  else if (this.state.users[i].type === "dweller") { 

                    what = (
                        <TouchableOpacity
                            // title="Promote to admin"
                            style={{padding:10, borderRadius:10, backgroundColor:'#8EE4AF'}}
                            onPress={() => {
                                console.log(this.state.users[i].emailAddress); 
                                fetch(`${api}/admin/changeUser`, {
                                    method: "POST", 
                                    "headers": {
                                      Accept: "application/json", 
                                      "Content-Type": "application/json"
                                    }, 
                                    body: JSON.stringify({
                                      "emailAddress": this.state.users[i].emailAddress,
                                      "type": "admin"
                                    })
                                  }).then(response => JSON.stringify(response)).then(response => {
                                      console.log("HIHIHIHIHIHI"); 
                                     
                                      this.state.users[i].type = "admin";
                                      this.setState({users: this.state.users})
                                      console.log(response);  
                                 
                                  })
                            }}                              
                        >
                        <Text style={{color:'black', fontSize:25, textAlign:'center'}}>Promote to Admin</Text>
                        </TouchableOpacity>
                    )

                } else { 
                    what = (
                        <Text>I'm just a kid lol</Text>
                    )
                }

                alright.push(
                    <Card title={this.state.users[i].forename}
                        titleStyle={{fontSize:25}}
                        containerStyle={{
                            backgroundColor: '#ccfaff',
                            borderColor: 'gray',
                            paddingVertical:5,
                            borderRadius:10}}>
                        <Text style={{color:'gray', fontSize:15, textAlign:'center'}}>Email </Text>
                        <Text style={{fontSize:20, fontWeight:'600', textAlign:'center', paddingBottom:10}}>{this.state.users[i].emailAddress}</Text>
                        <Text style={{color:'gray', fontSize:15, textAlign:'center'}}>User Type </Text>
                        <Text style={{fontSize:20, fontWeight:'600', textAlign:'center', paddingBottom:10}}>{this.state.users[i].type}</Text>
                        {what}
                        <TouchableOpacity
                        // title="Remove user"
                        style={{padding:10, borderRadius:10, backgroundColor:'#c34242'}}
                        onPress={() => {
                            console.log("check bleow")
                            console.log("i am gp del " + current.emailAddress);

                            //
                            fetch(`${api}/admin/deleteUser`, {
                                method: "POST", 
                                "headers": {
                                  Accept: "application/json", 
                                  "Content-Type": "application/json"
                                }, 
                                body: JSON.stringify({
                                  "emailAddress": current.emailAddress
                                })
                              }).then(response => JSON.stringify(response)).then(response => {
                                  console.log("HIHIHIHIHIHI"); 
                                  console.log(this.state.users[i])
                                  this.state.users[i] = undefined;
                                  this.setState({users: this.state.users})
                              })
                        }}
                        >
                        <Text style={{color:'black', fontSize:25, textAlign:'center'}}>Remove User</Text>
                        </TouchableOpacity>
                    </Card>
                )

            }
            }
            return alright;
    }

    render() { 

        const styles = StyleSheet.create({
            container: {
                flex:1,
                backgroundColor: '#E5FCFF',
                // alignItems: 'center',
                // flexDirection:'row',
                // justifyContent:'flex-start',
                // flexWrap:'wrap',
                height: trueHeight,
            },
            textStyle: {
                color: 'black'
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
                color:'black',
                fontSize:20,
                fontWeight:'600'
            }
        });

        return (
            
            <ScrollView style={styles.container}>
                <View style={{flexDirection:'row', alignSelf:'center'}}>
                <TouchableOpacity 
                    style={styles.tabs}
                    onPress={() => this.props.navigation.navigate('Settings')}>
                        <Text style={styles.tabTextStyle}>User Details</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity 
                    style={styles.tabs}
                    onPress={() => this.props.navigation.navigate("ManageUsers")}>
                        <Text style={{borderBottomColor:'#41B3A3', borderBottomWidth:2, fontSize:20, color:'black', fontWeight:'600'}}>User Management</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.tabs}
                    onPress={() => this.props.navigation.navigate('Pending')}>
                        <Text style={styles.tabTextStyle}>Requests</Text>
                    </TouchableOpacity>
                    </View>
                {
                    this.state && this.state.loading && 
                    <View>
                         <ActivityIndicator size="large"/>



                    </View>
                }

                {
                    this.state && !this.state.loading && 

                    <View style={{flex:1}}>
                        {this.showUsers()}

                    </View>
                }



            </ScrollView>




        )

    }

}