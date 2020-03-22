import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Button , Picker, AsyncStorage, Dimensions} from 'react-native';
import PureChart from 'react-native-pure-chart'; 
import { ScrollView } from 'react-native-gesture-handler';
const api = require("../api").url;
const trueHeight = Dimensions.get('window').height * 1.5;
const graphHeight = Dimensions.get('window').height * .4;

export default class EnergyScreen extends Component {
    constructor(props) { 
        super(props); 
        this.state = { 
            weekly: [],
            monthly: [],
            yearly: [],
            scoreboardWeekly: [],
            scoreboardMonthly: [],
            scoreboardYearly: [], 
            comparisonWeekly: [],
            comparisonMonthly: [],
            comparisonYearly: [],
            filterLabel: "Weekly"
        }
    }

    getData() { 

        var emailAddress; 
        //get data for line graph
    AsyncStorage.getItem("credentials").then(credentials => {
      emailAddress = JSON.parse(credentials).emailAddress; 
      fetch(`${api}/device/userEnergyBreakdown` /*THIS IS WHERE THE API URL GOES*/, {
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
           weekly: response.weekly, 
           monthly: response.monthly, 
           yearly: response.yearly
       })



    }).then(() => {
        console.log("sate");
        console.log(this.state);
    }); 
})

//get data for bar graph
AsyncStorage.getItem("credentials").then(credentials => {
    emailAddress = JSON.parse(credentials).emailAddress; 
    fetch(`${api}/device/scoreboard` /*THIS IS WHERE THE API URL GOES*/, {
      method: "POST", 
      "headers": {
        Accept: "application/json", 
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        "emailAddress": emailAddress
      })

  }).then(response => response.json()).then(response => {
      console.log(response)


     this.setState({
         scoreboardWeekly: response.weekly,
         scoreboardMonthly: response.monthly,
         scoreboardYearly: response.yearly
     })



  }).then(() => {
      console.log("sate");
      console.log(this.state);
  }); 
})


//get data for pie graph
AsyncStorage.getItem("credentials").then(credentials => {
    emailAddress = JSON.parse(credentials).emailAddress; 
    fetch(`${api}/device/comparison` /*THIS IS WHERE THE API URL GOES*/, {
      method: "POST", 
      "headers": {
        Accept: "application/json", 
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        "emailAddress": emailAddress
      })

  }).then(response => response.json()).then(response => {
      console.log(response)


     this.setState({
         comparisonWeekly: response.weekly,
         comparisonMonthly: response.monthly,
         comparisonYearly: response.yearly
     })



  }).then(() => {
      console.log("sate");
      console.log(this.state);
  }); 
})
        
       
        this.state.filter = this.state.weekly;
    }



    componentWillMount() { 
        this.getData(); 
    }

    render() {
        const styles = StyleSheet.create({
            container: {
                flex:1,
                backgroundColor: '#E5FCFF',
                alignItems: 'center',
                justifyContent: "space-between",
                height: trueHeight
            },
            textStyle: {
                color: 'black',
                fontSize: 30, 
                paddingTop:10,
                textAlign: 'center'
            }
         });

        return (
            <ScrollView nestedScrollEnabled={true}>
                <View style={styles.container}>
                <View>
                    <Picker
                        selectedValue={this.state.time}
                        style={{height: 50, width: 100, backgroundColor:'#ccfaff'}}
                        onValueChange={(itemValue, itemIndex) => {
                            switch(itemValue) { 
                                case "weekly": 
                                    this.setState({time: itemValue, filter: this.state.weekly, filter2: this.state.scoreboardWeekly});
                                    break; 
                                case "monthly": 
                                    this.setState({time: itemValue, filter: this.state.monthly, filter2: this.state.scoreboardMonthly});
                                    break;
                                case "yearly": 
                                    this.setState({time: itemValue, filter: this.state.yearly, filter2: this.state.scoreboardYearly});
                                    break;  
                            }
                        }
                        }>
                        <Picker.Item label="Weekly" value="weekly"/>
                        <Picker.Item label="Monthly" value="monthly"/>
                        <Picker.Item label="Yearly" value="yearly"/>
                    </Picker>
                    </View>
                    
                    <View style={{height: graphHeight}}>
                    <Text style={styles.textStyle}>Personal Statistics</Text>
                    <ScrollView horizontal={true} nestedScrollEnabled={true} >
                    <PureChart data={this.state.filter}
                    backgroundColor={"#ccfaff"} 
                    primaryColor = {"black"}
                    height = {200}
                    type="line"/>
                    </ScrollView></View>

                    <Text style={styles.textStyle}>Scoreboard</Text>
                    <View>
                        <PureChart data={this.state.scoreboardWeekly}
                        backgroundColor={"#E5FCFF"}
                        type={"bar"}
                        height = {200}
                        primaryColor={"black"}/>
                    </View>

                    <Text style={styles.textStyle}>Comparison</Text>
                    <View>
                        <PureChart data={this.state.comparison} type='pie' />
                    </View>
                
                <View style={{flex:1}}></View>
                </View>
            </ScrollView>
        )
    }
} 