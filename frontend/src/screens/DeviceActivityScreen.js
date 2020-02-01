import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, TextInput, Text, AsyncStorage } from "react-native";
import { Card } from "react-native-elements"; 
import Timeline from "react-native-timeline-flatlist";
const api = require("../api").url; 

export default class Example extends Component {
  constructor(props){
    super(props)
  } 

  getData() { 
    var emailAddress; 
    AsyncStorage.getItem("credentials").then(credentials => {
      emailAddress = JSON.parse(credentials).emailAddress; 
      console.log(emailAddress);
      fetch(`${api}/device/activity`, {
        method: "POST", 
        "headers": {
          Accept: "application/json", 
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
          "emailAddress": emailAddress
        })

      }).then(response => response.json()).then(response => {this.setState({data: response.deviceActivity});}); 
    })
  }

  componentWillMount() { 
    this.getData()
  }

  showActivity() { 
    console.log("ehhhh");
    console.log(this.state.data.deviceActivity);
    var timeline = [];
    for (var i=0; i<this.state.data.deviceActivity.length; i++) {
      let activity = this.state.data.deviceActivity[i]; 
      console.log(activity); 
      timeline.push(
        <Card title={activity.startTime}>
          <Text>{activity.device}</Text>
          <Text>{activity.duration}</Text>
        </Card>
      )
    } 
    return timeline.reverse(); 
  }

  render() {
    //'rgb(45,156,219)'
    return (
      <View style={styles.container}>
        { this.state && this.state.data &&
                <View>
                    
                    <Text style={styles.headerStyle}>Your Device Activity</Text>
                    <Timeline
          data={this.state.data}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5}
          }}
        />

                    <Text>Anything under here is idk</Text>
                    <Card title="eh">

                    </Card>

                </View>
            }
        
      </View>

      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white',
    alignItems:'center',
  },
  list: {
    flex: 1,
    marginTop:20,

  },
  headerStyle: {
    fontSize: 30,
    textAlign: 'center'
  },
});