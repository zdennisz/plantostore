import { StyleSheet,View,Text, Platform } from "react-native";
import React, { useEffect } from 'react'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButtons";


const Farm=(props)=>{
    const {route,navigation}=props
    
    const goToCart=()=>{
        navigation.navigate('cart')
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
                      onPress={goToCart}/>
                  
                </HeaderButtons>
            )
            
        });
    },[]);
    
    return (
            <View></View>
    )
}


const stlyes=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
    
    
})


export default Farm