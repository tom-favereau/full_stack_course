import { createSlice } from '@reduxjs/toolkit'
import {getAll, create, update} from "../services/anecdoteService.js";

const getId = () => (100000 * Math.random()).toFixed(0)

//const anecdotesAtStart = [
//  'If it hurts, do it more often',
//  'Adding manpower to a late software project makes it later!',
//  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//  'Premature optimization is the root of all evil.',
//  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
//]
//const anecdotesAtStart = await getAll()

const asObject = (content) => ({
  content,
  id: getId(),
  votes: 0
})


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    updateAnecdote(state, action) {
      const updated = action.payload
      return state.map(elem => elem.id === updated.id ? updated : elem)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})




export const { updateAnecdote, addAnecdote , setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => (async (dispatch) => {
        const anecdotes = await getAll()
        dispatch(setAnecdotes(anecdotes))
    }
)

export const createAnecdote = (content) => (async (dispatch) => {
        const newAnecdote = await create(asObject(content))
        dispatch(addAnecdote(newAnecdote))
    }
)


export const voteAnecdote = (anecdote) => (async (dispatch) => {
        //console.log(anecdote)
        const updatedAnecdote = await update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
        dispatch(updateAnecdote(updatedAnecdote))
    }
)


export default anecdoteSlice.reducer