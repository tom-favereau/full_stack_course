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

export const showNotification = (message) => {
    return async dispatch => {
        dispatch(setNotification(message))

        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }
}


export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer