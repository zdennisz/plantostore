export const ADD_TO_CART = "ADD_TO_CART"
export const PLACE_ORDER = "PLACE_ORDER"
export const INC_CART_ORDER = "INC_CART_ORDER"
export const DEC_CART_ORDER = "DEC_CART_ORDER"
export const RESTORE_CART_ORDER = "RESTORE_CART_ORDER"

export const add_to_cart = (data) => {
    return { type: ADD_TO_CART, newItemId: data.id, newItemName: data.name, cart: data.cart }
}

export const place_order = () => {
    return { type: PLACE_ORDER }
}

export const inc_cart_item = (data) => {
    return { type: INC_CART_ORDER, itemId: data.id, cart: data.cart }
}

export const dec_cart_item = (data) => {
    return { type: DEC_CART_ORDER, itemId: data }
}

export const resotre_cart_order = (data) => {
    return { type: RESTORE_CART_ORDER, data: data }
}
