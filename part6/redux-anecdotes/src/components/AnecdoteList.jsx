import {voteAnecdote} from "../reducers/anecdoteReducer.js"
import { useSelector, useDispatch } from 'react-redux'
import {showNotification} from "../reducers/notificationReducer.js";


const AnecdoteList = () => {
    //const anecdotes = useSelector(state => state)
    const anecdotes = useSelector(({ anecdotes, filter }) =>
        anecdotes.filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
    )
    const dispatch = useDispatch()
    const vote = (id, content) => {
        //console.log('vote', id)
        dispatch(voteAnecdote(id))
        dispatch(showNotification(`You voted '${content}'`))

    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList