import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Text, AsyncStorage } from "react-native";
import { Card } from "react-native-elements"; 
import Timeline from "react-native-timeline-flatlist";
const api = require("../api").url; 

export default class Example extends Component {
  constructor(props){
    super(props); 
    this.state = {
      loading: true
    }
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
      }).then(response => response.json()).then(response => this.setState({data: response.deviceActivity, loading: false})); 
    })
  }

  componentWillMount() { 
    this.getData()
  }

  showActivity() { 
    var timeline = [];
    for (var i=0; i<this.state.data.deviceActivity.length; i++) {
      let activity = this.state.data.deviceActivity[i]; 
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
    return (
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Your Device Activity</Text>

        {
          this.state.loading && 
          <View>
            <ActivityIndicator size="large"/>
          </View>
        }

        { 
          this.state && this.state.data &&
          <View> 
            <Timeline
              data={this.state.data}
              circleSize={20}
              circleColor='rgb(45,156,219)'
              lineColor='rgb(45,156,219)'
              timeContainerStyle={{minWidth:52, marginTop: -5}}
              timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'black', padding:5, borderRadius:13}}
              descriptionStyle={{color:'gray'}}
              options={{style:{paddingTop:5}}}
            />
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
    backgroundColor:'#E5FCFF',
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