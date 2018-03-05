import { Component } from 'react'
import loadImages from 'supa-images-loader'

function equals (a, b) {
  if (!a || !b)
      return false;

  if (b.length != a.length)
      return false;

  for (var i = 0, l=b.length; i < l; i++) {
      if (b[i] != a[i]) {
          return false;   
      }           
  }       
  return true;
}

class Images extends Component {
  state = {
    loading: false,
    images: null
  }

  load (links) {
    if (links) {
      this.setState({ ...this.state, loading: true })
      loadImages(...links)
        .then(images => images.map(([image]) => image))
        .catch(images => images.filter(([, loaded]) => loaded).map(([image]) => image))
        .then(images => this.setState({ loading: false, images: images.map(image => image.src) }))
    }
  }

  componentDidMount() {
    this.load(this.props.links)
  }

  componentWillReceiveProps(nextProps) {
    if (!equals(nextProps.links, this.props.link)) {
      this.load(nextProps.links)
    }
  }

  render() {
    const { children } = this.props

    if (typeof children === 'function') {
      return children(this.state)
    }

    return null
  }
}

// LoadImages(
//   'https://ucarecdn.com/fd6c74d1-3c88-4f2c-8f81-48064132fd0d/-/resize/100x/',
//   'https://ucarecdn.com/4a15dea0-4e61-4ee1-ac49-71d2daa6462e/-/resize/100x/',
//   'https://ucarecdn.com/250cbd47-4779-4d15-9666-de9c0c9b2f84/-/resize/100x/',
// ).then(console.log, console.log)

export default Images
