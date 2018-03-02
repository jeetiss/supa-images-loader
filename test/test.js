import EventEmitter from 'events'
import test from 'ava'
import {spy} from 'sinon'
import once from '../src/helpers/once'

class Node extends EventEmitter {
  addEventListener(...args) {
    return super.addListener(...args)
  }

  removeEventListener(...args) {
    return super.removeListener(...args)
  }
}

test('once', t => {
  const node = new Node()
  const callback = spy()

  once(node, 'event', callback)

  node.emit('event', 42)
  node.emit('event', 1)

  t.true(callback.calledOnce)
  t.true(callback.calledWith(42))
})
