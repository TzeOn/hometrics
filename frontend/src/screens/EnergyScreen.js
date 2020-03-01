import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, AsyncStorage, Dimensions } from 'react-native';
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
            fetch(`${api}/device/userEnergyBreakdown`, {
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
                paddingTop:10
            }
         });

        return (
            <ScrollView nestedScrollEnabled={true}>
                <View style={styles.container}>
                    <Picker
                        selectedValue={this.state.time}
                        style={{height: 50, width: 100, backgroundColor:'#ccfaff'}}
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
                    <ScrollView horizontal={true} nestedScrollEnabled={true}>
                        <PureChart data={this.state.filter}
                        backgroundColor={"#ccfaff"} 
                        primaryColor = {"black"}
                        height = {200}
                        type="line"/>
                    </ScrollView>

                    <Text style={styles.textStyle}>Scoreboard</Text>
                    <View>
                        <PureChart data={this.state.scoreboard}
                        backgroundColor={"#E5FCFF"}
                        type={"bar"}
                        height = {200}
                        primaryColor={"black"}/>
                    </View>

                    <Text style={styles.textStyle}>Comparison</Text>
                    <View>
                        <PureChart data={this.state.comparison} type='pie'/>
                    </View>
                </View>
                <View style={{flex:1}}></View>
            </ScrollView>
        )
    }
} 