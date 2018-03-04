import test from 'ava'
import {spy} from 'sinon'
import once from '../src/once'

test('once called twice, work once', t => {
  const node = new Image()
  const callback = spy()

  once(node, 'load', callback)

  node.emit('load', 42)
  node.emit('load', 1)

  t.true(callback.calledOnce)
  t.true(callback.calledWith(42))
})

test('once should return unsubscribe function', t => {
  const node = new Image()
  const callback = spy()

  const uns = once(node, 'event', callback)
  uns()

  node.emit('event', 42)
  node.emit('event', 1)

  t.true(callback.notCalled)
})
