import Core, { AtracktError } from '@atrackt/core'

interface HandlerConstructor {
  name: string
  setEvent: object
  [key: string]: any
}

export default class Handler extends Core {
  constructor(handler: HandlerConstructor) {
    super()
    this.validate(handler)
    Core.assignObjectToVars(handler, this)
    window.atrackt = this
  }

  private validate(handler: HandlerConstructor) {
    if (typeof window === 'undefined') {
      throw new AtracktError('Handlers can only be used in a browser')
    }

    if (typeof handler.setEvent !== 'function') {
      throw new AtracktError('setEvent must be defined')
    }
  }
}
