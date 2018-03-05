import test from 'ava'
import loadImages from '../src'

test('should work with strings', async t => {
  const args = ['valid link', 'valid link', 'valid link']

  const result = await loadImages(...args)

  t.truthy(result.every(([image]) => image instanceof HTMLImageElement))
  t.falsy(result.some(([, error]) => error))
})

test('should work with images', async t => {
  const args = [new Image(), new Image(), new Image()].map(image => {
    image.src = 'valid link'

    return image
  })

  const result = await loadImages(...args)

  t.truthy(result.every(([image]) => image instanceof HTMLImageElement))
  t.falsy(result.some(([, error]) => error))
})

test('should work with mixed args', async t => {
  const args = [
    'valid link',
    'valid link',
    new Image(),
    new Image(),
    new Image(),
  ].map(image => {
    if (image instanceof HTMLImageElement) {
      image.src = 'valid link'

      return image
    }

    return image
  })

  const result = await loadImages(...args)

  t.truthy(result.every(([image]) => image instanceof HTMLImageElement))
  t.falsy(result.some(([, error]) => error))
})

test('should reject with wrong args', async t => {
  const args = ['valid link', 'valid link', {src: 'valid link'}]

  await t.throws(loadImages(args))
})
