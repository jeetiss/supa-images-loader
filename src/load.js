// @flow

import once from './once'

export type ImageWithError = [HTMLImageElement, Error | null]

const wrongArg = arg => {
  const str = JSON.stringify(arg)

  return new Error(
    `Wrong argument: '${str}', use HTMLImageElement or string instead`
  )
}

const wrongPath = img => new Error(`can't load image with src ${img.src}`)

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
    once(image, 'error', _ => resolve([image, wrongPath(image)]))
  })
}

const load = (arg: string | HTMLImageElement): Promise<ImageWithError> => {
  const image = typeof arg === 'string' ? createImage(arg) : arg

  if (!(image instanceof HTMLImageElement)) {
    return Promise.reject(wrongArg(arg))
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

  return Promise.resolve([image, wrongPath(image)])
}

export default load
