import React, { useState, Component } from 'react';
import {ActivityIndicator, View, TouchableOpacity, Text, StyleSheet, Image, Button , Picker, AsyncStorage, Dimensions} from 'react-native';
import PureChart from 'react-native-pure-chart'; 
import { Card, ListItem } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';
const api = require("../api").url;
const trueHeight = Dimensions.get('window').height * 1.5;
const graphHeight = Dimensions.get('window').height * .4;
const trueWidth = Dimensions.get('window').width *.8;

export default class EnergyScreen extends Component {
    constructor(props) { 
        super(props); 
        this.state = { 
            loading: true, 
            selectedValue: "monthly"
        }
    }

    getData() { 

        var emailAddress; 
      
    AsyncStorage.getItem("credentials").then(credentials => {

        emailAddress = JSON.parse(credentials).emailAddress; 

        fetch(`${api}/device/userEnergyBreakdown`, {
            method: "POST", 
            "headers": {
              Accept: "application/json", 
              "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
              "emailAddress": emailAddress
            })
          }).then(response => response.json()).then(response => {this.setState({
              weekly: response.weekly, 
              monthly: response.monthly, 
              yearly: response.yearly,
              filter: response.monthly 
           
            })}).then(() => {
                

                fetch(`${api}/device/scoreboard`, {
                    method: "POST", 
                    "headers": {
                      Accept: "application/json", 
                      "Content-Type": "application/json"
                    }, 
                    body: JSON.stringify({
                      "emailAddress": emailAddress
                    })
                  }).then(response => response.json()).then(response => { this.setState({scoreboard: response.scoreboard})}).then(() => {


                    fetch(`${api}/device/comparison`, {
                        method: "POST", 
                        "headers": {
                          Accept: "application/json", 
                          "Content-Type": "application/json"
                        }, 
                        body: JSON.stringify({
                          "emailAddress": emailAddress
                        })
                      }).then(response => response.json()).then(response => {

                        this.setState({
                            comparison: response.comparison, 
                            loading: false
                        }); 
                        console.log(this.state); 

                      })
                  }); 
            }); 
    }); 
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
                fontSize: 30, 
                paddingTop:10,
                textAlign: 'center'
            }
         });       

        return (         
                <ScrollView>
                <View style={styles.container}>

                    {this.state.loading && 
                                <ActivityIndicator size="large"/>                 
                    }

                    {!this.state.loading && 

                    <View style={{flex:1, alignItems:'center'}}>

                        <Text style={{textAlign:'center', fontSize:20, fontWeight:'500'}}>
                            Personal Statistics
                        </Text>

                        <Picker
                          selectedValue={this.state.selectedValue}
                          style={{ height: 50, width: 150, alignSelf:'center', padding:3, backgroundColor:'#ccfaff', color:'black', textAlign:'center', fontWeight:400 }}
                          onValueChange={(itemValue, itemIndex) => {
                              this.setState({selectedValue: itemValue}); 
                              if (itemValue === "weekly") 
                                  this.setState({"filter": this.state.weekly}); 
                              else if (itemValue === "monthly")
                                  this.setState({"filter": this.state.monthly}); 
                              else if (itemValue === "yearly")
                                  this.setState({"filter": this.state.yearly}); 

                          }}>
                        
                          <Picker.Item label="Monthly" value="monthly" />
                        <Picker.Item label="Weekly" value="weekly" />
                      
                        <Picker.Item label="Yearly" value="yearly" />
                      </Picker>

                        <PureChart 
                        data={this.state.filter} 
                        backgroundColor={"#E5FCFF"}
                        primaryColor={"green"}
                        height={200}
                        type="line"/>

                    <View style={{flex:1, width:trueWidth}}>
                    <Card title="Scoreboard" containerStyle={{backgroundColor:'#ccfaff'}} style={{flex:1, alignItems:'center'}}>
                    {
                      this.state.scoreboard.map((item, i) => (
                        <ListItem                    
                          title={item.emailAddress + " #"+(i+1)}
                          titleStyle={{textAlign:'center', fontSize:18, fontWeight:400}}
                          subtitle={item.value + "Units of energy"}
                          subtitleStyle={{textAlign:'center', fontSize:18, fontWeight:300}}
                          containerStyle={{backgroundColor:'#ccfaff'}}
                          bottomDivider
                          chevron
                  
                        />
                      ))
                    }
                    </Card>
                    </View>
                    
                        <Text style={{textAlign:'center', fontSize:20, fontWeight:'500'}}>You Vs. House</Text>
                        <PureChart data={this.state.comparison} type='pie'/>
                    </View>                   
                    }             
                </View> 
                </ScrollView>
                    
        )
    }
} 