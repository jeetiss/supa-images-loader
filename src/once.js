// @flow

const once = (
  node: HTMLImageElement,
  event: 'error' | 'load',
  callback: EventHandler
) => {
  function handler(e: Event): void {
    node.removeEventListener(event, handler)
    callback(e)
  }

  node.addEventListener(event, handler)
}

export default once
