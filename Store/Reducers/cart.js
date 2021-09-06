import { ADD_TO_CART } from "../Actions/cart"

const initialState = {
    cartOrders: {},
    pastOrders: []
}


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            let newItemOrUpdated;
            if (state.cartOrders[action.newItemId]) {
                //already have the item in the cart
                newItemOrUpdated = { amount: state.cartOrders[action.newItemId].amount + 1, name: action.newItemName }

            } else {
                //add new
                newItemOrUpdated = { id: action.newItemId, name: action.newItemName, amount: 1 }

            }
            console.log(newItemOrUpdated)
            return {
                ...state,
                cartOrders: { ...state.cartOrders, [action.newItemId]: newItemOrUpdated },

            }

        default:
            return state
    }
}






export default cartReducer