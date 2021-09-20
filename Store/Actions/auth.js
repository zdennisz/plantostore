export const SIGN_UP = "SIGN_UP"
export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"
export const ONLINE_STATUS = "ONLINE_STATUS"

export const sign_up = (data) => {
    return { type: SIGN_UP, userId: data.userId, firebaseUserId: data.firebaseUserId }
}

export const log_in = (data) => {
    return { type: LOG_IN, userId: data.userId, firebaseUserId: data.firebaseUserId }
}

export const log_out = () => {
    return { type: LOG_OUT }
}

export const online_status = (data) => {
    return { type: ONLINE_STATUS, onlineStatus: data.onlineStatus }
}
