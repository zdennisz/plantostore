import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from 'react'



const Card = (props) => {
    const { itemData } = props

    const pressHandler = (element) => {
        props.getVeggieDesc(element.id)
    }
    return (
        <View style={styles.cardContainer}>
            <Text>{itemData.item.name}</Text>
            <View style={styles.cardContentContainer}>
                {itemData.item.plants.map((element, index) => {
                    return (
                        <TouchableOpacity key={index.toString()} style={styles.cardContent} onPress={pressHandler.bind(this, element)}>
                            <Text >{element.name}</Text>
                            <Text>Some Image</Text>
                        </TouchableOpacity>)
                })}
            </View>
        </View>)
}



const styles = StyleSheet.create({
    cardContentContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: 'green',
        borderRadius: 10,
        elevation: 10
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    }
})

export default Card