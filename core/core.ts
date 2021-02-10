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
  private setConsole(console) {
    try {
      return this.handler.setConsole(console)
    } catch (error) {
      throw new Failure(error.message)
    }
  }

  private setHandler(handler) {
    return (this.handler = new Handler(handler))
  }

  private setService(serviceObject) {
    if (this.services[serviceObject.name]) {
      throw new Failure(`${serviceObject.name} service is already set`)
    }

    const service = new Service(serviceObject)
    return (this.services[serviceObject.name] = service)
  }

  public setGlobal(func, object) {
    this.global[func].call(this, func)
  }

  // METADATA METHODS
  //
  private setCallbacks(callbacks, serviceNames) {
    this.callGlobalOrServices(this, serviceNames, 'setCallbacks', [callbacks])
    return callbacks
  }

  private setData(data, serviceNames) {
    this.callGlobalOrServices(this, serviceNames, 'setData', [data])
    return data
  }

  private setEvents(eventSelectors, serviceNames) {
    this.callGlobalOrServices(this, serviceNames, 'setEvents', [eventSelectors])
    return eventSelectors
  }

  private setOptions(options, serviceNames) {
    this.callGlobalOrServices(this, serviceNames, 'setOptions', [options])
    return options
  }

  // API METHODS
  //
  // calls a global function or from the services array
  // TODO: figure out when i need to run all services when global, and when just need to run on global
  private callGlobalOrServices(func, serviceNames?: string[], ...args) {
    if (serviceNames.length) {
      serviceNames.forEach((serviceName) => {
        const service = this.services[serviceName]
        service[func].apply(service[func], args)
      })
    } else {
      this.global[func].apply(this.global[func], args)
    }
  }

  public setMetadata(func, serviceNames, ...args) {
    // const func = 'set' + key.charAt(0).toUpperCase() + key.slice(1)

    // const serviceNames = args.pop()
    // this[func].apply(this, args)

    this.callGlobalOrServices(func, serviceNames, ...args)
    // Core.callGlobalOrServices(this, serviceNames, ['setCallbacks', callbacks])
    return args
    // return callbacks
  }

  public track(payload, options, serviceNames) {
    // TODO: use callGlobalOrServices? might need a flag to run functions on all services when global or not
    // TODO: there is already code somewhere for that
    // Core.callGlobalOrServices(this, serviceNames, 'track', [payload, options])

    // if no service names are passed, use all registered services
    serviceNames = serviceNames.length
      ? serviceNames
      : Object.keys(this.services)

    // execute call order
    this.global.callCallbacks('before', payload, options)
    for (const serviceName of serviceNames) {
      const service = this.services[serviceName]
      service.callCallbacks('before', payload, options)
      service.submit()
      service.callCallbacks('after', payload, options)
    }
    this.global.callCallbacks('after', payload, options)

    return payload
  }
}
