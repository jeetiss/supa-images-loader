import test from 'ava'
import {spy} from 'sinon'
import once from '../src/once'

test('should work once when called twice', t => {
  const node = new Image()
  const callback = spy()

  once(node, 'load', callback)

  node.emit('load', 42)
  node.emit('load', 1)

  t.true(callback.calledOnce)
  t.true(callback.calledWith(42))
})
