export const ADD_TO_CART = "ADD_TO_CART"
export const PLACE_ORDER = "PLACE_ORDER"
export const INCREMENT_CART_ORDER = "INCREMENT_CART_ORDER"
export const DECREMENT_CART_ORDER = "DECREMENT_CART_ORDER"
export const RESTORE_CART_ORDER = "RESTORE_CART_ORDER"
export const RESTORE_FARM_VEGGIES = "RESTORE_FARM_VEGGIES"


export const add_to_cart = (data) => {
    return { type: ADD_TO_CART, veggieId: data.id, veggieName: data.name, farmId: data.farmId }
}

export const place_order = (data) => {
    return { type: PLACE_ORDER, farmId: data.farmId }
}

export const increment_cart_item = (data) => {
    return { type: INCREMENT_CART_ORDER, veggieId: data.id, farmId: data.farmId }
}

export const decrement_cart_item = (data) => {
    return { type: DECREMENT_CART_ORDER, veggieId: data.id, farmId: data.farmId }
}

export const resotre_cart_order = (data) => {
    return { type: RESTORE_CART_ORDER, farmId: data.farmId, cartItems: data.cartItems }
}
export const restore_farm_veggie = (data) => {
    return { type: RESTORE_FARM_VEGGIES, farmId: data.farmId, cartItems: data.cartItems }
}
