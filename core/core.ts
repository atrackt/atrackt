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

  private enableConsole() {
    this.console = true
  }

  private setService(serviceObject: ServiceConstructor) {
    const serviceName = serviceObject.name

    if (this.services[serviceName]) {
      throw new Failure(`${serviceName} service was already set`)
    }

    const serviceInstance = new Service(serviceObject)
    this.services[serviceName] = serviceInstance

    return serviceInstance
  }

  private track(payload: object, options: object = {}) {
    return { payload, options }
  }

  // class methods
  public static getFunctionArguments(func: Function) {
    let funcString = func.toString()

    // get arguments in parens
    let functionParens = funcString.match(/\(([^{}]*)\)/)[1]

    // if parens are empty...
    if (functionParens) {
      return functionParens.replace(/\s/g, '').split(',')

      // babel has moved the arguments into the function to declare vars
    } else {
      return funcString
        .match(/var ([^=]+)/g)
        .map((m) => m.replace(/(var|\s)/g, ''))
    }
  }

  public static getFunctionReturn(func: Function) {
    return func
      .toString()
      .replace(/\s/g, '')
      .match(/return(.+);\}$/)[1]
  }
}

// function () {
//   var defaultArg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'foo';
// }

let funky = (defaultArg = 'foo', party, animal = 'boi', boo = true) => {
  console.log('this is my funky function')
  console.log("(defaultArg = 'foo', party, animal='boi', boo = true)")
  console.log(defaultArg, party, animal, boo)
  return true
}

// console.log(funky.toString())

// function () {
//   var defaultArg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'foo';
//   var party = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'boy';
// }
