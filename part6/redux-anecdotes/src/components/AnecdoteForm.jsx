import {createAnecdote} from "../reducers/anecdoteReducer.js"
import { useDispatch } from 'react-redux'
import {showNotification} from "../reducers/notificationReducer.js";


const AnecdoteForm = () => {
    //const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdeote.value
        event.target.anecdeote.value = ''
        dispatch(createAnecdote(content))
        dispatch(showNotification(`You created '${content}'`))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdeote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm