import { Store } from 'redux'
const reduxMiddelware = Store => next => action => {
    if (typeof action === 'function') {
        if ((action.name === 'incrementCart') || (action.name === 'decrementCart')) {
            const selectedVeggieId = Store.getState().selectedVeggieId.currItemId
            return action(Store.dispatch, Store.getState, selectedVeggieId)
        } else {
            return action(Store.dispatch, Store.getState)
        }
    }

    //its normal execution
    return next(action)
}

export default reduxMiddelware