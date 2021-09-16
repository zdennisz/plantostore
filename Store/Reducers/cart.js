import { ADD_TO_CART, PLACE_ORDER, INC_CART_ORDER, DEC_CART_ORDER, RESTORE_CART_ORDER, RESTORE_PAST_ORDER } from "../Actions/cart"


const initialState = {}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            let veggie;
            let farm;
            // Already have the farm 
            if (state[`${action.farmId}`]) {

                // Already have the veggie in the cart
                if (state[`${action.farmId}`].cartOrders[action.veggieId]) {

                    veggie = {
                        ...state[`${action.farmId}`].cartOrders[action.veggieId],
                        amount: state[`${action.farmId}`].cartOrders[action.veggieId].amount + 1
                    }
                } else {
                    veggie = {
                        name: action.veggieName,
                        amount: 1
                    }
                }
                farm = {
                    ...state[`${action.farmId}`],
                    cartOrders: { ...state[`${action.farmId}`].cartOrders, [action.veggieId]: veggie },
                }

            } else {
                //create farm
                farm = {
                    cartOrders: {},
                    pastOrders: {}
                }
                //create veggie
                veggie = {
                    name: action.veggieName,
                    amount: 1
                }


                //add veggie to farm

                farm = {
                    cartOrders: { [action.veggieId]: veggie },
                    pastOrders: {}
                }

            }

            //add the new farm to the farms
            return { ...state, [`${action.farmId}`]: farm }
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

            //create veggie with updated amount
            veggie = {
                ...state[`${action.farmId}`].cartOrders[action.veggieId],
                amount: state[`${action.farmId}`].cartOrders[action.veggieId].amount + 1
            }
            //create farm with updated veggie
            farm = {
                ...state[`${action.farmId}`],
                cartOrders: { ...state[`${action.farmId}`].cartOrders, [action.veggieId]: veggie },
            }
            return { ...state, [`${action.farmId}`]: farm }
            break;

        case DEC_CART_ORDER:

            let currAmount;
            currAmount = state[`${action.farmId}`].cartOrders[action.veggieId].amount
            if (currAmount > 1) {
                veggie = {
                    ...state[`${action.farmId}`].cartOrders[action.veggieId],
                    amount: state[`${action.farmId}`].cartOrders[action.veggieId].amount - 1
                }
                farm = {
                    ...state[`${action.farmId}`],
                    cartOrders: { ...state[`${action.farmId}`].cartOrders, [action.veggieId]: veggie },
                }
            } else {
                farm = { ...state[`${action.farmId}`] }
                delete farm.cartOrders[action.veggieId]
            }

            return {
                ...state,
                [`${action.farmId}`]: farm
            }
            // switch (action.cart) {
            //     case 'farmA':
            //         currAmount = state.farmA.cartOrders[action.itemId].amount
            //         if (currAmount > 1) {
            //             const updatedCartItem = { ...state.farmA.cartOrders[action.itemId], amount: state.farmA.cartOrders[action.itemId].amount - 1 }
            //             updatedCartOrders = { ...state.farmA.cartOrders, [action.itemId]: updatedCartItem }
            //         } else {
            //             updatedCartOrders = { ...state.farmA.cartOrders }
            //             delete updatedCartOrders[action.itemId]
            //         }

            //         return {
            //             farmA: {
            //                 cartOrders: { ...updatedCartOrders },
            //                 pastOrders: { ...state.farmA.pastOrders }
            //             },
            //             farmB: {
            //                 cartOrders: { ...state.farmB.cartOrders },
            //                 pastOrders: { ...state.farmB.pastOrders }
            //             }

            //         }
            //     case 'farmB':
            //         currAmount = state.farmB.cartOrders[action.itemId].amount
            //         if (currAmount > 1) {
            //             const updatedCartItem = { ...state.farmB.cartOrders[action.itemId], amount: state.farmB.cartOrders[action.itemId].amount - 1 }
            //             updatedCartOrders = { ...state.farmB.cartOrders, [action.itemId]: updatedCartItem }
            //         } else {
            //             updatedCartOrders = { ...state.farmB.cartOrders }
            //             delete updatedCartOrders[action.itemId]
            //         }

            //         return {
            //             farmB: {
            //                 cartOrders: { ...updatedCartOrders },
            //                 pastOrders: { ...state.farmB.pastOrders }
            //             },
            //             farmA: {
            //                 cartOrders: { ...state.farmA.cartOrders },
            //                 pastOrders: { ...state.farmA.pastOrders }
            //             }

            //         }

            // }
            break;

        case RESTORE_CART_ORDER:
            farm = {
                ...state[`F${action.farmId}`],
                cartOrders: { ...action.cartItems.cartOrders },
            }
            return {
                ...state, [`${action.farmId}`]: farm
            }
            break;
        case RESTORE_PAST_ORDER:
            farm = {
                ...state[`F${action.farmId}`],
                pastOrders: { ...action.cartItems.pastOrders },
            }
            return {
                ...state, [`${action.farmId}`]: farm
            }
            break;
        default:
            return state
    }
}






export default cartReducer