import { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const initialState = null

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.payload
        case 'HIDE':
            return null
        default:
            return state
    }
}

export const NotificationProvider = ({ children }) => {
    const [message, dispatch] = useReducer(notificationReducer, initialState)

    const showNotification = (msg) => {
        dispatch({ type: 'SHOW', payload: msg })

        setTimeout(() => {
            dispatch({ type: 'HIDE' })
        }, 5000)
    }

    return (
        <NotificationContext.Provider value={{ message, showNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    return useContext(NotificationContext)
}
