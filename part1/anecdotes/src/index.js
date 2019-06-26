import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const random = max => Math.floor(Math.random() * max)

const Button = ({text, onClick}) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const nextAnecdote = () => random(anecdotes.length)

const incrementAt = (pos, arr) => {
    const copy = [...arr]
    copy[pos] += 1
    return copy
}

const DisplayHeader = ({text}) => {
    return (
        <div>
            <h1>
                {text}
            </h1>
        </div>
    )
}

const mostVotedIndex = scores => {
    const max = Math.max(...scores)
    return scores.findIndex(el => el === max)
}

const DisplayAnecdote = ({anecdotes, selected, scores}) => {
    return (
        <>
        <div>
            {anecdotes[selected]}
        </div>  
        <div>
            {`has ${scores[selected]} votes`}
        </div> 
        </>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [scores, setScores] = useState(new Array(anecdotes.length).fill(0))

  return (
    <div>
      <DisplayHeader text="Anecdote of the day" />  
      <DisplayAnecdote anecdotes={anecdotes} selected={selected} scores={scores}/>
      <div>
        <Button text="vote" onClick={() => setScores(incrementAt(selected, scores))}/>
        <Button text="next anecdore" onClick={() => setSelected(nextAnecdote())}/>
      </div>
      <DisplayHeader text="Anecdote with most votes"/>
      <DisplayAnecdote anecdotes={anecdotes} selected={mostVotedIndex(scores)} scores={scores}/>
    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)