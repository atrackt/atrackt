import Failure from '@atrackt/core/failure'
import Metadata from '@atrackt/core/metadata'
import Service from '@atrackt/core/service'

export default class Core extends Metadata {
  config: object // config for atrackt functionality
  console: boolean // flag for when console is visible
  services: object // stores all registered services

  constructor(config: object = {}) {
    super()
    this.config = config || {}
    this.console = false
    this.services = {}
  }

  enableConsole() {
    this.console = true
  }

  setService(serviceObject: ServiceConstructor) {
    const serviceName = serviceObject.name

    if (this.services[serviceName]) {
      throw new Failure(`${serviceName} service was already set`)
    }

    const serviceInstance = new Service(serviceObject)
    this.services[serviceName] = serviceInstance

    return serviceInstance
  }

  track(payload: object, options: object = {}) {
    return { payload, options }
  }

  // CLASS METHODS
  //
  public static getFunctionArguments(func: Function) {
    let funcString = func.toString()

    // get arguments in parens
    let functionParens = funcString.match(/\(([^{}]*)\)/)[1]
    if (functionParens) {
      return functionParens.replace(/\s/g, '').split(',')
    }

    // get vars declared in function
    let functionVars = funcString.match(/var ([^=]+)/g)
    if (functionVars) {
      return functionVars.map((m) => m.replace(/(var|\s)/g, ''))
    }

    // no arguments
    return []
  }

  public static getFunctionReturn(func: Function) {
    return func
      .toString()
      .replace(/\s/g, '')
      .match(/return(.+);\}$/)[1]
  }
}
