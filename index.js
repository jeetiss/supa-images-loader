const once = (node, event, callback) =>
  node.addEventListener(event, function handler(e) {
    node.removeEventListener(handler)
    callback(e)
  })

const loadImageFromString = src =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.src = src

    once(image, 'load', () => resolve(image))
    once(image, 'error', () => reject(image))
  })

const loadImageFromElement = image =>
  new Promise((resolve, reject) => {
    if (!image.complete || !image.src) {
      // Dont loaded

      once(image, 'load', () => resolve(image))
      once(image, 'error', () => reject(image))
    } else if (image.naturalHeight !== 0 && image.naturalWidth !== 0) {
      // Loaded normal

      resolve(image)
    } else {
      // Loaded with error

      reject(image)
    }
  })

const load = arg => {
  if (typeof arg === 'string') {
    return loadImageFromString(arg)
  }
  if (arg instanceof HTMLImageElement) {
    return loadImageFromElement(arg)
  }
  return Promise.reject(arg)
}

function loadImages(...images) {
  return Promise.all(
    images
      .map(load)
      .map(promise =>
        promise.then(image => [image, true]).catch(image => [image, false])
      )
  ).then(
    images =>
      images.some(([, loaded]) => !loaded)
        ? Promise.reject(images)
        : Promise.resolve(images)
  )
}

export default loadImages
