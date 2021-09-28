import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
            this.send()
        }
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
            <KeyboardAvoidingView style={styles.container}>
            <Text style={{fontSize:23,color:'white',textTransform:'uppercase',marginBottom:70}}>Register Here</Text>
                <TextInput placeholder="Name" placeholderTextColor="white" onChangeText={(e) => this.setState({ name: e })} style={styles.input}></TextInput>
                <TextInput placeholder="Email" placeholderTextColor="white" onChangeText={(e) => this.setState({ email: e })} style={styles.input}></TextInput>
                <TextInput placeholder="Mobile Phone " placeholderTextColor="white" onChangeText={(e) => this.setState({ mobile: e })} style={styles.input}></TextInput>
                <TextInput placeholder="Password" placeholderTextColor="white" onChangeText={(e) => this.setState({ password: e })} secureTextEntry style={styles.input}></TextInput>
                <TextInput placeholder="Confirm Password" placeholderTextColor="white"  onChangeText={(e) => this.setState({ confirmPassword: e })} secureTextEntry style={styles.input}></TextInput>

                <TouchableOpacity style={styles.btn}  onPress={this.check}>
                    <Text style={styles.text}>Sign Up</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent:'center',
        backgroundColor:'#082032'
    },
    input: {
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
        width: "90%",
        padding: 15,
        margin: 10,
        color:'white',
        backgroundColor:'#316B83'
    },
    btn: {
        width: "60%",
        backgroundColor: "#316B83",
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