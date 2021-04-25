import React,{Component} from 'react'
import{View,Text,StyleSheet,Image,TouchableOpacity,TextInput,Alert,Modal,KeyboardAvoidingView, ScrollView} from 'react-native'

export default class ExchangeScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            userId: firebase.auth().currentUser.email,
            itemName:'',
            reasonToAddItem:''
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }

    addItem = (itemName,reasonToAddItem) => {
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('add_Item').add({
            user_Id:userId,
            item_Name:itemName,
            reason_Add_Item:reasonToAddItem,
            request_Id: randomRequestId
        })
        this.setState({
            itemName:'',
            reasonToAddItem:''
        })
        return Alert.alert('itemRequestedSuccessfully')
    }
    render(){
        return(
            <View>
                <MyHeader title ={'AddItem'}/>
                <KeyboardAvoidingView>
                    <TextInput
                    style = {styles.formTextInput}
                    placeholder = {"enter the item name"}
                    onChangeText = {(text)=>{
                        this.setState({
                            itemName:text
                        })
                    }}
                    value = {this.state.itemName}
                    />

                    <TextInput
                    style = {[styles.formTextInput,{height:300}]}
                    numberOfLines = {8}
                    multiline
                    placeholder = {"why do you need the item"}
                    onChangeText = {(text)=>{
                        this.setState({
                        reasonToAddItem:text
                        })
                    }}
                    value ={this.state.reasonToAddItem}
                    />

                    <TouchableOpacity
                    style = {styles.button}
                    onPress = {()=>{this.addItem(this.state.itemName,this.state.reasonToAddItem)}}>
                        <Text>AddItem</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button:{
        width:300,
        length:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor: 'blue',
        shadowColor:'brown',
        shadowOffset:{
            width:0,
            height:8,
        },
        shadowOpacity:0.30,
        textShadowRadius:10.32,
        elevation:16
    },
    formTextInput:{
        width:"75%", 
        height:35, 
        alignSelf:'center', 
        borderColor:'#ffab91', 
        borderRadius:10, 
        borderWidth:1, 
        marginTop:20, 
        padding:10, 
       },
})