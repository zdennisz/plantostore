import { SET_ITEM_ID } from '../Actions/itemId'

const initialState = {
    currItemId: ""
};

const itemIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEM_ID:
            return {
                currItemId: action.itemId
            }

        default:
            return state
    }

}

export default itemIdReducer