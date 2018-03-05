import React, { Component } from 'react'
import Images from './Images'
import './App.css'

const images = [
  'https://ucarecdn.com/fd6c74d1-3c88-4f2c-8f81-48064132fd0d/-/resize/500x/',
  'https://ucarecdn.com/4a15dea0-4e61-4ee1-ac49-71d2daa6462e/-/resize/500x/',
  'https://ucarecdn.com/250cbd47-4779-4d15-9666-de9c0c9b2f84/-/resize/200x/'
]

class App extends Component {
  state = {
    images
  }

  update = index => e => this.setState({
    images: [
      ...this.state.images.slice(0, index),
      e.target.value,
      ...this.state.images.slice(index + 1)
    ]
  })

  render () {
    const { images } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className="App-inputs">
          {images.map((value, i) => <input key={i} onChange={this.update(i)} value={value}/>)}
        </div>
        
        <Images links={images}>
          {({ loading, images }) => loading || !images
              ? <div>Loading...</div>
              : images.map(src => <img key={src} src={src} />)}
        </Images>
      </div>
    )
  }
}


export default App
