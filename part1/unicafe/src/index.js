import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onClick}) => {
    return (
    <button onClick={onClick}>
        {text}
    </button> 
    )
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

const StatisticRow = ({name, value}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad
    const sum = good + neutral + bad
    const avg = (good - bad) / sum
    const posivive_precent = good / sum * 100
    if (sum > 0)
        return (
            <table>
                <tbody>
                    <StatisticRow name="good" value={good}/>
                    <StatisticRow name="neutral" value={neutral}/>
                    <StatisticRow name="bad" value={bad}/>
                    <StatisticRow name="all" value={sum} />
                    <StatisticRow name="average" value={avg} />
                    <StatisticRow name="positive" value={`${posivive_precent} %`} />
                </tbody>
            </table>
        )
    else return (
        <div>
            No feedback given
        </div>
    )
}

const increment = (value, func) => () => func(value + 1)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <DisplayHeader text="give feedback"/>
        <Button text={"good"} onClick={increment(good, setGood)}/>
        <Button text={"neutral"} onClick={increment(neutral, setNeutral)}/>
        <Button text={"bad"} onClick={increment(bad, setBad)}/>
        <DisplayHeader text="statistics"/>
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)