import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import {useNotification} from "./NotificationContext.jsx";

const baseUrl = 'http://localhost:3001/anecdotes/'
const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const {showNotification } = useNotification()


    const newAnecdoteMutation = useMutation({
        mutationFn: async (newAnecdote) => (
            (await axios.post(baseUrl, newAnecdote)).data
        ),
        onSuccess: (votedAnecdote) => {
            // Rafraîchir les anecdotes après ajout
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            showNotification(`You created '${votedAnecdote.content}'`)
        },
        onError: (error) => {
            //alert(error.response.data.error)
            showNotification(`Anectodes should have size at least 5`)
        }
    })

    const handleCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        //if (content.length < 5) {
        //    alert('Too short anecdote, must have length 5 or more')
        //    return
        //}

        newAnecdoteMutation.mutate({ content, votes: 0 })
    }

    return (
        <div>
          <h3>create new</h3>
          <form onSubmit={handleCreate}>
            <input name='anecdote' />
            <button type="submit">create</button>
          </form>
        </div>
    )
}

export default AnecdoteForm
