import Core, { AtracktError } from '@atrackt/core'

declare global {
  var atrackt: any
}

interface ServiceConstructor {
  name: string
  send: (payload: object, options?: object) => object
  [key: string]: any
}

export default class Service {
  constructor(service: ServiceConstructor) {
    this.validate()
    Core.assignObjectToVars(service, this)
    globalThis.atrackt.setService(this)
  }

  private validate() {
    if (!(globalThis.atrackt instanceof Object)) {
      if (typeof window === 'undefined') {
        throw new AtracktError('A handler or core must be initialized')
      } else {
        throw new AtracktError('Core must be initialized')
      }
    }
  }
}
