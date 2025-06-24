import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { NotificationProvider, useNotification } from './components/NotificationContext'


const baseUrl = 'http://localhost:3001/anecdotes/'




const App = () => {
    const queryClient = useQueryClient()
    const {showNotification} = useNotification()
    //console.log(notify)


    const { data: anecdotes, isLoading, isError } = useQuery({
        queryKey: ['anecdotes'],
        queryFn: async () => (await axios.get(baseUrl)).data,
        retry:1
    })

    const voteMutation = useMutation({
        mutationFn: async (anecdote) =>
            (await axios.put(baseUrl + `${anecdote.id}`, {
                ...anecdote,
                votes: anecdote.votes + 1
            })).data,
        onSuccess: (updatedAnecdote) => {
            //console.log(updatedAnecdote.content)
            showNotification(`You voted '${updatedAnecdote.content}'`)
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })

        }
    })

    const handleVote = (anecdote) => {
        voteMutation.mutate(anecdote)
    }



    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Anecdote service is unavailable due to problem in the server</div>

  return (
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
        )}
      </div>
  )
}

export default App