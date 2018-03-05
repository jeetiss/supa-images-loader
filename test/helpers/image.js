import EventEmitter from 'events'

class Image extends EventEmitter {
  constructor() {
    super()

    this.complete = true
    this.naturalHeight = 0
    this.naturalWidth = 0
  }

  addEventListener(...args) {
    return super.addListener(...args)
  }

  removeEventListener(...args) {
    return super.removeListener(...args)
  }

  set src(value) {
    this.link = value
    this.complete = false
    if (value === 'valid link') {
      this.loading()
    } else {
      this.error()
    }

    return this
  }

  get src() {
    return this.link
  }

  loading() {
    setTimeout(() => {
      this.complete = true
      this.naturalHeight = 1
      this.naturalWidth = 1

      if (this.onload) this.onload()
      this.emit('load')
    })
  }

  error() {
    setTimeout(() => {
      const error = new Error('error for test')
      this.complete = true
      if (this.onerror) this.onerror(error)
      this.emit('error', error)
    })
  }
}

global.Image = Image
global.HTMLImageElement = Image
