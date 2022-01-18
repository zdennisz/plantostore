export const ADD_CATEGORIES = "ADD_CATEGORIES"

export const add_categories = (data) => {
    return { type: ADD_CATEGORIES, newCategories: data }
}