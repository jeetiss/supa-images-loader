const once = (node, event, callback) =>
  node.addEventListener(event, function handler(e) {
    node.removeEventListener(event, handler)
    callback(e)
  })

export default once
