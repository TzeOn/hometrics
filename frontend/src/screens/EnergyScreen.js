import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Button , Picker, AsyncStorage, Dimensions} from 'react-native';
import PureChart from 'react-native-pure-chart'; 
import { ScrollView } from 'react-native-gesture-handler';
const api = require("../api").url;
const trueHeight = Dimensions.get('window').height * 1.5;

export default class EnergyScreen extends Component {
    constructor(props) { 
        super(props); 
        this.state = { 
            weekly: [],
            monthly: [],
            yearly: [],
            scoreboard: null, 
            comparison: [],
            filterLabel: "Weekly"
        }
    }

    getData() { 

        var emailAddress; 
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
           monthly: response.weekly, 
           weekly: response.monthly, 
           yearly: response.yearly
       })



    }).then(() => {
        console.log("sate");
        console.log(this.state);
    }); 
})
        
        this.state.scoreboard = [
            {x: "Yaseen", y: 1}, 
            {x: "Lee", y: 2}, 
            {x: "Eoghann", y: 3},
            {x: "Ram", y:4},
            {x: "Mike", y:5}
        ];
        this.state.comparison = [
            {
                value: 50,
                label: 'House',
                color: 'blue',
            },
            {
                value: 25,
                label: 'You',
                color: 'orange'
            }
        ]
        this.state.filter = this.state.weekly;
    }



    componentWillMount() { 
        this.getData(); 
    }

    render() {
        const styles = StyleSheet.create({
            container: {
                flex:1,
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: "space-between",
                height: trueHeight
            },
            textStyle: {
                color: 'white',
                fontSize: 30, 
                paddingTop:10
            }
         });

        return (
            <ScrollView nestedScrollEnabled={true}>
                <View style={styles.container}>
                    <Picker
                        selectedValue={this.state.time}
                        style={{height: 50, width: 100, backgroundColor:'#FF9800'}}
                        onValueChange={(itemValue, itemIndex) => {
                            switch(itemValue) { 
                                case "weekly": 
                                    this.setState({time: itemValue, filter: this.state.weekly});
                                    break; 
                                case "monthly": 
                                    this.setState({time: itemValue, filter: this.state.monthly});
                                    break;
                                case "yearly": 
                                    this.setState({time: itemValue, filter: this.state.yearly});
                                    break;  
                            }
                        }
                        }>
                        <Picker.Item label="Weekly" value="weekly"/>
                        <Picker.Item label="Monthly" value="monthly"/>
                        <Picker.Item label="Yearly" value="yearly"/>
                    </Picker>
                    
                    <Text style={styles.textStyle}>Personal Statistics</Text>
                    <ScrollView horizontal={true} nestedScrollEnabled={true} >
                    <PureChart data={this.state.filter}
                    backgroundColor={"black"} 
                    primaryColor = {"white"}
                    height = {200}
                    type="line"/>
                    </ScrollView>

                    <Text style={styles.textStyle}>Scoreboard</Text>
                    <View>
                        <PureChart data={this.state.scoreboard}
                        backgroundColor={"black"}
                        type={"bar"}
                        height = {200}
                        primaryColor={"white"}/>
                    </View>

                    <Text style={styles.textStyle}>Comparison</Text>
                    <View>
                        <PureChart data={this.state.comparison} type='pie' />
                    </View>
                </View>
                <View style={{flex:1}}></View>
            </ScrollView>
        )
    }
} 