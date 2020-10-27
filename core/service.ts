import { Failure } from '@atrackt/core'

export default class Service {
  constructor(service: ServiceConstructor) {
    this.validate(service)
    Object.assign(this, service)
    globalThis.Atrackt.setService(this)
  }

  private validate(service) {
    if (typeof globalThis.Atrackt === 'undefined') {
      if (typeof window === 'undefined') {
        throw new Failure('Core or a handler must be initialized')
      } else {
        throw new Failure('Core must be initialized')
      }
    }

    if (globalThis.Atrackt.services[service.name]) {
      throw new Failure(`${service.name} service is already set`)
    }

    if (typeof service.name !== 'string') {
      throw new Failure('Services require a name')
    }

    if (typeof service.submit !== 'function') {
      throw new Failure('Services require a submit function')
    }
  }
}
