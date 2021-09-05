import { StyleSheet,View,Text } from "react-native";
import React, { useEffect } from 'react'


const Farm=(props)=>{
    const {route,navigation}=props
    



    useEffect(()=>{
        navigation.setOptions({
            title:`Farm ${route.params.farm}`
        })
    })
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