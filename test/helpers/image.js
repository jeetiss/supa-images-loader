import EventEmitter from 'events'

class Image extends EventEmitter {
  constructor() {
    super()

    this.complete = true
  }

  addEventListener(...args) {
    return super.addListener(...args)
  }

  removeEventListener(...args) {
    return super.removeListener(...args)
  }

  set src(value) {
    this.link = value
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
    if (this.onload) this.unload()

    setTimeout(() => this.emit('load'))
  }

  error() {
    if (this.onerror) this.onerror()

    setTimeout(() => this.emit('error'))
  }
}

global.Image = Image
global.HTMLImageElement = Image
