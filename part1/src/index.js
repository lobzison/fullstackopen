import React from 'react'
import ReactDOM from 'react-dom'


const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age}</p>
    </div>
  )
}

const App = () => {
  const name = "BEter"
  const age = 9

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="BENIS" age="9"/>
      <Hello name="SPURDO" age={age}/>
      <Hello name={name} age = {6 + 9}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))