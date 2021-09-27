import React, { Component } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default class LoginScreen extends Component {
    navigation = ""
    url="http://65.0.239.13/bidding/api/user/login"
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            user: false,
            isLoading: false
        }
        this.navigation = props.navigation
    }
    showLoading=(flag)=>{
        this.setState({isLoading:flag})
    }
    storeData = async (flag) => {
        let data = {
            user: true,
            userName:flag
        }
        let data_json = JSON.stringify(data)
        AsyncStorage.setItem("@user", data_json)
    }
    goHome = () => {
        this.navigation.replace("Home")
    }
    check = () => {
        let body={
            email:this.state.username,
            password:this.state.password,
        }
        axios.post(this.url,body)
        .then((res)=>{
            if(res.data.status==true){
                this.showLoading(true)
                this.storeData(res.data.user.name)
                this.navigation.replace("Home")
            }
            else{
                alert(res.data.errors[0])
            }
            console.log(res.data);
        })
        .catch((err)=>{
            console.log("Something Went wrong");
        })
    }

    render() {
        return (
            <View style={styles.container}>
            
                <TextInput placeholder="Username" onChangeText={(e) => this.setState({ username: e })} style={styles.input}></TextInput>
                <TextInput placeholder="Password" onChangeText={(e) => this.setState({ password: e })} secureTextEntry style={styles.input}></TextInput>
                <TouchableOpacity style={styles.btn} onPress={this.check}>
                    <Text style={styles.text} >Login</Text>
                </TouchableOpacity>

                <Text style={styles.line}>_______________  OR  _______________</Text>

                <View style={styles.reg}>
                    <Text style={{ color: 'white' }}>New Account ? </Text>
                    <TouchableOpacity style={styles.regBtn} onPress={() => {
                        this.navigation.navigate("Register")
                    }}>
                        <Text style={styles.text}>Register</Text>
                    </TouchableOpacity>
                </View>

                {
                    this.state.isLoading ?
                        <ActivityIndicator size="large" color="orange" />
                        : null
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#22577A"
    },
    img:{
        width:100,
        height:100
    },
    input: {
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 30,
        width: "80%",
        padding: 15,
        margin: 20,
    },
    btn: {
        width: "60%",
        backgroundColor: "#00A19D",
        alignItems: "center",
        padding: 15,
        margin: 10,
        borderRadius: 30,
        elevation: 10
    },
    reg: {
        flexDirection: "row",
        alignItems: "center",
    },
    line: {
        color: 'white',
        fontSize: 14,
    },
    regBtn: {
        width: 150,
        backgroundColor: "#00A16D",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
        margin: 10,
        borderRadius: 30,
        elevation: 10
    },
    text: {
        fontSize: 18,
        textTransform: "uppercase",
        color: "white"
    }
})