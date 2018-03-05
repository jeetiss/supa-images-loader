// @flow

import load from './load'
import type {ImageWithError} from './load'

function loadImages(
  ...images: (string | HTMLImageElement)[]
): Promise<ImageWithError[]> {
  return Promise.all(images.map(image => load(image)))
}

export default loadImages
