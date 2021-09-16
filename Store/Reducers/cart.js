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

            }

            farm = {
                pastOrders: { ...state[`${action.farmId}`].pastOrders },
                cartOrders: { ...state[`${action.farmId}`].cartOrders, [action.veggieId]: veggie },
            }

            // Add the new farm to the farms
            return { ...state, [`${action.farmId}`]: farm }


        case PLACE_ORDER:
            let newVeggie
            let updatedPastOrders = {
            }
            for (const veggieId in state[`${action.farmId}`].cartOrders) {

                if (state[`${action.farmId}`].pastOrders[veggieId]) {
                    // Already have the item in the cart
                    newVeggie = { ...state[`${action.farmId}`].pastOrders[veggieId], amount: state[`${action.farmId}`].pastOrders[veggieId].amount + state[`${action.farmId}`].cartOrders[veggieId].amount }

                } else {
                    // Add new item
                    newVeggie = { ...state[`${action.farmId}`].cartOrders[veggieId] }
                }
                updatedPastOrders[veggieId] = newVeggie
            }
            farm = {
                cartOrders: {},
                pastOrders: { ...state[`${action.farmId}`].pastOrders, ...updatedPastOrders }
            }
            return {
                ...state, [`${action.farmId}`]: farm
            }

        case INC_CART_ORDER:

            // Create veggie with updated amount
            veggie = {
                ...state[`${action.farmId}`].cartOrders[action.veggieId],
                amount: state[`${action.farmId}`].cartOrders[action.veggieId].amount + 1
            }
            // Create farm with updated veggie
            farm = {
                pastOrders: { ...state[`${action.farmId}`].pastOrders },
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
                    pastOrders: { ...state[`${action.farmId}`].pastOrders },
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
                pastOrders: { ...state[`${action.farmId}`]?.pastOrders },
                cartOrders: { ...action.cartItems.cartOrders },
            }
            return {
                ...state, [`${action.farmId}`]: farm
            }

        case RESTORE_PAST_ORDER:
            farm = {
                cartOrders: { ...state[`${action.farmId}`]?.cartOrders },
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