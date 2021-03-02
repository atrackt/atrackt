import Failure from '@atrackt/core/failure'
import Global from '@atrackt/core/global'
import Handler from '@atrackt/core/handler'
import Service from '@atrackt/core/service'

// Provides the private API
//
export default class Core {
  config: object
  global: Global
  handler: any
  services: {}

  constructor(config: object = {}) {
    this.config = config
    this.global = new Global()
    this.handler = undefined
    this.services = {}
  }

  // CORE METHODS
  //
  public setCore(functionName: string, object: object) {
    return this.global[functionName].call(this, object)
  }

  // ignore coverage for dynamically called methods
  /* c8 ignore start */
  private setConsole(console: ConsoleObject) {
    try {
      return this.handler.setConsole(console)
    } catch (error) {
      throw new Failure(error.message)
    }
  }

  private setHandler(handler: HandlerObject) {
    return (this.handler = new Handler(handler))
  }

  private setService(service: ServiceObject) {
    if (this.services[service.name]) {
      throw new Failure(`${service.name} service is already set`)
    }

    // const service = new Service(service)
    return (this.services[service.name] = new Service(service))
  }
  /* c8 ignore stop */

  // METADATA METHODS
  //
  public setMetadata(
    functionName: string,
    object: object,
    serviceNames?: ServiceNames
  ) {
    serviceNames = [serviceNames].flat().filter(Boolean)
    let returnValue

    if (serviceNames.length) {
      serviceNames.forEach((serviceName) => {
        const service = this.services[serviceName]
        returnValue = service[functionName].call(service, object)
      })
    } else {
      returnValue = this.global[functionName].call(this.global, object)
    }
    return returnValue
  }

  // API METHODS
  //
  public track(payload, options: object = {}, serviceNames: ServiceNames = []) {
    // if no service names are passed, use all registered services
    serviceNames = [serviceNames].flat()
    serviceNames = serviceNames.length
      ? serviceNames
      : Object.keys(this.services)

    // keep track of changes to data & options from callbacks
    let newValues = { payload, options }

    // execute call order
    newValues = { payload, options } = this.global.callCallbacks(
      'before',
      newValues.payload,
      newValues.options
    )
    for (const serviceName of serviceNames) {
      const service = this.services[serviceName]
      newValues = { payload, options } = service.callCallbacks(
        'before',
        newValues.payload,
        newValues.options
      )
      service.submit()
      newValues = { payload, options } = service.callCallbacks(
        'after',
        newValues.payload,
        newValues.options
      )
    }
    newValues = { payload, options } = this.global.callCallbacks(
      'after',
      newValues.payload,
      newValues.options
    )
  }
}
