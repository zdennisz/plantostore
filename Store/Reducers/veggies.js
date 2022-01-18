import { ADD_VEGGIES } from "../Actions/veggies"
const initialState = {
    veggies: {}
}


const veggiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_VEGGIES:
            return action.veggies
        default:
            return state
    }
}



export default veggiesReducer