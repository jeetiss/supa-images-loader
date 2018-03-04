// @flow

const once = (node: HTMLElement, event: string, callback: Function) => {
  node.addEventListener(event, function handler(e) {
    node.removeEventListener(event, handler)
    callback(e)
  })
}

export default once
