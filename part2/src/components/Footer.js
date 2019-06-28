import React from 'react'

const Footer = (props) => {
    const count = props.course.parts.reduce((acc, v) => {return acc + v.exercises}, 0)
    return (
        <p><b>Total of {count} exercises</b></p>
    )
}

export default Footer