import { StyleSheet, Text, View } from "react-native";
import React from 'react'



const Card = (props) => {
    const { itemData } = props

    return (
        <View style={styles.cardContainer}>
            <Text>{itemData.item.name}</Text>
            <View style={styles.cardContentContainer}>
                {itemData.item.plants.map((item, index) => {
                    return (
                        <View style={styles.cardContent} key={index.toString()}  >
                            <Text >{item.name}</Text>
                            <Text>Some Image</Text>
                        </View>)
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