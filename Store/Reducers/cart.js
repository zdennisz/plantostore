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
                // Create farm
                farm = {
                    cartOrders: {},
                    pastOrders: {}
                }
                // Create veggie
                veggie = {
                    name: action.veggieName,
                    amount: 1
                }


                // Add veggie to farm

                farm = {
                    cartOrders: { [action.veggieId]: veggie },
                    pastOrders: {}
                }

            }

            // Add the new farm to the farms
            return { ...state, [`${action.farmId}`]: farm }


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

            // Create veggie with updated amount
            veggie = {
                ...state[`${action.farmId}`].cartOrders[action.veggieId],
                amount: state[`${action.farmId}`].cartOrders[action.veggieId].amount + 1
            }
            // Create farm with updated veggie
            farm = {
                ...state[`${action.farmId}`],
                cartOrders: { ...state[`${action.farmId}`].cartOrders, [action.veggieId]: veggie },
            }
            return { ...state, [`${action.farmId}`]: farm }


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


        case RESTORE_CART_ORDER:
            farm = {
                ...state[`F${action.farmId}`],
                cartOrders: { ...action.cartItems.cartOrders },
            }
            return {
                ...state, [`${action.farmId}`]: farm
            }

        case RESTORE_PAST_ORDER:
            farm = {
                ...state[`F${action.farmId}`],
                pastOrders: { ...action.cartItems.pastOrders },
            }
            return {
                ...state, [`${action.farmId}`]: farm
            }

        default:
            return state
    }
}






export default cartReducer