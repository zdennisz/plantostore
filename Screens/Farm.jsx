import { StyleSheet,View,Text, Platform } from "react-native";
import React, { useEffect } from 'react'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButtons";


const Farm=(props)=>{
    const {route,navigation}=props
    
    const goToCart=()=>{
        navigation.navigate('cart')
    }
    const goToStore=()=>{
        navigation.navigate('store')
    }
   

    useEffect(()=>{
        navigation.setOptions({
            title:`Farm ${route.params.farm}`,
            headerRight:()=>(
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item 
                    title='Cart'
                    iconName={Platform.OS ==='android'?'md-cart':'ios-cart'}
                    onPress={goToCart}/>
                    <Item
                      title='Store'
                      iconName={Platform.OS ==='android'?'md-add-circle-sharp':'ios-add-sharp'}
                      onPress={goToStore}/>
                  
                </HeaderButtons>
            )
            
        });
    },[]);
    
    return (
            <View style={stlyes.container}>
                <Text style={stlyes.text}>My Farm :</Text>
                
            <View></View></View>
    )
}


const stlyes=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'flex-start'
    },
    text:{
        flex:1,
        width:100,
        marginTop:25,
        marginStart:10,
        fontSize:23

    }
    
    
})


export default Farm