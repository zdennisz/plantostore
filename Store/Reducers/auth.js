import { SIGN_UP, LOG_IN } from "../Actions/auth"

const initialState = {
    userId: "",
    firebaseUserId: "",
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return {
                userId: action.userId,
                firebaseUserId: action.firebaseUserId
            }
        case LOG_IN:
            return {
                userId: action.userId,
                firebaseUserId: action.firebaseUserId
            }
        default:
            return state
    }
}

export default authReducer