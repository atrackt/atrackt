import Core from '@atrackt/core/core'

export default class Atrackt {
  [api: string]: Function

  constructor(coreHandler: CoreConstructor = {}) {
    const core = new Core(coreHandler.config)

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
