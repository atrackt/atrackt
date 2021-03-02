import Metadata from '@atrackt/core/metadata'
import Failure from '@atrackt/core/failure'
import Utils from '@atrackt/core/utils'

export default class Service extends Metadata {
  // name: string

  constructor(service: ServiceObject) {
    super()
    this.validate(service)
    Object.assign(this, service)
  }

  // @throws {Failure} if service is invalid
  // @returns {undefined}
  private validate(service) {
    // const serviceName = service.name

    // if (this.services[serviceName]) {
    //   throw new Failure(`${serviceName} service was already set`)
    // }

    // const serviceInstance = new Service(service)
    // this.services[serviceName] = serviceInstance

    // return serviceInstance

    if (!globalThis.Atrackt) {
      if (!window) {
        throw new Failure('Core or a handler must be initialized')
      } else {
        throw new Failure('Core must be initialized')
      }
    }

    if (typeof service !== 'object') {
      throw new Failure('A service must be defined')
    }

    if (typeof service.name !== 'string') {
      throw new Failure('Services require a name')
    }

    // validate the submit function
    if (typeof service.submit !== 'function') {
      throw new Failure('Services require a submit function')
    }

    let submitArgs = Utils.getFunctionArguments(service.submit)

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

    let submitReturn = Utils.getFunctionReturn(service.submit)

    if (submitReturn !== 'payload') {
      throw new Failure(
        'The submit function must explicitly return the payload'
      )
    }
  }

  submit() {}
}
