import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    //initialState: "test initial state",
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return null
        }
    }
})




export const { setNotification, clearNotification } = notificationSlice.actions


export const showNotification = (message, delay) => {
    return async dispatch => {
        dispatch(setNotification(message))

        setTimeout(() => {
            dispatch(clearNotification())
        }, delay*1000)
    }
}

export default notificationSlice.reducer