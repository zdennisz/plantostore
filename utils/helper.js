
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
