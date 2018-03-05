import test from 'ava'
import {spy} from 'sinon'

import load from '../src/load'

import sleep from './helpers/sleep'

test('should return promise', t => {
  const promise = load('valid link')
  t.truthy(promise instanceof Promise)
})

test('should resolves when images loaded', async t => {
  const [image, error] = await load('valid link')

  t.truthy(image instanceof HTMLImageElement)
  t.falsy(error)
})

test('should resolves when images loaded #2', async t => {
  const image = new Image()
  image.src = 'valid link'

  const [loadedImage, error] = await load(image)

  t.truthy(loadedImage instanceof HTMLImageElement)
  t.falsy(error)
})

test('should resolves when images loaded #3', async t => {
  const image = new Image()
  const promise = load(image)

  await sleep(100)

  image.src = 'valid link'

  const [loadedImage, error] = await promise

  t.truthy(loadedImage instanceof HTMLImageElement)
  t.falsy(error)
})

test('should resolves when images loaded #4', async t => {
  const image = new Image()
  image.src = 'valid link'

  await sleep(100)

  const [loadedImage, error] = await load(image)

  t.truthy(loadedImage instanceof HTMLImageElement)
  t.falsy(error)
})

test('should resolves with error when images dont loaded', async t => {
  const [image, error] = await load('invalid link')

  t.truthy(image instanceof HTMLImageElement)
  t.truthy(error)
})

test('should rejects when wrong args', async t => {
  const obj = {
    src: 'valid link',
  }

  await t.throws(load(obj))
})

test('should resolves with error when images dont loaded #2', async t => {
  const image = new Image()
  image.src = 'invalid link'

  const [loadedImage, error] = await load(image)

  t.truthy(loadedImage instanceof HTMLImageElement)
  t.truthy(error)
})

test('should resolves with error when images dont loaded #3', async t => {
  const image = new Image()
  const promise = load(image)

  await sleep(100)

  image.src = 'invalid link'

  const [loadedImage, error] = await promise

  t.truthy(loadedImage instanceof HTMLImageElement)
  t.truthy(error)
})

test('should resolves with error when images dont loaded #4', async t => {
  const image = new Image()
  const callback = spy()

  image.addEventListener('error', callback)

  image.src = 'invalid link'

  await sleep(100)

  const [loadedImage, error] = await load(image)

  t.truthy(loadedImage instanceof HTMLImageElement)
  t.truthy(error)
  t.truthy(callback.calledOnce)
})

test('should call onload callback', async t => {
  const image = new Image()
  const callback = spy()

  image.addEventListener('load', callback)
  image.src = 'valid link'

  const [loadedImage, error] = await load(image)

  t.truthy(callback.calledOnce)
  t.truthy(loadedImage instanceof HTMLImageElement)
  t.falsy(error)
})

test('should call onerror callback', async t => {
  const image = new Image()
  const callback = spy()

  image.addEventListener('error', callback)
  image.src = 'invalid link'

  const [loadedImage, error] = await load(image)

  t.truthy(callback.calledOnce)
  t.truthy(loadedImage instanceof HTMLImageElement)
  t.truthy(error)
})
