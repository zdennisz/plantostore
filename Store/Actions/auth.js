export const SIGN_UP = "SIGN_UP"

export const sign_up = (data) => {
    return { type: SIGN_UP, userId: data.userId }
}