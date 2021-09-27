import React, { Component } from 'react'
import { StyleSheet, View , Text } from 'react-native'
import axios from 'axios'
export default class UserList extends Component {
    user=""
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
        }
        this.getUser()
    }
    getUser=()=>{
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((res)=>{
            this.user=res.data
            console.log(this.user);
            this.setState({
                isLoading:false,
            })
        })
        .catch((e)=>{console.log(e);})
    }

    showUser=()=>
    {
        let data=[]
        for(let i=0;i<this.user.length;i++){
            let title=this.user[i].title
            data.push(<View style={styles.users}>
                <Text>{title}</Text>
            </View>)
        }
        return data
    }
    render() {
        return (
            <View style={styles.container}>
               {this.state.isLoading ? null :  this.showUser()}
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },users:{
        flex:1
    }
})
