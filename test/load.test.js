import test from 'ava'
import {loadImageFromString} from '../src/load'

test('loadImageFromString should return promise', t => {
  const promise = loadImageFromString('valid link')
  t.true(promise instanceof Promise)
})

test('loadImageFromString should resolves when args valid', async t => {
  const image = await loadImageFromString('valid link')

  t.true(image instanceof HTMLImageElement)
})

test('loadImageFromString should rejects when args invalid', t => {
  return loadImageFromString('invalid link').catch(i => {
    t.true(i instanceof HTMLImageElement)
  })
})
