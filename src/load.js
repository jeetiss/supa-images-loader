// @flow

import once from './once'

const createImage = (src: string): HTMLImageElement => {
  const image = new Image()
  image.src = src

  return image
}

export const loadImage = (
  image: HTMLImageElement
): Promise<HTMLImageElement> => {
  if (image.src && typeof image.decode === 'function') {
    return image.decode().then(() => image, () => Promise.reject(image))
  }

  return new Promise((resolve, reject) => {
    once(image, 'load', () => resolve(image))
    once(image, 'error', () => reject(image))
  })
}

const load = (arg: string | HTMLImageElement): Promise<HTMLImageElement> => {
  const image = typeof arg === 'string' ? createImage(arg) : arg

  if (!image.complete || !image.src) {
    // Dont loaded

    return loadImage(image)
  }
  if (image.naturalHeight !== 0 && image.naturalWidth !== 0) {
    // Loaded normal

    return Promise.resolve(image)
  }
  // Loaded with error

  return Promise.reject(image)
}

export default load
