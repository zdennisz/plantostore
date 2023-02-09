import { ADD_CATEGORIES } from '../Actions/categories'
const initialState = {
    allCategories: [],
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATEGORIES:

            const newData = action.newCategories.map(category => {
                return { name: category.name, veggies: category.veggies }
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