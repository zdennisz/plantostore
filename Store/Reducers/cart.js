import { ADD_TO_CART, PLACE_ORDER, INCREMENT_CART_ORDER, DECREMENT_CART_ORDER, RESTORE_CART_ORDER, RESTORE_FARM_VEGGIES } from "../Actions/cart"


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
                    farmVeggies: { ...state[`${action.farmId}`]?.farmVeggies },
                    cartOrders: { ...state[`${action.farmId}`]?.cartOrders, [action.veggieId]: veggie },
                }

            } else {
                // Create farm
                farm = {
                    cartOrders: {},
                    farmVeggies: {}
                }
                // Create veggie
                veggie = {
                    name: action.veggieName,
                    amount: 1
                }
                farm = {
                    farmVeggies: { ...state[`${action.farmId}`]?.farmVeggies },
                    cartOrders: { [action.veggieId]: veggie },
                }

            }

            // Add the new farm to the farms
            return { ...state, [`${action.farmId}`]: farm }

        case PLACE_ORDER:
            let newVeggie
            let updatedFarmVeggies = {
            }
            for (const veggieId in state[`${action.farmId}`].cartOrders) {

                if (state[`${action.farmId}`].farmVeggies[veggieId]) {
                    // Already have the veggie in the cart
                    newVeggie = { ...state[`${action.farmId}`].farmVeggies[veggieId], amount: state[`${action.farmId}`].farmVeggies[veggieId].amount + state[`${action.farmId}`].cartOrders[veggieId].amount }

                } else {
                    // Add new veggie
                    newVeggie = { ...state[`${action.farmId}`].cartOrders[veggieId] }
                }
                updatedFarmVeggies[veggieId] = newVeggie
            }
            farm = {
                cartOrders: {},
                farmVeggies: { ...state[`${action.farmId}`].farmVeggies, ...updatedFarmVeggies }
            }
            return {
                ...state, [`${action.farmId}`]: farm
            }

        case INCREMENT_CART_ORDER:

            // Create veggie with updated amount
            veggie = {
                ...state[`${action.farmId}`].cartOrders[action.veggieId],
                amount: state[`${action.farmId}`].cartOrders[action.veggieId].amount + 1
            }
            // Create farm with updated veggie
            farm = {
                farmVeggies: { ...state[`${action.farmId}`].farmVeggies },
                cartOrders: { ...state[`${action.farmId}`].cartOrders, [action.veggieId]: veggie },
            }
            return { ...state, [`${action.farmId}`]: farm }


        case DECREMENT_CART_ORDER:

            let currAmount;
            currAmount = state[`${action.farmId}`].cartOrders[action.veggieId].amount
            if (currAmount > 1) {
                veggie = {
                    ...state[`${action.farmId}`].cartOrders[action.veggieId],
                    amount: state[`${action.farmId}`].cartOrders[action.veggieId].amount - 1
                }
                farm = {
                    farmVeggies: { ...state[`${action.farmId}`].farmVeggies },
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
                farmVeggies: { ...state[`${action.farmId}`]?.farmVeggies },
                cartOrders: { ...action.cartItems.cartOrders },
            }
            return {
                ...state, [`${action.farmId}`]: farm
            }

        case RESTORE_FARM_VEGGIES:
            farm = {
                cartOrders: { ...state[`${action.farmId}`]?.cartOrders },
                farmVeggies: { ...action.cartItems.farmVeggies },
            }
            return {
                ...state, [`${action.farmId}`]: farm
            }


        default:
            return state
    }
}






export default cartReducer