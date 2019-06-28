import React from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const Course = ({course}) => {
    return (
        <div>
          <Header course={course}/>
          <Content course={course}/>
          <Footer course={course}/>
        </div>
      )
}

export default Course