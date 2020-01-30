import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

export default class Example extends Component {
  constructor(){
    super()
    this.state = {
        "data": []
    }
  } 

  getData() { 
    this.state.data = [
        {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
        {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
        {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
        {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
        {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
    ]
  }

  componentWillMount() { 
      this.getData()
  }

  render() {
    //'rgb(45,156,219)'
    return (
      <View style={styles.container}>
        <Text>Your Device Activity</Text>
        <Timeline 
          style={styles.list}
          data={this.state.data}
          lineColor={"orange"}
          circleColor={"orange"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
		paddingTop:65,
		backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
});