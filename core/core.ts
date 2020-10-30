import Failure from '@atrackt/core/failure'
import Metadata from '@atrackt/core/metadata'
import Service from '@atrackt/core/service'

export default class Atrackt {
  [api: string]: Function

  constructor(coreHandler: CoreConstructor = {}) {
    const core = new exports.Core(coreHandler.config)

    // define core api...
    this.setService = core.setService.bind(core)
    this.track = core.track.bind(core)

    // define handler api
    if (this.constructor.name === 'Handler') {
      this.enableConsole = core.enableConsole.bind(core)
    }

    // expose api globally
    globalThis.Atrackt = this
  }
}

export class Core extends Metadata {
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
  }

  track(payload: object, options: object = {}) {
    return { payload, options }
  }
}
