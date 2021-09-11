import { createStore, combineReducers, applyMiddleware } from 'redux';
import cartReducer from './Reducers/cart';
import itemIdReducer from './Reducers/itemId'
import plantsReducer from './Reducers/plants';
import reduxMiddelware from './reduxMiddelware'
import categoriesReducer from './Reducers/categories';
import authReducer from './Reducers/auth'

const rootReducer = combineReducers({
    categories: categoriesReducer,
    cart: cartReducer,
    itemId: itemIdReducer,
    plants: plantsReducer,
    auth: authReducer
})

const middlewareEnhancer = applyMiddleware(reduxMiddelware)
const store = createStore(rootReducer, middlewareEnhancer)

export default store