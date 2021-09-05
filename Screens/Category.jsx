import { FlatList, StyleSheet,View,Text } from "react-native";
import React from 'react'
import { useEffect } from "react";


const Category=(props)=>{
    const {route,navigation}=props


    const navigateToVeggieDescHandler=(data)=>{
        
        navigation.navigate('veggieDsec',{
            veggie:`${data.name}`
        })
    }

    useEffect(()=>{
        navigation.setOptions({
            title:`Store-${route.params.category}`
        })
    },[])

    return (
            <View style={stlyes.container}>
                 <FlatList  data={route.params.plants} keyExtractor={(item,index)=>index.toString()} renderItem={itemData=><Text onPress={navigateToVeggieDescHandler.bind(this,itemData.item)}>{itemData.item.name}</Text>}/>
            
            </View>
    )
}


const stlyes=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
    
    
})


export default Category