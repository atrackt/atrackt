import Core from '@atrackt/core/core'

// Provides the private API
// * should contain no business logic
//
class Atrackt {
  private static _core: Core

  // CORE METHODS
  //
  public static setConsole(console) {
    return Atrackt._core.setGlobal('setConsole', console)
  }

  public static setHandler(handler) {
    return Atrackt._core.setGlobal('setHandler', handler)
  }

  public static setService(service) {
    return Atrackt._core.setGlobal('setService', service)
  }

  // METADATA METHODS
  //
  public static setCallbacks(callbacks, serviceNames = []) {
    return Atrackt._core.setMetadata('setCallbacks', callbacks, serviceNames)
  }

  public static setData(data, serviceNames = []) {
    return Atrackt._core.setMetadata('setData', data, serviceNames)
  }

  public static setEvents(eventSelectors, serviceNames = []) {
    return Atrackt._core.setMetadata('setEvents', eventSelectors, serviceNames)
  }

  public static setOptions(options, serviceNames = []) {
    return Atrackt._core.setMetadata('setOptions', options, serviceNames)
  }

  // API METHODS
  //
  public static start(config = {}) {
    return (Atrackt._core = new Core(config))
  }

  public static track(payload, options = {}, serviceNames = []) {
    return Atrackt._core.track(payload, options, serviceNames)
  }
}

export default globalThis.Atrackt = Atrackt
