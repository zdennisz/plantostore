export const ADD_TO_CART = "ADD_TO_CART"

export const add_to_cart = (data) => {
    return { type: ADD_TO_CART, newItemId: data.id, newItemName: data.name }
}