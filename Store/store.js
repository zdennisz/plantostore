import { createStore, combineReducers, applyMiddleware } from 'redux';
import cartReducer from './Reducers/cart';
import selectedVeggieIdReducer from './Reducers/selectedVeggieId'
import veggiesReducer from './Reducers/veggies';
import reduxMiddelware from './reduxMiddelware'
import categoriesReducer from './Reducers/categories';
import authReducer from './Reducers/auth'

const rootReducer = combineReducers({
    categories: categoriesReducer,
    cart: cartReducer,
    selectedVeggieId: selectedVeggieIdReducer,
    veggies: veggiesReducer,
    auth: authReducer
})

const middlewareEnhancer = applyMiddleware(reduxMiddelware)
const store = createStore(rootReducer, middlewareEnhancer)

export default store