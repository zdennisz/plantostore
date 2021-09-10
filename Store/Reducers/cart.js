import { ADD_TO_CART, PLACE_ORDER, INC_CART_ORDER, DEC_CART_ORDER, RESTORE_CART_ORDER, RESTORE_PAST_ORDER } from "../Actions/cart"

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
            let newItemPlaceOrder;
            let newStatePlaceOrder = {
                pastOrders: {}
            }
            switch (action.cart) {
                case 'farmA':
                    for (const key in state.farmA.cartOrders) {
                        if (state.farmA.pastOrders[key]) {
                            // Already have the item in the cart
                            newItemPlaceOrder = { ...state.farmA.pastOrders[key], amount: state.farmA.pastOrders[key].amount + state.farmA.cartOrders[key].amount }

                        } else {
                            // Add new item
                            newItemPlaceOrder = { ...state.farmA.cartOrders[key], amount: state.farmA.cartOrders[key].amount }
                        }

                        newStatePlaceOrder.pastOrders[key] = newItemPlaceOrder


                    }

                    newStatePlaceOrder = {
                        farmA: {
                            cartOrders: {},
                            pastOrders: { ...state.farmA.pastOrders, ...newStatePlaceOrder.pastOrders }
                        },
                        farmB: {
                            cartOrders: { ...state.farmB.cartOrders },
                            pastOrders: { ...state.farmB.pastOrders }
                        }
                    }


                    return newStatePlaceOrder
                case 'farmB':
                    for (const key in state.farmB.cartOrders) {
                        if (state.farmB.pastOrders[key]) {
                            // Already have the item in the cart
                            newItemPlaceOrder = { ...state.farmB.pastOrders[key], amount: state.farmB.pastOrders[key].amount + state.farmB.cartOrders[key].amount }

                        } else {
                            // Add new item
                            newItemPlaceOrder = { ...state.farmB.cartOrders[key], amount: state.farmB.cartOrders[key].amount }
                        }

                        newStatePlaceOrder.pastOrders[key] = newItemPlaceOrder


                    }

                    newStatePlaceOrder = {
                        farmB: {
                            cartOrders: {},
                            pastOrders: { ...state.farmB.pastOrders, ...newStatePlaceOrder.pastOrders }
                        },
                        farmA: {
                            cartOrders: { ...state.farmA.cartOrders },
                            pastOrders: { ...state.farmA.pastOrders }
                        }
                    }


                    return newStatePlaceOrder
            }

        case INC_CART_ORDER:
            let updatedCartItem
            switch (action.cart) {
                case 'farmA':
                    updatedCartItem = { ...state.farmA.cartOrders[action.itemId], amount: state.farmA.cartOrders[action.itemId].amount + 1 }
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
                    updatedCartItem = { ...state.farmB.cartOrders[action.itemId], amount: state.farmB.cartOrders[action.itemId].amount + 1 }
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
                        const updatedCartItem = { ...state.farmA.cartOrders[action.itemId], amount: state.farmA.cartOrders[action.itemId].amount - 1 }
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
                        const updatedCartItem = { ...state.farmB.cartOrders[action.itemId], amount: state.farmB.cartOrders[action.itemId].amount - 1 }
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
                            pastOrders: { ...state.farmA.pastOrders }
                        },
                        farmB: {
                            cartOrders: { ...state.farmB.cartOrders },
                            pastOrders: { ...state.farmB.pastOrders }
                        }
                    }


                case 'farmB':

                    return {
                        farmB: {
                            cartOrders: { ...action.cartItems.cartOrders },
                            pastOrders: { ...state.farmB.pastOrders }
                        },
                        farmA: {
                            cartOrders: { ...state.farmA.cartOrders },
                            pastOrders: { ...state.farmA.pastOrders }
                        }
                    }
            }
            break;

        case RESTORE_PAST_ORDER:
            switch (action.cart) {
                case 'farmA':

                    return {
                        farmA: {
                            cartOrders: { ...state.farmA.cartOrders },
                            pastOrders: { ...action.cartItems.pastOrders }
                        },
                        farmB: {
                            cartOrders: { ...state.farmB.cartOrders },
                            pastOrders: { ...state.farmB.pastOrders }
                        }
                    }


                case 'farmB':

                    return {
                        farmB: {
                            cartOrders: { ...state.farmB.cartOrders },
                            pastOrders: { ...action.cartItems.pastOrders }
                        },
                        farmA: {
                            cartOrders: { ...state.farmA.cartOrders },
                            pastOrders: { ...state.farmA.pastOrders }
                        }
                    }
            }
            break;
        default:
            return state
    }
}






export default cartReducer