import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { voting, initialState } from '../reducers/anecdoteReducer'
import { setNoti } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    useEffect(() => {
      props.initialState()
    }, [])

    const filteredAnecdotes = props.filter === 'ALL' ? props.anecdotes
      : props.anecdotes.filter(
        anecdote => anecdote.content.toLowerCase().search(props.filter.toLowerCase()) !== -1
      )

    const handleVote = (anecdote) => {
      props.voting(anecdote)
      props.setNoti(`you voted '${anecdote.content}'`, 5)
    }
    
    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.sort((a, b) => b.votes - a.votes),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  initialState,
  voting,
  setNoti,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList