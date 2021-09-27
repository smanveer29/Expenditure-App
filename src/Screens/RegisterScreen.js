import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import axios from 'axios'

export default class RegisterScreen extends Component {
    response = ""
    navigation = ""
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            mobile: "",
            password: "",
            confirmPassword: "",
            user: false
        }
        this.navigation = props.navigation
    }
    check=()=>{
        if(this.state.name=="" && this.state.email=="" && this.state.mobile=="" && this.state.password=="" && this.state.confirmPassword==""){
            alert("Please fill all feilds")
        }
        else{
            this.register()
        }
    }
    register=()=>{
        this.send()
        this.store()
        this.navigation.replace("Home")
    }
    store= async (flag)=>{
        let data={
            user:true,
            userName: flag,
        }
        let data_json = JSON.stringify(data)
        AsyncStorage.setItem("@user",data_json)
    }
    send = async () => {
        let data = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            password: this.state.password,
            password_confirmation: this.state.confirmPassword,
        }
        axios.post("http://65.0.239.13/bidding/api/user/signup", data)
            .then((res) => {
                if(res.data.status==true){
                    this.store(res.data.user.name)
                    this.navigation.replace("Home")
                }
                else{
                    alert(res.data.errors[0])
                }
            })
            .catch((e) =>{
                alert("Something went wrong!")
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder="Name" onChangeText={(e) => this.setState({ name: e })} style={styles.input}></TextInput>
                <TextInput placeholder="Email" onChangeText={(e) => this.setState({ email: e })} style={styles.input}></TextInput>
                <TextInput placeholder="Mobile Phone " onChangeText={(e) => this.setState({ mobile: e })} style={styles.input}></TextInput>
                <TextInput placeholder="Password" onChangeText={(e) => this.setState({ password: e })} secureTextEntry style={styles.input}></TextInput>
                <TextInput placeholder="Confirm Password" onChangeText={(e) => this.setState({ confirmPassword: e })} secureTextEntry style={styles.input}></TextInput>

                <TouchableOpacity style={styles.btn}  onPress={this.check}>
                    <Text style={styles.text}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#22577A"
    },
    input: {
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 30,
        width: "80%",
        padding: 15,
        margin: 10,
    },
    btn: {
        width: "60%",
        backgroundColor: "#00A19D",
        alignItems: "center",
        padding: 15,
        margin: 60,
        borderRadius: 30,
        elevation: 10
    },
    text: {
        fontSize: 18,
        fontWeight:"800",
        textTransform: "uppercase",
        color: "white"
    }
})