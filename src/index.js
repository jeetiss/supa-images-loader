// @flow

import load from './load'

type imageWithState = [HTMLImageElement, boolean]

function loadImages(
  ...images: (string | HTMLImageElement)[]
): Promise<imageWithState[]> {
  const addStatus = (status: boolean) => (
    image: HTMLImageElement
  ): imageWithState => [image, status]

  const success = addStatus(true)
  const fail = addStatus(false)

  return Promise.all(
    images.map(load).map(promise => promise.then(success, fail))
  ).then(
    images =>
      images.some(([, loaded]) => !loaded)
        ? Promise.reject(images)
        : Promise.resolve(images)
  )
}

export default loadImages
