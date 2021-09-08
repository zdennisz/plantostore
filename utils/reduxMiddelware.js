import { Store } from 'redux'
const reduxMiddelware = Store => next => action => {
    if (typeof action === 'function') {
        if ((action.name === 'incCart') || (action.name === 'decCart')) {
            const itemId = Store.getState().itemId.currItemId
            return action(Store.dispatch, Store.getState, itemId)
        } else {
            return action(Store.dispatch, Store.getState)
        }
    }

    //its normal execution
    return next(action)
}

export default reduxMiddelware