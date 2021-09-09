import { ADD_CATEGORIES } from '../Actions/categories'
const initialState = {
    allCategories: [],
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATEGORIES:

            const newData = action.newCategories.map(item => {
                return { name: item.name, plants: item.plants }
            })
            return {
                ...state,
                allCategories: newData
            }

        default:
            return state
    }

}

export default categoriesReducer