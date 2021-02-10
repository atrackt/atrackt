// import Console from '@atrackt/core/console'
// import Core from '@atrackt/core/core'
import Failure from '@atrackt/core/failure'

export default class Handler {
  console: false

  constructor(handler: HandlerObject) {
    this.console = false
    this.validate(handler)
    Object.assign(this, handler)
  }

  public setConsole(console) {
    try {
      // this.setConsole(console)
    } catch (error) {
      throw new Failure(
        'the console requires a handler to be set. use setHandler'
      )
    }
  }

  private enableConsole() {
    // this.console = true
  }

  private getElements(selector) {
    throw new Failure('getElements cannot be called directly. use setHandler')
  }

  private bindEvent(element, eventName) {
    throw new Failure('bindEvent cannot be called directly. use setHandler')
  }

  private setEvents(eventSelectors, serviceNames?) {
    this.setEvents(eventSelectors, serviceNames)

    for (const eventName in eventSelectors) {
      const selectorsArray = [eventSelectors[eventName]].flat()

      for (const selectors of selectorsArray) {
        const elements = this.getElements(selectors)

        // @ts-ignore
        for (const element of elements) {
          this.bindEvent(element, eventName)
        }
      }
    }
  }

  private validate(handler) {
    if (!window) {
      throw new Failure('Handlers can only be used in a browser')
    }

    if (typeof handler !== 'object') {
      throw new Failure('A handler must be defined')
    }

    if (typeof handler.getElements !== 'function') {
      throw new Failure('getElements must be defined')
    }

    if (typeof handler.bindEvent !== 'function') {
      throw new Failure('bindEvent must be defined')
    }
  }
}
