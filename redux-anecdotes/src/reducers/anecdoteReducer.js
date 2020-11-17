import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT':
      return action.data
    case 'ADD':
      return [ ...state, action.data ]
    case 'VOTE': {
      const id = action.data.id
      const aneccdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...aneccdoteToChange,
        votes: aneccdoteToChange.votes+1
      }
      return state.map(anecdote => 
        anecdote.id === id 
        ? changedAnecdote 
        : anecdote
      )
    }
      
    default:
      return state
  }
}

export const initialState = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}


export const voting = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes+1}
    const response = await anecdoteService.vote(updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: {
        id: response.id
      }
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote,
    })
  }
}


export default reducer