import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const Anecdote = (props) => {

    const newAnecedote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
    }
    
    return (
        <form onSubmit={newAnecedote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

export default connect(
    null,
    { createAnecdote }
)(Anecdote)