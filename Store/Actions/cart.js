export const ADD_TO_CART = "ADD_TO_CART"
export const PLACE_ORDER = "PLACE_ORDER"
export const INC_CART_ORDER = "INC_CART_ORDER"
export const DEC_CART_ORDER = "DEC_CART_ORDER"
export const RESTORE_CART_ORDER = "RESTORE_CART_ORDER"
export const RESTORE_PAST_ORDER = "RESTORE_PAST_ORDER"


export const add_to_cart = (data) => {
    return { type: ADD_TO_CART, veggieId: data.id, veggieName: data.name, farmId: data.farmId }
}

export const place_order = (data) => {
    return { type: PLACE_ORDER, farmId: data.farmId }
}

export const inc_cart_item = (data) => {
    return { type: INC_CART_ORDER, veggieId: data.id, farmId: data.farmId }
}

export const dec_cart_item = (data) => {
    return { type: DEC_CART_ORDER, veggieId: data.id, farmId: data.farmId }
}

export const resotre_cart_order = (data) => {
    return { type: RESTORE_CART_ORDER, farmId: data.farmId, cartItems: data.cartItems }
}
export const resotre_past_order = (data) => {
    return { type: RESTORE_PAST_ORDER, farmId: data.farmId, cartItems: data.cartItems }
}
