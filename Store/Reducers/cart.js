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
            let newState
            switch (action.cart) {

                case 'farmA':
                    if (state.farmA.cartOrders[action.newItemId]) {
                        // Already have the item in the cart
                        newItemOrUpdated = { amount: state.farmA.cartOrders[action.newItemId].amount + 1, name: action.newItemName }

                    } else {
                        // Add new item
                        newItemOrUpdated = { name: action.newItemName, amount: 1 }
                    }
                    newState = {
                        farmA: {
                            cartOrders: { ...state.farmA.cartOrders, [action.newItemId]: newItemOrUpdated },
                            pastOrders: { ...state.farmA.pastOrders }
                        },
                        farmB: {
                            cartOrders: { ...state.farmB.cartOrders },
                            pastOrders: { ...state.farmB.pastOrders }
                        }
                    }

                    return newState
                case 'farmB':
                    if (state.farmB.cartOrders[action.newItemId]) {
                        // Already have the item in the cart
                        newItemOrUpdated = { amount: state.farmB.cartOrders[action.newItemId].amount + 1, name: action.newItemName }

                    } else {
                        // Add new item
                        newItemOrUpdated = { name: action.newItemName, amount: 1 }

                    }

                    newState = {
                        farmA: {
                            cartOrders: { ...state.farmA.cartOrders },
                            pastOrders: { ...state.farmA.pastOrders }
                        },
                        farmB: {
                            cartOrders: { ...state.farmB.cartOrders, [action.newItemId]: newItemOrUpdated },
                            pastOrders: { ...state.farmB.pastOrders }
                        },
                    }
                    return newState
            }
            break;

        case PLACE_ORDER:
            return state

        case INC_CART_ORDER:
            let updatedCartItem
            switch (action.cart) {
                case 'farmA':
                    updatedCartItem = { name: state.farmA.cartOrders[action.itemId].name, amount: state.farmA.cartOrders[action.itemId].amount + 1 }
                    return {
                        farmA: {
                            cartOrders: {
                                ...state.farmA.cartOrders, [action.itemId]: updatedCartItem
                            },
                            pastOrders: { ...state.farmA.pastOrders }
                        },
                        farmB: {
                            cartOrders: { ...state.farmB.cartOrders },
                            pastOrders: { ...state.farmB.pastOrders }
                        }
                    }

                case 'farmB':
                    updatedCartItem = { name: state.farmB.cartOrders[action.itemId].name, amount: state.farmB.cartOrders[action.itemId].amount + 1 }
                    return {
                        farmB: {
                            cartOrders: {
                                ...state.farmB.cartOrders, [action.itemId]: updatedCartItem
                            },
                            pastOrders: { ...state.farmB.pastOrders }
                        },
                        farmA: {
                            cartOrders: { ...state.farmA.cartOrders },
                            pastOrders: { ...state.farmA.pastOrders }
                        }
                    }
            }
            break;

        case DEC_CART_ORDER:
            let updatedCartOrders;
            let currAmount;
            switch (action.cart) {
                case 'farmA':
                    currAmount = state.farmA.cartOrders[action.itemId].amount
                    if (currAmount > 1) {
                        const updatedCartItem = { name: state.farmA.cartOrders[action.itemId].name, amount: state.farmA.cartOrders[action.itemId].amount - 1 }
                        updatedCartOrders = { ...state.farmA.cartOrders, [action.itemId]: updatedCartItem }
                    } else {
                        updatedCartOrders = { ...state.farmA.cartOrders }
                        delete updatedCartOrders[action.itemId]
                    }

                    return {
                        farmA: {
                            cartOrders: { ...updatedCartOrders },
                            pastOrders: { ...state.farmA.pastOrders }
                        },
                        farmB: {
                            cartOrders: { ...state.farmB.cartOrders },
                            pastOrders: { ...state.farmB.pastOrders }
                        }

                    }
                case 'farmB':
                    currAmount = state.farmB.cartOrders[action.itemId].amount
                    if (currAmount > 1) {
                        const updatedCartItem = { name: state.farmB.cartOrders[action.itemId].name, amount: state.farmB.cartOrders[action.itemId].amount - 1 }
                        updatedCartOrders = { ...state.farmB.cartOrders, [action.itemId]: updatedCartItem }
                    } else {
                        updatedCartOrders = { ...state.farmB.cartOrders }
                        delete updatedCartOrders[action.itemId]
                    }

                    return {
                        farmB: {
                            cartOrders: { ...updatedCartOrders },
                            pastOrders: { ...state.farmB.pastOrders }
                        },
                        farmA: {
                            cartOrders: { ...state.farmA.cartOrders },
                            pastOrders: { ...state.farmA.pastOrders }
                        }

                    }

            }
            break;

        case RESTORE_CART_ORDER:
            switch (action.cart) {
                case 'farmA':

                    return {
                        farmA: {
                            cartOrders: { ...action.cartItems.cartOrders },
                            pastOrders: { ...action.cartItems.pastOrders }
                        },
                        farmB: {
                            cartOrders: {},
                            pastOrders: {}
                        }
                    }


                case 'farmB':

                    return {
                        farmB: {
                            cartOrders: { ...action.data.cartOrders },
                            pastOrders: { ...action.data.pastOrders }
                        },
                        farmA: {
                            cartOrders: {},
                            pastOrders: {}
                        }
                    }
            }
            break;

        default:
            return state
    }
}






export default cartReducer