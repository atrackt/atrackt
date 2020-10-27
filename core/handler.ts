import Atrackt, { Failure } from '@atrackt/core'

export default class Handler extends Atrackt {
  constructor(handler: HandlerConstructor) {
    super(handler)
    this.validate(handler)
    Object.assign(this, handler)
  }

  public validate(handler) {
    if (typeof window === 'undefined') {
      throw new Failure('Handlers can only be used in a browser')
    }

    if (typeof handler.setEvents !== 'function') {
      throw new Failure('setEvents must be defined')
    }
  }
}
