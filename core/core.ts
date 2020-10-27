import Service from '@atrackt/core/service'

// the Atrackt class defines the public API
// this should not include any business logic
export default class Atrackt {
  [api: string]: Function

  constructor(coreHandler: CoreConstructor = {}) {
    const core = new exports.Core(coreHandler.config)

    // define api...
    this.setService = core.setService.bind(core)
    this.track = core.track.bind(core)

    // handler only api
    if (this.constructor.name === 'Handler') {
      this.enableConsole = core.enableConsole.bind(core)
    }

    // expose api globally
    globalThis.Atrackt = this
  }
}

export class Core {
  callbacks: object
  config: object
  console: boolean
  data: object
  options: object
  services: object

  constructor(config = {}) {
    this.callbacks = {
      before: [],
      after: [],
    }
    this.config = config || {}
    this.console = false
    this.data = {}
    this.options = {}
    this.services = {}
  }

  public enableConsole() {
    this.console = true
  }

  public setService(serviceObject: ServiceConstructor) {
    let serviceName = serviceObject.name

    if (this.services[serviceName]) {
      throw new Failure(`${serviceName} service was already set`)
    }

    let serviceInstance = new Service(serviceObject)
    this.services[serviceName] = serviceInstance
  }

  public track(data: object, options: object = {}) {
    return { data, options }
  }
}

export class Failure extends Error {
  name: string

  constructor(message: string) {
    super(message)
    this.name = 'Atrackt Error'
  }
}
