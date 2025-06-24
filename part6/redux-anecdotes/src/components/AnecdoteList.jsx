import {voteAnecdote, initializeAnecdotes} from "../reducers/anecdoteReducer.js"
import { useSelector, useDispatch } from 'react-redux'
import {showNotification} from "../reducers/notificationReducer.js"
import { useEffect } from 'react'


const AnecdoteList = () => {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])


    //const anecdotes = useSelector(state => state)
    const anecdotes = useSelector(({ anecdotes, filter }) =>
        anecdotes.filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
    )

    const vote = (anecdote) => {
        //console.log('vote', id)
        dispatch(voteAnecdote(anecdote))
        dispatch(showNotification(`You voted '${anecdote.content}'`, 5))

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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList