import Atrackt from '@atrackt/core'

Atrackt.setHandler({
  name: 'Dom',
  getElements: (selector) => {
    // TODO: query for elements logic
    return []
  },
  bindEvent: (element, eventName) => {
    // TODO: bind event logic
    return element
  },
})
