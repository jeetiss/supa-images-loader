import { Component } from 'react'
import loadImages from 'supa-images-loader'

function equals (a, b) {
  if (!a || !b)
      return false;

  if (b.length !== a.length)
      return false;

  for (var i = 0, l=b.length; i < l; i++) {
      if (b[i] !== a[i]) {
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

  async load (links) {
    if (links) {
      this.setState({ ...this.state, loading: true })
      const images = await loadImages(...links)

      this.setState({
        loading: false,
        images: images
          .filter(([, error]) => !error)
          .map(([image]) => image.src)
      })
    }
  }

  componentDidMount() {
    this.load(this.props.links)
  }

  componentWillReceiveProps(nextProps) {
    if (!equals(nextProps.links, this.props.links)) {
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

export default Images
