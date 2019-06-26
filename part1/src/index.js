import React, {useState} from 'react'
import ReactDOM from 'react-dom'


const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age}</p>
      <p>Probably born in {bornYear()}</p>
    </div>
  )
}

const Display = ({value}) => <div>{value}</div>

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const App = props => {
  const [value, setValue] = useState(10)

  const updateVal = (val) => () => setValue(val)

  return (
    <div>
      <Display value={value}/>
      <Button onClick={updateVal(1000)} text="set to 1k" />
      <Button onClick={updateVal(0)} text="set to zero" />
      <Button onClick={updateVal(value + 1)} text="increment" />

    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)