import Core from '@atrackt/core/core'

// Provides the public API
// * should contain no business logic
//
class Atrackt {
  // ignore coverage for static functions
  /* c8 ignore start */
  private static _core: Core

  // CORE METHODS
  //
  public static setConsole(console: ConsoleObject) {
    return Atrackt._core.setCore('setConsole', console)
  }

  public static setHandler(handler: HandlerObject) {
    return Atrackt._core.setCore('setHandler', handler)
  }

  public static setService(service: ServiceObject) {
    return Atrackt._core.setCore('setService', service)
  }

  // METADATA METHODS
  //
  public static setCallbacks(
    callbacks: CallbackOrdersObject,
    serviceNames?: ServiceNames
  ) {
    return Atrackt._core.setMetadata('setCallbacks', callbacks, serviceNames)
  }

  public static setData(data: object, serviceNames?: ServiceNames) {
    return Atrackt._core.setMetadata('setData', data, serviceNames)
  }

  public static setEvents(eventSelectors: object, serviceNames?: ServiceNames) {
    return Atrackt._core.setMetadata('setEvents', eventSelectors, serviceNames)
  }

  public static setOptions(options: object, serviceNames?: ServiceNames) {
    return Atrackt._core.setMetadata('setOptions', options, serviceNames)
  }

  // API METHODS
  //
  public static start(config = {}) {
    return (Atrackt._core = new Core(config))
  }

  public static track(payload, options?, serviceNames?: ServiceNames) {
    // allows calling track with serviceNames but without options
    if (
      serviceNames === undefined &&
      (typeof options === 'string' || Array.isArray(options))
    ) {
      serviceNames = options
      options = {}
    }

    return Atrackt._core.track(payload, options, serviceNames)
  }
  /* c8 ignore stop */
}

export default globalThis.Atrackt = Atrackt
