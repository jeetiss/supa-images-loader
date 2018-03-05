import React, { Component } from 'react'
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/light'
import js from 'react-syntax-highlighter/languages/hljs/javascript'
import tomorrow from 'react-syntax-highlighter/styles/hljs/tomorrow-night-eighties'
import loadImages from 'supa-images-loader'
import './Example.css'

registerLanguage('javascript', js)

const example = images => `import loadImages from 'supa-images-loader'

const div = document.querySelector('#example')

div.innerText = 'loading...'

loadImages(
${images.map(image => ` '${image}'`).join(',\n')}
).then(images => {
  div.innerText = ''

  return images
}).then(
  images => images
    .filter(([, error]) => !error)
    .forEach(([image]) => div.appendChild(image))
)
`

class Example extends Component {
  state = {
    scale: Math.round(Math.random() * 300 + 300)
  }

  componentDidMount() {
    const images = this.props.images(this.state.scale)

    const div = this.div

    div.innerText = 'loading...'

    loadImages(...images).then(images => {
      div.innerText = ''

      return images
    }).then(
      images => images
        .filter(([, error]) => !error)
        .forEach(([image]) => div.appendChild(image))
    )
  }

  render () {
    const images = this.props.images(this.state.scale)

    return (
      <div>
        <h1>Simple example</h1>

        <SyntaxHighlighter language='javascript' style={tomorrow}>
          {example(images)}
        </SyntaxHighlighter>

        <div className='Example-images' ref={el => {this.div = el}} />
      </div>
    )
  }
}

export default Example
