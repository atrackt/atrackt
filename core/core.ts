interface Scope {
  [key: string]: any
}

export default class Core {
  console: boolean
  services: any

  static assignObjectToVars(args: object, scope: Scope) {
    for (let [key, value] of Object.entries(args)) {
      scope[key] = value
    }
  }

  constructor() {
    this.console = false
    this.services = []
    globalThis.atrackt = this
  }

  enableConsole() {
    this.console = true
  }

  setService(service: any) {
    if (this.services[service.name]) {
      throw new AtracktError(`${service.name} service was already set`)
    }
    this.services[service.name] = service
  }
}

export class AtracktError extends Error {
  name: string

  constructor(message: string) {
    super(message)
    this.name = 'AtracktError'
  }
}
