import Atrackt from '@atrackt/core'
import Failure from '@atrackt/core/failure'

export default class Handler extends Atrackt {
  constructor(handler: HandlerConstructor) {
    super(handler)
    this.validate(handler)
    Object.assign(this, handler)
  }

  private validate(handler) {
    if (!window) {
      throw new Failure('Handlers can only be used in a browser')
    }

    if (typeof handler !== 'object') {
      throw new Failure('A handler must be defined')
    }

    if (typeof handler.setEvents !== 'function') {
      throw new Failure('setEvents must be defined')
    }
  }
}
