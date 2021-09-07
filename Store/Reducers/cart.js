import { ADD_TO_CART, PLACE_ORDER, INC_CART_ORDER, DEC_CART_ORDER, RESTORE_CART_ORDER } from "../Actions/cart"

const initialState = {
    farmA: {
        cartOrders: {},
        pastOrders: {}
    },
    farmB: {
        cartOrders: {},
        pastOrders: {}
    }
}


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            let newItemOrUpdated;
            switch (action.cart) {
                case 'farmA':
                    if (state.farmA.cartOrders[action.newItemId]) {
                        //already have the item in the cart
                        newItemOrUpdated = { amount: state.farmA.cartOrders[action.newItemId].amount + 1, name: action.newItemName }

                    } else {

                        //add new
                        newItemOrUpdated = { name: action.newItemName, amount: 1 }


                    }

                    return {
                        farmA: {
                            cartOrders: { ...state.farmA.cartOrders, [action.newItemId]: newItemOrUpdated },
                            pastOrders: { ...state.farmA.pastOrders }
                        },
                        farmB: {
                            cartOrders: { ...state.farmB.cartOrders },
                            pastOrders: { ...state.farmB.pastOrders }
                        }

                    }


                case 'farmB':
                    if (state.farmB.cartOrders[action.newItemId]) {
                        //already have the item in the cart
                        newItemOrUpdated = { amount: state.farmB.cartOrders[action.newItemId].amount + 1, name: action.newItemName }

                    } else {
                        //add new
                        newItemOrUpdated = { name: action.newItemName, amount: 1 }

                    }

                    return {
                        ...state.farmA,
                        farmB: {
                            cartOrders: { ...state.farmB.cartOrders, [action.newItemId]: newItemOrUpdated },
                            ...state.pastOrders
                        },
                    }
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
        case RESTORE_CART_ORDER:
            let newState = {}
            for (const key in action.data) {
                const newOrderItem = { name: action.data[key].name, amount: action.data[key].amount }
                newState[`${action.data[key].id}`] = newOrderItem
            }
            return {
                cartOrders: newState,
                pastOrders: []
            }
        default:
            return state
    }
}






export default cartReducer