import { SIGN_UP, LOG_IN, LOG_OUT, ONLINE_STATUS } from "../Actions/auth"

const initialState = {
    userId: "",
    firebaseUserId: "",
    onlineStatus: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                userId: action.userId,
                firebaseUserId: action.firebaseUserId
            }
        case LOG_IN:
            return {
                ...state,
                userId: action.userId,
                firebaseUserId: action.firebaseUserId
            }
        case LOG_OUT:
            return initialState
        case ONLINE_STATUS:
            x = {
                ...state,
                onlineStatus: action.onlineStatus
            }
            console.log("x", x)
            return x
        default:
            return state
    }
}

export default authReducer