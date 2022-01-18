import { SET_SELECTED_VEGGIE_ID } from '../Actions/selectedVeggieId'

const initialState = {
    currItemId: ""
};

const selectedVeggieIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_VEGGIE_ID:
            return {
                currItemId: action.selectedVeggieId
            }

        default:
            return state
    }

}

export default selectedVeggieIdReducer