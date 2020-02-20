import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const trueHeight = Dimensions.get('window').height * 1.5;

const styles = (props) => {
    const styles = StyleSheet.create({
        container: {
            flex:1,
            height: trueHeight,
            alignItems: 'center',
            backgroundColor:'black',
            height: trueHeight,
        },
        textStyle: {
            color: 'white',
            textAlign: 'center'
        },
        titleStyle: {
            color:'#FF9800',
            textAlign: 'center'
        },
        imageStyle: {
            height: 300,
            width: 300
        },
        button: {
            backgroundColor: '#FF9800',
            height: 50,
            width: 75,
            alignSelf: 'center',
            alignContent: 'center',
            margin: 20,
            borderRadius:10
        },
        submit: {
            color: 'white',
            textAlignVertical: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: 20,
            flex:1
        },
    });
}
export default styles;