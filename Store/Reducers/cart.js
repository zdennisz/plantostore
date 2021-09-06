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

            return {
                ...state,
                cartOrders: { ...state.cartOrders, [action.newItemId]: newItemOrUpdated },
            }

        case PLACE_ORDER:
            return state

        case INC_CART_ORDER:
            const updatedCartItem = { name: state.cartOrders[action.itemId].name, amount: state.cartOrders[action.itemId].amount + 1 }
            const newCartOrders = { ...state.cartOrders, [action.itemId]: updatedCartItem }
            return {
                ...state,
                cartOrders: newCartOrders
            }
        case DEC_CART_ORDER:
            let updatedCartOrders;
            const currAmount = state.cartOrders[action.itemId].amount
            if (currAmount > 1) {
                const updatedCartItem = { name: state.cartOrders[action.itemId].name, amount: state.cartOrders[action.itemId].amount - 1 }
                updatedCartOrders = { ...state.cartOrders, [action.itemId]: updatedCartItem }
            } else {
                updatedCartOrders = { ...state.cartOrders }
                delete updatedCartOrders[action.itemId]
            }
            return {
                ...state,
                cartOrders: updatedCartOrders
            }
        default:
            return state
    }
}






export default cartReducer