import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Haptics from 'expo-haptics';
export const flatListItemParser = (dataStructure) => {
    // Parse items for the flatlist array
    const cartItems = []
    for (const key in dataStructure) {
        cartItems.push({
            id: key,
            name: dataStructure[key].name,
            amount: dataStructure[key].amount
        })
    }

    // Sort data to prevent flat list reordering the items
    return cartItems.sort((a, b) => a.id < b.id ? 1 : -1)

}

export const isValidEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
};

export const saveLocalStorageData = (localStorageKey, farm) => {
    try {
        AsyncStorage.setItem(localStorageKey, JSON.stringify({ ...farm }));
    } catch (err) {
        console.error(err);
    }
};

export const saveExternalStorageData = (farmData, farmId, userId) => {
    const data = { ...farmData }
    const url = `https://plantostore-33e3d-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/${farmId}.json`
    axios.put(url, data).then((success) => {

    }).catch((err) => {
        console.error(err)
    })

}

export const loadExternalStorageData = async (userId, farmType) => {
    const url = `https://plantostore-33e3d-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/${farmType}.json`
    return axios.get(url)
}

export const hapticFeedback = (style) => {
    //preform light haptic feedback
    switch (style) {
        case 'light':
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            break;
        case 'medium':
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            break;
        default:
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            break;
    }
}