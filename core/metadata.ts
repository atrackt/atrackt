import Utils from '@atrackt/core/utils'

export default class Metadata {
  callbacks: CallbackOrdersObject
  data: object // additional data to include with payload
  eventSelectors: EventSelectorsObject // event names and query selectors to check events against
  options: object // options to be passed to services
  payload: object // main data to track

  constructor() {
    this.callbacks = {
      before: [],
      after: [],
    }
    this.data = {}
    this.eventSelectors = {}
    this.options = {}
    this.payload = {}
  }

  public callCallbacks(order, payload, options) {
    for (const cb of this.callbacks[order]) {
      cb.call(this)
    }

    return { payload, options }
  }

  private setCallbacks(callbacks) {
    const invalidCallbacks = callbacks.filter(
      (cb) => !['before', 'after'].includes(cb)
    )

    if (invalidCallbacks.length) {
      throw new Failure(
        `${invalidCallbacks.join(
          ', '
        )} are invalid callbacks. only before and after`
      )
    }

    this.callbacks = Utils.deepMerge(this.callbacks, callbacks)
  }

  private setData(data) {
    this.data = Utils.deepMerge(this.data, data)
  }

  private setEvents(eventSelectors) {
    this.eventSelectors = Utils.deepMerge(this.eventSelectors, eventSelectors)
  }

  private setOptions(options) {
    this.options = Utils.deepMerge(this.options, options)
  }
}
