import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default class AddScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tap: null
        }
        this.getData()
    }
    getData = async () => {
        let data = await AsyncStorage.getItem("@tap")
        let data_js = JSON.parse(data)
        console.log(data_js);
    }
    render() {
        return (
            <View style={styles.cont}>
                <TextInput style={styles.input} placeholder="Add Money" keyboardType="number-pad" autoCorrect autoFocus />
                <TouchableOpacity style={styles.btn}> 
                    <Text style={{fontSize:20,color:"white"}}> Add</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    cont: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        padding: 20,
        backgroundColor: "#6D8299"
    },
    input: {
        width: 250,
        height: 55,
        backgroundColor: "white",
        textAlign:'center',
        borderRadius: 10,
    },
    btn:{
        alignItems:'center',
        margin:20,
        width:200,
        height: 60,
        padding:20,
        backgroundColor:"teal",
        justifyContent:'center',
        borderRadius: 10,
        elevation:10
    }
})
