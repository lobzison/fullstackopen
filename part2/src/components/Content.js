import React from 'react'
import Part from './Part'

const Content = (props) => {
    const mapped = props.course.parts.map(x => <Part key={x.id} part={x.name} exercises={x.exercises}/>)
    return (
        <>
        {mapped}
        </>
    )
}

export default Content