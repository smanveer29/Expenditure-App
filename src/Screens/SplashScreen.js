import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default class SplashScreen extends Component {
    navigation=""
    constructor(props){
        super(props)
        this.navigation=props.navigation
        this.state={
            user:false
        }
        this.checkUser()
    }
  checkUser = async () => {
    let user = await AsyncStorage.getItem("@user")
    if(user!=null)
    {
      let userData = JSON.parse(user)
      this.setState({ user: userData.user })
      this.navigation.replace("Home")
    }
    else{
        this.navigation.replace("Login")
    }
  }
    render() {
        return (
            <View style={styles.splash}>
                <Image  style={styles.img} source={require("../images/logo.png")}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    splash:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'whitesmoke',
    },
    img:{
        width:200,
        height:200,
    }
})