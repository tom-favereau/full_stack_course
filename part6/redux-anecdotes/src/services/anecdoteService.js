import axios from 'axios'

const baseUrl = 'http://localhost:3000/anecdotes'


export const getAll = async () => (await axios.get(baseUrl)).data


export const create = async (newAnecdote) => (
    (await axios.post(baseUrl, newAnecdote)).data)

export const update = async (id, updatedAnecdote) => (
    (await axios.put(`${baseUrl}/${id}`, updatedAnecdote)).data
)