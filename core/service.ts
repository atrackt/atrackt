import Core from '@atrackt/core/core'
import Metadata from '@atrackt/core/metadata'
import Failure from '@atrackt/core/failure'

export default class Service extends Metadata {
  constructor(service: ServiceConstructor) {
    super()
    this.validate(service)
    Object.assign(this, service)
  }

  private validate(service) {
    if (!globalThis.Atrackt) {
      if (!window) {
        throw new Failure('Core or a handler must be initialized')
      } else {
        throw new Failure('Core must be initialized')
      }
    }

    if (typeof service.name !== 'string') {
      throw new Failure('Services require a name')
    }

    // validate the submit function
    if (typeof service.submit !== 'function') {
      throw new Failure('Services require a submit function')
    }

    let submitArgs = Core.getFunctionArguments(service.submit)

    if (submitArgs[0] !== 'payload') {
      throw new Failure(
        'The submit function must accept `payload` as the 1st argument'
      )
    }

    if (submitArgs[1] !== 'options') {
      throw new Failure(
        'The submit function must accept `options` as the 2nd argument'
      )
    }

    if (submitArgs[2]) {
      throw new Failure('The submit function only accepts payload & options')
    }

    let submitReturn = Core.getFunctionReturn(service.submit)

    if (submitReturn !== 'payload') {
      throw new Failure(
        'The submit function must explicitly return the payload'
      )
    }
  }
}
