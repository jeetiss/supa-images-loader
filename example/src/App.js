import React, { Component } from 'react'
import Example from './Example'
import './App.css'

const images = (scale) => [
  `https://ucarecdn.com/fd6c74d1-3c88-4f2c-8f81-48064132fd0d/-/resize/${scale}x/`,
  `https://ucarecdn.com/4a15dea0-4e61-4ee1-ac49-71d2daa6462e/-/resize/${scale}x/`,
  `https://ucarecdn.com/250cbd47-4779-4d15-9666-de9c0c9b2f84/-/resize/${scale}x/`
]

class App extends Component {
  render () {    
    return (
      <div className="App">
        <Example images={images}/>
      </div>
    )
  }
}

export default App
