import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import WriteStoryScreen from './WriteStoryScreen';
import { render } from 'react-dom';
import ReadStoryScreen from './ReadStoryScreen'
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            emailId:"",
            password:"",
        }
    }
  
authUser=async(emailId,password)=>{
    if(emailId && password){
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(emailId,password)
            // const disabledaccount=await firebase.auth().FirebaseAuthInvalidUserException();
            if(response){
             this.props.navigation.navigate('Write');
             alert("Welcome, " + emailId + ". You are being redirected to the StoryHub dashboard.");
            }
            // if(disabledaccount){
            //     alert("Hello "+emailId+". For some reason, it appears that your account has been disabled. This is all we know. Please contact codersaregreat119@gmail.com for more details.")
            // }
        } catch (error) {
            switch(error.code){
                case 'auth/user-not-found':
                    alert("It appears that you don't have an account with Storyhub, "+ emailId +". Please create an account, and then come back to this page! 🧾");
                break;
                case 'auth/invalid-email':
                    alert("Your email is invalid. You should format it to be something like example@domain.com.");
                    break;
                case 'auth/wrong-password':
                    alert("Your password is invalid, "+ emailId + "! Please enter the correct password to continue.")
                    break;
                // case 'auth/disabled-account':
                //     alert("Your account has been disabled, "+ emailId + ".");
                //     break;
            }
        }
    }else{
        alert("It appears that you have not entered a username or password. Please enter them to continue to StoryHub.");
    }
}


render(){
    return(
        <View>
        <Text style={styles.title}> Login To StoryHub</Text>
        <TextInput style={styles.loginBox} placeholder="Email(example@domain.com) " keyboardType='email-address'
        onChangeText={text=>{
            this.setState({
                emailId:text
            })
        }}
        />
      <TextInput style={styles.loginBox} placeholder="Enter Your Password" secureTextEntry={true}
      onChangeText={text=>{
          this.setState({
              password:text
          })
      }}
      />
      <TouchableOpacity onPress={()=>{
          this.authUser(
              this.state.emailId,this.state.password
          )
      }} style={styles.text}>
        <Text>Login</Text>      
      </TouchableOpacity>
        </View>
    )
}

}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        marginTop:50,
        backgroundColor:'white',
    },
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
        alignSelf:"center",
        justifyContent: 'center',
        borderColor:"turquoise"
    },
    text:{
        fontSize:30,
        textAlign:"center",
        marginBottom:50,
        alignSelf:"center",
        backgroundColor:'turquoise',
        height:60,
        width:120,
        paddingTop:13,
        borderWidth:3,
        borderRadius:1,
        justifyContent:"center"
    },

    title:{
        fontSize: 40,
        textAlign:'center',
        alignSelf: 'center',
        backgroundColor:"grey"
    }
})
