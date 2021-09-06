import { ADD_TO_CART, PLACE_ORDER, INC_CART_ORDER, DEC_CART_ORDER } from "../Actions/cart"

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
                newItemOrUpdated = { name: action.newItemName, amount: 1 }

            }
            console.log(newItemOrUpdated)
            return {
                ...state,
                cartOrders: { ...state.cartOrders, [action.newItemId]: newItemOrUpdated },
            }

        case PLACE_ORDER:
            return state

        case INC_CART_ORDER:
            return state;
        case DEC_CART_ORDER:
            return state;
        default:
            return state
    }
}






export default cartReducer