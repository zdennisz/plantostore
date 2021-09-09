import { ADD_PLANTS } from "../Actions/plants"
const initialState = {
    plants: {}
}


const plantsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLANTS:
            return action.plants
        default:
            return state
    }
}



export default plantsReducer