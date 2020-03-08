import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, TextInput, Text, AsyncStorage, Dimensions, ActivityIndicator, Button } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from "react-native-elements";
const api = require("../api").url; 
const trueHeight = Dimensions.get('window').height * .92;


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
                        <Button
                            title="Demote to dweller"
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
                        />
                    )

                }  else if (this.state.users[i].type === "dweller") { 

                    what = (
                        <Button
                            title="Promote to admin"
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




                               
                        />
                    )

                } else { 
                    what = (
                        <Text>I'm just a kid lol</Text>
                    )
                }





                alright.push(
                    <Card title={this.state.users[i].forename}>
                        <Text>{this.state.users[i].emailAddress}</Text>
                        <Text>{this.state.users[i].type}</Text>
                        {what}
                        <Button
                        title="Remove user"
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
                        />

                        

                    </Card>
                )


            }
      

            }
            return alright;
    }

    render() { 


        return (


            <View>

                {
                    this.state && this.state.loading && 
                    <View>
                         <ActivityIndicator size="large"/>



                    </View>
                }

                {
                    this.state && !this.state.loading && 

                    <View>
                        {this.showUsers()}

                    </View>
                }



            </View>




        )

    }

}