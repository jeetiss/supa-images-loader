// @flow

import once from './once'

export type ImageWithError = [HTMLImageElement, Error | null]

const createImage = (src: string): HTMLImageElement => {
  const image = new Image()
  image.src = src

  return image
}

const loadImage = (image: HTMLImageElement): Promise<ImageWithError> => {
  if (image.src && typeof image.decode === 'function') {
    return image.decode().then(() => [image, null], error => [image, error])
  }

  return new Promise(resolve => {
    once(image, 'load', () => resolve([image, null]))
    once(image, 'error', error => resolve([image, error]))
  })
}

const load = (arg: string | HTMLImageElement): Promise<ImageWithError> => {
  const image = typeof arg === 'string' ? createImage(arg) : arg

  if (!(image instanceof HTMLImageElement)) {
    return Promise.reject(new Error('Wrong argument type: '))
  }

  if (!image.complete || !image.src) {
    // Dont loaded

    return loadImage(image)
  }
  if (image.naturalHeight !== 0 && image.naturalWidth !== 0) {
    // Loaded normal

    return Promise.resolve([image, null])
  }
  // Loaded with error

  return Promise.resolve([image, new Error('wtf')])
}

export default load
