import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}

const Content = (props) => {
    const mapped = props.course.parts.map(x => <Part part={x.name} exercises={x.exercises}/>)
    return (
        <>
        {mapped}
        </>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}

const Footer = (props) => {
    const count = props.course.parts.reduce((acc, v) => {return acc + v.exercises}, 0)
    return (
        <p>Number of exercises {count}</p>
    )
}
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Footer course={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))